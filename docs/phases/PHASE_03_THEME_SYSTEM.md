# Phase 03 — Theme System & Design Foundation

## Goal

Implement the shared visual token foundation and complete dark/light theme behavior, with Dark as the first-visit default.

## Required Context

Read only:

- `../PROJECT_CONTEXT.md`
- this file

Use the user-provided logo and color palette when available in the working context/assets.

## Dependencies

Phase 01.

## Implementation Boundaries

### In Scope

- semantic color/design tokens
- dark theme
- light theme
- Dark first-visit default
- theme switch control
- theme persistence
- hydration-safe initial theme application
- baseline typography/surface/focus styles
- reduced-motion base behavior where appropriate

### Out of Scope

Do not build:

- final Header
- final Footer
- language switcher
- Home sections
- project cards
- page-specific visual systems

Phase 05 and later own actual page compositions.

## Requirements

### Theme Values

Use semantic tokens rather than component-specific theme checks everywhere.

The project should be able to style common concepts such as:

- page background
- primary text
- muted text
- surface/card
- border
- primary/accent
- focus ring
- destructive/error
- success where needed

### Brand Palette

Use the supplied palette as the brand source, but adjust application/contrast as needed.

Do not force every palette color into the interface.

### Default Behavior

When no saved preference exists:

```text
theme = dark
```

Do not default to `prefers-color-scheme`.

### Persistence

When user explicitly chooses Light/Dark:

- persist the choice
- apply it on later visits

### Initial Render

Avoid a visible wrong-theme flash where reasonably possible.

Do not solve this with a large client provider if a smaller pattern is sufficient.

### Theme Switch Accessibility

The control must:

- be keyboard operable
- have a clear accessible name
- communicate current/target state appropriately
- have visible focus
- meet contrast requirements

### Motion

Base styling should respect reduced-motion preferences for non-essential transitions.

## Tasks

1. Inspect logo/palette assets.
2. Define shared semantic tokens for both themes.
3. Implement global theme application.
4. Implement first-visit Dark behavior.
5. Implement persisted user selection.
6. Implement accessible theme switch primitive/control suitable for later navigation.
7. Add a minimal theme demonstration surface if needed for testing; do not build final pages early.
8. Add tests for default/persistence behavior.
9. Run quality gates.

## Acceptance Criteria

- first new visit renders Dark
- Light can be selected
- Dark can be selected again
- explicit selection persists across reload
- OS theme does not override first-visit Dark
- no substantial theme flash is visible in normal loading
- both themes provide usable contrast on tested shared surfaces
- theme switch is keyboard accessible
- semantic tokens are reused rather than duplicating theme values in test/demo components
- no final page design has been implemented early

## Required Tests

Automated:

- lint
- typecheck
- build
- Playwright: first-visit Dark
- Playwright: switching to Light
- Playwright: persistence after reload
- axe on the theme-control demonstration surface

Manual:

- hard reload
- private/incognito/new-storage first visit
- keyboard control
- light/dark visual contrast
- no obvious flash

## Review Focus

- hydration correctness
- storage access only in browser-safe contexts
- no system-theme default regression
- no unnecessary theme dependency
- accessible control semantics
