# AGENTS.md

Guidelines for AI agents working on this codebase.

## Quick Reference

| Task | Command |
|------|---------|
| Dev server | `bun start` |
| iOS | `bun ios` |
| Android | `bun android` |
| Web | `bun web` |
| Lint | `bun lint` |
| Typecheck | `bun typecheck` |
| Format | `bun format` |
| i18n extract | `bunx lingui extract` |
| i18n compile | `bunx lingui compile` |
| Studio dev | `cd studio && bun dev` |
| Studio deploy | `cd studio && bun run deploy` |

## Rules

- **Always run `bun lint && bun typecheck` before committing**
- Use `bun` and `bunx` only — never `npm`, `yarn`, or `npx`
- Follow [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): description`
- No hardcoded strings — use Lingui (`Trans` for JSX, `t` for logic)
- No inline styles — use Unistyles from `@/lib/styles`
- No `any` types — strict TypeScript only
- Imports use `@/` alias, never relative paths

## Commit Types

`feat` | `fix` | `docs` | `style` | `refactor` | `perf` | `test` | `chore` | `ci`

```
feat(quiz): add timer mode
fix(i18n): correct Spanish translation
chore(deps): update expo
```

## Project Structure

```
src/
├── app/          # Expo Router routes
├── components/   # React components (kebab-case.tsx, PascalCase exports)
├── lib/          # Utilities: sanity client, queries, styles, i18n
└── locales/      # Lingui PO files (en, es)
studio/           # Sanity Studio (separate package)
```

## Patterns

**Data fetching** — TanStack Query with predefined options:
```tsx
import { useQuery } from '@tanstack/react-query'
import { categoriesQueryOptions } from '@/lib/query-options'

const { data } = useQuery(categoriesQueryOptions())
```

**i18n** — Lingui macros:
```tsx
import { Trans } from '@lingui/react/macro'
import { t } from '@lingui/core/macro'

<Trans>Play Now</Trans>        // JSX
const label = t`Play Now`      // strings
```

**Styling** — Unistyles:
```tsx
import { StyleSheet } from 'react-native-unistyles'

const styles = StyleSheet.create((theme) => ({
  container: { backgroundColor: theme.colors.background }
}))
```

## Data Flow

1. Content in Sanity CMS → `studio/schemaTypes/`
2. GROQ queries → `src/lib/queries.ts`
3. Query options → `src/lib/query-options.ts`
4. Components consume via `useQuery()`

## Reminders

- After changing strings: `bunx lingui extract && bunx lingui compile`
- After schema changes: `cd studio && bun run deploy`
- Studio has separate deps: run `bun install` from `/studio` if needed
- Check `src/lib/styles.ts` for existing theme tokens
