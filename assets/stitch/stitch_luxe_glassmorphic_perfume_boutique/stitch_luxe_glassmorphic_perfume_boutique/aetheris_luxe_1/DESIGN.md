---
name: Aetheris Luxe
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#dbc1be'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#a38b89'
  outline-variant: '#554240'
  surface-tint: '#ffb3ac'
  primary: '#ffb3ac'
  on-primary: '#5d1714'
  primary-container: '#4d0a0a'
  on-primary-container: '#d26f67'
  inverse-primary: '#9a443e'
  secondary: '#eec068'
  on-secondary: '#412d00'
  secondary-container: '#755400'
  on-secondary-container: '#f9ca71'
  tertiary: '#c8c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#252525'
  on-tertiary-container: '#8d8c8b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb3ac'
  on-primary-fixed: '#400204'
  on-primary-fixed-variant: '#7b2d28'
  secondary-fixed: '#ffdea6'
  secondary-fixed-dim: '#eec068'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5d4200'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-xl:
    fontFamily: Noto Serif
    fontSize: 72px
    fontWeight: '300'
    lineHeight: 84px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  title-lg:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Noto Serif
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Noto Serif
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Noto Serif
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.15em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-page: 80px
  section-gap: 160px
  glass-padding: 40px
---

## Brand & Style

The design system is centered on the concept of "Atmospheric Opulence." It targets a discerning, high-net-worth clientele seeking an olfactory journey that is both exclusive and ethereal. The emotional response is one of reverence and sensory anticipation, achieved through a dark, nocturnal aesthetic that mimics the interior of a private boutique at midnight.

The design style utilizes **Deep Glassmorphism** layered over a minimalist framework. High-end prestige is communicated through the contrast between the void-like depth of Obsidian backgrounds and the tactile, shimmering quality of Champagne Gold accents. This design system prioritizes visual breathing room and high-fidelity textures to mirror the artisanal quality of the fragrances themselves.

## Colors

The palette is anchored in **Obsidian (#121212)** to provide a canvas of infinite depth. **Royal Maroon (#4D0A0A)** is used sparingly for deep-layered glass surfaces and primary calls to action, evoking the richness of aged velvet and rare ingredients. 

**Champagne Gold (#D4A853)** serves as the "light" within the design system, used for typography highlights, delicate borders, and iconography to represent the precious metal hardware of perfume bottles. White is reserved strictly for high-readability body text and active states, appearing as soft ivory against the darker tones.

## Typography

The typography in this design system is exclusively set in **Noto Serif** to maintain a timeless, editorial feel. The hierarchy relies on extreme scale and generous leading.

- **Display & Headlines:** Use lighter weights (300-400) with slight negative letter-spacing to create a tight, sophisticated lockup.
- **Labels:** Small-caps are utilized for navigation and metadata, featuring wide tracking (0.15em) to evoke the labeling found on vintage apothecary jars.
- **Body:** Set with generous line-height to ensure the serif terminals have room to breathe against the glass backgrounds.

## Layout & Spacing

This design system employs a **Fixed Grid** model centered within the viewport. To maintain a "world-class" feel, the spacing rhythm is intentionally expanded, favoring empty space over density.

A 12-column grid is used with wide 32px gutters. Section vertical spacing is aggressive (160px), ensuring that each product story or brand narrative is isolated and given full attention. Internal padding within glass containers is kept high (40px) to prevent content from feeling crowded by the frosted edges.

## Elevation & Depth

Depth is the primary storyteller in this design system. It is achieved through **Deep Glassmorphism** and a three-tier elevation stack:

1.  **The Void (Base):** The Obsidian background, static and unchanging.
2.  **The Mist (Mid-layer):** Large, organic gradients of Royal Maroon and subtle Gold blurs ($200px radius$) that move slowly behind the glass, simulating light passing through liquid.
3.  **The Glass (Top-layer):** Surfaces feature a heavy backdrop-blur ($40px$), a subtle 1px stroke in Champagne Gold (20% opacity), and a soft inner-glow to define the edges.

Shadows are not used in the traditional sense; instead, depth is communicated through the intensity of the blur and the brightness of the border stroke.

## Shapes

The shape language is "Soft." In this design system, ultra-sharp corners are avoided as they feel too industrial, while overly rounded corners feel too informal. 

A **0.25rem (4px)** base radius is applied to small elements like buttons, while larger glass cards utilize a **0.75rem (12px)** radius. This subtle curvature mimics the hand-polished edges of a heavy crystal perfume decanter.

## Components

### Buttons
Primary buttons are high-gloss Royal Maroon with a subtle Gold 1px border. The text is always Champagne Gold, set in the `label-caps` style. Secondary buttons are "Ghost" style, featuring only the 1px Gold border and a blur effect that intensifies on hover.

### Cards (Product Showcase)
Product cards use the "Deep Glass" treatment. The perfume bottle image should appear to float within the glass, with a soft shadow cast *internally* on the blurred background. Product names are centered below the card in `title-lg`.

### Input Fields
Inputs are minimalist, consisting of a single 1px Gold bottom-border. Labels use the `label-caps` style and float above the line. On focus, the bottom border glows slightly, increasing in opacity from 30% to 100%.

### Chips & Tags
Used for scent notes (e.g., "Oud," "Bergamot"). These are small, semi-transparent Obsidian pills with a delicate Maroon border and Ivory text.

### Navigation
The header is a fixed glass bar at the top of the viewport. It features a heavy backdrop blur and a 1px Gold bottom stroke. Navigation links utilize the `label-caps` typography with a 2px Gold underline that expands from the center on hover.