# CLAUDE.md

@docs/PROJECT_CONTEXT.md

## Purpose

Claude Code is the primary implementation agent for this project.

Implement the requested phase exactly as specified, keep the change set focused, and leave the repository ready for an independent Codex review before any commit.

## Required Execution Context

For every implementation phase:

1. Use the imported `docs/PROJECT_CONTEXT.md` as the global project context.
2. Read the single phase file explicitly named by the user under `docs/phases/`.
3. Do not read other planning/specification documents unless the current phase file explicitly requires one or the implementation is genuinely blocked without it.
4. The documentation limit above does not restrict normal inspection of source code, configuration, tests, assets, or existing components needed to implement the phase.
5. If the requested phase file is unclear or missing, ask the user instead of guessing the active phase.

The normal documentation context for implementation must remain:

- `docs/PROJECT_CONTEXT.md`
- The current `docs/phases/PHASE_XX_*.md`

Do not expand the documentation context without a concrete reason.

## Implementation Workflow

Before editing:

- Inspect the current Git status and branch.
- Implementation work is expected on `develop`.
- If the current branch is not `develop`, stop and tell the user before modifying files.
- Preserve unrelated user changes already present in the working tree.
- Inspect the existing implementation before deciding what needs to change.

During implementation:

- Implement only the active phase.
- Follow its `Implementation Boundaries`, scope, requirements, acceptance criteria, and test requirements.
- Reuse working project patterns and existing components where appropriate.
- Prefer the simplest implementation that fully satisfies the specification.
- Do not introduce abstractions, infrastructure, dependencies, or configuration for hypothetical future needs.
- Do not implement features assigned to future phases.
- Do not silently change an approved product or architecture decision.
- If a real conflict exists between the codebase and the specification, report it rather than inventing a new project decision.

## UI and Visual Implementation

- User-provided visual references for the active section or phase take precedence over generic design assumptions.
- Reuse ready-made components supplied or already adopted by the project when they fit the required design and behavior.
- Modify or replace a ready-made component only when necessary for correctness, accessibility, responsiveness, maintainability, or performance.
- Do not redesign unrelated sections while implementing the active phase.
- Keep both supported themes and both supported languages in mind whenever the changed surface requires them.
- Do not trade usability, accessibility, or performance for decorative effects.

If a phase requires a specific visual direction and no required reference has been supplied, ask before inventing a materially different design.

## Engineering Rules

- Keep TypeScript strict and avoid unnecessary `any`.
- Prefer server-rendered/static code by default; add client-side JavaScript only where interaction requires it.
- Keep client-component boundaries as small as practical.
- Avoid unnecessary dependencies. Before adding a production dependency, confirm that the functionality is not already available in the project or reasonably simple to implement with the existing stack.
- Keep secrets and environment-specific values out of source control.
- Do not add a database, CMS, authentication system, or backend infrastructure unless the active phase explicitly requires it.
- Preserve accessibility, responsive behavior, SEO foundations, internationalization, and performance on any surface touched by the phase.
- Do not perform unrelated refactors, formatting sweeps, dependency upgrades, or cleanup.

## Validation

Run the checks required by the active phase.

When the project tooling is available, the normal quality gates are:

- lint
- TypeScript/type checking
- production build
- phase-specific automated tests
- relevant E2E tests
- relevant accessibility checks

Also perform targeted manual verification when the phase requires behavior that automated checks do not adequately cover.

Never claim a check passed unless it was actually run successfully.

If a required check cannot run because of the environment, dependency, credential, external service, or missing prerequisite, report the exact blocker.

## Git and Deployment Safety

- Do not create commits.
- Do not push.
- Do not merge branches.
- Do not deploy.
- Do not rewrite Git history.
- Do not discard unrelated working-tree changes.

The intended workflow is:

`Claude implementation -> validation -> Codex review -> fixes if required -> Codex re-review -> user-approved commit`

Production deployment is triggered later by the repository's GitHub Actions workflow when approved changes reach `main`.

## Definition of Done

A phase implementation is complete only when:

- The phase requirements and acceptance criteria are satisfied.
- The implementation stays inside the phase boundaries.
- Required validation has passed, or any blocker is explicitly reported.
- No known regression introduced by the phase remains unresolved.
- The working tree is left uncommitted for Codex review.

At completion, give the user a concise implementation summary containing:

- what changed
- important files changed
- validation/tests run and their results
- any unresolved blocker or decision still requiring the user
- confirmation that no commit was created
