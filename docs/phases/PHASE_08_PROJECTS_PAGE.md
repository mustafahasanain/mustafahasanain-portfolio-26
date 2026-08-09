# Phase 08 — Projects Page

## Goal

Implement a clear bilingual Projects page that presents repository-driven projects in a responsive card grid.

## Required Context

Read:

- `../PROJECT_CONTEXT.md`
- this file

Use the user-supplied Projects/card visual reference if provided.

## Dependencies

Phases 05 and 06.

## Implementation Boundaries

### In Scope

- Projects page
- responsive grid
- reusable Project Card
- category display
- technology display
- project image
- localized title/description
- appropriate project/card destination
- empty-state behavior if content is empty

### Out of Scope

Do not implement:

- filters
- search
- pagination unless the actual approved project count demonstrates a real Phase 1 need and user approves it
- tag explorer
- advanced sorting UI
- case-study body layout
- admin/CMS

## Data Source

All project card data must come from Phase 06 content APIs.

Do not maintain a second card-data array in the page.

## Card Content

A card should communicate, as supported by the approved visual reference:

- visual/cover
- project title
- short description
- category
- technologies
- indication/link to more detail when available

Avoid clutter.

## Technology Representation

Technologies may use icons/text depending on the approved design.

Do not make essential information accessible only through hover.

## Project Destination

If a project has an internal case study:

- primary card/detail action should support navigating to it

If no case study exists:

- do not generate a broken internal detail route
- use approved external link behavior when a valid public link exists
- otherwise the card may remain informational

## External Links

When opening external destinations in a new tab, use safe link attributes and clear interaction.

Do not display fake placeholder URLs in production content.

## Empty State

If no publishable projects exist temporarily:

- page should remain valid
- show a concise non-fabricated state
- do not render broken empty grids

## Tasks

1. Inspect card/page reference.
2. Implement Projects page shell.
3. Implement reusable Project Card.
4. Wire MDX project listing.
5. Implement destination logic.
6. Implement responsive grid.
7. Verify image optimization.
8. Verify themes/locales/RTL.
9. Add E2E and accessibility coverage.

## Acceptance Criteria

- all publishable projects for locale render from content system
- category and technologies are visible
- internal case-study links only exist when supported
- cards work with keyboard
- essential information is not hover-only
- grid is responsive
- English/Arabic content works
- RTL works
- both themes work
- no filter/search UI exists
- no duplicate project source exists

## Required Tests

Playwright:

- English Projects page
- Arabic Projects page
- project card navigation with case study
- project without case study does not navigate to broken route
- responsive mobile grid
- keyboard interaction

axe:

- English Projects
- Arabic Projects

Run:

- lint
- typecheck
- build

## Manual Verification

- cards with varying text lengths
- long technology names
- image aspect ratio
- mobile
- RTL
- external link behavior

## Review Focus

- data source reuse
- broken route risk
- accessibility
- Phase 2 filter leakage
- responsive card behavior
