# Technical Architecture

## 1. Purpose

This document defines the shared architecture for the Phase 1 portfolio implementation.

It is a reference document, not normal runtime context. Implementation agents should read it only when a phase explicitly points here or a genuine architectural conflict requires it.

## 2. Architecture Goals

The architecture should optimize for:

1. high performance
2. excellent SEO
3. simple repository-driven content
4. strong accessibility
5. bilingual support
6. straightforward VPS self-hosting
7. low operational complexity
8. easy future maintenance
9. minimal unnecessary client JavaScript
10. no speculative infrastructure

## 3. Baseline Technology Stack

Baseline verified on 2026-08-09 from official release/documentation sources:

- **Next.js:** 16.3 stable line
- **React / React DOM:** 19.2 stable line
- **TypeScript:** 7.0 stable line
- **Tailwind CSS:** 4.3 stable line
- **Node.js:** 24 LTS
- **Package manager:** npm
- **Router:** Next.js App Router
- **E2E:** Playwright
- **Automated accessibility:** axe integration with Playwright
- **Content:** MDX inside the repository
- **Deployment:** GitHub Actions to Hostinger VPS

Patch versions should be locked by `package-lock.json`.

Do not move to canary/beta/RC versions as part of ordinary phase work.

## 4. Application Rendering Model

Use the App Router.

Default approach:

- Server Components for non-interactive UI
- static generation where content permits
- dynamic/server execution only where required
- Client Components for browser-only interaction

Expected client-side features include only necessary concerns such as:

- theme switch
- language preference/suggestion UI
- navigation interactions that require client state
- contact form interaction
- explicitly approved interactive visual components

Avoid marking broad page trees with `"use client"`.

## 5. Suggested Repository Structure

The exact generated Next.js boilerplate may vary, but the architecture should stay close to:

```text
.
├── AGENTS.md
├── CLAUDE.md
├── docs/
│   ├── PROJECT_CONTEXT.md
│   ├── PROJECT_SPEC.md
│   ├── TECHNICAL_ARCHITECTURE.md
│   ├── IMPLEMENTATION_PLAN.md
│   ├── PHASE_2_BACKLOG.md
│   └── phases/
├── public/
│   ├── images/
│   └── cv/
├── content/
│   └── projects/
├── src/
│   ├── app/
│   ├── components/
│   ├── content/
│   ├── lib/
│   ├── styles/
│   └── types/
├── tests/
│   └── e2e/
└── ...
```

Do not create folders merely to match this diagram if no code belongs in them yet.

## 6. Styling Architecture

Tailwind CSS is the base styling system.

Use semantic design tokens for shared values instead of scattering brand-specific hard-coded values through components.

Tokens should cover at least:

- background surfaces
- foreground/text
- muted text/surfaces
- primary/accent
- borders
- focus ring
- success/error states where used

The supplied palette should inform the token values, but accessibility takes precedence over literal palette usage.

## 7. Theme Architecture

Themes:

- `dark`
- `light`

First visit:

- `dark`

Persistence:

- store explicit user choice locally in a small client-safe mechanism

Hydration:

- avoid visible theme flash as far as practical
- do not create a large theme runtime

System theme is not the default source of truth in Phase 1.

The theme switch must be keyboard accessible and expose an understandable accessible name/state.

## 8. Internationalization Architecture

Required public URL behavior:

English:

- `/`
- `/projects`
- `/projects/<slug>`
- `/about`
- `/contact`

Arabic:

- `/ar`
- `/ar/projects`
- `/ar/projects/<slug>`
- `/ar/about`
- `/ar/contact`

Requirements:

- shared page/business logic rather than duplicated implementation
- locale-aware dictionaries/content
- document language set correctly
- document direction set correctly
- Arabic RTL
- English LTR
- localized metadata
- localized navigation
- localized project content where content is available

Implementation should use the smallest maintainable routing approach supported by the stable Next.js App Router.

Do not introduce a heavy i18n library unless the requirements demonstrate a real need beyond a small two-locale implementation.

## 9. Language Preference and Browser Detection

Browser language detection may only trigger a suggestion.

Never force redirect because of browser locale.

Manual language selection should persist.

The language switcher should preserve the equivalent page when possible.

Examples:

- `/projects` -> `/ar/projects`
- `/ar/about` -> `/about`

When an equivalent localized case study does not exist, behavior must be deliberate and non-broken; do not fabricate translated content.

## 10. MDX Content Architecture

Projects and case studies are repository content.

Preferred source:

```text
content/projects/
```

A project entry must support structured metadata required by cards and SEO plus optional rich MDX body content for a case study.

Prefer native MDX exports such as:

```mdx
export const metadata = {
  slug: "example-project",
  title: "Example Project",
  category: "Web Application",
  technologies: ["Next.js", "TypeScript"],
  featured: true,
  hasCaseStudy: true,
}
```

Do not add a YAML frontmatter parser unless it provides a concrete implementation benefit.

### Project Metadata Model

The validated metadata model should support at least:

- `slug`
- localized title or locale-specific entry strategy
- short description
- category
- technologies
- cover/preview image
- featured flag
- case-study availability
- optional public demo URL
- optional source URL, only where intentionally public
- image alt text
- optional sort/order control

Avoid fields with no current consumer.

### Validation

Content metadata should be validated at build time so malformed project data fails early.

Use a lightweight schema approach already present or justified by Phase 06. Do not add a large content platform.

## 11. Content Loading

Content discovery/loading must:

- work at build/runtime in the chosen self-hosted Next.js environment
- avoid client-side filesystem access
- provide deterministic project ordering
- generate static params where appropriate
- provide a clean not-found outcome for invalid slugs
- avoid duplicate metadata definitions between list cards and case-study content

If official/native MDX tooling cannot satisfy the project index/dynamic-route requirement cleanly, Phase 06 may add one focused MDX loading/compilation dependency after verifying current compatibility.

## 12. Image Strategy

Use Next.js image optimization where appropriate.

Requirements:

- meaningful dimensions/aspect ratios
- avoid CLS
- responsive sizes
- descriptive alt text for meaningful images
- empty alt for purely decorative imagery where appropriate
- no oversized source assets without reason
- project screenshots should preserve enough clarity to be credible

Remote image hosts should not be allowed broadly. Prefer local/public project assets for final portfolio content.

## 13. Font Strategy

Prefer optimized local or framework-managed web fonts.

Requirements:

- Latin support
- Arabic support
- appropriate font fallback
- avoid excessive font families/weights
- prevent unnecessary layout shift

The exact font choice belongs to design implementation.

## 14. Contact Architecture

### Request Path

```text
Browser
  -> Next.js server endpoint/action
      -> input validation
      -> abuse controls
      -> email delivery
      -> Telegram notification attempt
  -> response to browser
```

### Data Storage

No database.

Do not persist lead bodies to application storage in Phase 1.

Server logs must not unnecessarily print full lead contents or secrets.

### Validation

Server-side validation is mandatory.

Client-side validation is UX enhancement only and cannot be trusted as the security boundary.

### Email

Email is the authoritative delivery path.

The exact provider/SMTP transport must be selected using real available credentials/infrastructure at implementation time.

Do not hard-code provider secrets.

### Telegram

Use a Telegram Bot token and target chat identifier stored in server-side environment variables.

If Telegram fails after email succeeds:

- submission remains successful
- log a safe server-side notification failure
- do not expose secrets/internal error details to the visitor

### Abuse Protection

Start with practical measures such as:

- server validation
- request size limits
- honeypot or equivalent low-cost bot signal
- conservative rate limiting appropriate to the deployment
- generic public errors

Do not introduce CAPTCHA unless spam risk justifies it or the user explicitly approves it.

## 15. Environment Variables

Use environment variables for server secrets/configuration.

Expected categories may include:

- email transport credentials/config
- destination contact email
- Telegram bot token
- Telegram chat ID
- production origin/site URL

Provide an `.env.example` containing names and safe descriptions only.

Never commit real values.

## 16. SEO Architecture

Use official Next.js metadata APIs.

Requirements include:

- per-page title/description
- localized metadata
- canonical URLs
- language alternates/hreflang
- Open Graph
- Twitter/X-compatible social metadata where useful
- robots
- sitemap
- project case-study metadata
- meaningful 404 behavior

Structured data may be added only where it accurately describes available content.

Do not add fake ratings, review schema, employer schema, or business claims.

## 17. Accessibility Architecture

The baseline target is WCAG-minded implementation with automated and manual checks.

Required patterns include:

- semantic landmarks
- correct heading levels
- accessible names
- keyboard interaction
- focus visibility
- valid form labels and errors
- logical reading order
- theme contrast
- RTL correctness
- reduced-motion handling
- no hover-only access to essential information

Automated axe success is not proof of complete accessibility; manual checks remain required.

## 18. Testing Architecture

### Static Quality Gates

- ESLint
- TypeScript
- production build

### E2E

Use Playwright for critical flows, not exhaustive snapshot testing.

Representative flows:

- English navigation
- Arabic navigation/RTL
- language switching
- theme switching/persistence
- project listing/case-study navigation
- CV view/download links
- contact form success/failure behavior at an appropriate test boundary

### Accessibility

Integrate axe into selected representative Playwright pages/flows.

### Unit/Integration

Only introduce when useful for meaningful logic such as:

- content validation
- locale path helpers
- form validation
- similar deterministic logic

Do not unit-test trivial CSS wrappers.

## 19. Lighthouse and Performance Validation

Final validation must run against a production build or production deployment, not dev mode.

Representative routes should include:

- Home
- Projects
- one Case Study
- About
- Contact
- Arabic Home or equivalent key Arabic page

Target:

- >90 in all core Lighthouse categories

If a specific third-party/visual component causes a material regression, optimize or replace it.

## 20. GitHub Actions Architecture

### Branch Trigger

Production deployment runs on push to:

```text
main
```

### Expected Deployment Shape

A minimal secure workflow should:

1. check out the exact commit
2. run quality/build verification as appropriate
3. establish SSH connectivity with secrets
4. deploy the approved commit to the VPS
5. install using lockfile-aware commands
6. build production output
7. restart/reload the application service
8. verify that the deployed service responds successfully

Exact implementation can be pull-on-server or artifact-based, but Phase 02 must choose one simple deterministic strategy and document it.

Do not expose private keys in logs.

## 21. VPS Runtime Architecture

Recommended high-level topology:

```text
Internet
  -> TLS / Reverse Proxy
      -> Next.js Node process on localhost
```

Production concerns:

- Node.js 24 LTS
- app process supervised by a reliable service manager
- app not directly exposed on an unrestricted public application port
- environment variables stored securely on server
- reverse proxy handles public HTTP(S)
- restart is deterministic
- deployment can recover from a failed build without unnecessarily taking the current working version offline

Phase 02 must adapt these details to the real Hostinger VPS environment rather than assuming a distribution, username, directory, domain, or process manager.

## 22. Branch and Review Architecture

`develop`:

- implementation branch

`main`:

- production branch
- deploy trigger

The planned human/AI flow:

1. Claude implements current phase on `develop`.
2. Required checks run.
3. Codex reviews the uncommitted diff.
4. Blocking findings are fixed.
5. Codex re-reviews.
6. User creates commit.
7. User pushes.
8. Approved changes eventually reach `main`.
9. GitHub Actions deploys.

Claude and Codex must not create commits unless the user explicitly changes that rule.

## 23. Security Baseline

- no secrets in client bundles
- no secrets in repository
- validate untrusted input on server
- use safe external links
- avoid unsanitized user-controlled HTML
- minimize dependency surface
- keep framework/security patches current
- do not expose stack traces to public users
- contact endpoint should not become an open mail relay

## 24. Architecture Non-Goals

Phase 1 intentionally does not require:

- microservices
- containers unless the real VPS environment benefits and user approves them
- Kubernetes
- database
- Redis
- queues
- authentication
- CMS
- headless CMS
- admin panel
- analytics pipeline
- complex observability platform
- feature flags
- monorepo
