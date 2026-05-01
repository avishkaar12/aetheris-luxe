---
name: Aetheris Luxe
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#d3c5ad'
  on-secondary: '#382f1e'
  secondary-container: '#524835'
  on-secondary-container: '#c5b79f'
  tertiary: '#b9cefc'
  on-tertiary: '#1a3055'
  tertiary-container: '#9eb3df'
  on-tertiary-container: '#30456b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#f0e0c8'
  secondary-fixed-dim: '#d3c5ad'
  on-secondary-fixed: '#221b0b'
  on-secondary-fixed-variant: '#4f4533'
  tertiary-fixed: '#d7e2ff'
  tertiary-fixed-dim: '#b2c7f4'
  on-tertiary-fixed: '#011b3f'
  on-tertiary-fixed-variant: '#32476d'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Noto Serif
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
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
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 80px
  section-gap: 120px
---

## Brand & Style

The design system is engineered to evoke an atmosphere of exclusive mystery and sensory indulgence. It caters to a discerning audience that values artisanal craftsmanship and the intersection of olfactory art and visual elegance. The brand personality is poised, sophisticated, and ethereal.

The visual style is a refined execution of **Glassmorphism**. It utilizes multi-layered translucency to mimic the crystalline nature of perfume flacons. By blending deep, moody backgrounds with luminous, frosted glass overlays, the interface achieves a sense of depth and weightlessness. The emotional response should be one of "quiet luxury"—an immersive digital experience that feels as expensive and curated as a high-end boutique.

## Colors

The palette is anchored in a dark, atmospheric foundation to allow the glass elements and gold accents to radiate. 

- **Primary (Gold):** Used exclusively for high-priority interactions and brand-defining moments. It represents the "juice" of the fragrance.
- **Secondary (Champagne):** A softer, luminous alternative to gold, used for hover states and subtle highlights.
- **Background (Midnight Blue):** A deep, saturated blue that provides more soul and depth than pure black, serving as the canvas for the glass effects.
- **Surface (Frosted):** White at 10-15% opacity with high saturation blurs, creating the signature glass effect.

## Typography

The typography strategy balances classical heritage with modern precision. 

- **Headlines:** Using `notoSerif` provides a literary, high-fashion editorial feel. Tracking should be tightened for large display sizes and slightly loosened for smaller sub-headers to maintain an air of exclusivity.
- **Body & Utility:** `manrope` offers a clean, technical contrast to the serif headings. Its geometric but refined proportions ensure legibility against complex glass backgrounds.
- **Labels:** Small-caps are used for metadata, like fragrance notes or price points, to mimic the labeling found on apothecary bottles.

## Layout & Spacing

The design system employs a **Fixed Grid** model within a maximum container width of 1440px to ensure the artistic photography remains perfectly framed. 

- **Composition:** Use generous whitespace (negative space) to allow the "scent profiles" to breathe. 
- **Rhythm:** An 8px linear scale governs all padding and margins. 
- **Grid:** A 12-column grid is standard. Large-scale imagery of perfume bottles should often break the grid or span 6-8 columns to serve as a focal point, with glass-morphic cards overlapping the imagery to create a 3D layered effect.

## Elevation & Depth

Depth is not communicated through traditional shadows, but through **Backdrop Blurs** and **Optical Layering**.

1.  **The Base:** The Deep Midnight Blue background remains static.
2.  **The Mid-ground:** Content surfaces use a `background-filter: blur(20px)` with a subtle white-to-transparent linear gradient (10% opacity).
3.  **The Edge:** Every glass surface must have a "Silk Border"—a 1px solid stroke in white at 20% opacity to define the shape against the background.
4.  **The Glow:** High-priority elements (like the current selected fragrance) feature a soft radial gold glow (`#D4AF37` at 5% opacity) emanating from behind the glass card.

## Shapes

The shape language is "Soft-Modern." While the perfume industry often uses sharp glass edges, the digital interface uses a subtle `0.25rem` to `0.75rem` radius to feel approachable and premium.

- **Standard Elements:** Use `rounded` (0.25rem) for input fields and small buttons.
- **Feature Cards:** Use `rounded-lg` (0.5rem) for glass panels containing product photography.
- **Iconography:** Use fine-line icons (1px stroke weight) with sharp terminals to complement the serif typography.

## Components

- **Glass Buttons:** Primary buttons are filled with a Gold-to-Champagne gradient, while secondary buttons are transparent glass panels with a 1px white border and a shimmer hover effect.
- **Product Cards:** These feature the signature frosted glass effect. The background image of the bottle should slightly "bleed" through the glass texture of the price and CTA area.
- **Input Fields:** Minimalist lines. Only a bottom border is visible until focused, at which point a subtle glass background fades in.
- **Fragrance Note Chips:** Small, semi-transparent circular chips with a `label-caps` font style, helping users quickly identify scent ingredients (e.g., Oud, Bergamot, Sandalwood).
- **Navigation Bar:** A floating glass dock at the top of the viewport with a high blur radius (`40px`) to ensure text remains legible as the user scrolls over vibrant photography.
- **Immersive Carousels:** Full-bleed image sliders with transitions that mimic the slow evaporation of mist.