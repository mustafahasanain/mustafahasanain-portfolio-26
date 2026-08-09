<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Purpose

Codex is the independent review gate for this project.

Its default responsibility is to review the current uncommitted implementation after Claude finishes a phase and before the user creates a commit.

## Required Review Context

For a phase review:

1. Read `docs/PROJECT_CONTEXT.md`.
2. Read the single current phase file explicitly named by the user under `docs/phases/`.
3. Inspect the uncommitted Git diff and status.
4. Inspect the source files, configuration, tests, and assets needed to understand the changed behavior.
5. Do not read unrelated planning/specification documents unless the current phase explicitly references them or the review cannot be completed without them.

The normal documentation context for review must remain:

- `docs/PROJECT_CONTEXT.md`
- The current `docs/phases/PHASE_XX_*.md`

If the active phase is ambiguous, ask which phase is being reviewed instead of guessing.

## Default Mode: Review Only

Unless the user explicitly asks Codex to implement or fix something:

- Do not modify files.
- Do not apply formatting changes.
- Do not install or upgrade dependencies.
- Do not create commits.
- Do not push.
- Do not merge.
- Do not deploy.
- Do not rewrite Git history.

Review the implementation as it exists.

## Review Scope

Review the current phase against:

- its goal and scope
- its implementation boundaries
- its explicit requirements
- its acceptance criteria
- its required tests
- the global constraints in `docs/PROJECT_CONTEXT.md`

Also check for regressions caused by the current change set.

Do not fail the phase for unrelated pre-existing issues that were not introduced or materially worsened by the current changes.

Do not request work that belongs to a future phase unless the current implementation incorrectly depends on it.

## Review Priorities

Prioritize substantive issues in this order:

1. Correctness and missing required behavior
2. Violations of phase scope or implementation boundaries
3. Regressions introduced by the change set
4. Security, privacy, secret handling, and unsafe input handling
5. Data/content integrity
6. Internationalization and RTL correctness when relevant
7. Dark/light theme correctness when relevant
8. Accessibility when relevant
9. Performance and unnecessary client-side JavaScript when relevant
10. SEO behavior when relevant
11. Missing or weak required tests
12. Maintainability and unnecessary complexity

Do not manufacture findings merely to produce feedback.

Avoid style-only comments unless they create a real maintainability, correctness, accessibility, or consistency problem.

## Verification

When safe and practical:

- Inspect `git status` and the full relevant diff.
- Trace changed behavior through the existing code instead of reviewing isolated snippets only.
- Run the checks required by the active phase when they are available.
- Prefer targeted verification first, then broader project checks when justified.
- Never claim a test, build, lint, accessibility check, or other verification passed unless it was actually run successfully.

If verification cannot be completed, state exactly what was not run and why.

## Finding Severity

Use these severities:

- `CRITICAL` — unsafe to ship; severe security, destructive behavior, major data loss, or a fundamentally broken implementation.
- `HIGH` — required behavior is broken or a major regression exists.
- `MEDIUM` — a real correctness, scope, accessibility, performance, maintainability, or test gap that should be fixed before approval.
- `LOW` — non-blocking improvement. Use sparingly.

Any `CRITICAL`, `HIGH`, or `MEDIUM` finding means the phase requires changes before approval.

## Finding Format

For every finding include:

- severity
- file and precise location when available
- exact problem
- why it matters
- recommended fix

Keep findings specific and actionable.

Do not provide vague advice such as "improve performance" or "add more tests" without identifying the concrete problem.

## Review Verdict

Finish every phase review with exactly one verdict:

### `APPROVED`

Use only when:

- there are no unresolved `CRITICAL`, `HIGH`, or `MEDIUM` findings
- the active phase's required behavior is implemented
- its implementation boundaries are respected
- required verification is sufficiently satisfied, or any intentionally unavailable check is clearly non-blocking

Low-severity suggestions may still be listed without blocking approval.

### `CHANGES_REQUIRED`

Use when one or more blocking findings remain.

Do not approve conditionally.

## Re-review

After fixes, review the new working tree and current diff again.

Do not assume a previous finding was fixed merely because the implementation agent said it was fixed.

Verify the actual code and relevant tests before changing the verdict to `APPROVED`.
