# AGENTS.md

Guidelines for AI agents working on this codebase.

## Project Info

| Key | Value |
|-----|-------|
| Sanity Project ID | `uen7ijyc` |
| Dataset | `production` |
| Studio URL | https://tolo-trivia.sanity.studio |
| Supported Locales | `en`, `es` |
| Web Hosting | Cloudflare Pages (auto-deploys on push to `main`) |

> Sanity data is publicly accessible (read-only via CORS). No API tokens needed for queries.

## Commands

| Task | Command |
|------|---------|
| Dev server | `bun start` |
| iOS | `bun ios` |
| Android | `bun android` |
| Web | `bun web` |
| Lint | `bun lint` |
| Typecheck | `bun typecheck` |
| Format | `bun format` |
| Typegen | `bun typegen` |
| i18n | `bunx lingui extract && bunx lingui compile` |
| Studio | `cd studio && bun dev` |

## Rules

**Before committing:** `bun lint && bun typecheck`

| Don't | Do |
|-------|-----|
| `npm`, `yarn`, `npx` | `bun`, `bunx` |
| Hardcoded strings | Lingui `Trans` / `t` |
| Inline styles | Unistyles `StyleSheet.create()` |
| `styles.foo(value)` | `styles.useVariants()` |
| Hardcoded colors | Theme tokens from `@/lib/tokens.ts` |
| `any` types | Strict TypeScript |
| Manual query types | `defineQuery()` + generated types |
| Relative imports | `@/` alias |
| `router.push()` | expo-router `Link` |

**Commits:** [Conventional Commits](https://www.conventionalcommits.org/) — `type(scope): description`

Types: `feat` | `fix` | `docs` | `style` | `refactor` | `perf` | `test` | `chore` | `ci`

## Architecture

```
src/
├── app/           # Expo Router routes
├── components/    # React components
├── hooks/         # Custom hooks
├── lib/           # Utilities
│   ├── queries.ts       # GROQ queries with defineQuery()
│   ├── query-options.ts # TanStack Query options
│   ├── sanity.types.ts  # Generated types (do not edit)
│   ├── tokens.ts        # Design tokens
│   └── styles.ts        # Theme config
└── locales/       # i18n (en, es)
studio/            # Sanity Studio (separate package)
```

### Data Flow

```
Sanity CMS → schema (studio/) → queries.ts → typegen → sanity.types.ts
                                     ↓
                              query-options.ts → useQuery() → components
```

## Patterns

### Data Fetching
```tsx
import { useQuery } from '@tanstack/react-query'
import { categoriesQueryOptions } from '@/lib/query-options'

const { data } = useQuery(categoriesQueryOptions(locale))
```

### GROQ Queries
```tsx
import { defineQuery } from 'groq'

export const MY_QUERY = defineQuery(/* groq */ `
  *[_type == "post"] { _id, title }
`)
// Run `bun typegen` to generate types
```

### i18n
```tsx
import { Trans } from '@lingui/react/macro'
import { t } from '@lingui/core/macro'

<Trans>Play Now</Trans>        // JSX
const label = t`Play Now`      // strings
```

### Styling
```tsx
import { StyleSheet } from 'react-native-unistyles'

const styles = StyleSheet.create((theme) => ({
  container: { backgroundColor: theme.colors.background }
}))

// For dynamic styles, use variants with useVariants()
const styles = StyleSheet.create((theme) => ({
  text: {
    variants: {
      color: {
        primary: { color: theme.colors.text },
        secondary: { color: theme.colors.textSecondary },
      }
    }
  }
}))

// In component:
styles.useVariants({ color: 'primary' })
```

**Prefer `styles.useVariants()`** over calling styles as functions for dynamic values.

### Navigation
```tsx
import { Link, type Href } from 'expo-router'

<Link href="/quiz/coffee">Start</Link>
<Link href={`/quiz/${id}` as Href} asChild>
  <Pressable />
</Link>
```

## Workflows

**After changing UI strings:**
```sh
bunx lingui extract && bunx lingui compile
```

**After changing queries or Sanity schema:**
```sh
bun typegen
```

**After changing Sanity schema (deploy):**
```sh
cd studio && bunx sanity schema deploy && bunx sanity deploy
```

## Key Files

- `src/lib/tokens.ts` — colors, spacing, radius, typography
- `src/lib/styles.ts` — theme configuration
- `src/lib/queries.ts` — all GROQ queries
- `src/lib/sanity.types.ts` — generated types (do not edit manually)
- `studio/schemaTypes/` — Sanity schema definitions
