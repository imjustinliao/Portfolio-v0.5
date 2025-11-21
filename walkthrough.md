# Walkthrough - Icons and Link Layout

I have added support for Discord and DevPost icons and optimized the link layout in project cards to prevent overflow and overlap issues on smaller screens.

## Changes

### 1. Added Icons
I added `DiscordIcon` and `DevPostIcon` components to `src/components/ProjectCard.tsx` and updated the detection logic.

**File:** `src/components/ProjectCard.tsx`

```tsx
// ... inside getLinkIcon ...
if (lowerText.includes('discord') || lowerUrl.includes('discord')) return <DiscordIcon />
if (lowerText.includes('devpost') || lowerUrl.includes('devpost')) return <DevPostIcon />
```

### 2. Optimized Link Layout
I updated the links container to be a single, horizontally scrollable line. This prevents the links from stacking vertically and pushing content out of bounds or overlapping the back button.

**File:** `src/components/ProjectCard.tsx`

```tsx
<div className="flex flex-nowrap items-center gap-[...] overflow-x-auto w-full pr-[60px] ...">
  {/* ... */}
  <a className="... whitespace-nowrap ...">
    {/* ... */}
  </a>
</div>
```

**Key Layout Features:**
- **`flex-nowrap`**: Forces all links onto a single line.
- **`overflow-x-auto`**: Enables horizontal scrolling if links exceed the container width.
- **`pr-[60px]`**: Adds right padding to ensure links don't slide under the "Return" button.
- **`whitespace-nowrap`**: Prevents text inside buttons from wrapping.

## Verification Results

### Manual Verification
- **Icons:** Links with "Discord" or "DevPost" in the text or URL display the correct icons.
- **Mobile Layout:** On small screens, multiple links stay in one row and can be scrolled horizontally.
- **Back Button:** The links scroll *under* the area reserved for the back button but do not overlap it visually due to the padding/spacing logic (or at least the user can scroll to see the last link without it being hidden behind the button).
