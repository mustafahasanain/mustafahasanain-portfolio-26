# Phase 13 — Final QA, Performance & Launch Readiness

## Goal

Verify the complete Phase 1 product under production-like conditions, fix launch-blocking issues, and confirm that the site is ready for public use.

## Required Context

Read:

- `../PROJECT_CONTEXT.md`
- this file

Other phase/spec files should be consulted only when a discovered issue requires checking the original requirement.

## Dependencies

All previous phases.

## Implementation Boundaries

### In Scope

- complete regression testing
- E2E consolidation
- accessibility verification
- responsive verification
- browser checks
- production-build checks
- Lighthouse performance/accessibility/SEO/best-practices verification
- dependency/security sanity checks
- content/link integrity
- production deployment verification
- launch-blocking fixes
- small optimizations proven necessary by measurement

### Out of Scope

Do not add:

- Phase 2 features
- redesigns merely because they might look better
- new product sections
- speculative architecture rewrites
- unrelated dependency migrations
- new analytics unless separately approved

## Final Route Matrix

Verify at least:

English:

- `/`
- `/projects`
- `/about`
- `/contact`
- one valid `/projects/<slug>`

Arabic:

- `/ar`
- `/ar/projects`
- `/ar/about`
- `/ar/contact`
- one valid `/ar/projects/<slug>` when Arabic case-study content exists

Also verify:

- 404/not-found
- direct deep links
- reloads

## Theme Matrix

Verify:

- first-visit Dark
- Light switch
- persistence
- Dark switch back
- English Dark
- English Light
- Arabic Dark
- Arabic Light

Do not test every page/theme/locale permutation manually if automated representative coverage is sufficient; focus on risk.

## Critical User Flows

Automate/verify:

1. Home -> Start a Project -> Contact
2. Home -> Featured Project -> Case Study when available
3. Home -> About
4. Projects -> Case Study
5. English -> Arabic equivalent route
6. Arabic -> English equivalent route
7. theme switch + persistence
8. CV View
9. CV Download
10. Contact valid submission
11. Contact invalid submission
12. Contact email success + Telegram failure semantics
13. mobile navigation

## Accessibility

Automated axe checks on representative pages are required.

Manual checks must include:

- keyboard-only navigation
- skip link
- visible focus
- mobile navigation focus behavior
- form errors
- headings/landmarks
- Light/Dark contrast
- Arabic reading/order
- reduced-motion behavior
- zoom/text resizing sanity

Any serious accessibility issue must be fixed before approval.

## Performance

Use production build/deployment.

Lighthouse target:

> greater than 90 in all core categories

Representative pages:

- Home
- Projects
- one Case Study
- About
- Contact
- at least one key Arabic page

Prioritize real fixes such as:

- reduce unnecessary client JS
- optimize images
- lazy-load below-fold visuals
- remove unused packages
- reduce font cost
- prevent layout shift
- optimize expensive animation

Do not chase synthetic 100 by removing important content/functionality unless the tradeoff is approved.

## Security/Dependency Sanity

Check:

- no secrets tracked
- no secret in client bundle/network payload
- production environment separated
- framework/dependencies not knowingly left on a vulnerable version when a compatible stable security patch exists
- contact endpoint input validation
- external links safe
- no debug route/test endpoint exposed

Use the project's package/security tooling appropriately.

Do not apply unrelated major upgrades during final QA unless required to resolve a security issue and compatibility is verified.

## Content QA

Confirm:

- no lorem ipsum
- no fake placeholder project links
- no fake project claims
- no untranslated accidental English UI in Arabic shell except proper names/technologies
- no missing images
- no broken CV links
- contact details are correct
- social links are correct
- project publication respects confidentiality decisions

## SEO QA

Confirm Phase 12 behavior in final production:

- titles/descriptions
- canonical
- alternates
- sitemap
- robots
- Open Graph
- no `/en` canonical route
- no broken sitemap URLs

## Deployment QA

Push/merge an approved launch candidate through the real `main` workflow.

Confirm:

- GitHub Action passes
- expected commit deployed
- service running
- public URL healthy
- environment variables loaded
- contact real test works
- restart/redeploy is repeatable

## Tasks

1. Build final route/test matrix.
2. Run full lint/typecheck/build.
3. Run complete E2E suite.
4. Run automated accessibility suite.
5. Perform manual accessibility checks.
6. Perform responsive/browser checks.
7. Run Lighthouse against production-like build.
8. Fix measured blocking issues.
9. Re-run affected checks.
10. Perform content/link QA.
11. Perform security/dependency sanity check.
12. Deploy launch candidate through `main`.
13. Perform production smoke checks.
14. Run final Codex review.

## Acceptance Criteria

- lint passes
- typecheck passes
- production build passes
- critical E2E suite passes
- automated accessibility checks pass at agreed baseline
- no known blocking accessibility defect
- no known broken primary user flow
- both themes work
- English/Arabic work
- RTL works
- mobile/tablet/desktop work
- CV actions work
- contact email works in production
- Telegram notification behavior works as specified
- metadata/sitemap/robots correct
- no placeholder/fake content remains unintentionally
- no known committed secret
- production deployment works
- Lighthouse >90 in every core category on the agreed representative pages
- no unresolved CRITICAL/HIGH/MEDIUM Codex finding

## Required Tests

Run the complete repository validation suite.

Record actual results rather than expected results.

If a Lighthouse result falls below target:

- identify the metric/category
- identify measured cause
- fix where practical
- rerun

Do not waive the target silently.

## Final Deliverable Summary

At approval, provide a concise launch record containing:

- deployed commit
- production URL
- test/build results
- Lighthouse results
- accessibility verification summary
- contact-delivery verification
- known non-blocking limitations, if any
- explicit confirmation that Phase 2 features remain out of scope
