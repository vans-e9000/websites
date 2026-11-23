# Anelisa Investment Ltd — design system

## Concept card

Idea: a building contractor's site, set out like a drawing. Every section starts from a level line, a labelled stage, and a clear next action.

Metaphor: setting out. Before anything is built, the levels and corners are marked. The site borrows that discipline: a faint set-out grid, small crosshair marks, a level rail that names the stages (set out, build, hand over).

Signature: the rectangular hero photograph, cropped tall at 4:5 with a 16px radius, with a survey inset and one registration card pinned over it. It is the frame someone screenshots.

Emotion: competent, local, reachable.

Motion verb: settle like paper. Reveals slide up 24px, lose a 6px blur, and stop. Buttons press in at 0.95. Nothing bounces.

Screenshot: hero with "Building and civil works, planned from the site up.", the capsule portrait, and the CRB registration card.

## Direction source

RoofPro (Webflow) style reference, 2026-10-26: light canvas, Manrope for everything, pill geometry, one blue accent, flat cards separated by whitespace, slow `ease` transitions.

## Palette (measured tokens only)

| Role | Value |
|---|---|
| Canvas | `#f5f6f7` |
| Text, all body and headings | `#000000` |
| Accent | `#165cfd` |
| Surface | `#ffffff` |
| Contrast surface | `#000000` |
| Footer | `#0c0e17` |
| Hairline | `#ced0d2` |
| Inverse text | `#ffffff` |

No other hues. Photography supplies the warmth.

## Type

Manrope 400/500/600/700, Google Fonts. One family; hierarchy comes from size and weight.

| Role | Size | Leading | Weight | Tracking |
|---|---|---|---|---|
| Display h1 | clamp 44 to 68px | 1.02 | 500 | -0.045em |
| Section h2 | clamp 30 to 44px | 1.12 | 500 | -0.035em |
| Card h3 | 22px | 1.3 | 600 | -0.02em |
| Lead | 18px | 1.6 | 400 | -0.01em |
| Body | 16px | 1.65 | 400 | -0.005em |
| Label | 12px | 1.5 | 600 | 0.1em, uppercase |
| Button | 15px | 1 | 600 | -0.01em |

## Shape and spacing

- Buttons, tags, eyebrows: pill (`9999px`).
- Cards, panels, hero image: `16px`.
- Inputs: `8px`.
- Large CTA panel: `24px`.
- Container `1140px`, padding `32px` desktop / `24px` mobile.
- Section rhythm `96px`, mobile `64px`. Spacing on an 8px base.
- One shadow tier: `0 2px 20px rgba(0,0,0,.06)` only on card hover and the scroll header.

## Surfaces

1. Canvas `#f5f6f7` with a faint 80px set-out grid in hero and page heroes.
2. White cards on canvas.
3. One black feature card per composition.
4. Full-bleed accent band `#165cfd` with translucent stat pills.
5. Deep footer `#0c0e17`.

## Motion

- Reveal: opacity 0 to 1, translateY 24px to 0, blur 6px to 0, 600ms `ease`, once, threshold 0.15.
- Hover: 400ms `ease` colour and background, press `scale(.95)`.
- Header: 300ms background and shadow after 24px of scroll.
- Reduced motion: no transform, no blur, no smooth scroll, all content visible.

## Page rules

- Home: hero, credentials, services, method split, blue registration band, process, FAQ, CTA.
- Inner pages: page hero with breadcrumb, one signature visual, content, CTA.
- Every page carries at least four unique photographs. No photograph is reused on another page.
- Photography is illustrative stock. No image is presented as a completed Anelisa project or as a portrait of the managing director.
