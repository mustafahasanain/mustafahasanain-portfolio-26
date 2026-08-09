# Implementation Plan

## 1. Purpose

This document defines the execution order for Phase 1.

The project uses small, reviewable implementation phases.

Each phase has its own file under `docs/phases/`.

## 2. Runtime Context Rule

Normal implementation context is intentionally limited to:

1. `docs/PROJECT_CONTEXT.md`
2. the current phase file

Do not read every specification file before each phase.

A phase may explicitly name an additional reference only when required.

## 3. Standard Phase Workflow

For each implementation phase:

```text
1. Confirm develop branch and inspect working tree
2. Read PROJECT_CONTEXT + current phase
3. Inspect relevant existing code
4. Implement only the current phase
5. Run required validation
6. Leave changes uncommitted
7. Run Codex review
8. Fix blocking findings
9. Re-run relevant validation
10. Run Codex re-review when needed
11. User commits approved work
12. User pushes develop
```

Production deployment happens after approved work reaches `main`.

## 4. Phase Order

### Phase 01 — Project Foundation & Quality Tooling

Establish a clean Next.js foundation and the quality/testing toolchain.

**Depends on:** none

### Phase 02 — VPS Deployment & GitHub Actions

Create the production delivery path early so later work is continuously deployable.

**Depends on:** Phase 01

### Phase 03 — Theme System & Design Foundation

Implement shared theme tokens, dark/light behavior, and first-visit dark default.

**Depends on:** Phase 01

### Phase 04 — Internationalization & Routing

Implement English default routes, Arabic `/ar`, RTL, language switching, persistence, and browser-language suggestion.

**Depends on:** Phases 01 and 03

### Phase 05 — Shared Layout & Navigation

Build global shell, navigation, footer, primary CTA behavior, and shared responsive foundations.

**Depends on:** Phases 03 and 04

### Phase 06 — MDX Content System

Build project/case-study content loading, metadata validation, and project data API for pages/components.

**Depends on:** Phases 01 and 04

### Phase 07 — Home Page

Implement the conversion-focused homepage using the supplied section references.

**Depends on:** Phases 05 and 06

### Phase 08 — Projects Page

Implement the project-card grid without filters.

**Depends on:** Phases 05 and 06

### Phase 09 — Project Case Studies

Implement selected MDX case-study routes and content rendering.

**Depends on:** Phases 05, 06, and 08

### Phase 10 — About & CV

Implement concise About experience and localized CV view/download actions.

**Depends on:** Phase 05

### Phase 11 — Contact & Lead Delivery

Implement contact page/form and email + Telegram delivery without a database.

**Depends on:** Phase 05

### Phase 12 — SEO & Discoverability

Complete localized metadata, canonical/alternate URLs, sitemap, robots, social metadata, and project metadata.

**Depends on:** Phases 04, 06, 07, 08, 09, 10, and 11

### Phase 13 — Final QA, Performance & Launch Readiness

Complete end-to-end verification, accessibility, performance, responsive checks, and production readiness.

**Depends on:** all previous phases

## 5. Deployment Policy During Build

GitHub Actions deploys `main`.

Implementation normally stays on `develop` until approved.

The user decides when approved work is merged to `main`.

A phase is not automatically merged merely because its Codex review passes.

## 6. Cross-Phase Change Rule

A phase may update earlier code when required to integrate its own feature.

It may not implement future-phase functionality early.

If a later phase reveals a defect in an earlier foundation:

- fix the minimum necessary defect
- include regression coverage when appropriate
- document the reason in the phase summary

## 7. Design Reference Rule

Detailed visual design is intentionally phase-local.

When the user provides a reference for a section/page:

- inspect it before implementation
- match its intended composition and behavior
- adapt it to the project's theme, language, accessibility, and performance rules
- do not blindly copy code or inaccessible behavior from a reference

If required design direction is missing and the phase cannot be implemented without inventing a major design decision, ask the user.

## 8. Quality Gate Policy

No phase should be approved with known blocking failures in checks required by its phase file.

Normal global checks grow over time as tooling/features are introduced.

By final QA the project must have working:

- lint
- typecheck
- production build
- critical E2E suite
- automated accessibility checks
- production-like Lighthouse verification

## 9. Scope Discipline

The implementation plan intentionally avoids:

- separate phase per tiny component
- speculative backend foundation
- early Phase 2 work
- large refactors between phases
- broad component-library migrations
- premature performance rewrites before measurement

## 10. Phase 1 Completion

Phase 1 is complete only after Phase 13 is approved and the production deployment path is verified with the launch-ready code.
