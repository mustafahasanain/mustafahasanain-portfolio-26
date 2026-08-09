# Phase 10 — About & CV

## Goal

Implement a concise bilingual About page and reliable localized CV View/Download actions.

## Required Context

Read:

- `../PROJECT_CONTEXT.md`
- this file

Use the user-supplied About visual reference and actual CV files when provided.

## Dependencies

Phase 05.

## Implementation Boundaries

### In Scope

- About page
- professional introduction
- work focus
- experience summary
- work/thinking approach
- skills/technologies summary
- concise experience section
- View CV
- Download CV
- locale-aware CV selection
- responsive design
- both themes/locales

### Out of Scope

Do not implement:

- a separate Resume page
- timeline/CV data management system
- ATS parser
- editable profile admin
- testimonials
- pricing
- availability status

## About Content Principles

The page should feel personal and professional.

It should answer:

- who Mustafa is
- what kind of work he does
- how he approaches work
- what experience/technical foundation supports that work

Do not copy the entire CV into HTML.

Do not make unsupported claims.

## CV Files

Store public CV PDFs in an intentional public/static location.

Use actual supplied PDFs.

Do not fabricate CV content.

Expected behavior:

### View CV

- opens the matching PDF for viewing
- generally may open in a new browser tab
- accessible link label communicates action

### Download CV

- initiates or strongly indicates download behavior using standard web capabilities
- filename should be clear and professional

Locale preference:

- English page -> English CV
- Arabic page -> Arabic CV

If a locale PDF is missing at implementation time:

- report the missing asset
- do not silently use a fake file

## External/Personal Details

Only display approved personal contact/profile details.

Do not infer employer history, dates, education, addresses, or other resume facts.

## Tasks

1. Inspect provided About design reference.
2. Prepare approved English/Arabic About copy structure.
3. Implement About sections.
4. Integrate technology/skill presentation.
5. Add concise experience presentation.
6. Add actual CV assets.
7. Implement View CV.
8. Implement Download CV.
9. Verify locale mapping.
10. Verify themes/responsiveness.
11. Add tests.

## Acceptance Criteria

- About is concise rather than a full resume duplicate
- English and Arabic content are complete
- Arabic RTL works
- Dark and Light work
- View CV targets correct real PDF
- Download CV targets correct real PDF
- locale uses matching CV
- links are keyboard accessible
- PDFs are not accidentally bundled through an inefficient client path
- no separate resume page exists
- no fabricated personal/professional facts are added

## Required Tests

Playwright:

- English About
- Arabic About
- English View CV href/status
- Arabic View CV href/status
- Download links/attributes and file reachability
- mobile layout

axe:

- English About
- Arabic About

Run:

- lint
- typecheck
- build

## Manual Verification

- open both PDFs
- download both PDFs
- filenames
- mobile layout
- long Arabic text
- technology icon accessible treatment

## Review Focus

- duplicate resume problem
- missing/incorrect locale CV mapping
- broken download semantics
- invented content
