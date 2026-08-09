# Phase 09 — Project Case Studies

## Goal

Implement localized project case-study pages backed by the Phase 06 MDX content system.

## Required Context

Read:

- `../PROJECT_CONTEXT.md`
- this file

Use the user-provided case-study visual/content reference if supplied.

## Dependencies

Phases 05, 06, and 08.

## Implementation Boundaries

### In Scope

- dynamic case-study route
- MDX body rendering
- project metadata/header
- project screenshots/media
- technology/context presentation
- optional public links
- localized content
- safe not-found behavior
- case-study-specific typography/content components
- previous/back-to-projects navigation where useful

### Out of Scope

Do not implement:

- a CMS
- user comments
- related-project recommendation engine
- analytics
- filters
- fake business metrics
- auto-generated AI case-study content presented as fact

## Routing

Expected public routes:

English:

```text
/projects/<slug>
```

Arabic:

```text
/ar/projects/<slug>
```

Generate/render only projects with an internal case study for that locale as appropriate.

Unknown/unavailable case studies must resolve cleanly.

## Content Integrity

Case studies must use user-approved/project-source facts.

Do not invent:

- client identity
- revenue
- conversion increase
- performance improvement numbers
- dates
- team size
- testimonials
- business impact

If the project is restricted by NDA/employment terms, only publish approved safe content.

## MDX Components

Support only components actually needed by real case-study content.

Examples may include:

- image/figure
- callout
- link/button
- code block if relevant

Do not build a large MDX design system preemptively.

## Typography

Long-form content must remain readable:

- suitable line length
- heading hierarchy
- list styles
- figure captions where needed
- accessible links
- responsive media

## Images

- optimized
- proper dimensions
- useful alt text
- no confidential screenshots
- no layout shift

## Localization

English and Arabic case studies may differ in textual content while representing the same factual project.

Language switching should preserve slug when the equivalent locale exists.

If a translation is unavailable:

- avoid a broken target
- use deliberate fallback/navigation behavior approved by the established locale system
- never machine-invent content at runtime

## Tasks

1. Implement dynamic case-study route integration.
2. Implement case-study data/header.
3. Implement MDX renderer/components.
4. Implement media handling.
5. Implement back/breadcrumb navigation as appropriate.
6. Implement not-found behavior.
7. Integrate locale switching behavior.
8. Add one representative case study for testing.
9. Add E2E/accessibility coverage.
10. Verify static/build generation behavior.

## Acceptance Criteria

- valid case-study project renders
- project without case study has no fake case-study page
- unknown slug yields correct not-found result
- MDX headings/media render correctly
- case study works in both supported locales when translated content exists
- Light/Dark both work
- RTL long-form content is readable
- external links are safe
- no confidential or invented project claims are introduced
- page remains responsive

## Required Tests

Playwright:

- valid English case study
- valid Arabic case study where fixture exists
- unknown slug/not-found
- navigation back to Projects
- language switch behavior for translated case study
- mobile case-study layout

axe:

- representative English case study
- representative Arabic case study

Run:

- lint
- typecheck
- build

## Manual Verification

- long article typography
- images at mobile widths
- keyboard links
- RTL punctuation/mixed English technology terms
- direct deep-link reload

## Review Focus

- content security/integrity
- route generation
- unavailable locale behavior
- MDX client bundle impact
- semantic long-form markup
