# DropPool — MVP Phases and Execution Plan

**Priority order:** Product clarity → polished customer flow → matching logic → merchant flow → visual refinements → pitch reliability.  
**Working assumption:** The first demonstrable build needs to be ready in roughly two focused days. Stretch only when the core flow is stable.

## Principles

- Build a believable, clickable prototype before integrating real services.
- One end-to-end working journey beats six beautiful but dead-end pages.
- Frontend quality is a core requirement, but every visual element needs a clear product purpose.
- Seeded fixtures are acceptable for the pitch; disclose that data is simulated.
- Keep the demo deterministic so a judge sees the same result every time.

## Phase 0 — Set the foundation (first 1–2 hours)

### Tasks

- Inspect the existing repository before creating files or replacing configuration.
- Confirm Next.js/React, TypeScript, Tailwind and package manager versions already in use.
- Install only the needed dependencies: shadcn/ui or Radix-based primitives, `motion`, `lucide-react`, and a toast library only if needed.
- Add the shared CSS tokens from `design.md` and the chosen fonts.
- Create app shell, navigation, container/grid utilities, button, input, chip, modal/sheet, card and status badge primitives.
- Add fixtures for customers' demand requests, merchants, offers, reservations and impact metrics.

### Done when

- The app starts cleanly with no console errors.
- Global typography and colours are visible.
- The main routes load and the mobile page does not overflow horizontally.
- No library has been installed just for a decorative effect.

## Phase 1 — Homepage and brand impression (hours 2–6)

### Build

- Navigation and hero with “Good food deserves a second chance.”
- One high-quality food collage / deal card composition.
- The demand-first three-step explanation.
- Featured deal cards.
- Dark forest impact section with demo labels.
- Restaurant/merchant CTA and compact footer.

### Visual tasks

- Curate 4–6 consistent food photos and crop them locally.
- Implement the typography and spacing system.
- Add a restrained hero entrance sequence and accessible reduced-motion alternative.
- Make `Build my food pool` navigate to the demand flow.

### Done when

- The hero clearly explains the product and the unusual demand-first angle.
- The first screen feels designed, not like a template.
- All visual CTAs work.
- At 390px and 1440px the composition still feels intentional.

## Phase 2 — Customer demand and matching (hours 6–11)

### Build

- Request form: preference, max budget, pickup window, approximate area/radius.
- Validation and a visible request summary.
- Confirmation screen/state showing the demand pool.
- Match list sorted by the deterministic scoring function.
- Match explanation rows with concrete reasons.
- Deal detail sheet/page and demo reservation confirmation.

### Logic

- Put eligibility and ranking in a pure function outside UI components.
- Keep price, quantity, pickup deadline and match reasons derived from the same fixture/state.
- Add a resettable demo store so a reservation decrements quantity predictably.

### Done when

- A customer can finish the full request → match → reserve journey without a dead end.
- Out-of-budget, expired, out-of-radius and unavailable offers do not appear as eligible matches.
- Every deal has a pickup time and clear status.
- Empty and validation-error states are polished.

## Phase 3 — Merchant console (hours 11–15)

### Build

- Merchant overview with an aggregated demand summary.
- “Create surplus offer” form: food/item name, quantity, normal price, DropPool price, pickup start/end, distance/area, notes and allergens.
- Offer preview with editable values.
- Publish action that updates local demo state.
- Match estimate and fit reasons.
- Inventory count changes after a customer reserves a portion.

### UX rule

Do not reveal customer names, phone numbers or other personal information in the merchant console. Show pooled signals only, such as “8 people nearby want a vegetarian meal under ₹150.”

### Done when

- A merchant can create a coherent offer in under a minute.
- The new offer can become eligible in the customer match view.
- No fake authentication or real payment state is implied.

## Phase 4 — Motion, responsive detail and finish (hours 15–20)

### Build and polish

- Consistent hover, focus, pressed, loading and disabled states.
- Small layout transitions as matching results appear.
- Mobile navigation and a stacked merchant layout.
- Skeletons only where loading is represented; do not fake network loading if everything is synchronous.
- Toast/in-page feedback for reserve/publish/reset actions.
- Final food imagery crops, details, spacing, rhythm, button sizes and line breaks.

### Done when

- No animation blocks interaction or creates layout jumps.
- `prefers-reduced-motion` is honoured.
- Main pages fit 360, 390, 768, 1024 and 1440px.
- The app feels fast on a mid-range phone.

## Phase 5 — Demo hardening and pitch rehearsal (final 2–4 hours)

### Tasks

- Add a persistent visible “Demo data” label to simulated stats and mock merchant data.
- Add “Reset demo” in a discreet but accessible location.
- Test the exact pitch path twice from a fresh state.
- Test the fallback path if one sample offer is unavailable.
- Check tab order, focus rings, contrast, mobile overflow and image loading.
- Prepare a backup screen recording or screenshots in case the demo Wi-Fi fails.
- Capture screenshots at desktop and mobile sizes for the submission deck.

### Pitch path

1. Homepage: communicate problem and concept.
2. Customer: request a vegetarian meal below ₹150 for pickup from 8–9 PM.
3. Merchant: publish a small surplus batch.
4. Matching: show eligibility and explain the match.
5. Reservation: confirm one portion and update stock.
6. Impact: explain that displayed metrics are simulated and describe how a pilot would measure real outcomes.

## Suggested project structure

```text
app/
  page.tsx                  # marketing homepage
  pool/page.tsx             # customer demand form / pool state
  matches/page.tsx          # matching results
  merchant/page.tsx         # demo merchant console
  reservation/[id]/page.tsx # demo reservation detail if needed
components/
  brand/                    # logo, nav, footer
  home/                     # hero, steps, featured deals, impact section
  deals/                    # deal card, deal details, match reasons
  demand/                   # preference chips, request form, pool summary
  merchant/                 # offer form, inventory cards, demand summary
  ui/                       # shared primitives
lib/
  demo-data.ts              # deterministic sample data
  matching.ts               # eligibility and ranking rules
  demo-store.ts             # small local state / reducer
  format.ts                 # price, time and discount formatting
  utils.ts
public/images/              # curated, licensed food images
```

Adapt to the current repository if an equivalent structure already exists. Do not reorganise an existing codebase without a reason.

## Cut line if time runs short

Keep: homepage, demand form, merchant offer, matching results, demo reservation, clear simulated-data labels.

Cut first: map integration, authentication, charts, custom cursor, fancy shader background, extra pages, real backend, payments.

The result should still tell one complete story: **demand → surplus offer → explainable match → pickup reservation → measurable pilot hypothesis.**
