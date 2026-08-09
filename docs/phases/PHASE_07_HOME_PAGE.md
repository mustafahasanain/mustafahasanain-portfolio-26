# Phase 07 — Home Page

## Goal

Implement the complete conversion-focused Home page in English and Arabic using the approved visual references for its sections.

## Required Context

Read:

- `../PROJECT_CONTEXT.md`
- this file

Also inspect every visual reference explicitly supplied by the user for the Home phase.

## Dependencies

Phases 05 and 06.

## Implementation Boundaries

### In Scope

- Hero
- Featured Projects
- Services
- About Preview
- How I Work / Process
- Technologies
- Final CTA
- Home-specific responsive behavior
- Home-specific animations/interactions approved by visual references
- localized copy/content wiring

### Out of Scope

Do not implement:

- Projects full-page grid
- case-study page
- About full page
- Contact form
- Testimonials
- Blog
- Pricing
- project filters

## Home Purpose

The Home page should answer, quickly:

1. Who is Mustafa?
2. What can he build?
3. Is there credible work to inspect?
4. How does he work?
5. How can I start a project?

The page should prioritize client comprehension over a dense developer resume.

## Hero

Required product behavior:

- clear identity/value proposition
- `Start a Project` as primary CTA
- supporting path to inspect work where appropriate to the visual design

Current approved positioning direction:

> Building high-quality websites, web applications, and custom business systems.

Copy may be polished/localized while preserving the meaning.

Do not introduce unsupported claims such as client counts, revenue, years, or response-time guarantees.

## Featured Projects

Use the MDX content system.

Show a small curated set using `featured`.

Do not duplicate project metadata in Home source code.

Each featured project should have a clear path:

- to case study when one exists
- otherwise to the most useful approved project destination/link

## Services

Display the five approved services:

- Business Websites
- E-commerce
- Web Applications
- Custom Business Systems
- Maintenance & Development

Use client-friendly explanations.

Do not create standalone service routes.

## About Preview

Concise preview only.

Provide a path to the full About page.

Do not duplicate the full About content.

## How I Work / Process

Communicate an understandable process.

A reasonable product-level sequence is:

- Discussion
- Planning
- Development
- Review
- Delivery

Exact wording/visual execution may follow the supplied reference and localized copy.

Do not imply contractual guarantees not provided by the user.

## Technologies

Show important technologies clearly without turning Home into an exhaustive skills matrix.

Icons/logos must have accessible treatment.

Decorative marquees/loops must not create a reduced-motion or performance problem.

## Final CTA

Reinforce `Start a Project`.

Route to locale-equivalent Contact.

WhatsApp may appear as a secondary contact path if the approved design calls for it, but should not replace the primary form path.

## Performance

Home is likely the heaviest visual page.

Requirements:

- preserve server rendering/static output where practical
- load interactive code only for interactive sections
- optimize below-fold assets
- avoid massive animation libraries for trivial effects
- respect reduced motion
- prevent layout shift

## Tasks

1. Inspect Home visual references.
2. Prepare localized Home content.
3. Implement Hero.
4. Implement Featured Projects using content API.
5. Implement Services.
6. Implement About Preview.
7. Implement Process.
8. Implement Technologies.
9. Implement Final CTA.
10. Ensure responsive composition.
11. Ensure Light/Dark.
12. Ensure English/Arabic/RTL.
13. Add Home E2E/accessibility coverage.
14. Measure production build behavior and obvious performance issues.

## Acceptance Criteria

- all approved Home sections exist
- primary CTA routes correctly
- featured projects come from MDX source
- five services are present
- About preview links to About
- process is understandable
- technology section is usable and not misleading
- English and Arabic are complete
- RTL composition works
- Dark and Light both work
- mobile/tablet/desktop layouts work
- no horizontal overflow
- essential content remains usable with reduced motion
- no Phase 2 sections appear
- no invented portfolio claims

## Required Tests

Playwright:

- Home loads EN
- Home loads AR/RTL
- primary CTA route
- featured project navigation
- About route
- Light/Dark
- mobile representative viewport
- reduced-motion representative check where animations exist

axe:

- English Home
- Arabic Home

Run:

- lint
- typecheck
- build

## Manual Verification

- real device-like mobile width
- slower CPU/network profile if available
- keyboard
- images loading
- animation jank
- layout shift
- both themes
- long Arabic text
- CTA prominence

## Review Focus

- visual reference fidelity
- client JS footprint
- data duplication
- CTA priority
- inaccessible animation
- fake claims
