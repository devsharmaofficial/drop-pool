---
version: alpha
name: DropPool — Warm Market
description: A distinctive, editorial food marketplace design system for a demand-first surplus food product.
colors:
  ink: "#19261F"
  forest: "#173E31"
  paper: "#F7F4EC"
  surface: "#FFFDF8"
  tomato: "#F05A3E"
  citrus: "#D8F36A"
  muted: "#737B70"
  border: "#E5E0D5"
  on-dark: "#F8F5EE"
  success: "#2D7651"
  warning: "#9B5B22"
  danger: "#B9382C"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: 4.5rem
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.045em"
  heading:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: 2rem
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  body:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: 0.75rem
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  xs: 6px
  sm: 10px
  md: 16px
  lg: 24px
  xl: 32px
  pill: 999px
spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 20px
  6: 24px
  8: 32px
  10: 40px
  12: 48px
  16: 64px
  20: 80px
components:
  button-primary:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.pill}"
    height: 48px
  button-accent:
    backgroundColor: "{colors.citrus}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: 48px
  card-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 24px
---

# DropPool Design Direction

## Overview

DropPool should feel like **an independent food magazine met a modern neighbourhood market**, not a generic food-delivery template and not a climate-tech dashboard. Its personality is warm, bold, tactile, optimistic and practical. The product needs enough personality to earn attention during an ideathon pitch, but the ordering flow must remain calm and easy to understand.

The signature contrast is **warm paper + deep forest ink + tomato red + one sharp citrus accent**. Use the colours with discipline. Food photography carries appetite; large typography carries story; citrus is reserved for moments that deserve attention. Do not put every card in a different colour.

## Colors

- **Paper `#F7F4EC`:** Main page canvas. Slightly warm, never yellowed or dirty.
- **Surface `#FFFDF8`:** Cards and forms that need to sit clearly above the canvas.
- **Ink `#19261F`:** Main copy, icons and high-contrast details.
- **Forest `#173E31`:** Primary dark surface, key CTA and impact/merchant sections.
- **Tomato `#F05A3E`:** Price/discount emphasis and small alert accents.
- **Citrus `#D8F36A`:** A rare, high-energy accent for one hero sticker, active selection, or key data point.
- **Muted `#737B70`:** Secondary copy, metadata and helper text.
- **Border `#E5E0D5`:** Quiet dividers and form borders.

Use green for brand identity, not as the only signal of sustainability. Do not use green for every success state or make environmental claims look like verified certification.

### Theme rules

The default customer-facing theme is light. Use forest backgrounds for one or two high-impact sections, including the sustainability/impact panel or merchant console. Do not build a full dark mode for the MVP unless the existing project already has one. If dark surfaces are used, maintain strong contrast and never place long blocks of tiny white text on textured backgrounds.

## Typography

Use **Fraunces** for selected large display moments and **DM Sans** for the interface. Load fonts through a reliable local or framework-managed font setup; fall back to Georgia and Arial/sans-serif if font loading fails.

- Hero display: clamp from roughly 3.25rem on mobile to 6.5rem on wide screens; 3–5 lines maximum only when the layout intentionally calls for it. Tight tracking, short line length.
- Section title: 2–3rem desktop, 1.75–2.25rem mobile.
- Body: 16–18px with 1.45–1.6 line-height.
- Labels and metadata: 12–13px, clear contrast and not used for essential instructions alone.
- Prices: use tabular numerals where available; the discounted price is dominant and the original price is visibly secondary/struck through.

Do not uppercase long headlines. Do not use more than two font families. No fake hand-written font for sustainability messaging.

## Layout

### Grid and spacing

- Desktop max content width: 1240px, centred with responsive side gutters.
- Desktop grid: 12 columns, 24px gaps.
- Mobile side gutters: 20px; tablet: 28–32px; wide desktop: 48px.
- Base spacing: 4px scale. Use 8/16/24/32/48/64/80px as common rhythm.
- Landing page sections: generous vertical space, strong changes in composition, not a series of identical three-column card rows.
- App screens: more compact, but still leave 16–24px between logical groups.

### Homepage composition

1. **Top navigation:** Wordmark left, 2–3 anchor links middle/right, one primary CTA. Keep the nav shallow and lightweight. Mobile becomes a simple logo + menu/CTA pattern.
2. **Hero:** Editorial two-column layout. Left: oversized headline “Good food deserves a second chance.” short explanation and a primary CTA labelled “Build my food pool”. Right: a deliberately art-directed composition of two or three food photos/cards, a small circular or ticket-like discount label, and one demand signal card. The collage should feel layered but not overlap text or controls.
3. **Tiny social proof / concept strip:** Explain the three steps with a single connected line or large numbers: Tell us what you want → Restaurants respond → Pick up for less.
4. **How matching works:** A product-like demo graphic, not a generic icon grid. Show a request flowing into a local demand pool and a restaurant offer appearing as a match.
5. **Featured deals:** Three realistic deal cards with appetising photos, price comparison, pickup time and remaining quantity.
6. **Impact section:** Forest background with one headline, three clearly labelled *demo* metrics and a simple, quiet visual.
7. **Merchant CTA:** Editorial split panel inviting restaurants to offer surplus batches.
8. **Footer:** Compact links, product name and a plain-language note that the prototype uses demo data.

The homepage must communicate the *demand-first* difference in the first viewport or directly below it. Beautiful visuals without a clear product explanation are a failure.

### Food photography and assets

- Use real, high-resolution food photographs with consistent lighting, ideally warm natural light and a close/medium crop.
- Prefer 4:3 or 5:4 photos in deal cards. Keep the hero composition varied in shape and scale.
- Use local, curated images in `public/images/` for stable demos. Use a small asset set with good crops rather than many random images.
- Images must be legally reusable and should not imply a specific restaurant is a real partner. Demo merchants should be clearly fictional unless permission exists.
- Never use food emojis as the primary image. Do not use arbitrary blob illustrations, generic “green planet” stock images or random Unsplash images that change between refreshes.
- Add useful alt text when an image communicates food/item content; decorative collage layers use empty alt text.

## Elevation & Depth

Use depth with restraint. Cards should primarily separate through surface contrast and a 1px border. Use soft ambient shadows only for floating elements, popovers and the hero collage. One intentional, oversized, art-directed visual will have more impact than universal glassmorphism.

- Standard card: no hard black shadow; light border; small ambient shadow only if needed.
- Floating match/result panel: slightly raised with a broad, low-opacity shadow.
- Hero photos: slight rotation or offset only on large screens, reset to a clean stacked layout on mobile.
- Avoid heavy blur layers behind all content, neon glows, perpetual shimmer and excessive gradients.

## Shapes

Use a mix of rounded rectangles and pill shapes. Buttons are pill-shaped; content cards are 16–24px radius; image masks may use a 24–32px radius. Use one occasional circle/sticker as a brand accent. Do not round every tiny icon container into a separate pill.

## Components

### Buttons

- Primary: forest fill, light text, 48–52px height, pill radius.
- Accent: citrus fill, ink text. Use for one standout hero/action moment, not every CTA.
- Secondary: transparent or surface fill, 1px border, ink text.
- Icon-only controls need an accessible name and a comfortable 44px touch target.
- Hover: slight lift (1–2px) or subtle background shift. Press: scale to approximately 0.98. No elastic overshoot that makes a serious booking action feel toy-like.
- Loading state retains button width and shows both progress and text where possible.

### Deal card

Must show: image, merchant, short meal name, discounted price, original price, discount percentage, pickup deadline, distance or area, remaining quantity, and relevant allergen/food notes when known. Card hierarchy: photo → name → discounted price → pickup and quantity → CTA. Do not hide the pickup deadline behind a hover state.

### Demand form

Use progressive disclosure. Ask only what matching needs: food preference, budget, pickup window and approximate area/radius. Chips should have clear selected, hover and keyboard-focus states. Use labels above inputs rather than placeholder-only labels. Keep a visible summary before submitting.

### Matching explanation

Each result should include one to three short, factual fit reasons: “Within ₹150”, “1.2 km away”, “Pickup fits 8–9 PM”. Avoid opaque “98% AI match” scores. If a numerical score is shown, explain it or remove it.

### Status and impact

Demo stats include a `Demo data` label. Use compact, readable figures. Status must be expressed in text as well as colour. Avoid fabricated ratings, fake “verified” badges and fake real-time counters.

### Forms, validation and feedback

- Place errors next to the field and summarise them when submission fails.
- Preserve form data after an error.
- Use an in-context success panel or toast for lightweight feedback; critical reservation state should remain visible on the page.
- Empty states explain what the user can do next.
- Confirm before destructive merchant actions such as removing a published offer.

## Motion & interaction

Motion is a supporting character, not the whole product. Every meaningful animation should help a person understand hierarchy, direction, state or cause/effect.

### Motion signature

- Hero entry: headline lines rise/fade in with a short stagger; collage images settle into place; the discount sticker enters once. Total sequence around 600–900ms and never blocks clicking.
- Scroll reveals: subtle opacity + 12–20px movement, once per section. Avoid animation that makes users wait for content.
- Deal cards: 1–2px lift and slight image scale on hover; no violent tilt.
- Demand flow: animate a request pill moving into a “pool” group, then show matched offer cards with a shared layout transition.
- Confirmation: a quick checkmark draw or gentle scale/fade, not confetti everywhere.
- Matching result: clearly animate only when the user triggers matching; do not fake live data.
- Background: prefer a static paper texture or very subtle radial colour wash. If a gradient/aurora component is used, keep it low-contrast and behind the hero collage. Do not use WebGL unless there is a strong reason and it performs well on mobile.

### Timing defaults

- Hover/focus: 120–180ms.
- Small state change: 160–240ms.
- Modal/sheet: 220–320ms.
- Section reveal: 400–650ms.
- Spring motion: restrained damping; no bounce on form errors or purchase confirmation.

Respect `prefers-reduced-motion`. In reduced motion, remove parallax, large transforms and animated backgrounds; keep only necessary state-change feedback. Never encode information exclusively in animation.

## Responsive behaviour

- Mobile first: design at 390px and 360px widths before adding desktop polish.
- On mobile the hero is single-column. Food collage becomes a compact horizontal/stacked composition and never causes horizontal page overflow.
- Deal cards become one column or horizontal carousel with visible partial next-card only when scroll affordance is clear.
- Demand forms are full width with large tap targets. Avoid hover-only affordances.
- Merchant table becomes stacked offer cards below tablet width.
- Desktop should use negative space and asymmetrical compositions rather than simply expanding mobile cards.
- Test at 360, 390, 768, 1024 and 1440px.

## Accessibility

- Meet WCAG AA contrast for body text and controls.
- All actions work via keyboard; visible focus rings are required.
- Honour reduced-motion preferences.
- Use semantic headings in order, landmarks and explicit form labels.
- Give meaningful food images alternative text; keep decorative images hidden from assistive technologies.
- Do not rely on colour alone for discount, inventory or reservation state.
- Minimum practical touch target: 44×44px.

## Design references and how to use them

Use these as **pattern libraries and craft references**, not as instructions to copy a specific website. Inspect individual interactions at live size and translate them into DropPool’s visual language.

- [21st.dev](https://21st.dev/) — browse hero sections, backgrounds and component examples. Choose one hero/background idea only; adapt its palette, spacing and copy to this system.
- [Motion for React](https://motion.dev/docs/react) — implementation patterns for enter/exit, layout and gesture transitions.
- [Componentry](https://componentry.dev/) — polished React effects and animation primitives. Useful for a small, purposeful hero or image treatment; verify package/licence and mobile performance before use.
- [Bencho](https://bencho.dev/) — interactive micro-interaction references. Borrow interaction principles, not unrelated widgets.
- [Mobbin food-delivery patterns](https://mobbin.com/explore/mobile/app-categories/food-delivery-app) — learn familiar flows, deal/food browsing, nav, ordering and confirmation patterns.
- [Dribbble food-delivery app explorations](https://dribbble.com/tags/food-delivery-app) — use for visual exploration only; validate UX against real product flows rather than concept shots.
- [Awwwards interaction-design collection](https://www.awwwards.com/websites/interaction-design/) — use for composition and motion inspiration; simplify anything that hurts clarity or accessibility.
- [Taste Skill](https://www.tasteskill.dev/) — optional design-quality checklist for coding agents. It is actively evolving; review its instructions before adding it to a repo.
- [Google DESIGN.md format](https://github.com/google-labs-code/design.md) — this file uses a structured design-token front matter plus explanatory rules so coding tools can follow the same system across screens.

## Do's and Don'ts

### Do

- Make the product look unmistakably about food and local discovery.
- Lead with one human sentence and one obvious CTA.
- Use a few excellent photos and art-directed layouts.
- Make demand-first matching visible, not just a hidden algorithm.
- Use motion to explain state changes.
- Keep every screen coherent with the same tokens.
- Keep the interface honest about what is real and what is demo data.

### Don't

- Do not make the site look like a generic AI SaaS dashboard.
- Do not use the default purple/blue SaaS gradient.
- Do not scatter glass cards, blurred circles and glowing borders everywhere.
- Do not add a cursor follower, custom pointer, scroll hijacking or long intro loader.
- Do not fill the page with “Save the planet” copy, huge statistics or fake social proof.
- Do not copy a Dribbble shot pixel-for-pixel.
- Do not install multiple libraries to achieve the same animation.
- Do not sacrifice the working request → offer → match → reservation journey for decorative polish.

## Pre-flight visual review

Before calling a screen done, inspect it at 390px and 1440px and answer:

1. Can someone identify the next action in five seconds?
2. Is the first screen visually distinctive without a gradient gimmick?
3. Does the type hierarchy feel intentional?
4. Are food images consistent, crisp and properly cropped?
5. Are all buttons functional, including empty/error/loading states?
6. Does motion explain something rather than merely decorate it?
7. Is the sustainability/impact information honest and clearly labelled?
8. Does the screen still work with reduced motion and keyboard navigation?
