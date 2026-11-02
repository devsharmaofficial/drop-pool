# DropPool — Product Requirements Document

**Status:** MVP brief  
**Product:** DropPool  
**Tagline:** Good food. Better prices. Less waste.  
**Primary domain:** Environmental Sustainability  
**Version:** 0.1

## 1. The idea

Restaurants often finish a service with food that is still safe and good to eat but has not sold. At the same time, nearby people are looking for affordable meals. DropPool brings the two sides together, with one important twist: **customers share demand first, and restaurants can respond with suitable surplus offers.**

A customer tells DropPool what they would buy, their budget, distance and pickup window. The demo groups similar requests into a local demand pool. A restaurant can see a privacy-safe summary of that demand and offer eligible surplus meals. DropPool then matches offers to people based on fit, quantity, price, location and pickup timing.

DropPool is not a food-delivery company in this MVP. It is a **demand-first matching prototype** for selling surplus food before it goes to waste.

## 2. Problem

- Restaurants can be left with unsold food at the end of a shift.
- Discount offers are often published without knowing whether nearby customers actually want them.
- People who need lower-cost meals may not know about nearby surplus offers in time.
- A basic listing marketplace can still leave food unsold if inventory and demand do not line up.

These are the problems DropPool aims to test. Do not present these statements as measured facts about a particular city until we have interviews or operational data.

## 3. Product hypothesis

If customers can signal demand before restaurants publish surplus offers, restaurants may be able to discount the right items in the right quantities and improve sell-through of surplus stock.

The prototype should let a judge understand this hypothesis in under 30 seconds and experience one complete matching journey in under 3 minutes.

## 4. Target users

### Primary: price-conscious local customers

People who are flexible about exactly which meal they eat, live or work within a practical pickup radius, and are willing to collect an offer during a defined time window.

### Secondary: independent cafés, bakeries and restaurants

Merchants with predictable end-of-service surplus who can set an honest quantity, a price, a pickup deadline and relevant food/allergen information.

### Stakeholders

- Local communities that benefit from affordable food.
- Sustainability organisations interested in practical food-waste prevention.
- The team running the pilot, which needs to measure whether matching is useful.

## 5. Sustainability fit

DropPool fits the environmental sustainability track through **waste prevention and resource efficiency**. The intended intervention is to help food that is already prepared and still safe to sell reach a buyer instead of becoming waste.

The demo must not claim a verified number of meals saved, kilograms diverted or emissions avoided. Any impact numbers shown during the prototype are explicitly labelled **simulated demo data**. Production impact accounting would require merchant-confirmed quantities, completed pickups, a consistent measurement method and a defensible emissions methodology.

## 6. MVP scope

### Must have

1. A striking, responsive landing page explaining the problem and demand-first approach.
2. A customer demand form: food preference, budget, pickup window and approximate area.
3. A demand-pool screen showing anonymised aggregated requests using seeded demo data.
4. A small merchant console to create an offer from available surplus.
5. A deterministic matching view that explains why an offer was matched.
6. Deal cards with quantity, original price, DropPool price, discount, pickup deadline, distance and clear food/allergen notes.
7. A confirmation state that simulates reserving a portion. It must say that the reservation is a demo if no real backend exists.
8. A small sustainability panel with clearly labelled demo metrics.
9. A responsive mobile layout, loading/empty/error states, keyboard access and reduced-motion support.
10. A demo-reset action so the team can reliably repeat the pitch.

### Nice to have only if the core is polished

- A customer/merchant role switch.
- A mini map illustration or map-like radius visual. Do not spend time integrating a real map for the prototype.
- A lightweight “why this match?” explainer.
- A compare view: basic-listing marketplace versus demand-first matching using the same seeded inventory.

### Not in scope for the MVP

- Real payments, refunds, delivery logistics or live location tracking.
- Real merchant onboarding, identity verification or production authentication.
- Real-time integrations with POS systems or restaurant inventory.
- AI-generated recommendations. The core matching can be deterministic and explainable.
- Claims that the platform guarantees food safety or regulatory compliance.
- A large multi-city marketplace or complex loyalty/credit system.

## 7. Main user journeys

### Journey A — Customer creates demand

1. Lands on DropPool and understands the concept without reading a long explanation.
2. Selects meal type or food preferences.
3. Sets a maximum budget and pickup window.
4. Chooses a rough area/radius in demo mode.
5. Submits the request.
6. Sees a calm confirmation plus the current demand pool size.
7. Receives matching offers in a ranked list with reasons.
8. Selects an offer and confirms a demo reservation.
9. Sees pickup instructions, the pickup deadline and reservation status.

### Journey B — Merchant responds to demand

1. Opens the merchant view.
2. Sees aggregated demand around their location without personal customer details.
3. Adds an eligible surplus batch: meal name, quantity, discounted price, pickup deadline, item notes and allergens.
4. Previews the offer before publishing.
5. Sees a match estimate and which demand signals the offer fits.
6. Publishes the offer in demo mode.
7. Sees the demo reservation count and remaining quantity update.

### Journey C — Pitch demo

1. Start on the homepage.
2. Click **Build my food pool**.
3. Submit a sample demand: “vegetarian meal, up to ₹150, pickup 8:00–9:00 PM, within 2 km.”
4. Switch to the merchant view and publish a sample surplus batch.
5. Open the matching results and show why the offer fits.
6. Reserve one portion and show the order state update.
7. End on the impact panel, whose demo data is labelled as simulated.

## 8. Matching logic

Use a simple, understandable rule-based score. It is better to explain a transparent working system than to pretend the prototype uses advanced AI.

A candidate offer is eligible only when:

- it is marked available;
- its quantity is greater than zero;
- its pickup window overlaps the customer's request;
- its price is at or below the customer's budget;
- its distance is within the chosen radius; and
- its item type does not conflict with a stated hard restriction.

Then rank eligible offers using a weighted score, for example:

- 35% preference fit;
- 25% price/value fit;
- 20% distance fit;
- 20% pickup-window fit.

The weights are prototype defaults, not scientifically validated. Put them in one function or config file so the team can tune them. Display short reasons such as “within your budget,” “1.2 km away,” and “pickup fits your window.” Never show a match as guaranteed if data is incomplete.

## 9. Success criteria for the demo

A successful MVP means:

- a first-time viewer can explain DropPool after reading the hero and seeing the flow;
- the main journey works without dead buttons;
- a customer can submit a demand and see ranked eligible offers;
- the merchant can publish a demo offer and see its effect on matching;
- prices, quantities and pickup deadlines remain consistent across screens;
- the same demo can be reset and run again;
- the site looks intentional at 390 px mobile width and a 1440 px desktop width;
- the app is understandable with keyboard navigation and reduced motion enabled.

Do not use vanity metrics like “AI-powered” or unsupported impact numbers as success criteria.

## 10. UX and product voice

Write like a helpful local food brand: direct, warm, specific and a little witty. Avoid guilt-tripping people about waste, environmental buzzwords, fake urgency and generic startup slogans.

Good:
- “What would you pick up tonight?”
- “A bakery nearby has 6 boxes left.”
- “Pickup by 9:00 PM.”
- “Your reservation is saved in this demo.”

Avoid:
- “Revolutionising the future of sustainability through an innovative AI-powered ecosystem.”
- “Save the planet with every bite.”
- Fake countdowns, fake reviews or fake merchant verification badges.

## 11. Open questions for later validation

- Will customers actually signal demand before seeing a deal?
- What discount is useful to customers and still makes sense to merchants?
- Which surplus categories are operationally easiest to start with: bakery, prepared meals, or packaged food?
- How far are people willing to travel for a discounted pickup?
- How should allergen, storage, reheating and pickup-time information be handled in a real pilot?
- Which local food-safety rules and merchant obligations apply to the launch city?

These questions need interviews and a small real-world pilot; they should not be “answered” by the frontend prototype.
