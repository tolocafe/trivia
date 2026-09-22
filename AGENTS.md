# AGENTS.md

TOLO Trivia: coffee quiz app (Expo Router, React Native + web) with content in Sanity CMS. Locales `en`, `es`.

## Project facts

- Sanity project `uen7ijyc`, dataset `production`, Studio at https://tolo-trivia.sanity.studio. Data is public read-only via CDN; no API token needed for queries.
- Web: static export (`app.json` `web.output: "static"`) served as Cloudflare Workers static assets from `dist/` (`wrangler.json`). Cloudflare Workers Builds deploys on every push to `main` (`Workers Builds: tolo-trivia` check). GitHub Actions (`.github/workflows/ci.yml`) runs lint, typecheck, and format check; it does not build web. There is no branch protection, so merging to `main` ships production web.
- `studio/` is a separate package with its own `bun.lock` and `sanity` v5; the root uses `sanity` v3 only for typegen. Run `bun install` in both.

## Commands

Package manager is bun. Use `bun` / `bunx`, never `npm`, `yarn`, `npx`.

| Task                    | Command                                             |
| ----------------------- | --------------------------------------------------- |
| Dev server              | `bun start` (`bun ios` / `bun android` / `bun web`) |
| Lint                    | `bun lint` (oxlint, type-aware)                     |
| Typecheck               | `bun typecheck` (tsgo)                              |
| Format                  | `bun format` / `bun format:check`                   |
| Web production build    | `bun build:web` (outputs `dist/`)                   |
| Regenerate Sanity types | `bun typegen`                                       |
| Extract i18n strings    | `bunx lingui extract`                               |
| Studio dev              | `cd studio && bun dev`                              |

- Before committing: `bun lint && bun typecheck && bun format:check` (lint has pre-existing warnings; errors must be zero). Typecheck includes `studio/`, so install its deps first.
- Generated files (Sanity typegen output, `studio/schema.json`, compiled Lingui catalogs) are excluded from oxfmt in `.oxfmtrc.json`.
- There is no test suite.

## Environment

Copy `.env.example` to `.env` (gitignored) and set `EXPO_PUBLIC_POSTHOG_API_KEY`. Without it the PostHog client throws at startup, and `bun build:web` fails during static rendering ("You must pass your PostHog project's api key").

## Code rules

| Don't                           | Do                                                                 |
| ------------------------------- | ------------------------------------------------------------------ |
| Hardcoded UI strings            | Lingui `<Trans>` (JSX) / `` t`...` `` (strings)                    |
| Inline styles                   | Unistyles `StyleSheet.create((theme) => ...)`                      |
| Calling styles as functions     | `variants` + `styles.useVariants()`                                |
| Hardcoded colors/spacing        | Tokens from `@/lib/tokens.ts` via the theme                        |
| `any`                           | Strict types                                                       |
| Hand-written query result types | `defineQuery()` in `src/lib/queries.ts` + `bun typegen`            |
| Relative imports                | `@/` alias                                                         |
| `router.push()` for user taps   | expo-router `<Link>` (`router.replace` only for programmatic flow) |

Commits: Conventional Commits, `type(scope): description`.

## Gotchas

- `@/lib/styles` must be imported before anything that creates a themed stylesheet (first line of `index.ts` and `src/app/_layout.tsx`). Otherwise the static web build fails with Unistyles "no theme selected".
- Code under `src/app` also runs on the server during static web rendering. `@/lib/storage` swaps in MMKV's in-memory mock there (`isServer`) and PostHog is disabled on the server; other device APIs (localStorage, `window`, native modules) touched at module scope or during render still break `bun build:web`. Access them inside effects or behind `isServer`.
- `src/lib/sanity.types.ts` is generated; never edit it. `bun typegen` extracts `studio/schema.json` from the studio schema, then scans `src/**/*.{ts,tsx}` for `defineQuery` calls. Run it after changing queries or `studio/schemaTypes/`.
- Catalogs `src/locales/{en,es}/messages.po` are loaded directly by the Metro Lingui transformer. After changing UI strings run `bunx lingui extract` and fill the Spanish `msgstr` values. `lingui compile` is not needed for the app.
- `cd studio && bunx sanity schema deploy && bunx sanity deploy` publishes the schema and Studio to production Sanity. Run it only when asked.

## Code Review Rules

- Flag user-visible strings not wrapped in Lingui, and new strings missing a Spanish translation.
- Flag module-scope access to storage, analytics, or device APIs reachable from `src/app` (breaks static web export).
- Flag edits to `src/lib/sanity.types.ts` not produced by `bun typegen`.
