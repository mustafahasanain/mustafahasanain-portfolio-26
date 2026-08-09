# Phase 06 — MDX Content System

## Goal

Build a validated repository-driven project content system that supports project cards and optional rich case studies without a CMS or database.

## Required Context

Read:

- `../PROJECT_CONTEXT.md`
- this file

Read the MDX/content section of `../TECHNICAL_ARCHITECTURE.md` only if needed to resolve the loader implementation.

## Dependencies

Phases 01 and 04.

## Implementation Boundaries

### In Scope

- project MDX directory convention
- project metadata schema
- metadata validation
- content discovery/loading
- locale-aware project content strategy
- featured-project selection
- deterministic ordering
- case-study presence detection
- safe project URL metadata
- project image metadata
- build-time failure on malformed required content
- sample/demo content only as needed to prove the system

### Out of Scope

Do not build:

- final Home Featured Projects UI
- final Projects grid
- final Case Study page design
- filters/search
- CMS
- database
- Turkish content

## Content Location

Use a clear repository path such as:

```text
content/projects/
```

Choose a locale strategy that avoids duplicated metadata where practical while still supporting real translated project copy.

The system must be understandable to a developer editing content by hand.

## MDX Metadata

Prefer exported MDX metadata rather than YAML frontmatter.

Example shape:

```mdx
export const metadata = {
  slug: "example-project",
  title: "Example Project",
  description: "Short portfolio description.",
  category: "Web Application",
  technologies: ["Next.js", "TypeScript"],
  cover: {
    src: "/images/projects/example/cover.webp",
    alt: "Example project dashboard",
  },
  featured: true,
  hasCaseStudy: true,
  order: 10,
}
```

The exact field representation may differ if the locale architecture benefits from a cleaner typed approach, but it must satisfy the requirements below.

## Required Metadata Capabilities

Each project must expose:

- stable slug
- localized title
- localized short description
- category
- technology list
- cover image source
- localized image alt text when meaningful
- featured boolean
- case-study availability
- deterministic ordering value or equivalent

Optional:

- live/demo URL
- source/GitHub URL

Do not require optional links.

## Categories

Phase 1 categories must be capable of representing the approved service/project groupings without hard-coding filter UI.

No Phase 1 filter component should be created.

## Validation

Malformed content should fail early with a useful developer-facing error.

Validate:

- required fields
- valid slug
- non-empty title
- supported locale content
- technology array
- boolean fields
- safe URL shape when optional external URLs exist
- cover metadata

A small schema library is acceptable if justified and compatible.

Do not introduce an entire content framework for this schema.

## Content API

Later page phases should be able to request operations such as:

- all projects for locale
- featured projects for locale
- project by slug and locale
- whether case study exists
- available project slugs/static params

The API must execute server/build side.

Do not ship raw filesystem/content-discovery logic to the browser.

## Case Study Body

A project may have:

- metadata only
- metadata + MDX body

No empty case-study route should be created for metadata-only projects.

## MDX Safety

Content is trusted repository content.

Do not enable arbitrary remote/untrusted MDX execution.

Do not add runtime remote MDX fetching.

## Sample Content

Create only enough representative entries to exercise:

- featured/non-featured
- with/without case study
- English/Arabic behavior

If the user's real project data is not yet supplied, clearly mark sample content for replacement and do not invent claims about real clients/results.

## Tasks

1. Define project content directory convention.
2. Define TypeScript metadata type/schema.
3. Implement validation.
4. Implement locale-aware discovery/loading.
5. Implement deterministic sort.
6. Implement featured selection.
7. Implement slug lookup.
8. Implement case-study availability.
9. Add representative test content.
10. Add automated tests for content validation/loading.
11. Verify production build includes content paths successfully.

## Acceptance Criteria

- projects are authored as MDX inside repository
- no CMS/database exists
- listing metadata and case-study body do not require duplicated manually maintained project records
- malformed required metadata fails clearly
- project lookup by slug works
- locale-specific project data works
- featured list works
- projects without case studies remain valid
- case-study existence is known to consumers
- project order is deterministic
- content loading is server/build-side
- no Phase 2 filter/search UI exists

## Required Tests

At minimum test:

- valid project loads
- featured query
- deterministic ordering
- missing/invalid required metadata fails
- unknown slug returns no project
- case-study flag/body behavior
- English/Arabic content resolution

Run:

- lint
- typecheck
- build
- relevant unit/integration tests

E2E UI tests are not required until pages consume the system.

## Review Focus

- duplicate source-of-truth risk
- MDX loader compatibility with Next.js 16.3
- build-time behavior
- schema quality
- no runtime filesystem/client leakage
- no speculative content framework
