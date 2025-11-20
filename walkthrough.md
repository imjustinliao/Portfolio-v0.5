# Walkthrough - Glowing Border Speed Control

I have parametrized the speed of the `GlowingBorder` component, allowing for different animation durations. This enables the infinite glowing effects (on hover) to run slower than the single-run effects (on load/interaction).

## Changes

### 1. Updated GlowingBorder Component
I modified `src/components/GlowingBorder.tsx` to accept a `duration` prop.
- **Prop:** `duration?: number` (defaults to `1750` ms).
- **Usage:** The animation loop now uses this prop to calculate progress.

**File:** `src/components/GlowingBorder.tsx`

```tsx
const GlowingBorder = ({ infinite = false, duration = 1750 }: { infinite?: boolean; duration?: number }) => {
  // ...
  const elapsed = time - startTimeRef.current
  // duration is used here
  // ...
}
```

### 2. Updated Infinite Usages
I updated the instances where the border glows infinitely to use a slower duration (`3000` ms), creating a more relaxed "breathing" effect.

**File:** `src/pages/About.tsx` (Tooltip)
```tsx
<GlowingBorder infinite={true} duration={3000} />
```

**File:** `src/components/Hero.tsx` (Home Image)
```tsx
<GlowingBorder infinite={true} duration={3000} />
```

**Note:** The footer buttons in `src/components/Footer.tsx` continue to use the default duration (`1750` ms) for their single-run animation.

## Verification Results

### Manual Verification
- **Home Image & Tooltip:** The glowing border should move noticeably slower (3 seconds per loop) than before.
- **Footer Buttons:** The glowing border on the footer buttons should still move at the original speed (1.75 seconds) when triggered.
