# Phase 01 — Project Foundation & Quality Tooling

## Goal

Create a clean, production-capable Next.js foundation with the minimum quality tooling needed for all later phases.

## Required Context

Read only:

- `../PROJECT_CONTEXT.md`
- this file

No additional planning document is required for normal implementation.

## Dependencies

None.

## Implementation Boundaries

### In Scope

- initialize/normalize the Next.js application
- TypeScript
- Tailwind CSS
- App Router
- standard source layout
- lint
- typecheck command
- production build command
- Playwright foundation
- axe accessibility-test foundation
- minimal smoke page required to verify the toolchain
- environment example foundation
- baseline repository hygiene

### Allowed Supporting Changes

- package scripts
- TypeScript configuration
- ESLint configuration
- Playwright configuration
- base CSS required to prove Tailwind works
- `.gitignore`
- `.env.example`
- minimal test helpers

### Out of Scope

Do not implement:

- final theme design
- language routing
- final navbar/footer
- MDX project system
- Home sections
- Projects UI
- About
- Contact delivery
- SEO completion
- VPS deployment

## Requirements

### Technology Baseline

Use mutually compatible current stable releases from the baseline in `PROJECT_CONTEXT.md`.

Do not use:

- canary
- beta
- RC
- experimental packages unless generated/required by stable framework behavior and explicitly justified

Use npm and commit `package-lock.json`.

### Next.js

Use App Router.

Keep the initial application minimal.

Do not create a large starter design that later phases need to delete.

### TypeScript

Use strict TypeScript settings appropriate to the framework.

Avoid disabling type safety to make the initial build pass.

### Tailwind

Confirm Tailwind is wired correctly.

Do not implement the final theme token system yet; Phase 03 owns it.

### Scripts

Provide clear package scripts for at least:

- `dev`
- `build`
- `start`
- `lint`
- `typecheck`
- E2E execution
- an aggregate verification/check command if it improves the workflow without duplicating logic

Commands must return non-zero on failure.

### Playwright

Set up Playwright for future critical-flow tests.

At this phase, include only a minimal smoke test proving the production/development app can be exercised.

Do not create placeholder tests for future features.

### Accessibility Test Foundation

Integrate axe with Playwright or establish the smallest reusable helper needed for later phase checks.

Use it on the minimal smoke surface only.

### Environment Handling

Create `.env.example` with comments/placeholder names only when a variable is already needed.

Do not invent future production secrets in Phase 01.

Ensure real `.env*` secret files remain ignored as appropriate.

### Repository Hygiene

- no generated build output in Git
- no Playwright report artifacts in Git
- no secrets
- no unnecessary starter assets
- no dead sample components

## Tasks

1. Inspect the repository and preserve any intentional existing setup.
2. Establish/verify Next.js App Router, React, TypeScript, Tailwind, and npm lockfile.
3. Remove only unused starter content that conflicts with the project foundation.
4. Configure lint.
5. Add explicit `typecheck`.
6. Verify production build.
7. Install/configure Playwright.
8. Add one meaningful smoke E2E check.
9. Add basic axe integration on the smoke page.
10. Add/normalize ignore rules for generated artifacts.
11. Add an aggregate local verification command if useful.
12. Run all Phase 01 quality gates.

## Acceptance Criteria

- application starts successfully in development
- production build succeeds
- TypeScript check succeeds
- lint succeeds
- Tailwind styles compile and apply
- Playwright smoke test passes
- automated axe smoke check has no blocking violation on the tested surface
- App Router is in use
- no future-phase UI has been implemented
- no secrets are committed
- package lockfile is present and consistent
- repository contains no unnecessary starter clutter that would confuse later phases

## Required Tests

Run:

- lint
- typecheck
- production build
- Phase 01 Playwright smoke test
- Phase 01 axe check

If browser binaries cannot be installed/run in the current environment, report the exact blocker; do not claim E2E success.

## Manual Verification

Confirm:

- root page renders
- no obvious console/runtime error
- basic responsive rendering does not overflow at a mobile viewport
- generated page has an understandable document title, even if final SEO is deferred

## Review Focus

Codex should particularly check:

- dependency/version compatibility
- no unnecessary framework complexity
- strict TypeScript is not bypassed
- test scripts actually execute
- the initial app remains intentionally minimal
