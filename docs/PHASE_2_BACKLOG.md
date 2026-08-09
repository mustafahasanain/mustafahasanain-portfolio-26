# Phase 2 Backlog

## Purpose

This file records approved deferred ideas so Phase 1 does not grow unnecessarily.

Nothing in this file should be implemented during Phase 1 unless the user explicitly moves it into active scope.

## Confirmed Deferred Features

### Turkish Language

Add Turkish localization after English and Arabic are stable.

Consider at that time:

- `/tr` routing
- Turkish dictionaries/content
- localized metadata
- localized CV if available
- language-switcher third option
- locale alternates in SEO

Do not build Turkish placeholders in Phase 1.

### Testimonials

Potential future testimonial section.

Before implementation, determine:

- whether testimonials are available
- permission to publish names/company details
- whether anonymous attribution is necessary
- localized content needs

No fake testimonials or star ratings.

### Project Filters

Add project filtering only if the real project count makes it useful.

Potential filters may map to existing project metadata such as category.

Phase 1 should preserve clean metadata so this can be added without redesigning project content.

Do not build hidden filter state or unused filter components now.

## Future Backlog — Not Yet Assigned to Phase 2 Scope

The following ideas were discussed but intentionally left as future possibilities rather than committed Phase 2 requirements:

### Blog / Articles / Insights

Could support personal brand and SEO later.

Do not build blog content models, routes, feeds, tags, or CMS infrastructure now.

### Pricing / Starting Prices

May be useful later if the freelance offering becomes standardized.

Do not build currency/pricing infrastructure now.

### Availability Status

Possible future display such as freelance availability.

Do not build availability state, scheduling, or status storage now.

### Agency Evolution

The personal brand may eventually evolve into a studio/agency.

Future work would require a fresh product decision about:

- naming/branding
- positioning
- team representation
- services
- contact flow
- legal/business identity

Phase 1 should stay personal-first.

## Backlog Entry Rule

When adding a future idea to this file, record:

- idea
- user value
- why it is deferred
- prerequisites
- what Phase 1 must *not* build for it

Do not convert backlog ideas into architecture without explicit approval.
