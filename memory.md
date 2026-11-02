# DropPool — Project Memory and Handoff

This file is the persistent brief for future sessions or coding agents. Update it when a real decision changes. Do not use it as a place to dump every implementation detail.

## Current product decision

**Name:** DropPool  
**Working tagline:** Good food. Better prices. Less waste.  
**Category:** Environmental sustainability / food-waste prevention  
**Product shape:** A demand-first surplus-food marketplace. Customers express what they want, their budget, rough location and pickup window. Similar demand is pooled; merchants can publish eligible surplus batches that fit the local demand; a simple matcher ranks the offers and explains the fit.

## The important differentiator to demonstrate

A normal surplus marketplace commonly makes the seller publish a deal first and waits for a buyer to find it. DropPool's prototype begins with customer demand and uses it to help a merchant decide what surplus batch to offer. This is a product hypothesis, not a proven unique moat. Do not claim it is the first of its kind or guaranteed to reduce waste; similar marketplace and group-buying patterns exist elsewhere. The team should validate the difference with merchants and customers before making stronger claims.

## MVP goal

Deliver one coherent, visually memorable, repeatable demo:

`Homepage → customer demand → demand pool → merchant publishes surplus → explainable match → demo reservation → demo impact view`

This project is frontend-first. Simulated fixtures are fine, and the UI must label them as simulated. No real checkout, payments, delivery, authentication, live inventory or production integrations are required in this MVP.

## Design direction

**Warm Market:** an independent food magazine meets a neighbourhood marketplace. It should look alive and premium, but remain practical and approachable.

- Paper: `#F7F4EC`
- Surface: `#FFFDF8`
- Ink: `#19261F`
- Forest: `#173E31`
- Tomato: `#F05A3E`
- Citrus accent: `#D8F36A`
- Display: Fraunces / Georgia fallback.
- Interface: DM Sans / sans-serif fallback.
- Real curated food photos, strong composition, oversized editorial headline, restrained overlays and a purposeful deal collage.
- The homepage must explain “demand first, deals second” very early.
- Motion should support a state change; no decorative animation overload.
- Default light theme; use deep forest as an occasional contrast section.

Read `design.md` before working on any visual change. It is the source of truth for tokens, motion, responsive behaviour and component rules.

## Product constraints

- Customers: food preference, max budget, pickup window, approximate area/radius.
- Merchants: item, quantity, normal price, offer price, pickup window, area, notes and allergens.
- Match eligibility: availability, quantity, budget, radius, pickup overlap and hard dietary preference.
- Match ranking: transparent deterministic scoring (starter weights in `prd.md` and `architecture.md`).
- Show concrete match reasons, not “AI match %”.
- Demo offers must include price, original price, quantity, pickup deadline, area/distance and known allergen information.
- Never imply that DropPool verifies food safety.
- Merchant view only shows aggregated demand, not personal customer details.
- Fake merchants, reservations and sustainability stats must be marked as demo data.

## Preferred implementation

For a new build: Next.js App Router, React, TypeScript, Tailwind, shadcn/ui or Radix-based primitives, Motion for React, lucide-react, Zod, seeded local fixtures and a resettable demo store. Adapt this to the existing repository; do not replace working infrastructure just to match the list. Supabase is a later step if persistence and real user accounts become necessary.

## Inspiration and reference links

These are reference libraries and technical documentation. Use them to learn patterns and adapt the result; do not copy designs or introduce dependencies without review.

- [21st.dev](https://21st.dev/) — component, hero and background inspiration.
- [Motion for React](https://motion.dev/docs/react) — animation and layout transitions.
- [Componentry](https://componentry.dev/) — animated React components and effects.
- [Bencho](https://bencho.dev/) — interactive UI components and micro-interactions.
- [Mobbin food-delivery patterns](https://mobbin.com/explore/mobile/app-categories/food-delivery-app) — mobile ordering flows and familiar UI patterns.
- [Dribbble food-delivery ideas](https://dribbble.com/tags/food-delivery-app) — visual exploration, not production UX evidence.
- [Awwwards interaction design](https://www.awwwards.com/websites/interaction-design/) — composition and interaction inspiration.
- [Taste Skill](https://www.tasteskill.dev/) — optional coding-agent design review skill; check current instructions before adding.
- [Google DESIGN.md](https://github.com/google-labs-code/design.md) — machine-readable design tokens plus human-readable design rules.

## What not to do

- Do not expand scope into delivery logistics, live payments, auth, customer accounts or a production marketplace during the first prototype.
- Do not hide the core idea behind an abstract sustainability landing page.
- Do not generate a generic SaaS interface with purple gradients, glassmorphism and floating circles.
- Do not spend hours on WebGL, cursor effects, map APIs or a custom loading sequence before the core journey works.
- Do not use unverified environmental numbers, fake user reviews or invented partner claims.
- Do not call rules-based matching AI.

## Current status

This handoff pack defines the product brief, visual system, architecture, rules and phased execution. It does not claim that implementation has started or that any route/component already exists. The next agent should inspect the repo, identify the current stack, implement Phase 0, then build the homepage and end-to-end demo path.

## Decision log

- **2026-11-02:** Product direction set to DropPool, a demand-first surplus food matching prototype under environmental sustainability.
- **2026-11-02:** Frontend polish is the highest design priority; matching and reservations must still function as a repeatable demo.
- **2026-11-02:** Use simulated data for the MVP and label it honestly; validate the business hypothesis with real users later.
