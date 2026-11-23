# Arusha Painters and Builders — Design System

Light contractor marketing theme. Dark surface on light canvas; accent lime for CTAs and links.

## Colors

| Token | Hex | Role |
| --- | --- | --- |
| canvas | `#f7f9f2` | Page background |
| surface | `#101604` | Dark bands, primary buttons, nav contrast |
| accent | `#b7fe02` | Primary CTA text on surface, footer links |
| text | `#595959` | Body copy |
| inverse | `#ffffff` | Text on dark / secondary buttons |
| green-light | `#d8ff85` | Soft accent washes |
| gray-light | `#e6ecd6` | Borders, subtle bands |

## Typography

- **Display / headings:** Geist
- **Body / UI:** Geist Mono
- Sentence-case CTAs; brand name is hero-level

## Layout & controls

- Max container: `1140px`
- Spacing base: `4px`
- Buttons: pill (`border-radius: 9999px` / ~48px)
- Elevation: flat (no shadows)

## Motion

- Duration: ~200–300ms ease
- Scroll reveal via IntersectionObserver
- Respect `prefers-reduced-motion`

## Signature patterns

- Primary button: `#101604` background, `#b7fe02` text
- Secondary button: white background, `#101604` text
- Sticky/absolute nav on canvas
- Footer accent links on dark surface
