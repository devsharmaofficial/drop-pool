# DropPool — Build Rules for the Coding Agent

These are project-level constraints. Follow them across every change. When instructions conflict, protect the working customer journey and the visual system before adding new features.

## 1. Read before changing

1. Inspect the repository, framework, scripts, routes and installed packages before editing.
2. Read `prd.md`, `design.md`, `phases.md`, `architecture.md` and `memory.md` before starting a large task.
3. Reuse existing conventions if they are good. Do not replace configuration files wholesale just to match a preferred stack.
4. Make small, reviewable changes. After each phase, run the app and check the changed screens.

## 2. Priority order

1. User can complete the core journey.
2. Information, pricing, quantity and pickup details are correct and consistent.
3. The interface follows `design.md` and is responsive.
4. Accessibility and interaction states work.
5. Motion and visual flourishes are polished.
6. New features.

Never prioritise a shader, animation or new library above a broken form or dead button.

## 3. Visual quality bar

- Use DropPool tokens and components. Do not invent a second colour palette on a one-off page.
- Every screen should look like the same product, even when the route changes.
- The homepage must have a clear visual focal point, strong type hierarchy, deliberate whitespace, real food imagery and one obvious primary action.
- Keep the light paper/forest/tomato/citrus palette. Do not default to purple-to-blue gradients, generic SaaS dashboard layouts, frosted glass everywhere or random floating blobs.
- Use asymmetry and editorial composition with restraint. Do not make cards randomly tilted without a clear reason.
- Do not use emoji as a substitute for icons, product photos or illustration.
- Avoid generic copy such as “revolutionise”, “unlock the power”, “seamlessly”, “game-changing ecosystem” and “AI-powered” unless it expresses a factual capability.
- Keep headings short and specific. Write as a food brand with a practical purpose, not a venture-capital pitch deck.
- All demo metrics, sample merchants and mock reservations must be labelled honestly.

## 4. Component sourcing rules

Use component libraries as starting points, not as the brand.

- Prefer existing shared components or accessible primitives from shadcn/ui/Radix.
- You may use a single carefully adapted 21st.dev or Componentry hero/background component if it clearly improves the design.
- Use Motion for React for shared animation behaviour. Do not combine Framer Motion imports and `motion` imports in a way that duplicates the animation stack; follow the installed package/version.
- Use Bencho for micro-interaction inspiration only when the interaction has a clear purpose.
- Do not paste a component without checking its licence, dependencies, accessibility, responsiveness and bundle weight.
- Never use a library component unchanged if it clashes with the DropPool tokens.
- Before adding a dependency, explain why existing CSS or an installed primitive is insufficient.

## 5. Motion rules

- Animation must explain hierarchy, cause/effect or state.
- Keep entrance sequences under one second and make the page usable immediately.
- Use opacity/transform for most motion.
- Avoid scroll-jacking, cursor followers, endlessly moving backgrounds, long loaders, loud spring bounces and decorative motion on every element.
- Honour `prefers-reduced-motion` and preserve all information without animation.
- Keep hover effects modest and add equivalent focus/active states for touch and keyboard users.

## 6. UX and accessibility rules

- Mobile first; validate at 360px and 390px before polishing desktop.
- All primary actions must work and have clear pending/success/error feedback.
- No hover-only functionality.
- Use labels with form fields; placeholders are examples, not labels.
- Validation errors appear next to the relevant field and the input value is preserved.
- Keep focus visible. Use semantic HTML and meaningful headings.
- Use at least 44×44px practical touch targets for key controls.
- Do not rely on colour alone to convey availability, discount, errors or reservation status.
- Respect keyboard navigation and reduced motion.
- Every food offer must expose price, pickup deadline, distance/area, remaining quantity and known allergen notes before the user commits.
- Empty states need a useful next step, not just an illustration.

## 7. Matching and data correctness

- Matching rules belong in `lib/matching.ts`, not in JSX.
- Filter ineligible offers before ranking.
- Never match out-of-budget, out-of-radius, unavailable, zero-stock or pickup-incompatible offers.
- Do not invent a match confidence percentage or call a deterministic score AI.
- Display factual fit reasons.
- Store prices as integer paise and use one shared formatter.
- Derive discounts and remaining quantities; do not hardcode values that can drift.
- A reservation updates the demo store and inventory in one coherent action.
- Provide `RESET_DEMO` or an equivalent repeatable reset path.
- Keep times stable enough for a predictable live pitch.

## 8. Safety, trust and privacy

- Do not claim DropPool certifies food safety.
- Do not list food that is expired or known to be unsafe. The prototype only models an eligible offer; it does not verify safety.
- Show allergen information when supplied. Do not infer that “no allergens listed” means “allergen-free.”
- Do not present fictional restaurants as real partners or use fake ratings/reviews.
- The merchant console gets pooled demand summaries, not individual customer identities or contact details.
- Never put secrets, API keys or credentials in client code.
- Never add client-only role checks and describe them as secure authentication.
- Do not add real payments, customer PII or live merchant data in the ideathon prototype.
- Label simulated inventory, reservations and impact figures clearly.

## 9. Engineering rules

- TypeScript types should represent the actual domain rather than using `any` for convenience.
- Keep matching functions pure and testable.
- Prefer readable code to clever abstractions.
- Keep components focused; avoid enormous route files and premature design-system complexity.
- Reuse formatters and tokens; do not repeat hardcoded colour hex values in components.
- Avoid unnecessary client components. Use client-side state only where interaction requires it.
- Do not introduce a backend or global state library without a clear need.
- Remove unused code and imports after changes.
- Never suppress a TypeScript or lint error without understanding why.
- Keep existing working behaviour unless the requested change intentionally alters it.

## 10. Completion checklist for each task

A task is not complete until:

- the changed UI has been run in a browser or the closest available equivalent;
- the core interaction works with mouse, touch and keyboard as appropriate;
- responsive layout is checked;
- no obvious console errors or broken links remain;
- loading, empty, success and error states are handled where relevant;
- changes use DropPool design tokens;
- any mock/demo limitation is labelled accurately;
- the summary states what changed, what was tested and what is still incomplete.

## 11. Final visual pre-flight

At 390px and 1440px, inspect the homepage, demand form, match list, offer form and reservation confirmation. Check the real page, not only the code. Fix awkward line breaks, clipped buttons, inconsistent card padding, overlong text lines, bad image crops, excessive animation, low contrast and misplaced sticky elements. Do not declare the project finished because it compiles.
