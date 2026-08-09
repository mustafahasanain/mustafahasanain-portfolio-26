# Phase 05 — Shared Layout & Navigation

## Goal

Build the production-quality shared shell used across Phase 1 pages.

## Required Context

Read:

- `../PROJECT_CONTEXT.md`
- this file

Also use the visual reference supplied by the user for the global navigation/layout if one is provided for this phase.

## Dependencies

Phases 03 and 04.

## Implementation Boundaries

### In Scope

- Header/navigation
- logo placement
- primary navigation links
- `Start a Project` CTA
- theme switch integration
- language switch integration
- responsive/mobile navigation
- Footer
- shared max-width/container primitives
- shared page-shell spacing
- skip link/main landmark
- common button/link primitives only where actually reused

### Out of Scope

Do not implement:

- full Home sections
- project cards
- About content
- Contact form
- case studies
- Phase 2 UI

## Navigation Information Architecture

Primary destinations:

- Home
- Projects
- About
- Contact

Primary CTA:

- Start a Project -> Contact

Services remain a Home section, not a standalone Phase 1 page.

CV actions do not require a top-level page route.

## Logo

Use the provided logo appropriately.

Do not distort aspect ratio.

Provide accessible text/labeling where needed.

## Responsive Navigation

Must work for:

- mobile
- tablet
- desktop

If a ready-made navigation component is used:

- adapt it to both themes
- adapt it to RTL
- ensure keyboard/focus behavior
- remove unnecessary runtime cost
- do not keep inaccessible interaction patterns

## Header Behavior

Exact visual/scroll behavior follows the approved reference.

Any sticky/animated behavior must:

- not hide keyboard focus
- not block content
- avoid excessive client-side work

## Footer

Provide concise global footer content and relevant contact/social links.

Do not duplicate a full Contact page inside the footer.

## Shared CTA

`Start a Project` must always route to the locale-equivalent contact page.

## Accessibility

Required:

- skip-to-content link
- semantic header/nav/main/footer
- clear current navigation state when appropriate
- keyboard-accessible mobile menu
- focus management if overlay/drawer navigation is used
- Escape close for dismissible modal-like navigation when applicable
- no focus trap bugs

## Tasks

1. Inspect supplied navigation/layout reference.
2. Build shared container/layout primitives only as needed.
3. Implement Header.
4. Integrate logo.
5. Integrate nav links.
6. Integrate theme switch.
7. Integrate language switch.
8. Implement responsive menu behavior.
9. Implement shared CTA.
10. Implement Footer.
11. Add accessibility semantics.
12. Add E2E navigation tests.
13. Verify both themes/locales.

## Acceptance Criteria

- all primary navigation destinations exist or cleanly point to phase placeholders without broken links
- Start a Project targets Contact in current locale
- Header works at mobile/tablet/desktop
- mobile menu is keyboard usable
- theme switch works from global navigation
- language switch works from global navigation
- Arabic layout is correct RTL
- English layout is correct LTR
- logo renders correctly
- Footer works in both languages/themes
- no unnecessary horizontal overflow
- no future-page feature has been implemented early

## Required Tests

Playwright:

- desktop navigation
- mobile navigation open/close and link activation
- Start a Project route
- theme switch in shell
- language switch in shell
- keyboard navigation basics
- Arabic shell
- Light/Dark shell

axe:

- representative English shell
- representative Arabic shell
- open mobile menu state when applicable

Also run:

- lint
- typecheck
- build

## Manual Verification

- narrow mobile widths
- keyboard-only
- zoomed text
- long Arabic labels
- sticky behavior if implemented
- reduced-motion mode if animated

## Review Focus

- accessibility of ready-made navigation
- RTL
- client JS footprint
- correct CTA routing
- no duplicated locale markup
