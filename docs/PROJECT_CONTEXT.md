# Project Context

> Runtime context for AI implementation and review.
>
> This file is intentionally concise. For normal work, an implementation or review agent should read only this file plus the current phase file.

## Project Identity

**Project:** Mustafa Hasanain Personal Portfolio  
**Primary purpose:** Convert qualified visitors into freelance leads while presenting Mustafa Hasanain as an independent developer with a strong professional personal brand.

The website is personal-first, not an agency website. Its structure should remain flexible enough to evolve into a studio/agency brand in the future without building agency-specific infrastructure now.

## Audience Priority

1. Individuals or companies looking for a freelancer to build a website, web application, or custom system.
2. Companies and recruiters considering full-time or contract opportunities.
3. Developers and technical visitors evaluating experience and work.
4. Existing contacts who want a clear reference for projects and experience.

**Market priority:** Iraq first, then Gulf/Arab markets, then international clients.

## Core Product Scope

### Home

Primary conversion page. It should communicate value quickly and lead visitors toward `Start a Project`.

Expected sections:

- Hero
- Featured Projects
- Services
- About Preview
- How I Work / Process
- Technologies
- Final CTA

The exact visual design of a section must follow the visual reference supplied for that implementation phase.

### Projects

Displays portfolio projects in a simple responsive card grid.

Phase 1 has **no search or filtering UI**.

### Project Case Studies

Only selected important projects receive detailed case-study pages. Projects that do not need a case study remain valid portfolio entries.

### About

A concise professional page covering:

- who Mustafa is
- what he does
- relevant experience
- working/thinking approach
- primary skills and technologies
- a short professional experience overview

It must not become a duplicate resume page.

### Contact

Primary lead-generation page.

`Start a Project` routes to the contact experience.

Primary contact path:

- Contact Form

Fast secondary path:

- WhatsApp

Additional contact channels:

- Email
- Phone
- LinkedIn
- Telegram

### CV

No separate resume page.

Provide:

- `View CV`
- `Download CV`

for the available Phase 1 languages.

## Services

The Phase 1 service categories are:

1. Business Websites
2. E-commerce
3. Web Applications
4. Custom Business Systems
5. Maintenance & Development

Capabilities such as integrations, responsive implementation, optimization, APIs, and similar technical work are not separate service categories unless a future product decision changes this.

## Languages

Phase 1 languages:

- English
- Arabic

English is the canonical/default language and uses URLs without a locale prefix.

Examples:

- `/`
- `/projects`
- `/about`
- `/contact`

Arabic uses `/ar`.

Examples:

- `/ar`
- `/ar/projects`
- `/ar/about`
- `/ar/contact`

Arabic must use proper RTL behavior.

Browser language may be detected only to **suggest** Arabic. Never automatically redirect a visitor based only on browser language.

A manual language choice should be remembered.

Turkish is not part of Phase 1.

## Theme

Phase 1 supports both:

- Dark
- Light

Dark is the default on the first visit, regardless of operating-system theme.

A manual theme choice must be remembered.

## Content Architecture

Content is managed inside the Git repository.

There is:

- no CMS
- no admin panel
- no content database

Projects and case studies use MDX.

Prefer MDX-native exported metadata over adding YAML-frontmatter parsing unless Phase 06 demonstrates a concrete need for a parser.

Project content must be structured so that a future CMS migration is possible without designing a CMS abstraction now.

## Technical Baseline

Use stable, production-ready releases compatible with each other.

Baseline verified on **2026-08-09**:

- Next.js 16.3 stable line
- React / React DOM 19.2 stable line
- TypeScript 7.0 stable line
- Tailwind CSS 4.3 stable line
- Node.js 24 LTS for CI and production
- Next.js App Router
- npm with a committed lockfile
- Playwright for critical E2E coverage
- axe integration for automated accessibility checks

Before changing a major technology version, verify compatibility from official documentation. Do not adopt canary, beta, RC, or experimental functionality unless the active phase explicitly requires it.

## UI Strategy

Tailwind CSS is the styling foundation.

Ready-made components may be used when they fit the required visual design and do not create unacceptable performance, accessibility, responsiveness, or maintainability costs.

Do not replace a working ready-made component merely because a custom component is possible.

Do not keep a component merely because it is ready-made if it materially harms the product.

## Rendering and Performance Principles

- Prefer Server Components and static/server-rendered output by default.
- Add Client Components only where interaction requires browser JavaScript.
- Keep client boundaries small.
- Avoid shipping unnecessary JavaScript.
- Optimize images and fonts.
- Avoid layout shift.
- Respect `prefers-reduced-motion` for non-essential motion.
- Decorative effects must not block content or degrade usability.
- Phase 1 target: **greater than 90 in all core Lighthouse categories**, with the highest practical result preferred.

Performance must be measured rather than assumed.

## Contact Delivery Architecture

The contact form sends a lead through:

1. Email — primary delivery channel.
2. Telegram notification — secondary notification channel.

There is no lead database in Phase 1.

Telegram failure must not turn a successfully delivered email into a failed submission.

The form requires practical spam/abuse protection without adding a complex anti-abuse platform unless real need is demonstrated.

Secrets must remain server-side.

## Quality Policy

Balanced testing is required.

Normal quality gates include:

- lint
- TypeScript/type checking
- production build
- critical E2E flows
- basic automated accessibility checks
- targeted manual verification
- Lighthouse verification at the appropriate phase

Do not create unit tests for trivial presentational components merely to increase test count.

Add narrower unit/integration tests when real logic benefits from them.

## Git Strategy

Long-lived branches:

- `develop` — development
- `main` — production

Feature branches are optional exceptions, not the default workflow.

Normal implementation workflow:

`Implement on develop -> validate -> Codex review before commit -> fix -> re-review if needed -> commit -> push`

Production workflow:

`approved develop -> main -> GitHub Actions -> VPS`

A push to `main` triggers automatic production deployment.

## Deployment

Production is self-hosted on the Hostinger VPS from the beginning.

Do not introduce Vercel-specific architecture.

Deployment is automated with GitHub Actions.

The self-hosted Next.js application should run behind a reverse proxy on the VPS and use a managed process/service mechanism appropriate to the server environment.

The exact server commands, directories, service name, domain, and secrets must be configured from actual server values rather than invented.

## Global Development Constraints

- Do not overengineer.
- Implement only the active phase.
- Do not build speculative future infrastructure.
- Do not add a dependency without a concrete requirement.
- Do not silently change fixed product decisions.
- Do not perform unrelated refactors.
- Preserve accessibility.
- Preserve responsive behavior.
- Preserve both languages on surfaces affected after i18n exists.
- Preserve both themes on surfaces affected after theming exists.
- Keep secrets out of the repository.
- No database, CMS, authentication, user accounts, or admin system unless a later approved phase explicitly adds one.

## Phase 1 Explicit Exclusions

These are not Phase 1 requirements:

- Turkish
- Testimonials
- Project filters
- Project search
- Blog / articles / insights
- Pricing
- Availability status
- CMS
- Admin panel
- Lead database
- Agency-specific functionality

See `PHASE_2_BACKLOG.md` for deferred ideas. Normal implementation agents should not read that file unless explicitly asked.
