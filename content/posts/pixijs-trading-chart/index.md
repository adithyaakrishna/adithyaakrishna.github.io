---
title: 'smooth trading charts with pixijs & react'
description: 'how i ditched canvas 2d and svg libraries for a gpu-powered chart that feels native'
date: '2026-02-17'
draft: false
slug: '/blog/pixijs-trading-chart'
tags:
  - tech
  - react
  - pixijs
---

> **Note:** This post was written by AI (Claude) after I fed it the code I built and my ramblings about the approach. The ideas, implementation, and code are mine.

Every crypto/finance app needs a price chart. I tried the usual suspects — Chart.js, Recharts, Lightweight Charts — but none of them gave me what I wanted:

- **Buttery 60 fps animations** when the data updates
- **Touch-friendly crosshairs** with haptic feedback on mobile
- **Total visual control** — custom gradients, markers, tooltips, all pixel-perfect
- **Tiny footprint** — no massive charting library, just what I need

So I built my own on top of **PixiJS**, a 2D rendering engine that uses WebGL (your GPU) under the hood. The result is a React component that renders thousands of data points without breaking a sweat.

## The Big Picture

Our chart has **layers**, like transparent sheets stacked on top of each other:

```
┌──────────────────────────────┐
│  7. Tooltip (price info box) │  ← topmost
│  6. Overlay (crosshair lines)│
│  5. Labels (Y-axis prices)   │
│  4. Chart line               │
│  3. Gradient fill under line │
│  2. Gradient mask            │
│  1. Grid lines               │  ← bottommost
└──────────────────────────────┘
```

PixiJS gives us a `stage` — think of it as the root "scene". We add each layer to the stage in order, so things drawn later appear on top.

## Step 1: Setting Up PixiJS Inside React

PixiJS is an imperative library — it doesn't use JSX. We bridge the gap with a `useEffect` that creates the PixiJS `Application` and attaches it to a div.

```tsx
const containerRef = useRef<HTMLDivElement>(null);
const appRef = useRef<Application | null>(null);

useEffect(() => {
  const app = new Application();

  await app.init({
    width: 800,
    height: 400,
    background: '#ffffff',
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });

  containerRef.current.appendChild(app.canvas);
  appRef.current = app;

  return () => {
    app.destroy(true, { children: true });
  };
}, []);
```

`resolution: window.devicePixelRatio` makes the chart crisp on Retina/HiDPI screens. On unmount, we destroy everything to prevent memory leaks.

## Step 2: Mapping Data to Pixels

Every chart needs two functions: one to convert a price to a Y pixel, and one to convert a data index to an X pixel.

```tsx
const pointSpacing = data.length > 1 ? chartWidth / (data.length - 1) : 0;

const yScale = chartHeight / (yMax - yMin);

const priceToY = price => padding.top + chartHeight - (price - yMin) * yScale;

const indexToX = index => padding.left + index * pointSpacing;
```

**Why `chartHeight - ...`?** In screen coordinates, Y=0 is the **top**. But in a price chart, higher prices should be higher on screen (lower Y). So we flip it.

## Step 3: Drawing the Price Line

The star of the show — a smooth line connecting all price points:

```tsx
chartLayer.setStrokeStyle({
  width: 2,
  color: 0x09090b,
  cap: 'round',
  join: 'round',
});

chartLayer.moveTo(indexToX(0), priceToY(data[0].price));

for (let i = 1; i < data.length; i++) {
  chartLayer.lineTo(indexToX(i), priceToY(data[i].price));
}

chartLayer.stroke();
```

## Step 4: The Gradient Fill

That soft gradient under the line? It's a two-part trick:

**Part A:** Create a gradient texture on an offscreen canvas, then turn it into a PixiJS texture.

**Part B:** Mask it to the area under the price line — trace along the price line, then close the path at the bottom. The gradient only appears between the line and the bottom of the chart.

## Step 5: Smooth Y-Axis Animations

When new data arrives, the price range might change. Instead of jumping instantly, we **lerp** toward the target:

```tsx
function lerp(a, b, t) {
  return a + (b - a) * t;
}

yAxis.min = lerp(yAxis.min, yAxis.targetMin, 0.15);
yAxis.max = lerp(yAxis.max, yAxis.targetMax, 0.15);
```

The chart gently "breathes" as it adjusts to new data — instead of snapping around jarringly.

## Step 6: Touch-Friendly Crosshair

When a user touches or hovers on the chart, we show crosshair lines and a tooltip. PixiJS doesn't have a built-in "dashed line" API, so we draw lots of small segments:

```tsx
const DASH = 4;
const GAP = 4;

for (let py = top; py < bottom; py += DASH + GAP) {
  overlayLayer.moveTo(x, py);
  overlayLayer.lineTo(x, Math.min(py + DASH, bottom));
}
overlayLayer.stroke();
```

On mobile, after 300ms of holding, a pulsing dot appears and we trigger a haptic vibration:

```tsx
if ('vibrate' in navigator) {
  navigator.vibrate(20);
}
```

## Step 7: Markers (Buy/Sell Indicators)

Green triangles for buys, red for sells. They sit right on the price line at the exact point the trade happened:

```tsx
if (marker.type === 'buy') {
  chartLayer.moveTo(x, y - 12);
  chartLayer.lineTo(x - 8, y + 4);
  chartLayer.lineTo(x + 8, y + 4);
} else {
  chartLayer.moveTo(x, y + 12);
  chartLayer.lineTo(x - 8, y - 4);
  chartLayer.lineTo(x + 8, y - 4);
}

chartLayer.closePath();
chartLayer.fill(marker.type === 'buy' ? 0x22c55e : 0xef4444);
```

## Performance Tricks

A few things that keep this chart fast:

1. **No React re-renders for drawing.** All drawing happens in imperative PixiJS code triggered by `requestAnimationFrame`.
2. **Texture caching.** The gradient texture is cached and only regenerated when the size or color changes.
3. **TextStyle reuse.** Created once, reused across frames.
4. **Animation only when needed.** `requestAnimationFrame` only runs while the Y-axis is transitioning. Once it settles, we stop.
5. **Proper cleanup.** On unmount, we destroy the PixiJS app, textures, and all children.

## Wrapping Up

Building a chart from scratch sounds intimidating, but PixiJS makes the drawing part surprisingly straightforward. The hardest parts were getting the Y-axis math right (flipped coordinates always trip me up), making the gradient mask line up perfectly, and handling the imperative PixiJS world inside React's declarative world.

The payoff? A chart that renders at 60fps, looks exactly how I want, weighs almost nothing, and works great on both desktop and mobile.

If you're building something where stock charting libraries feel too rigid, give PixiJS a shot. You might be surprised how far `moveTo` and `lineTo` can take you.
