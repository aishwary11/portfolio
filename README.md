# Portfolio — Aishwary Shah

Personal site for Aishwary Shah, Technical Lead and Backend Architect. One page,
statically rendered, built from a typed copy of the resume.

- **Live:** https://aishwaryshah.vercel.app
- **Resume:** [`public/Aishwary-Shah-Technical-Lead.pdf`](public/Aishwary-Shah-Technical-Lead.pdf)

## Stack

| Concern    | Choice                                                        |
| ---------- | ------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack)                            |
| UI         | React 19 with the React Compiler                              |
| Language   | TypeScript 5.9, `strict`                                      |
| Styling    | Tailwind CSS 4 — CSS-first config, no `tailwind.config.js`    |
| Lint       | ESLint 10 flat config, `next/core-web-vitals` + SonarJS rules |
| Formatting | Prettier with the Tailwind class-sorting plugin               |

## Getting started

Node 20.9 or newer.

```bash
npm ci
```

```bash
npm run dev
```

The site is served at http://localhost:3000.

## Scripts

| Script                 | What it does                                   |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Development server with Turbopack              |
| `npm run build`        | Production build                               |
| `npm start`            | Serve the production build                     |
| `npm run typecheck`    | `tsc --noEmit`                                 |
| `npm run lint`         | ESLint; **warnings fail** (`--max-warnings=0`) |
| `npm run lint:fix`     | ESLint with autofix                            |
| `npm run format`       | Write Prettier formatting                      |
| `npm run format:check` | Check formatting without writing               |
| `npm run verify`       | All four gates in the order CI runs them       |

Run `npm run verify` before pushing — it is exactly what
[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs.

## Editing the content

Nothing about the resume lives in a component. Every string, date and technology
is in `src/data`, typed by [`src/types/resume.ts`](src/types/resume.ts):

| File                       | Contents                                       |
| -------------------------- | ---------------------------------------------- |
| `src/data/profile.ts`      | Name, title, summary, contact details, links   |
| `src/data/experience.ts`   | Roles, dates, responsibilities, stack per role |
| `src/data/skills.ts`       | Skill groups and their icons                   |
| `src/data/architecture.ts` | The systems-design highlights                  |
| `src/data/achievements.ts` | Metrics and recognition                        |
| `src/data/education.ts`    | Degrees and certifications                     |

To update the site, edit a data file. The types make an incomplete entry a
build failure rather than a blank space on the page.

## Layout

```
src/
├─ app/          Route, metadata, and the generated OG image
│  ├─ page.tsx           the single page — composes the sections
│  ├─ layout.tsx         shell, fonts, theme bootstrap, JSON-LD
│  ├─ globals.css        Tailwind theme + component layer
│  ├─ opengraph-image.tsx  social card, rendered at build time
│  └─ manifest.ts, robots.ts, sitemap.ts
├─ components/
│  ├─ layout/    Navbar, MobileNav, Footer, ThemeToggle, SkipLink, background
│  ├─ sections/  One component per resume section
│  └─ ui/        Section wrapper and Tag
├─ data/         The resume, as typed data
├─ hooks/        Client-only hooks
├─ lib/          Tenure maths, structured data, theme constants, `cn`
└─ types/        Shared resume types
```

## Notable decisions

**Server Components by default.** Only four leaves are client components — the
theme switch, the mobile menu, the typed role line and the copy buttons. Scroll
reveals, the reading-progress bar and the expandable role details are all native
CSS and HTML, so they cost no JavaScript.

**Tenure is computed, not written down.** `src/lib/tenure.ts` derives years of
experience from a start date, so the numbers never go stale. The page sets
`revalidate = 86_400` so a long-lived deployment recomputes them daily.

**The theme is resolved before first paint.** A small blocking script from
`src/lib/theme.ts` reads the stored preference and sets the class on `<html>`,
which is what keeps a dark-mode visitor from seeing a white flash. The toggle
itself is progressive enhancement on top of that.

**Modern CSS over JavaScript.** Scroll-driven animations
(`animation-timeline`), `light-dark()`, `interpolate-size`,
`::details-content`, `@starting-style`, `clip-path` and `color-mix()` do work
that would otherwise need a library. Each is behind a `@supports` check or
degrades to a static style.

**Motion is opt-out-aware.** Every animation is disabled under
`prefers-reduced-motion: reduce`, in CSS and in the typewriter hook.

## Accessibility

Built to WCAG 2.2 AA: a skip link as the first focusable element, one `<h1>` and
an unbroken heading order, 44×44 minimum touch targets, visible
`:focus-visible` rings, live regions on the copy buttons, and no horizontal
overflow from 320px up. Verified by hand at 320, 375, 768 and 1440px — not by an
automated audit.

## Quality gates

`npm run lint` fails on warnings, not just errors, so nothing accumulates.
Alongside `next/core-web-vitals`, [`eslint.config.mjs`](eslint.config.mjs) runs
`eslint-plugin-sonarjs` — SonarQube's JavaScript and TypeScript rules — for
bug-detection and complexity checks that the Next.js config does not cover.

## Deployment

Every route is static, so the build output is a set of prerendered files. Push to
`master`; Vercel builds with `npm run build`.

One optional environment variable: set `NEXT_PUBLIC_SITE_URL` to override the
origin used in metadata, the sitemap and the structured data. Without it the
production URL in `src/data/profile.ts` is used, which is correct for production
and slightly wrong for preview deployments.
