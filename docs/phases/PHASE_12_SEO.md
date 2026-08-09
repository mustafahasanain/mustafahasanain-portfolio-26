# Phase 12 — SEO & Discoverability

## Goal

Complete production-ready technical SEO and localized discoverability for all Phase 1 public pages.

## Required Context

Read:

- `../PROJECT_CONTEXT.md`
- this file

Read SEO architecture in `../TECHNICAL_ARCHITECTURE.md` only if needed.

## Dependencies

Phases 04, 06, 07, 08, 09, 10, and 11.

## Implementation Boundaries

### In Scope

- site metadata baseline
- localized page title/description
- canonical URLs
- language alternates/hreflang
- Open Graph
- social metadata
- sitemap
- robots
- case-study metadata
- favicon/icon/manifest metadata where appropriate
- not-found metadata behavior
- basic valid structured data only if it represents real facts

### Out of Scope

Do not implement:

- blog SEO
- fake review/rating schema
- speculative organization/agency schema
- keyword-stuffed hidden content
- backlink tooling
- SEO dashboard
- paid analytics platform

## Canonical URL Rules

English canonical URLs use no language prefix.

Arabic canonical URLs use `/ar`.

Do not emit `/en` canonical URLs.

Every indexable localized page should have the correct canonical for its own locale.

## Language Alternates

For pages that exist in both languages, expose language alternates for:

- English
- Arabic

Use the correct public URLs.

Do not advertise a localized case study alternate if that translation does not exist.

## Metadata

Use Next.js Metadata APIs.

Each major page should have:

- title
- description
- canonical
- localized alternates
- Open Graph metadata appropriate to the page

Project case studies should derive metadata from the project content source.

Avoid duplicate metadata storage.

## Sitemap

Include indexable Phase 1 pages and valid project case-study routes.

Do not include:

- broken routes
- placeholders
- `/en`
- non-case-study project detail paths
- development/test pages

Locale variants should be represented correctly.

## Robots

Create a production-appropriate robots policy.

Do not accidentally disallow the site.

Do not expose private paths that do not exist.

## Social Preview

Use real project/site image assets sized appropriately.

Avoid enormous unoptimized source images.

## Structured Data

Only add if accurate and valuable.

Potentially valid personal/site entities may be considered, but:

- use real approved facts only
- do not claim agency status
- do not invent employer/contact details
- do not add ratings/testimonials

## Semantic Content Checks

Review pages for:

- one coherent primary heading
- sensible heading hierarchy
- descriptive links
- useful image alt text
- crawlable textual content

SEO must not undermine accessibility.

## Tasks

1. Establish production site URL config.
2. Implement root metadata baseline.
3. Implement localized metadata per main page.
4. Implement project metadata from MDX source.
5. Implement canonical URLs.
6. Implement valid alternates.
7. Implement Open Graph/social metadata.
8. Implement sitemap.
9. Implement robots.
10. Add icons/manifest metadata if part of current app.
11. Validate generated output on production build.
12. Add SEO-focused tests.

## Acceptance Criteria

- no public canonical `/en`
- Home has localized metadata
- Projects has localized metadata
- About has localized metadata
- Contact has localized metadata
- case studies derive correct localized metadata
- canonicals are correct
- alternates only point to existing locale pages
- sitemap contains intended indexable routes
- robots is production-safe
- social preview metadata uses valid assets
- no fabricated structured data
- no duplicate project SEO source of truth

## Required Tests

Automated/E2E checks for representative pages:

- document title
- description
- canonical
- alternates
- OG title/image
- sitemap response/content
- robots response/content
- English/Arabic canonical behavior
- case-study metadata

Run:

- lint
- typecheck
- build

Manual:

- inspect generated page source/metadata
- validate sitemap URLs
- check social preview using a suitable external validator when available

## Review Focus

- canonical/hreflang mistakes
- `/en` leakage
- nonexistent locale alternates
- project metadata duplication
- fake schema
