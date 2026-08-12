<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


\

# AGENTS.md

## Purpose

Codex is used in this project for two distinct roles:

1. **Implementation Mode** — implement the current project phase.
2. **Review Mode** — independently review the current uncommitted implementation before commit.

The user's prompt determines the active mode.

Do not mix Implementation Mode and Review Mode in the same task unless the user explicitly requests it.

`CLAUDE.md` is intended for Claude Code and is not required context for Codex.

---

## Required Context

For normal phase work, read only:

1. `docs/PROJECT_CONTEXT.md`
2. The single current phase file explicitly named by the user under `docs/phases/`

Example:

```text
docs/PROJECT_CONTEXT.md
docs/phases/PHASE_01_PROJECT_FOUNDATION.md
````

Do not read all project documentation by default.

Do not read unrelated planning or specification files unless:

* the current phase explicitly references one
* a required implementation detail cannot be resolved from the normal context
* a real conflict exists between the codebase and the current phase

The documentation-context limit does not restrict inspection of:

* source code
* configuration
* tests
* assets
* package files
* Git diff/status
* existing components

needed to complete or review the current phase.

If the current phase is ambiguous or missing, ask the user instead of guessing.

---

# Mode 1 — Implementation Mode

Use Implementation Mode when the user explicitly asks Codex to:

* implement a phase
* build a feature
* fix review findings
* make requested code changes

In Implementation Mode, file modifications are allowed.

## Before Implementation

Before making changes:

1. Inspect the current Git branch.
2. Inspect `git status`.
3. Inspect the existing implementation relevant to the phase.
4. Preserve unrelated existing user changes.
5. Confirm the work belongs to the current phase.

Normal implementation work is expected on:

```text
develop
```

If the current branch is not `develop`, stop and tell the user before modifying files unless the user explicitly instructs otherwise.

---

## Implementation Rules

Implement the current phase completely according to its:

* Goal
* Dependencies
* Implementation Boundaries
* Scope
* Requirements
* Tasks
* Acceptance Criteria
* Required Tests
* Out of Scope

Stay strictly inside the current phase.

Do not:

* implement functionality assigned to future phases
* make unrelated refactors
* perform formatting sweeps unrelated to the task
* introduce speculative abstractions
* introduce speculative infrastructure
* add dependencies without a concrete requirement
* silently change approved product decisions
* silently change approved architecture decisions
* discard unrelated working-tree changes
* redesign unrelated pages or components
* add Phase 2 functionality during Phase 1

If the codebase conflicts with an approved requirement, report the conflict instead of silently inventing a new project decision.

---

## Implementation Approach

Prefer the simplest implementation that fully satisfies the current phase.

Reuse existing:

* project patterns
* components
* utilities
* configuration

when they are suitable.

Do not create abstractions for hypothetical future requirements.

Do not replace working code merely because another implementation is possible.

For interactive Next.js code:

* prefer Server Components by default
* use Client Components only where browser interaction requires them
* keep client boundaries as small as practical
* avoid unnecessary client-side JavaScript

---

## UI and Visual Implementation

When the user provides a visual reference for the current phase:

* inspect it before implementation
* treat it as the visual direction for that surface
* adapt it to the project's approved architecture
* preserve accessibility
* preserve responsive behavior
* preserve performance
* support both themes when the theme system exists
* support both languages when internationalization exists

Do not blindly reproduce inaccessible or inefficient behavior from a reference.

Ready-made components may be used when appropriate.

Modify or replace them only when required for:

* correctness
* accessibility
* responsiveness
* maintainability
* performance
* compatibility with the approved design

Do not redesign unrelated sections.

---

## Missing Inputs

Never invent important project-specific values.

Examples include:

* credentials
* server addresses
* domain names
* contact details
* social URLs
* CV files
* project facts
* client names
* project metrics
* deployment paths
* design references when the phase explicitly depends on one

If part of the phase is blocked by missing information:

1. complete any independent work that can safely be completed
2. stop on the blocked portion
3. clearly identify exactly what input is required

---

## Dependencies

Avoid unnecessary dependencies.

Before adding a production dependency, determine whether:

* the project already provides the capability
* the framework provides the capability
* the requirement can reasonably be implemented with existing tools

If a new dependency is justified:

* use a stable compatible release
* keep its scope focused
* do not introduce a large framework for a small problem

---

## Security and Secrets

Never commit secrets.

Keep server secrets out of client bundles.

Do not expose:

* API tokens
* passwords
* private keys
* SMTP credentials
* Telegram bot tokens
* deployment credentials

through source code, logs, browser responses, or committed environment files.

Validate untrusted input on the server.

---

## Validation During Implementation

Run all checks required by the current phase.

As the project develops, these may include:

* lint
* TypeScript/type checking
* production build
* unit/integration tests
* Playwright E2E tests
* automated accessibility checks
* phase-specific validation

Perform targeted manual verification where automation does not adequately cover the behavior.

Never claim that a check passed unless it was actually run successfully.

If a required check cannot run, report:

* what was not run
* why it could not run
* whether the limitation blocks phase completion

---

## Implementation Completion Report

At the end of Implementation Mode, report:

* what changed
* important files changed
* validation/tests run
* exact validation/test results
* blockers or unresolved decisions
* manual verification still required
* confirmation that the implementation remains uncommitted

Leave the working tree ready for an independent review.

---

# Mode 2 — Review Mode

Use Review Mode when the user explicitly asks Codex to:

* review
* inspect
* audit
* verify the implementation
* perform a Codex review
* re-review fixes

Review Mode is independent from Implementation Mode.

A fresh Codex session is preferred for review.

---

## Review-Only Rule

In Review Mode:

* do not modify files
* do not fix findings
* do not apply formatting
* do not install dependencies
* do not upgrade dependencies
* do not create commits
* do not push
* do not merge
* do not deploy
* do not rewrite Git history

Review the implementation exactly as it currently exists.

If fixes are required, report them and leave implementation to a separate Implementation/Fix task.

---

## Review Inputs

Inspect:

1. `docs/PROJECT_CONTEXT.md`
2. the current phase file
3. current Git branch
4. `git status`
5. the full relevant uncommitted diff
6. affected source code
7. affected configuration
8. relevant tests
9. related existing code needed to understand behavior

Do not review isolated diff snippets when understanding the surrounding implementation is necessary.

---

## Review Scope

Review the implementation against the current phase:

* Goal
* Dependencies
* Implementation Boundaries
* Scope
* Requirements
* Tasks
* Acceptance Criteria
* Required Tests
* Out of Scope

Also check for regressions introduced by the current change set.

Do not fail the current phase for unrelated pre-existing issues unless the phase:

* introduced them
* materially worsened them
* depends on them in a way that makes the implementation incorrect

Do not request work belonging to future phases.

---

## Review Priorities

Prioritize substantive issues in this order:

1. Correctness
2. Missing required behavior
3. Phase-scope violations
4. Implementation-boundary violations
5. Regressions
6. Security and privacy
7. Secret handling
8. Data/content integrity
9. Internationalization and RTL correctness when relevant
10. Dark/Light theme correctness when relevant
11. Accessibility when relevant
12. Performance when relevant
13. Unnecessary client-side JavaScript
14. SEO behavior when relevant
15. Missing or insufficient required tests
16. Maintainability
17. Unnecessary complexity

Do not manufacture findings merely to produce feedback.

Avoid style-only comments unless they represent a real:

* correctness
* maintainability
* accessibility
* performance
* consistency

problem.

---

## Review Verification

When safe and practical:

* run checks required by the current phase
* run targeted tests first
* run broader project checks when justified
* verify claimed behavior in the actual implementation

Never claim a test, build, lint, accessibility check, or other verification passed unless it was actually run successfully.

If something cannot be verified, say exactly what was not verified and why.

---

## Finding Severity

Use only these severities:

### CRITICAL

Unsafe to ship.

Examples:

* severe security vulnerability
* destructive behavior
* major data loss risk
* fundamentally broken implementation

### HIGH

Major required behavior is broken or a serious regression exists.

### MEDIUM

A real issue that should be fixed before approval, including:

* correctness gap
* scope violation
* accessibility problem
* significant performance issue
* maintainability problem
* missing required test

### LOW

Non-blocking improvement.

Use LOW sparingly.

Any unresolved:

* CRITICAL
* HIGH
* MEDIUM

finding blocks approval.

---

## Finding Format

For every finding include:

* severity
* file path
* precise location when available
* exact problem
* why it matters
* recommended fix

Findings must be specific and actionable.

Do not write vague findings such as:

```text
Improve performance.
```

Instead identify the exact cause and location.

---

## Review Verdict

Finish every Review Mode task with exactly one verdict.

### APPROVED

Use only when:

* there are no unresolved CRITICAL findings
* there are no unresolved HIGH findings
* there are no unresolved MEDIUM findings
* required phase behavior is implemented
* implementation boundaries are respected
* required verification is sufficiently complete

LOW findings may remain without blocking approval.

### CHANGES_REQUIRED

Use when one or more blocking findings remain.

Do not use conditional approval.

---

## Re-review

When reviewing fixes:

* inspect the current working tree again
* inspect the new diff
* verify each previous blocking finding against the actual code
* rerun relevant tests where appropriate
* check whether the fix introduced a regression

Do not assume a finding is resolved simply because the implementation agent says it was fixed.

---

# Git and Deployment Safety

Unless the user explicitly instructs otherwise:

* do not commit
* do not push
* do not merge
* do not rewrite Git history

Deployment is allowed only when:

1. the active phase explicitly requires deployment work or testing, **and**
2. the user has explicitly authorized the required deployment action and provided the necessary real environment details.

Never deploy merely because implementation appears complete.

---

# Project Workflow

The intended Phase 1 workflow is:

```text
Codex Implementation
        ↓
Validation / Tests
        ↓
Codex Review in a fresh session
        ↓
Fixes if required
        ↓
Codex Re-review
        ↓
APPROVED
        ↓
User Commit
        ↓
User Push
```

Production flow:

```text
develop
   ↓
approved merge to main
   ↓
GitHub Actions
   ↓
Hostinger VPS
```

---

# Global Definition of Done

An implementation phase is ready for commit only when:

* its requirements are satisfied
* its acceptance criteria are satisfied
* its implementation boundaries are respected
* required validation has passed or any legitimate blocker is explicitly resolved
* no known blocking regression remains
* independent Review Mode returns `APPROVED`

Do not treat implementation completion and review approval as the same step.
