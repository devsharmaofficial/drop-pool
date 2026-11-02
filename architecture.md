# DropPool — MVP Architecture

**Architecture goal:** A polished, reliable frontend prototype with an understandable matching model. Do not build production infrastructure before validating the flow.

## 1. Recommended stack

Use what the existing repository already supports where possible. For a greenfield MVP:

- **Next.js App Router + React + TypeScript** for pages, components and route handling.
- **Tailwind CSS** for layout and styling, driven by the tokens in `design.md`.
- **shadcn/ui with Radix primitives** for accessible foundations such as dialogs, dropdowns, tabs and form controls. Restyle them to DropPool rather than accepting default visuals unchanged.
- **Motion for React** (`motion`) for purposeful reveal, layout and state transitions.
- **lucide-react** for consistent outline icons.
- **Zod** for validating demand and offer forms; add React Hook Form only if form complexity warrants it.
- **Local seeded fixtures + a small client-side demo store** for the hackathon prototype.
- **Supabase later**, only when persistence, real accounts or multi-device data is genuinely needed.

Do not add several overlapping animation libraries. For this MVP, one animation system is enough.

## 2. System shape

```text
Customer UI ─┐
             ├── Demo store / application state ── Matching engine
Merchant UI ─┘                                  ├─ Eligibility filters
                                                └─ Ranking + match reasons
                                                     │
                                                     └─ Match result UI

Impact panel reads demo event counters from the same store and labels them as simulated.
```

For the first prototype, all information is local and resettable. The UI should not pretend to have real-time backend updates. Keep the logic separated so a backend can replace the fixture store later without rewriting the screens.

## 3. Routes

| Route | Purpose | Required states |
|---|---|---|
| `/` | Marketing homepage and product explanation | default, nav open on mobile |
| `/pool` | Customer demand form and local pool summary | empty form, validation errors, submitted |
| `/matches` | Eligible ranked offers | results, no matches, reserved/reservation state |
| `/merchant` | Pooled demand and create/publish surplus offer | empty inventory, editing, preview, published |
| `/reservation/[id]` | Optional reservation detail | active demo reservation, invalid/demo reset state |

For a two-day build, routes can be simplified if a single-page flow is more reliable. Preserve clear navigation and back behaviour.

## 4. Domain types

Suggested TypeScript types (adapt names to project style):

```ts
export type FoodPreference =
  | "vegetarian"
  | "vegan"
  | "bakery"
  | "any";

export interface DemandRequest {
  id: string;
  preference: FoodPreference;
  budgetPaise: number;
  pickupStart: string; // ISO timestamp or stable demo time
  pickupEnd: string;
  areaLabel: string;
  radiusKm: number;
  createdAt: string;
}

export interface SurplusOffer {
  id: string;
  merchantId: string;
  merchantName: string;
  itemName: string;
  category: FoodPreference;
  quantityAvailable: number;
  originalPricePaise: number;
  offerPricePaise: number;
  pickupStart: string;
  pickupEnd: string;
  areaLabel: string;
  distanceKm: number; // fixture value in the MVP
  notes: string[];
  allergens: string[];
  available: boolean;
}

export interface MatchResult {
  offer: SurplusOffer;
  score: number;
  reasons: string[];
}

export interface DemoReservation {
  id: string;
  offerId: string;
  quantity: number;
  status: "reserved" | "cancelled" | "collected";
  createdAt: string;
  demoOnly: true;
}
```

Store money as integer paise, not floating-point rupees. Format it for display in one shared helper. In the fixture store, use stable timestamps relative to a fixed demo clock or reset them predictably so offers do not mysteriously expire during a pitch.

## 5. Matching engine

Place the engine in `lib/matching.ts` with pure functions and unit-testable inputs.

### Eligibility first

1. Offer is available and quantity is greater than zero.
2. Offer price is at or below the request budget.
3. Offer distance is within the requested radius.
4. Pickup intervals overlap.
5. Hard food restrictions are respected.
6. Offer is marked as safe/eligible by the merchant fixture. This prototype flag does not certify safety; it only represents that the merchant has chosen to list the item.

### Ranking second

Use a simple weighted score such as preference fit 35%, price/value 25%, distance 20%, pickup fit 20%. Keep weights in one configuration object. Explain matches through factual reasons instead of showing a mysterious percentage.

If ranking needs to be simplified for demo speed, use deterministic sorting with preference > distance > price and document the choice. Do not call this machine learning or AI.

## 6. State model

Create a small, predictable demo store, preferably a reducer or a simple context store. Avoid global state libraries unless already installed.

Actions:

- `SUBMIT_DEMAND`
- `PUBLISH_OFFER`
- `RESERVE_OFFER`
- `CANCEL_RESERVATION` (optional)
- `RESET_DEMO`

Derived values:

- eligible offers for the current request;
- rank + match reasons;
- remaining offer quantity;
- demo reservation count;
- demo-only impact figures.

Store only the source values, then derive UI display from those values. Do not store multiple copies of a derived discount percentage or remaining quantity that can drift out of sync.

## 7. Demo data

Seed at least:

- 3 fictional merchants with distinct names and locations;
- 6 surplus offers across bakery, vegetarian meals and flexible categories;
- 3 demand requests with different budgets/preferences;
- 1 offer that is outside budget;
- 1 offer outside radius;
- 1 offer with an incompatible pickup window;
- 1 low-inventory offer to demonstrate a quantity update;
- sample impact totals labelled `Demo data`.

Use plausible prices and timings. Mark merchant names as sample/fictional if there is any chance they could be mistaken for a real partner. Ensure the main pitch scenario always has at least two eligible offers after the customer submits the sample request.

## 8. Persistence and backend boundary

### For demo

- Store data in memory or local storage with a reset function, depending on whether refresh persistence matters.
- Make it clear in the interface that reservations are simulated.
- Use deterministic seed data; no API call is required.

### Future pilot, not part of the current MVP

Potential backend entities: `profiles`, `merchants`, `offers`, `demand_requests`, `reservations`, `offer_events`. Add authentication and database row-level security before storing personal/merchant data. Merchant access must be role-based and enforced server-side; never trust a client-only role flag.

For a real deployment, review applicable local food safety requirements, privacy obligations, cancellation/refund policy, allergen disclosures, storage/pickup rules and payment handling. The prototype itself does not provide legal or food-safety assurance.

## 9. Component boundaries

- `BrandHeader`, `BrandFooter`
- `HeroCollage`, `HowItWorks`, `FeaturedDeals`, `ImpactStrip`, `MerchantCTA`
- `DemandForm`, `PreferenceChipGroup`, `RequestSummary`, `PoolSummary`
- `DealCard`, `DealDetailSheet`, `MatchReasonList`, `MatchList`
- `MerchantDemandSummary`, `OfferForm`, `OfferPreview`, `InventoryOfferCard`
- `DemoDataLabel`, `DemoResetButton`, `EmptyState`, `FormError`, `StatusBadge`

Every component that owns important behaviour should have a clear data contract. Avoid a 1,000-line page component and avoid abstracting tiny one-off layout elements into dozens of files.

## 10. Visual and runtime performance

- Prefer CSS transforms and opacity for motion.
- Reserve image aspect ratios to avoid layout shift; use framework image optimisation where configured.
- Keep image files compressed and use responsive sizes.
- Avoid a heavy WebGL hero; the value should come from art direction, typography, photography and a few polished interactions.
- Lazy-load below-the-fold images when appropriate.
- Keep the first meaningful paint fast and do not hide the homepage behind a loading animation.
- Avoid large charting libraries for three demo metrics; simple typography and CSS bars are enough.

## 11. Quality checks

Before shipping:

- run type-check and lint scripts if available;
- verify every button and link;
- test the primary matching logic with eligible and ineligible offers;
- check all money/discount calculations;
- check no-results and validation states;
- test 360px and 390px mobile widths, tablet, and 1440px desktop;
- test keyboard focus and reduced motion;
- check the console for warnings/errors;
- reset and repeat the pitch path from scratch.

## 12. Design-tool references

- [21st.dev](https://21st.dev/) for searching React hero and background building blocks.
- [Motion for React](https://motion.dev/docs/react) for layout and entrance transitions.
- [Componentry](https://componentry.dev/) and [Bencho](https://bencho.dev/) for selective motion/micro-interaction inspiration; check dependency and licence details.
- [Mobbin food-delivery UI](https://mobbin.com/explore/mobile/app-categories/food-delivery-app) for familiar ordering patterns.
- [Google DESIGN.md](https://github.com/google-labs-code/design.md) for portable design rules and tokens.
