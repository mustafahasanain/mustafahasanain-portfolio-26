# Phase 11 — Contact & Lead Delivery

## Goal

Implement the complete Contact experience and production-safe lead delivery through Email plus Telegram notification, without a database.

## Required Context

Read:

- `../PROJECT_CONTEXT.md`
- this file

Read the Contact architecture section of `../TECHNICAL_ARCHITECTURE.md` only if needed for server implementation.

Use actual user-approved contact details and credentials/configuration.

## Dependencies

Phase 05.

## Implementation Boundaries

### In Scope

- Contact page
- Contact Form
- WhatsApp
- direct Email
- Phone
- LinkedIn
- Telegram
- server-side validation
- Email delivery
- Telegram notification
- success/error states
- practical spam/abuse protection
- rate/request safeguards appropriate to the VPS
- environment variables/example
- tests using safe mocks/test boundaries

### Out of Scope

Do not implement:

- database
- lead CRM
- admin page
- mailing list
- user accounts
- CAPTCHA unless approved/justified
- background queue
- webhook platform
- guaranteed response-time promise

## Primary Conversion Flow

`Start a Project` lands at Contact.

The Contact Form is the primary action.

WhatsApp is a clear secondary quick-contact action.

Other channels remain available without competing visually with the primary flow.

## Form Field Principles

Keep the form short enough to complete.

Collect only information useful for understanding/replying to the project lead.

A recommended minimum model is:

- name
- email and/or phone/WhatsApp contact
- project/service interest
- message/project details

Exact labels may be localized and adjusted to the approved design.

At least one viable reply method must be required.

Do not require email if the approved product behavior allows phone-only leads.

## Validation

Implement the same core schema server-side.

Validate:

- required name
- at least one valid contact method
- reasonable message length
- expected enum/service value if used
- maximum payload sizes
- basic normalization

Client validation improves UX but is not authoritative.

## Email Delivery

Email is the primary delivery channel.

Use actual available SMTP/provider configuration.

A submission counts as delivered only if the email operation succeeds.

Email should contain:

- timestamp
- name
- provided contact method(s)
- service/project type if collected
- message
- safe technical context only if useful

Avoid HTML injection.

Do not create an open-relay endpoint where the visitor controls recipient.

Destination email is server-controlled.

## Telegram Notification

After successful email delivery, attempt Telegram notification.

Notification should be concise and useful, for example:

- new lead indicator
- name
- contact method
- service
- short message excerpt if safe

Do not include secrets.

If Telegram fails after email succeeds:

- return success to the visitor
- record a safe server-side error
- never expose bot token/chat ID/internal stack trace

## Submission Failure

If email fails:

- return a clear generic failure state
- retain entered client-side values where reasonable so the visitor can retry
- present alternative direct channels such as WhatsApp/email
- do not claim success

## Abuse Protection

Use a proportionate baseline.

At minimum consider:

- schema validation
- payload size constraints
- hidden honeypot or equivalent cheap bot control
- conservative rate limiting appropriate to VPS topology
- generic error responses
- no expensive work before validation

Do not add a database merely for rate limiting unless necessary.

## Privacy

Because no database is used:

- do not intentionally persist lead bodies to disk
- do not log full messages unnecessarily
- avoid personal data in debug logs
- do not expose form submissions to analytics

## WhatsApp

Use the approved WhatsApp Business number.

The link may include a localized prefilled message.

Do not hard-code a number until the user provides/approves it.

## Additional Contact Channels

Use user-provided:

- direct email
- phone
- LinkedIn
- Telegram

Do not guess handles/URLs.

## Environment Variables

Add only the actual needed variables, with safe placeholders in `.env.example`.

Likely categories:

- email host/provider config
- email auth
- email destination
- Telegram bot token
- Telegram chat ID
- public contact values only when not better represented as content/config

Secrets remain server-only.

## Tasks

1. Confirm actual contact details.
2. Confirm email delivery mechanism/credentials.
3. Confirm Telegram bot/chat setup.
4. Define typed validation schema.
5. Implement Contact UI.
6. Implement accessible form states.
7. Implement server submission handler.
8. Implement email delivery.
9. Implement Telegram secondary notification.
10. Implement failure semantics.
11. Add spam/abuse baseline.
12. Integrate WhatsApp and other channels.
13. Add safe test doubles/mocks for automated tests.
14. Add E2E/accessibility coverage.
15. Test production configuration safely.

## Acceptance Criteria

- Contact Form is primary page action
- WhatsApp secondary action works
- Email/Phone/LinkedIn/Telegram links use real approved values
- submission with valid data sends email
- Telegram is attempted after email success
- Telegram failure does not change an email-delivered submission to failure
- email failure returns failure
- no lead database exists
- secrets are server-only
- at least one reply method is required
- server validates all input
- public visitor never controls email recipient
- form is keyboard/screen-reader usable
- success/error states are localized
- Arabic RTL works
- both themes work
- spam baseline exists without unnecessary platform complexity

## Required Tests

Automated logic/integration:

- valid input
- invalid name
- missing all reply methods
- invalid email when supplied
- excessive input length
- email success + Telegram success
- email success + Telegram failure -> overall success
- email failure -> overall failure
- honeypot/abuse signal behavior if implemented

Playwright:

- English Contact
- Arabic Contact
- form validation UX
- success state using safe mocked/test delivery boundary
- failure state
- WhatsApp link
- keyboard form completion

axe:

- Contact default
- validation-error state
- success state where practical

Run:

- lint
- typecheck
- build

Production/manual:

- send one controlled real test lead
- confirm email
- confirm Telegram
- verify no secret in network response/log
- verify retry behavior

## Review Focus

- server-side trust boundary
- secret leakage
- email injection/open relay
- PII logging
- Telegram/email failure semantics
- no hidden database
- accessible validation
