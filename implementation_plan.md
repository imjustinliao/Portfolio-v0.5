# Implementation Plan - Glowing Text Effect

I will implement an infinite left-to-right glowing shimmer effect for the "high-delta work" text on the About page, replacing the current border animation.

## User Review Required
> [!NOTE]
> I am replacing the existing `GlowingBorder` component usage for this specific element with a new CSS-based shimmer animation. The `GlowingBorder` component will remain available for other parts of the app (like the Footer).

## Proposed Changes

### CSS
#### [MODIFY] [index.css](file:///Users/justin-liao/CS Projects/Portfolio-v0.5/src/index.css)
- Add `@keyframes shimmer` for the left-to-right movement.
- Add `.animate-shimmer` utility class.

### Components
#### [MODIFY] [About.tsx](file:///Users/justin-liao/CS Projects/Portfolio-v0.5/src/pages/About.tsx)
- Remove `<GlowingBorder />` from the "high-delta work" tooltip container.
- Add a new `div` with the `.animate-shimmer` class inside the hover container.
- Adjust the container styles to ensure the shimmer is visible and looks like a "light" passing through.

## Verification Plan
### Manual Verification
- Hover over "high-delta work" on the About page.
- Verify that a light/glow effect moves from left to right infinitely and slowly.
- Verify that the effect is contained within the rounded box.
