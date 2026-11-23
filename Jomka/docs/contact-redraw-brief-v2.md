# Contact page — image redesign brief (v2)

## Goal
Redesign only the contact page. Replace every slot that currently shows a generic
or unrelated image with the eight Pexels construction photos below, arranged so
the page reads as “the people and stages behind the work you will get from us”,
not a random stock grid. The hero and every other page must keep their current
images untouched.

## Images to use
We are using these eight files, already downloaded to `assets/img/`:

- `pexels-32751450.webp` — lone single-storey block in a bare field, distant
  trees, almost no sky noise. Use as the quiet brand anchor near the very top
  of the page (the strip after the hero), because it matches how this page
  sells “we start from nothing and finish the job”.
- `pexels-13319078.webp` — excavator operating in a raw trench, deep cut, very
  little sky. Use immediately under the brand anchor strip, because it sells
  the “ground works from the bottom up” message that appears in that section’s
  copy.
- `pexels-8586035.webp` — slab being laid with hand tools, puddle of wet slab
  around the workers’ feet. Use in the “over to you” capability band, because
  that band is literally about the ops/site contact getting involved in the
  work.
- `pexels-39356833.webp` — bundled rebar at dusk, very dark sky, almost no
  sky clutter. Use in the “What we actually build” second gallery, step 2 of
  the sequence, because that step talks about preparing the block work.
- `pexels-39576121.webp` — building shell going up, slung per square metre
  pricing context tied to that kind of stage. Use in the same gallery as step 3
  of the build sequence.
- `pexels-35641136.webp` — rebar frame being tied at height, banded rebar in
  the frame, breeze block upper tier visible before the concrete. Use in the
  same gallery as step 4 of the build sequence, because it literally shows the
  “slung per metre” stage we describe.
- `pexels-4956914.webp` — interior finish-out fit-out worker, sensitive
  finish stage. Use in the same gallery as the last step of the build
  sequence, because that final step is the finish-out hand-over.
- `pexels-38706741.webp` — worker on full scaffolding, high-level work. Use as
  the brand-confirmation strip image on the right of the small “you’ll deal with
  the same people” paragraph below the second gallery, because the product being
  sold there is “not subcontracted away under you”.

## Fixed page structure (do not change)
Keep the contact page in this order, with these exact bands. Only the images and
the few body-copy sentences that directly describe them change; the navigation,
hero, contact panel, email addresses, phone numbers, managing directors, footer,
and css files stay exactly as they are now.

1. Header / nav (unchanged).
2. Hero band (unchanged, including its image).
3. Brand anchor strip
   - Left: the existing paragraph that starts “Our contact details sit behind
     this work…” and ends “...get the right answer the first time.”
   - Right: one image, 6:1 landscape, high quality, the brand-anchor image
     (`pexels-32751450.webp`). Do not stack it; it must sit on the right of
     that paragraph on wide screens.
4. “Over to you” band
   - One paragraph speaking to the ops/site contact, ending with the operational
     details they care about.
   - One 16:9-ish <img>, screen-width on desktop, the “get into the work”
     image (`pexels-13319078.webp`).
5. “What we actually build” second gallery
   - Same band as today: eyebrow, heading, one short sentence, then a 4-image
     gallery with `alt` text and brief captions.
   - Each image must be a concrete step in a build sequence, not a random
     gallery. Use these eight captions and pairings:
     - Step 1 — “Starting from the ground” — `pexels-8586035.webp`
     - Step 2 — “Laying the blockwork” — `pexels-39356833.webp`
     - Step 3 — “Building the shell” — `pexels-39576121.webp`
     - Step 4 — “Frame and fixings” — `pexels-35641136.webp`
     - Step 5 — “Finishing the shell” — `pexels-4956914.webp`
     - Step 6 — “Hand-over ready” — `pexels-38706741.webp`
   - Wait — the brief says eight images and six steps. The eight-image set must
     be used, but this gallery is only six images. The remaining two images
     (`pexels-32751450.webp` and `pexels-13319078.webp`) are already placed in
     bands 3 and 4 above. So this gallery uses these six:
     - Step 1: `pexels-8586035.webp`
     - Step 2: `pexels-39356833.webp`
     - Step 3: `pexels-39576121.webp`
     - Step 4: `pexels-35641136.webp`
     - Step 5: `pexels-4956914.webp`
     - Step 6: `pexels-38706741.webp`
   - Keep the gallery layout identical to today’s markup: same class names,
     same reveal classes, same caption structure. Only the `<img src>` and the
     `alt` and caption text change.
   - Under the gallery, keep the existing small paragraph about “you’ll deal with
     the same people”, with the brand-confirmation image on the right:
     `pexels-38706741.webp`. Note: this is the same file as step 6 above, and
     that is intentional — the brand-confirmation strip should reuse the
     “hand-over ready / worker on scaffolding” image because that is the face of
     the people the paragraph names.
6. Contact panel, email addresses, phone numbers, managing directors (unchanged).
7. Footer (unchanged).

## Image rules
- Never touch the hero image or any image on services.html, index.html, or
  about.html.
- Keep aspect ratios honest. Do not stretch or letterbox an image to fill a slot
  it does not fit; use object-fit cover and sensible cropping points in css if a
  slot needs a different ratio than the source photo. The brand-anchor strip
  expects roughly 6:1; the “over to you” image expects roughly 16:9; the
  gallery images should be displayed at a consistent landscape ratio that fits
  the existing gallery grid. If a source file does not naturally match, pick
  object-position so the relevant subject stays visible rather than defaulting to
  centre.
- Every image must have a real `alt` that describes what a sighted reader would
  see in that specific photo, not a generic “construction image” string. Keep
  `alt` short but concrete.
- Descriptive `loading="lazy"` and `decoding="async"` stay on gallery images.
  The two brand-anchor / over-to-you images near the top may be `loading="eager"`
  if that better serves the fold, but the existing contact page does not demand
  it. Keep the current loading strategy unless it clearly hurts what the user
  sees first.

## Copy rules
- The only body copy that changes is the sentences that directly describe the
  new images — gallery captions, the small “you’ll deal with the same people”
  paragraph if it must name the new imagery, and the very small pointer text that
  introduces each band if it currently references an old image. Everything else
  stays word-for-word.
- Do not invent testimonials, prices, or claims that are not already on the page.
  If a caption needs a number, use only numbers that already appear elsewhere on
  the page or that you can state without inventing.

## Verification
- After the edit, screenshot the full contact page at a desktop viewport and
  visually confirm all eight images are present in the right bands, in the right
  order, with no missing slots, no broken image icons, and no image used twice in
  the same band in a way that looks like a mistake.
- Confirm the hero still shows its original image.
- Confirm services.html, index.html, and about.html still open and still show
  their own images unchanged.

## Out of scope
- Any changes to CSS files beyond tiny object-position / object-fit values needed
  to make the new photos sit correctly in existing slots.
- Any new page, new band, or new section beyond the two small brand-anchor and
  “over to you” image placements and the rewritten second gallery.
- Any change to the contact panel fields, emails, phone numbers, or managing
  directors.
