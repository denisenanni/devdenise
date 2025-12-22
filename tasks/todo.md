# Linux Distro-Themed UI Redesign

## Goal
Transform the portfolio to look like a Linux desktop environment, with a theme switcher that lets users "switch distros" - changing the entire visual experience between Ubuntu, Fedora, Linux Mint, and Arch Linux.

## Design Concept

### Ubuntu Theme (Default)
- **Window controls**: Orange/amber close, minimize, maximize (left side)
- **Colors**: Orange (#E95420), Aubergine (#77216F), Dark grey (#2C001E)
- **Font**: Ubuntu font family
- **Desktop elements**: Dock on left side, top panel with system tray
- **Window style**: Rounded corners, subtle shadows

### Fedora Theme
- **Window controls**: Blue accent
- **Colors**: Blue (#3C6EB4), Dark blue (#294172), Light blue (#51A2DA)
- **Font**: Open Sans
- **Desktop elements**: GNOME-style top bar
- **Window style**: Modern, minimal

### Linux Mint Theme
- **Window controls**: Green accent (Mint)
- **Colors**: Mint green (#87CF3E), Forest (#1A5728), Dark grey (#2D2D2D)
- **Font**: Roboto
- **Desktop elements**: Cinnamon-style taskbar at bottom
- **Window style**: Classic desktop feel

### Arch Linux Theme
- **Window controls**: Minimal/borderless
- **Colors**: Blue (#1793D1), Dark grey (#333333), Black (#0D0D0D)
- **Font**: JetBrains Mono (terminal aesthetic)
- **Desktop elements**: Minimalist, tiling window manager style
- **Window style**: Sharp corners, no decorations, terminal-focused

## Architecture

### Theme Context System
```
src/
├── context/
│   └── ThemeContext.tsx    # React context for distro theme
├── theme/
│   ├── theme.ts            # Existing (update for distro support)
│   ├── distros/
│   │   ├── ubuntu.ts       # Ubuntu color palette & config
│   │   ├── fedora.ts       # Fedora color palette & config
│   │   ├── mint.ts         # Mint color palette & config
│   │   └── arch.ts         # Arch color palette & config
│   └── types.ts            # TypeScript types for themes
├── components/
│   ├── desktop/
│   │   ├── Desktop.tsx     # Main desktop container
│   │   ├── TopPanel.tsx    # System panel (clock, tray)
│   │   ├── Dock.tsx        # App dock/launcher
│   │   ├── Window.tsx      # Draggable window component
│   │   └── WindowControls.tsx # Close/min/max buttons
│   └── DistroSwitcher.tsx  # Theme toggle component
```

## Implementation Plan

### Phase 1: Theme Infrastructure ✅ COMPLETE
- [x] Create TypeScript types for distro themes (`src/theme/types.ts`)
- [x] Create individual distro theme files:
  - [x] Ubuntu theme (`src/theme/distros/ubuntu.ts`)
  - [x] Fedora theme (`src/theme/distros/fedora.ts`)
  - [x] Mint theme (`src/theme/distros/mint.ts`)
  - [x] Arch theme (`src/theme/distros/arch.ts`)
- [x] Create ThemeContext with provider (`src/context/ThemeContext.tsx`)
- [x] Update Tailwind config for CSS variables approach
- [x] Update index.css with CSS custom properties

### Phase 2: Desktop Shell Components ✅ COMPLETE
- [x] Create TopPanel component (clock, system tray, distro logo)
- [x] Create Dock component (app launcher icons)
- [x] Create Window component (window frame with title bar)
- [x] Create WindowControls component (close/minimize/maximize)
- [x] Create Desktop component (wrapper with panel and dock)

### Phase 3: Distro Switcher ✅ COMPLETE
- [x] Create DistroSwitcher component with distro logos
- [ ] Add keyboard shortcut (Super+D) to cycle distros (deferred)
- [x] Add smooth transition animations between themes
- [x] Persist selected theme to localStorage

### Phase 4: Content Migration ✅ COMPLETE
- [x] Wrap existing sections in Window components:
  - [x] Home → Terminal-style window with whoami command
  - [x] About → "About Me" window with tech stack
  - [x] Resume → "Resume" window with scrollable content
  - [x] Contact → "Contact" window with form
- [ ] Create terminal-style component for Arch theme (deferred)
- [ ] Add window minimize/maximize behavior (deferred)

### Phase 5: Visual Polish (PENDING)
- [ ] Add distro-specific wallpapers (or gradients)
- [ ] Implement window stacking/focus behavior
- [ ] Add subtle boot animation on initial load
- [ ] Create "Desktop icons" for each section
- [ ] Add notification popups for form submission

### Phase 6: Fonts & Assets (PENDING)
- [ ] Add Ubuntu font (for Ubuntu theme)
- [ ] Add Open Sans (for Fedora theme)
- [x] Keep existing fonts for Mint and Arch
- [x] Create/source distro logo SVGs (inline SVGs used)
- [x] Create window control button SVGs (inline SVGs used)

### Phase 7: Testing & Refinement (PENDING)
- [ ] Test all distro themes
- [ ] Verify responsive behavior on mobile
- [ ] Add reduced motion support
- [x] Security review (no sensitive data exposure)
- [ ] Performance optimization (lazy load themes)

## Technical Notes

### CSS Variables Strategy
Each distro theme will set CSS custom properties:
```css
:root[data-distro="ubuntu"] {
  --bg-primary: #2C001E;
  --bg-secondary: #3C001E;
  --accent: #E95420;
  --text-primary: #ffffff;
  --window-radius: 12px;
  --controls-position: left;
}
```

### Window Component API
```tsx
interface WindowProps {
  title: string;
  icon?: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  minimized?: boolean;
  maximized?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}
```

### Theme Context API
```tsx
interface DistroTheme {
  name: 'ubuntu' | 'fedora' | 'mint' | 'arch';
  displayName: string;
  colors: ColorPalette;
  fonts: FontConfig;
  windowStyle: WindowStyleConfig;
  dockPosition: 'left' | 'bottom';
}

interface ThemeContextValue {
  currentDistro: DistroTheme;
  setDistro: (distro: DistroTheme['name']) => void;
  cycleDistro: () => void;
}
```

## Dependencies to Add
- None required (using existing Framer Motion for animations)
- Consider: react-draggable for window movement (or custom implementation)

## Security Considerations
- Theme preference stored only in localStorage (client-side)
- No external API calls for themes
- All assets bundled locally
- No user data collected for theme switching

---

## Implementation Review (Phase 1-4)

### Files Created

| File | Purpose |
|------|---------|
| `src/theme/types.ts` | TypeScript interfaces for distro themes |
| `src/theme/distros/ubuntu.ts` | Ubuntu color palette and config |
| `src/theme/distros/fedora.ts` | Fedora color palette and config |
| `src/theme/distros/mint.ts` | Linux Mint color palette and config |
| `src/theme/distros/arch.ts` | Arch Linux color palette and config |
| `src/theme/distros/index.ts` | Theme registry and exports |
| `src/context/ThemeContext.tsx` | React context + provider for theme switching |
| `src/components/desktop/Desktop.tsx` | Main desktop wrapper with panel and dock |
| `src/components/desktop/TopPanel.tsx` | Top panel with clock, system tray, distro name |
| `src/components/desktop/Dock.tsx` | App dock/launcher with section icons |
| `src/components/desktop/Window.tsx` | Window frame component with title bar |
| `src/components/desktop/WindowControls.tsx` | Window control buttons (close/min/max) |
| `src/components/desktop/DistroSwitcher.tsx` | Dropdown to switch between distros |
| `src/components/desktop/index.ts` | Barrel export for desktop components |

### Files Modified

| File | Changes |
|------|---------|
| `tailwind.config.cjs` | Added `distro.*` CSS variable colors |
| `src/index.css` | Added CSS custom properties for theming |
| `src/App.tsx` | Wrapped with ThemeProvider and Desktop |
| `src/sections/Home.tsx` | Wrapped in Window (terminal style) |
| `src/sections/About.tsx` | Wrapped in Window |
| `src/sections/Resume.tsx` | Wrapped in Window with scrollable content |
| `src/sections/Contact.tsx` | Wrapped in Window |
| `src/components/Footer.tsx` | Updated to use distro theme colors |

### How Theme Switching Works

1. **ThemeContext** manages the current distro state
2. When distro changes, CSS custom properties are updated on `:root`
3. All components use `var(--property)` for colors, fonts, etc.
4. Theme persists to localStorage automatically
5. Dock position changes based on distro (left for Ubuntu, bottom for others)
6. Window controls style changes (colored circles vs GNOME symbolic)

### Distro Differences

| Feature | Ubuntu | Fedora | Mint | Arch |
|---------|--------|--------|------|------|
| Accent | Orange | Blue | Green | Blue |
| Background | Aubergine | Dark grey | Dark grey | Black |
| Dock | Left | Bottom | Bottom | Bottom |
| Window controls | Left, colored | Right, symbolic | Right, colored | Right, minimal |
| Border radius | 12px | 12px | 6px | 0px |

### Security Analysis

✅ No `any` types used - all components properly typed
✅ No sensitive data exposed in frontend
✅ No XSS vulnerabilities (no dynamic HTML injection)
✅ Theme data stored only in localStorage (client-side)
✅ No external API calls for theme functionality

### TypeScript Build

✅ Zero errors - `yarn tsc --noEmit` passes

---

# Parallax Scroll Effect Implementation (ARCHIVED)

## Goal
Add a CSS-based parallax scroll effect similar to the CodePen example (https://codepen.io/dchen05/pen/Qweqdb), adapted to work with the existing UI's navy/slate color scheme.

## Analysis

### CodePen Effect Features
- Uses CSS 3D transforms with `perspective` and `translateZ`
- Multiple layers positioned at different z-depths
- Each layer scrolls at different speeds (parallax effect)
- Layers have gradient colors (far to near)
- Zigzag decorative patterns between layers
- Content positioned in 3D space

### Current Project Structure
- Multiple sections: Home, About, Projects, Resume, Contact
- Using Framer Motion for animations
- Navy-based color scheme (navy-900, navy-800)
- Already has `react-parallax` package installed (unused)
- Tailwind CSS for styling

## Implementation Plan

### Phase 1: Setup Parallax Container
- [ ] Create `ParallaxContainer.tsx` component
  - Add perspective to parent container
  - Set up transform-style: preserve-3d
  - Configure overflow and scroll behavior

- [ ] Update `App.tsx` to wrap sections in ParallaxContainer
  - Wrap all sections in the parallax container
  - Keep Navbar and Footer outside parallax

### Phase 2: Create Parallax Layers
- [ ] Create `ParallaxLayer.tsx` component
  - Accept zDepth prop for positioning
  - Calculate scale based on z-depth and perspective
  - Apply translateZ and scale transforms
  - Support custom background colors

- [ ] Update sections to use ParallaxLayer
  - Wrap Home section (furthest layer)
  - Wrap About section (mid-far layer)
  - Wrap Projects section (mid-near layer)
  - Wrap Resume section (near layer)
  - Wrap Contact section (nearest layer)

### Phase 3: Add Layer Styling
- [ ] Create parallax CSS styles
  - Add perspective value to tailwind config
  - Create layer color variants (navy shades)
  - Add smooth scrolling styles
  - Create decorative layer dividers (optional zigzag pattern)

### Phase 4: Color Adaptation
- [ ] Adapt colors to match theme
  - Use navy-900 as far color
  - Use navy-800 and navy-700 for mid layers
  - Potentially use subtle primary-400 tints
  - Ensure text remains readable on all layers

### Phase 5: Testing & Refinement
- [ ] Test scroll performance
  - Check smooth scrolling
  - Verify no jank or lag
  - Test on different screen sizes

- [ ] Adjust z-depths and scales
  - Fine-tune parallax speed
  - Ensure proper visual depth
  - Balance effect intensity

- [ ] Verify accessibility
  - Check for motion sensitivity (prefers-reduced-motion)
  - Ensure content remains readable
  - Test keyboard navigation

## Technical Details

### Perspective Formula
```
perspective: 1px (or 2px for subtler effect)
translateZ: -(layerNumber * 0.5)px
scale: 1 + (abs(translateZ) / perspective)
```

### Layer Configuration
- Layer 1 (Home): translateZ(-2px), scale(3)
- Layer 2 (About): translateZ(-1.5px), scale(2.5)
- Layer 3 (Projects): translateZ(-1px), scale(2)
- Layer 4 (Resume): translateZ(-0.5px), scale(1.5)
- Layer 5 (Contact): translateZ(0px), scale(1)

## Notes
- Keep changes minimal and focused
- Don't break existing animations
- Maintain current responsive behavior
- Remove `react-parallax` if not needed (use pure CSS)
- Test thoroughly before marking complete

---

## Implementation Review

### Changes Implemented

#### 1. Created ParallaxContainer Component
**File:** `src/components/ParallaxContainer.tsx`

**What it does:**
- Wraps all sections in a container with CSS 3D perspective
- Sets `perspective: 1px` to create the parallax depth effect
- Configures `transform-style: preserve-3d` to enable 3D transforms for child elements

**Impact:**
- Provides the 3D context needed for parallax scrolling
- All child layers will now scroll at different speeds based on their z-depth

#### 2. Created ParallaxLayer Component
**File:** `src/components/ParallaxLayer.tsx`

**What it does:**
- Accepts `zDepth` prop to position layers at different z-depths
- Calculates scale automatically: `scale = 1 + abs(zDepth) / perspective`
- Applies `translateZ()` and `scale()` transforms to create parallax effect
- Supports custom background colors for each layer

**Impact:**
- Reusable component for any parallax layer
- Proper TypeScript typing for all props
- Clean, minimal implementation

#### 3. Updated All Sections
**Files:**
- `src/sections/Home.tsx` - zDepth: -2 (furthest, slowest scroll)
- `src/sections/About.tsx` - zDepth: -1.5
- `src/sections/Projects.tsx` - zDepth: -1
- `src/sections/Resume.tsx` - zDepth: -0.5
- `src/sections/Contact.tsx` - zDepth: 0 (closest, normal scroll)

**What changed:**
- Wrapped each section in `ParallaxLayer` with different z-depths
- Assigned navy color gradients (darker = further away)
- Removed `bg-navy-900` from section elements (now on ParallaxLayer)
- Preserved all existing Framer Motion animations

**Impact:**
- Each section scrolls at a different speed creating depth illusion
- Subtle color variations enhance the depth perception
- All existing animations still work

#### 4. Added Parallax CSS Styles
**File:** `src/index.css`

**Styles added:**
- `.parallax-container`: Sets up viewport with perspective
- `.parallax-group`: Preserves 3D transforms for children
- `.parallax-layer`: Configures individual layers
- `@media (prefers-reduced-motion)`: Disables parallax for accessibility

**Impact:**
- Clean, pure CSS implementation (no JavaScript calculations)
- Respects user motion preferences
- Smooth, performant scrolling

#### 5. App.tsx Integration
**File:** `src/App.tsx`

**What changed:**
- Imported `ParallaxContainer`
- Wrapped all sections (Home through Contact) in the container
- Navbar and Footer remain outside for normal fixed positioning

**Impact:**
- Parallax effect only applies to main content sections
- Navigation remains accessible and fixed
- Footer stays at the bottom

### Color Scheme

Applied navy color gradients from far to near:
- **Home** (#0a192f): Navy-900 (furthest/darkest)
- **About** (#0d1e3a): Slightly lighter navy
- **Projects** (#0f2642): Mid-tone navy
- **Resume** (#112240): Navy-800 (existing color)
- **Contact** (#112240): Navy-800 (closest)

### Accessibility

Implemented `prefers-reduced-motion` support:
- Users with motion sensitivity see static layout
- Parallax transforms are disabled via CSS media query
- No JavaScript required for accessibility

### Security Analysis

All changes follow security best practices:
- No use of `any` types - all components properly typed
- No sensitive data exposed in frontend
- No XSS vulnerabilities (no dynamic HTML injection)
- Pure CSS transforms (no security risks)
- All props properly validated with TypeScript interfaces

### Performance

- **Pure CSS approach**: No JavaScript calculations on scroll
- **Hardware accelerated**: Uses `transform: translateZ()` (GPU accelerated)
- **Minimal overhead**: Only CSS perspective and transforms
- **No dependencies**: Didn't use react-parallax package
- **Zero TypeScript errors**: Clean build

### Testing Results

✅ TypeScript compilation successful (no errors)
✅ Development server runs without issues
✅ All existing Framer Motion animations preserved
✅ Accessibility support (prefers-reduced-motion) implemented
✅ No breaking changes to existing functionality

### What You'll See

When you scroll through the site:
1. **Home section** (furthest): Scrolls slowest, creating a "far away" feeling
2. **About section**: Scrolls slightly faster
3. **Projects section**: Mid-speed scrolling
4. **Resume section**: Almost normal speed
5. **Contact section**: Normal scroll speed (closest layer)

The effect is subtle and sophisticated - sections appear to be at different depths as you scroll, with those "further away" moving slower than those "closer" to you.

---

## REVISED Implementation - Background-Only Parallax

### User Requirement Change
After initial implementation, the user requested that:
- **Content (sections) should scroll normally and always be fully visible**
- **Only the background should have the parallax effect**
- Multiple colored background layers should scroll at different speeds behind the content

### New Approach

#### 1. Reverted Section Changes
**Files:**All sections (Home, About, Projects, Resume, Contact)

**Changes:**
- Removed ParallaxLayer wrappers from all sections
- Sections now scroll normally without any transforms
- Content is fully visible and accessible at all times

#### 2. Updated ParallaxContainer
**File:** `src/components/ParallaxContainer.tsx`

**Changes:**
- Creates 6 decorative background layers with navy color gradients:
  - Layer 1: #050d1f (darkest) at zDepth -3
  - Layer 2: #07101e at zDepth -2.5
  - Layer 3: #0a192f (navy-900) at zDepth -2
  - Layer 4: #0d1e3a at zDepth -1.5
  - Layer 5: #0f2642 at zDepth -1
  - Layer 6: #112240 (navy-800) at zDepth -0.5
- Background layers are positioned fixed behind content
- Content wrapped in `.parallax-content` div that scrolls normally

**Impact:**
- Background creates depth with multiple color layers
- Content scrolls normally on top (no scaling or distortion)
- Layers "further away" scroll slower creating parallax illusion

#### 3. Updated ParallaxLayer Component
**File:** `src/components/ParallaxLayer.tsx`

**Changes:**
- Made `children` prop optional (background layers don't need children)
- Updated default perspective to 2px (matches CSS)
- Component now used only for background decoration

#### 4. Updated CSS Styles
**File:** `src/index.css`

**Changes:**
- `.parallax-container`: Changed perspective from 1px to 2px (subtler effect)
- `.parallax-layer`: Changed to `position: fixed` for background layers
  - Added `pointer-events: none` so they don't block clicks
  - Set to full viewport height
- `.parallax-content`: New class for content
  - `position: relative` with `translateZ(0)`
  - `pointer-events: auto` for normal interaction
  - `z-index: 1` to stay above background layers

**Impact:**
- Background layers stay fixed and scroll at different speeds
- Content scrolls normally on top
- No interference with user interactions

### How It Works Now

When you scroll:
1. **Background layers** (6 navy gradient layers) scroll at different speeds based on their z-depth
   - Darkest layer (furthest) scrolls slowest
   - Lightest layer (closest) scrolls faster
2. **Content** (all sections, text, cards) scrolls normally at regular speed
3. Creates subtle depth illusion as background layers "move through" each other
4. All content remains fully visible and readable at all times

### Colors Used

Navy color gradient (darkest to lightest):
- #050d1f - Darkest navy (furthest back)
- #07101e
- #0a192f - Navy-900 (your main color)
- #0d1e3a
- #0f2642
- #112240 - Navy-800 (closest)

### Technical Implementation

- **Pure CSS parallax** using `perspective` and `translateZ`
- **Hardware accelerated** (GPU transforms)
- **Accessibility**: Respects `prefers-reduced-motion`
- **Zero JavaScript** on scroll (better performance)
- **TypeScript**: Fully typed with no `any` types

---

## FINAL Implementation - Wave Parallax Like CodePen

### User Requirement - Match CodePen Behavior
After reviewing CodePen screenshots, the user requested:
- **Top of page**: All wavy layers stacked and visible
- **Scrolling down**: Layers get "pushed up" and disappear off top, leaving darkest layer
- **Bottom of page**: New lighter layers appear from below
- **Waves should be at the TOP of each layer** (not bottom)

### Complete Restructure

#### 1. Updated ParallaxLayer Component
**File:** `src/components/ParallaxLayer.tsx`

**Changes:**
- Added `marginTop` prop for positioning layers at different scroll points
- Changed wave position from bottom to TOP of layer
- Flipped wave SVG path (now curves downward from top)
- Changed default perspective to 1px for stronger effect
- Wave pattern: `d="M0,120 C150,20 350,120 600,70 C850,20 1050,120 1200,70 L1200,0 L0,0 Z"`

**Impact:**
- Layers now appear at different vertical positions as you scroll
- Waves create smooth transitions between layers

#### 2. Reconfigured Layer Structure
**File:** `src/components/ParallaxContainer.tsx`

**Changes:**
- Added base background layer (darkest navy #050d1f) with no wave
- Configured 6 layers with incrementing marginTop values (300px, 600px, 900px, etc.)
- Each layer has wave at top in the next layer's color
- Reordered layers from lightest (top) to darkest

**Layer Configuration:**
```
Base: #050d1f (darkest, no wave)
Layer 1: #07101e + wave #050d1f, marginTop: 1800px, zDepth: -0.25
Layer 2: #0a192f + wave #07101e, marginTop: 1500px, zDepth: -0.5
Layer 3: #0d1e3a + wave #0a192f, marginTop: 1200px, zDepth: -1
Layer 4: #0f2642 + wave #0d1e3a, marginTop: 900px, zDepth: -1.5
Layer 5: #112240 + wave #0f2642, marginTop: 600px, zDepth: -2
Layer 6: #1a2f4d + wave #112240, marginTop: 300px, zDepth: -2.5 (lightest)
```

**Impact:**
- At top of page: All layers visible with waves stacked
- As you scroll: Layers move up at different speeds (parallax)
- Layers with smaller zDepth (closer) move faster
- Layers with larger zDepth (further) move slower
- Creates depth illusion as you scroll through content

#### 3. Updated CSS Positioning
**File:** `src/index.css`

**Changes:**
- Changed `.parallax-layer` from `position: fixed` to `position: relative`
- Added `.parallax-base` for darkest background layer (absolute positioned)
- Removed fixed positioning constraints
- Wave height increased to 200px for more dramatic effect
- Added `.wave-top` class for top-positioned waves

**Impact:**
- Layers now scroll within the document flow
- Each layer appears at its marginTop position
- Waves smoothly transition between layers
- Content scrolls normally on top

### How It Works Now

**Scroll Behavior:**

1. **Top of Page (0px scroll)**
   - All 6 layers stacked and visible
   - Waves create layered mountain/ocean effect
   - Content starts on top layer

2. **Scrolling Down (middle)**
   - Layers move up at different speeds due to translateZ
   - Closer layers (smaller zDepth) disappear faster
   - Further layers (larger zDepth) stay visible longer
   - Eventually only darkest base layer visible

3. **Bottom of Page (end scroll)**
   - Lighter layers appear from bottom
   - Waves create reverse stacking effect
   - Similar to top but inverted

### Visual Effect

The parallax creates a "depth illusion" where:
- Navy layers appear at different depths in 3D space
- Waves flow smoothly between color transitions
- Content floats on top of animated background
- Very similar to CodePen but with smooth waves instead of zigzags

### Security & Performance

✅ **TypeScript**: Zero errors, fully typed
✅ **Security**: No XSS, no sensitive data, proper prop validation
✅ **Performance**: Pure CSS transforms (GPU accelerated)
✅ **Accessibility**: Respects `prefers-reduced-motion`

---

**Implementation complete! Wave parallax effect matching CodePen behavior is live at http://localhost:5174/**

---

## URGENT FIX - Correct zDepth Values to Match CodePen

### Issue Found
After analyzing CodePen SCSS, discovered major discrepancy:
- **CodePen zDepth values:** -2, -4, -6, -8, -10, -12 (much larger!)
- **Our zDepth values:** -0.25, -0.5, -1, -1.5, -2, -2.5 (too small!)
- **CodePen layers:** `position: fixed`
- **Our layers:** Changed to `position: relative` (WRONG!)

### Tasks
- [x] Update ParallaxContainer with correct zDepth values: -2, -4, -6, -8, -10, -12
- [x] Fix CSS: Change parallax-layer back to `position: fixed`
- [x] Fix double scrollbar (body overflow)
- [x] Remove marginTop values (causing layers to appear only at bottom)
- [x] Fix z-index values (layers: 100, content: 10)
- [x] Remove scale(3) from content (was making page 3x longer)
- [x] Test and verify parallax matches CodePen behavior

### Changes Made
1. **ParallaxContainer.tsx**:
   - Updated zDepth values from -0.25→-2.5 to -2→-12 (CodePen formula)
   - Removed marginTop values (300, 600, 900, etc.) that pushed layers to bottom
2. **ParallaxLayer.tsx**:
   - Removed marginTop prop entirely (no longer needed)
3. **index.css**:
   - Changed `.parallax-layer` to `position: fixed` with proper positioning
   - Added `min-height: 100vh` to `.parallax-group`
   - Fixed z-index: layers=100, content=10 (matching CodePen)
   - Changed body `overflow-x-hidden` to `overflow-hidden` (fixes double scrollbar)
   - Changed `.parallax-content` from `scale(3)` to `translateZ(0)` (fixes page length)

### Review
**Fixed Issues:**
- ✅ Double scrollbar eliminated (only parallax-container scrolls)
- ✅ Background layers now visible from top of page
- ✅ Page length normalized (no extra length from layers)
- ✅ Layers properly stacked and visible
- ✅ All TypeScript errors resolved

---

## Phase 5 Visual Polish - Make it "Shine" like Ubuntu

### Goal
Make the UI look so authentic that users might confuse it for actual Ubuntu/GNOME desktop.

### Changes Implemented

#### 1. Added Authentic Wallpaper Gradients
**Files Modified:**
- `src/theme/types.ts` - Added `WallpaperConfig` interface
- `src/theme/distros/ubuntu.ts` - Ubuntu Jammy-style gradient (orange/aubergine)
- `src/theme/distros/fedora.ts` - Fedora blue gradient
- `src/theme/distros/mint.ts` - Linux Mint green gradient
- `src/theme/distros/arch.ts` - Arch minimal blue/dark gradient
- `src/context/ThemeContext.tsx` - Apply wallpaper CSS variable
- `src/components/desktop/Desktop.tsx` - Show wallpaper as fixed background

**Impact:**
- Each distro now has its authentic wallpaper-style gradient background
- Wallpaper is fixed and covers the full viewport

#### 2. Improved Top Panel (GNOME Style)
**File:** `src/components/desktop/TopPanel.tsx`

**Changes:**
- Added `shadow-panel` class for subtle panel shadow
- Grouped system tray icons (network/volume/battery) with dropdown chevron
- Made clock/date clickable with hover state
- Proper height-matching for panel items
- Distro-specific styling (Arch has smaller font)
- Added distro name next to Activities (except Arch)

**Impact:**
- Panel looks more like authentic GNOME shell
- Interactive hover states on all clickable elements

#### 3. Added Window Shadows
**File:** `src/index.css`

**New Classes:**
- `.shadow-window` - Multi-layer shadow using CSS variable `--window-shadow-color`
- `.shadow-panel` - Subtle shadow for top panel

**Impact:**
- Windows now have proper depth with layered shadows
- Shadows adapt to each distro's theme color

#### 4. Enhanced Dock (Ubuntu Authentic)
**File:** `src/components/desktop/Dock.tsx`

**Changes:**
- Added "Show Applications" grid button for Ubuntu (at bottom of left dock)
- Added separator line between apps and Show Applications
- Improved active indicator styling (elongated pill for left dock)
- Better tooltip styling (dark, rounded)
- Reduced dock item size slightly for more compact look
- Applied blur backdrop filter to all docks (not just bottom)

**Impact:**
- Ubuntu dock now has the authentic "Show Applications" button
- Active indicators match GNOME style (side dot for left dock)
- More polished tooltip appearance

#### 5. Ubuntu Font Family
**Files:**
- `package.json` - `@fontsource/ubuntu` and `@fontsource/ubuntu-mono` already installed
- `src/fonts.css` - Font-face declarations for Ubuntu fonts
- `src/index.css` - Imports fonts.css
- `src/theme/distros/ubuntu.ts` - Uses 'Ubuntu' as primary font

**Impact:**
- Ubuntu theme uses the authentic Ubuntu font family
- Ubuntu Mono used for terminal/code sections

### Summary of Distro Differences

| Feature | Ubuntu | Fedora | Mint | Arch |
|---------|--------|--------|------|------|
| Wallpaper | Orange/Aubergine gradient | Blue/dark gradient | Green/dark gradient | Blue minimal |
| Dock | Left + Show Apps button | Bottom | Bottom | Bottom |
| Panel font | 13px | 13px | 13px | 12px |
| Active indicator | Vertical pill | Dot | Dot | Dot |
| Backdrop blur | Yes | Yes | Yes | Yes |

### Security Analysis
✅ No sensitive data exposed
✅ All TypeScript types properly defined
✅ No XSS vulnerabilities
✅ Theme data stored only in localStorage

### Build Status
✅ `yarn tsc --noEmit` passes with zero errors

---

## Mobile Layout Fix

### Problem
The desktop-style UI elements (panels, docks, system trays) take too much space on mobile screens, causing content to be cut off or cramped.

**Issues visible in screenshots:**
1. **Arch**: Top panel with workspaces/cpu/mem info wastes vertical space
2. **Ubuntu**: Left dock + top panel take too much space, content is cramped
3. **Fedora**: Top panel + bottom dock crowd the viewport
4. **Mint**: Bottom taskbar has too many elements (menu, app buttons, system tray, clock)

### Solution
Simplify the mobile layout by:
1. **Removing unnecessary elements on mobile** (system tray icons, workspaces, cpu/mem info)
2. **Simplifying the top panel** - just show time/date, hide Activities button and distro name
3. **Converting dock to simple bottom nav** - icons only, no labels, compact sizing
4. **Hiding theme switcher complexity** - keep it simple on mobile

### Implementation Plan

#### Phase 1: Add mobile breakpoint detection
- [ ] Create a `useIsMobile` hook (or use Tailwind's responsive classes)
- [ ] Determine breakpoint (768px or smaller = mobile)

#### Phase 2: Simplify TopPanel for mobile
- [ ] **Ubuntu/Fedora**: Hide "Activities" button, hide distro name, show only time
- [ ] **Arch**: Hide workspaces, hide cpu/mem info, show only time and distro switcher
- [ ] **Mint**: Already returns null (no top panel), no changes needed
- [ ] Reduce panel height on mobile

#### Phase 3: Simplify Dock for mobile
- [ ] **All themes**: Convert to simple bottom navigation on mobile
- [ ] Remove labels from Mint taskbar (icons only)
- [ ] Remove "Show Applications" button from Ubuntu/Fedora
- [ ] Make dock items smaller (40px instead of 46px)
- [ ] Remove system tray from Mint taskbar
- [ ] Keep it centered and compact

#### Phase 4: Adjust Desktop content padding
- [ ] Reduce top/bottom padding on mobile
- [ ] Ensure content area uses full viewport width

#### Phase 5: Testing
- [ ] Test all 4 themes on mobile viewport
- [ ] Verify navigation still works
- [ ] Check content is not cut off

### Technical Approach
Use Tailwind responsive classes where possible (`hidden md:flex`, `md:hidden`), and `window.matchMedia` or a hook for JS-conditional rendering.

### Files to Modify
- `src/components/desktop/TopPanel.tsx`
- `src/components/desktop/Dock.tsx`
- `src/components/desktop/Desktop.tsx`
- Possibly `src/index.css` for mobile-specific styles

---

## Implementation Review

### Files Created
| File | Purpose |
|------|---------|
| `src/hooks/useIsMobile.ts` | Custom hook for detecting mobile viewport (<768px) |

### Files Modified
| File | Changes |
|------|---------|
| `src/components/desktop/TopPanel.tsx` | Added mobile detection, hide Activities/distro name/system tray on mobile |
| `src/components/desktop/Dock.tsx` | Added unified mobile bottom nav for all themes |
| `src/components/desktop/Desktop.tsx` | Added mobile-specific content padding |

### Changes Summary

#### 1. Created `useIsMobile` Hook
- Uses `window.matchMedia` for efficient breakpoint detection
- Listens for viewport changes with `addEventListener('change')`
- Returns `true` when viewport is < 768px

#### 2. TopPanel Mobile Changes
**Ubuntu/Fedora (GNOME style):**
- Hidden: Activities button, distro name, system tray icons, power button
- Visible: Date/time (centered), distro switcher

**Arch (polybar style):**
- Hidden: Workspace indicators, cpu/mem info
- Visible: "arch" label, date/time, distro switcher

**Mint:**
- No changes (already returns null for top panel)

#### 3. Dock Mobile Changes
All themes now share a unified mobile bottom navigation:
- Height: 56px with blur backdrop
- Contains: Menu icon, nav icons (Home/About/Resume/Contact), distro switcher
- Nav items: 44px touch-friendly buttons with active state highlighting
- Separators between sections

#### 4. Desktop Padding Mobile Changes
- Simplified padding: top panel height (if applicable) + 64px bottom for nav
- No left padding (no left dock on mobile)

### Security Analysis
- No sensitive data exposed
- All TypeScript types properly defined
- No XSS vulnerabilities
- Hook uses standard browser APIs

### Build Status
- TypeScript: Zero errors
- Dev server: Running on http://localhost:5173/
