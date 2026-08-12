# Mustafa Hasanain — Personal Portfolio

Personal portfolio site built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Requirements

- Node.js 24 LTS
- npm (the committed `package-lock.json` is authoritative)

## Getting started

```bash
npm ci
npm run dev
```

The development server runs on http://localhost:3000.

Copy `.env.example` to `.env.local` when a phase introduces environment variables. Real `.env*` files are git-ignored.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (also type-checks via the project-local `tsc`) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `next typegen && tsc --noEmit` (route types are generated first, so this works without a build) |
| `npm run test:e2e` | Playwright end-to-end tests |
| `npm run verify` | lint → typecheck → build → e2e |

`npm run test:e2e` starts a fresh **production** server on port 3100, so it requires an existing build — run `npm run build` first. The dedicated port keeps the test isolated from a development server on port 3000. `npm run verify` performs the steps in the correct order and is the recommended local gate.

Playwright needs its browser binaries once per machine:

```bash
npx playwright install chromium
```

## Project structure

```
src/app/        App Router routes, layout, and global styles
e2e/            Playwright specs and shared test helpers
public/         Static assets
docs/           Project context and phase specifications
```

## Notes

- TypeScript 7 provides the `tsc` binary used by `typecheck` and `next build`. The official TypeScript 6 compatibility package remains installed under the `typescript` module name because `typescript-eslint` still requires the TypeScript compiler API.
