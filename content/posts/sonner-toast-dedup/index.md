---
title: 'deduped sonner toasts with nudge'
description: 'a thin wrapper around sonner that deduplicates toasts by message content and nudges with a shake animation'
date: '2026-02-11'
draft: false
slug: '/blog/sonner-toast-dedup'
tags:
  - tech
  - react
  - ui
---

> **Note:** This post was written by AI (Claude) after I fed it the code I built and my ramblings about the approach. The ideas, implementation, and code are mine.

Ever double-clicked a button and gotten three identical toasts? Yeah, me too. This fixes that.

Instead of letting duplicates pile up, I built a thin wrapper around [sonner](https://sonner.emilkowal.dev/) that **deduplicates by message content** and **nudges the existing toast** with a shake animation when a duplicate is attempted.

_(Shoutout to Claude for turning my ramblings into actual working code)_

## The two files

The entire implementation lives in two files: a TypeScript wrapper (`sonner.tsx`) and a CSS addition (`globals.css`).

### `sonner.tsx` — the dedup wrapper

```tsx
'use client';

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  toast as sonnerToast,
  Toaster as Sonner,
  type ExternalToast,
  type ToasterProps,
} from 'sonner';

const activeToasts = new Map<string, string | number>();
const nudgeCounts = new Map<string, number>();

function getToastKey(message: unknown, type: string): string | null {
  if (typeof message === 'string') return `${type}:${message}`;
  return null;
}

function cleanupHandlers(
  key: string | null,
  data?: ExternalToast,
): Pick<ExternalToast, 'onDismiss' | 'onAutoClose'> {
  return {
    onDismiss: t => {
      if (key) {
        activeToasts.delete(key);
        nudgeCounts.delete(key);
      }
      data?.onDismiss?.(t);
    },
    onAutoClose: t => {
      if (key) {
        activeToasts.delete(key);
        nudgeCounts.delete(key);
      }
      data?.onAutoClose?.(t);
    },
  };
}
```

### `globals.css` — the nudge keyframes

```css
[data-sonner-toast].toast-nudge-a {
  animation: toast-nudge-a 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}
[data-sonner-toast].toast-nudge-b {
  animation: toast-nudge-b 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

@keyframes toast-nudge-a {
  0%,
  100% {
    translate: 0;
  }
  10% {
    translate: -4px;
  }
  25% {
    translate: 3px;
  }
  40% {
    translate: -2px;
  }
  55% {
    translate: 1.5px;
  }
  70% {
    translate: -0.75px;
  }
  85% {
    translate: 0.25px;
  }
}
```

## How it works

### Deduplication flow

```
toast.error("Failed to connect")
  ├─ getToastKey() → "error:Failed to connect"
  ├─ activeToasts.has(key)? NO
  ├─ sonnerToast.error("Failed to connect") → id: 42
  └─ activeToasts.set(key, 42)

toast.error("Failed to connect")    ← duplicate
  ├─ getToastKey() → "error:Failed to connect"
  ├─ activeToasts.has(key)? YES → id: 42
  ├─ nudgeCounts: 0 → 1, pick "toast-nudge-b"
  └─ sonnerToast.error(..., { id: 42, className: "toast-nudge-b" })
       └─ sonner updates toast 42 in place, CSS animation plays
```

### Why sonner's update-by-id mechanism

The first approach we tried was direct DOM manipulation — querying for `[data-sonner-toast][data-id="42"]` and toggling a `data-nudge` attribute. This didn't work because **sonner does not render a `data-id` attribute** on toast elements.

Instead, we lean on a sonner built-in: when you call `sonnerToast("message", { id: existingId })`, sonner recognises the existing ID and **updates the toast in place** rather than creating a new element. We piggyback on it to inject our nudge `className`.

### Why two animation names

CSS animations don't restart when you re-apply the same class. If we always set `className: "toast-nudge"`, only the first duplicate would animate. By toggling between `toast-nudge-a` and `toast-nudge-b` — which have identical keyframes but different `animation-name` values — the browser sees a new animation each time and restarts it.

### Why `translate` instead of `transform`

Sonner positions toasts using `transform: var(--y)` for stacking, enter/exit transitions, and swipe gestures. If our shake animation overrode `transform`, it would break sonner's layout.

The CSS `translate` property is **independent of `transform`**. The browser composites them together — so we can shake horizontally without interfering with sonner's vertical positioning.

## Usage

Import `toast` from the wrapper instead of directly from sonner. No call-site changes needed:

```ts
import { toast } from '@/components/ui/sonner';

toast.success('Saved!');
toast.error('Failed to connect');
```

## Limitations

- Only deduplicates **string** messages. React node messages always create a new toast.
- Dedup key is `type + message` — two toasts with the same message but different `description` are still treated as duplicates.
- `promise`, `custom`, `dismiss` pass through directly without deduplication.
