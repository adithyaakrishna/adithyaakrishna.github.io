---
title: 'boxing the digital canvas: i love pdfs'
description: 'how to render rectangles on a pdf using coordinates from json'
date: '2025-04-12'
draft: false
slug: '/blog/bounding-box'
tags:
  - tech
  - ui
  - react
---

In today's era, data is THE commodity. PDFs, still the backbone of business documentation, hide valuable data in plain sight. At Tensorlake, our backend OCR services extract data, generating precise coordinates for every text block, table, form field or any other fragment types for that matter. But raw coordinates mean nothing without visualization. So I built this React component for PDF viewer (we use [lector](https://github.com/anaralabs/lector) for rendering our PDFs) that bridged the gap of showing the boxes from JSON data coordinates and the UI.

## The Problem

When working with document processing systems, we often need to visualize various elements identified by machine learning models - tables, text blocks, headers, signatures, and more. These elements need to be:

1. Visually distinct based on their type (different color boxes)
2. Properly scaled and positioned over the original document (and they had to be responsive)
3. Interactive, allowing users to hover and see details

> The UI Design for this was done by my dear friend [@pseudonymtra](https://x.com/pseudonymtra)

## Meet the BoundingBoxRenderer

The `BoundingBoxRenderer` component is designed to overlay bounding boxes on top of PDFs and images. It handles the complexities of scaling, positioning, and rendering boxes with different styles based on element types.

Here's the component signature:

```tsx
interface BoundingBoxRendererProps {
  type: 'image' | 'pdf';
  rects: HighlightRectData[];
  onFragmentClick?: (rect: HighlightRectData) => void;
}
```

The component takes three key props:

- `type`: Whether we're annotating a PDF or an image
- `rects`: An array of rectangle data to render
- `onFragmentClick`: Optional callback for when a user clicks a box

## Handling Images vs PDFs

One of the most interesting aspects of this component is how it handles the different challenges of annotating images versus PDFs.

### For Images

With images, the main challenge is **scaling**. When an image is rendered in a browser, its display size often differs from its natural dimensions. Our component needs to calculate the correct scaling factors:

```tsx
useEffect(() => {
  if (props.type !== 'image') return;
  const calculateScale = () => {
    const container = containerRef.current;
    if (!container) return;
    const imageElement = container.parentElement?.previousElementSibling as HTMLImageElement;
    setScale({
      x: rect.width / imageElement.naturalWidth,
      y: rect.height / imageElement.naturalHeight,
    });
  };
  calculateScale();
  window.addEventListener('resize', calculateScale);
}, [props.type]);
```

### For PDFs

PDF rendering is handled differently. Instead of a single container, we create separate containers for each page:

```tsx
const rectsByPage = props.rects.reduce((acc, rect) => {
  acc[rect.pageNumber] = acc[rect.pageNumber] || [];
  acc[rect.pageNumber].push(rect);
  return acc;
}, {} as Record<number, HighlightRectData[]>);
```

## The Magic of Colorful Boxes

The visual appeal of our component comes from the variety of colors and styles applied to different element types:

```tsx
export const getColorByType = (type: string): ColorResult => {
  switch (type) {
    case 'section_header':
      return {
        background: 'rgba(216, 180, 254, 0.3)',
        border: 'rgba(216, 180, 254, 1)',
      };
    case 'table':
      return {
        background: 'rgba(125, 211, 252, 0.1)',
        border: 'rgba(125, 211, 252, 1)',
      };
  }
};
```

## Z-Index Management

An often overlooked aspect of overlaying multiple elements is managing z-index to control which elements appear on top:

```tsx
export const getZIndexByType = (type: string): number => {
  switch (type) {
    case 'text':
      return 5;
    case 'table':
      return 10;
    default:
      return 1;
  }
};
```

This ensures that certain element types always appear above others, creating a more user-friendly visual hierarchy.

## The Final Touch: Hover Effects

What makes our component truly interactive is the hover effect. When a user hovers over a box:

1. The background opacity changes
2. A shadow appears around the box
3. A label showing the element type pops up
4. The z-index temporarily increases to bring it to the front

All of this creates a responsive interface for exploring the document structure.

## Conclusion

The `BoundingBoxRenderer` component demonstrates how you can enhance document viewing experiences by adding interactive visual layers on top of PDFs and images. Whether you're building document analysis tools, creating annotation systems, or just trying to make document viewing more insightful, the techniques shown here provide a good head-start.

Next time you look at a PDF, think about the hidden structure within it, waiting to be boxed, colored, and brought to life on your screen :)

> Huge shoutout to [@andrewdorobantu](https://x.com/andrewdorobantu) for developing the PDF Viewer library
