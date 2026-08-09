# Product Specification

## 1. Document Purpose

This is the authoritative product specification for the Mustafa Hasanain personal portfolio.

It defines what the product is, who it serves, what belongs in Phase 1, what is intentionally deferred, and the expected user-facing behavior.

Implementation-specific decisions belong in `TECHNICAL_ARCHITECTURE.md`. Execution order belongs in `IMPLEMENTATION_PLAN.md`.

## 2. Product Vision

Build a high-quality personal portfolio that works as both:

- a conversion-focused freelance presence
- a credible professional reference

The site must feel visually impressive without sacrificing clarity, speed, accessibility, or reliability.

The website represents Mustafa Hasanain personally as an independent developer. It must not present itself as an agency in Phase 1.

## 3. Primary Product Goal

The primary goal is:

> Convert relevant visitors into people who contact Mustafa to start a project.

The primary CTA is:

> **Start a Project**

That CTA should direct the user toward the contact experience rather than directly forcing a third-party communication channel.

## 4. Secondary Goals

In priority order:

1. Support full-time and contract career opportunities.
2. Strengthen personal brand.
3. Serve as an organized reference for experience and work.
4. Give technical visitors enough evidence to evaluate implementation quality.

Secondary goals must not make the homepage feel like a dense resume.

## 5. Target Audience

### 5.1 Primary Persona

A person or company that needs one of the offered digital services and is evaluating whether Mustafa is a credible person to contact.

The visitor may not be deeply technical.

The product must explain value in understandable language before emphasizing implementation details.

### 5.2 Secondary Persona

Recruiters, hiring managers, and companies evaluating Mustafa for employment or contract work.

Important needs:

- credible work examples
- concise professional story
- accessible CV
- clear contact options

### 5.3 Technical Persona

Developers or technical stakeholders who want to inspect:

- projects
- technologies
- implementation quality
- engineering maturity

Technical content should support trust without dominating client-oriented messaging.

## 6. Market Priority

1. Iraq
2. Gulf and wider Arabic-speaking region
3. International clients

The site therefore needs a professional English experience and a complete Arabic experience.

## 7. Languages

### Phase 1

- English
- Arabic

English is the default/canonical language.

Arabic must have correct RTL layout and must not be treated as a partial translation.

### Deferred

- Turkish

### Language Discovery

On a visitor's first relevant visit:

- the site may inspect browser language
- if Arabic is preferred, it may show a non-blocking suggestion to view Arabic
- it must not automatically redirect solely because the browser language is Arabic
- a manual language choice should be remembered

## 8. Theme

Phase 1 supports:

- Dark mode
- Light mode

Dark is the first-visit default.

The user's explicit theme choice persists.

Both themes are first-class experiences and must satisfy accessibility/contrast requirements.

## 9. Information Architecture

### 9.1 Home

Purpose:

- establish identity quickly
- show proof of work
- explain services
- build trust
- lead to contact

Planned section types:

1. Hero
2. Featured Projects
3. Services
4. About Preview
5. How I Work / Process
6. Technologies
7. Final CTA

The final visual order may be refined during Home implementation if the supplied visual reference requires a better composition, but no approved section should be silently removed.

### 9.2 Projects

Purpose:

- show portfolio breadth
- allow visitors to scan work quickly
- lead into selected case studies

Phase 1 behavior:

- responsive project-card grid
- category visible
- technologies visible
- no project filter UI
- no search UI

### 9.3 Project Case Study

Purpose:

- explain selected important projects in depth
- demonstrate problem-solving and implementation quality

Not every project requires a case study.

A case study may include, when the content exists:

- overview
- problem/context
- goals
- role
- approach
- solution
- major implementation decisions
- technology
- visual screenshots
- outcome
- links, if public and appropriate

Case studies must not invent business outcomes, metrics, client quotes, or confidential information.

### 9.4 About

Purpose:

- present a concise professional narrative

Expected content:

- introduction
- work focus
- experience
- way of thinking/working
- primary skills
- technology summary
- brief professional experience

It should not duplicate the full CV.

### 9.5 Contact

Purpose:

- convert interest into a real lead

Primary mechanism:

- Contact Form

Secondary quick mechanism:

- WhatsApp

Additional channels:

- Email
- Phone
- LinkedIn
- Telegram

The page must make the primary path obvious without hiding alternatives.

## 10. Services

### 10.1 Business Websites

Examples include:

- company websites
- service websites
- informational business sites
- landing pages when appropriate

### 10.2 E-commerce

Online storefront experiences and related web implementation.

### 10.3 Web Applications

Custom browser-based applications built around a product or workflow.

### 10.4 Custom Business Systems

Purpose-built systems for business processes, operations, or management needs.

### 10.5 Maintenance & Development

Ongoing improvement of existing websites/applications, including suitable fixes, enhancements, and maintenance work.

## 11. Project Content Rules

Project eligibility is content-driven and will be decided after reviewing the user's existing work.

Possible sources include:

- freelance work
- personal projects
- demo projects
- company work where disclosure is permitted

A project must not expose confidential, contract-restricted, NDA-protected, or otherwise non-public information.

The content system must support projects with and without case studies.

## 12. CV

No separate resume application/page is required.

Provide two actions:

- View PDF
- Download PDF

When localized CV files exist, the language version of the site should use the matching CV by default.

## 13. Contact Form Product Behavior

The form should collect enough information to understand and reply to a lead without becoming a long qualification questionnaire.

Exact fields are defined during Contact implementation.

At least one useful reply path must be provided by the sender.

Successful submission should:

1. deliver the lead through email
2. attempt a Telegram notification
3. give the visitor a clear success state

Do not promise a fixed response time unless the user later approves one.

## 14. Visual Direction

Existing inputs:

- provided logo
- provided color palette

Detailed component design is intentionally not frozen in this specification.

For each implementation phase/section, the user may provide a visual reference. That reference becomes the implementation target for that surface.

Design principles:

- distinctive
- modern
- clear
- professional
- responsive
- accessible
- performant
- not animation-heavy for its own sake

## 15. Performance Requirement

Target:

> Lighthouse score greater than 90 in all core Lighthouse categories, with the highest practical score preferred.

The goal applies to production-like builds and representative pages.

A visual effect or ready-made component that materially harms real performance should be optimized, simplified, or replaced.

## 16. Accessibility Requirement

Phase 1 must provide a usable keyboard and assistive-technology experience.

Baseline expectations:

- semantic HTML
- visible focus states
- adequate contrast
- accessible controls
- meaningful link/button labels
- correct heading hierarchy
- form labels/errors
- reduced-motion respect for non-essential motion
- Arabic directionality handled correctly

## 17. Responsive Requirement

All Phase 1 pages must support realistic:

- mobile
- tablet
- desktop

No phase is complete if its primary layout only works at the designer's reference viewport.

## 18. Phase 1 Scope

Phase 1 includes:

- project foundation
- CI/quality tooling
- automatic VPS deployment
- dark/light theme
- English/Arabic
- shared navigation/layout
- repository-driven MDX project content
- Home
- Projects
- selected case studies
- About
- CV view/download
- Contact
- email lead delivery
- Telegram lead notification
- SEO foundation
- final accessibility/performance/launch QA

## 19. Deferred Product Scope

Deferred from Phase 1:

- Turkish
- Testimonials
- Project filters
- Project search
- Blog
- Pricing
- Availability status
- CMS
- lead dashboard/database
- agency transition features

No placeholder UI is needed for deferred features.

## 20. Product Success Criteria for Initial Launch

The initial product is considered launch-ready when:

- every Phase 1 page is complete in English and Arabic
- dark and light themes are coherent
- primary responsive layouts are verified
- project content renders from the repository content system
- contact email delivery works in production
- Telegram notification behavior works as specified
- CV actions work
- SEO metadata is present and correct
- critical E2E flows pass
- automated accessibility checks pass within the agreed baseline
- no known blocking accessibility issue remains
- Lighthouse meets the agreed >90 target in all core categories on representative production pages
- deployment from `main` to the VPS is repeatable and verified
