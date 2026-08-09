# Phase 04 — Internationalization & Routing

## Goal

Implement the complete Phase 1 English/Arabic routing and locale foundation.

## Required Context

Read only:

- `../PROJECT_CONTEXT.md`
- this file

## Dependencies

Phases 01 and 03.

## Implementation Boundaries

### In Scope

- English default URLs without prefix
- Arabic `/ar` URLs
- locale-aware shared rendering
- English LTR
- Arabic RTL
- localized shared strings/dictionaries
- language switcher primitive/control
- persisted manual locale choice
- browser-language Arabic suggestion
- path mapping between equivalent localized pages
- localized not-found behavior as practical

### Out of Scope

Do not implement:

- Turkish
- final navigation layout
- final Home copy
- full page SEO
- project MDX system
- automatic locale redirect

## URL Contract

English:

```text
/
/projects
/about
/contact
/projects/<slug>
```

Arabic:

```text
/ar
/ar/projects
/ar/about
/ar/contact
/ar/projects/<slug>
```

Do not create `/en` as a public canonical route.

## Locale Behavior

### English

Default/canonical locale.

### Arabic

Prefix: `/ar`.

Set correct:

- language
- direction
- typography hooks as needed

### Browser Detection

If browser preferences indicate Arabic and the user has not already made/dismissed an applicable choice:

- show a non-blocking suggestion
- allow accepting Arabic
- allow dismissing

Do not force navigation automatically.

### Manual Choice Persistence

Remember manual language preference.

A persisted Arabic preference may influence future UI/suggestions, but must not violate the approved URL behavior through unexpected forced redirects unless later explicitly approved.

## Language Switcher

Switch to the equivalent route when it exists.

Examples:

```text
/                  <-> /ar
/projects          <-> /ar/projects
/about             <-> /ar/about
/contact           <-> /ar/contact
/projects/example  <-> /ar/projects/example
```

Case-study locale availability will be integrated by later phases.

The language switch must be:

- keyboard accessible
- screen-reader understandable
- usable in both LTR and RTL

## Translation Structure

Use a small typed/localized dictionary structure for shared UI strings.

Do not install a heavy i18n platform unless implementation requirements demonstrate necessity.

Avoid duplicated page business logic.

## Directionality

Arabic must correctly affect:

- document direction
- text alignment semantics
- directional layout behavior
- icon orientation only where semantic direction matters

Do not mechanically mirror icons whose meaning should remain constant.

## Tasks

1. Design the smallest maintainable App Router locale structure satisfying the URL contract.
2. Implement locale resolution.
3. Implement shared English/Arabic dictionaries.
4. Apply `lang` and `dir`.
5. Implement reusable language switcher logic/control.
6. Implement equivalent-path mapping helper(s).
7. Implement browser-language suggestion logic.
8. Implement dismissal/choice persistence.
9. Add E2E coverage.
10. Add accessibility checks.
11. Verify no `/en` canonical public dependency.

## Acceptance Criteria

- English root works at `/`
- Arabic root works at `/ar`
- listed English/Arabic placeholder routes can be represented without duplicated page logic
- Arabic renders RTL
- English renders LTR
- no automatic browser-language redirect
- Arabic-browser first visit can receive a non-blocking suggestion
- suggestion can be dismissed
- manual locale choice persists as designed
- language switch preserves equivalent path for supported routes
- switching does not create broken `/en` URLs
- controls are accessible
- both themes still work

## Required Tests

Playwright:

- English root LTR
- Arabic root RTL
- English -> Arabic equivalent path
- Arabic -> English equivalent path
- browser Arabic suggestion appears under correct clean-storage conditions
- dismissal behavior
- no forced redirect
- persisted manual choice behavior
- theme still works in both locales

Run:

- lint
- typecheck
- build
- relevant axe checks

## Manual Verification

- keyboard language switch
- mobile viewport
- Arabic text direction
- mixed Latin technology names inside Arabic UI
- reload/deep-link on Arabic route
- direct navigation to English route with Arabic browser locale remains on requested route

## Review Focus

- URL contract
- no duplicated implementation trees without need
- correct document direction
- no forced redirect
- persistence edge cases
