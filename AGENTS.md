# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TOLO Trivia (trivia.tolo.cafe) is a coffee quiz mobile app built with Expo/React Native. It uses Sanity CMS for content management (categories and questions) and supports iOS, Android, and web platforms.

## Commands

```bash
# Development
bun start              # Start Expo dev server
bun ios                # Run on iOS simulator
bun android            # Run on Android emulator
bun web                # Run in browser

# Code Quality
bun lint               # Run oxlint with type-aware checking
bun format             # Format code with oxfmt
bun format:check       # Check formatting without changes
bun typecheck          # Run tsgo type checking

# i18n
bunx lingui extract    # Extract strings to PO files
bunx lingui compile    # Compile PO files to JS

# Sanity Studio (from /studio directory)
cd studio && bun dev   # Run Sanity Studio locally
cd studio && bun run deploy # Deploy Studio to Sanity
```

## Architecture

### Directory Structure
- `src/app/` - Expo Router file-based routes (root configured at `./src/app`)
- `src/components/` - React components
- `src/lib/` - Shared utilities: Sanity client, TanStack Query options, GROQ queries, Unistyles theme
- `src/locales/` - Lingui i18n files (PO format)
- `studio/` - Sanity Studio (separate package with its own dependencies)

### Data Flow
1. Content lives in Sanity CMS (project: `uen7ijyc`, dataset: `production`)
2. `src/lib/queries.ts` defines GROQ queries and TypeScript interfaces
3. `src/lib/query-options.ts` wraps queries in TanStack Query's `queryOptions`
4. Components consume data via `useQuery` with these options

### Key Technologies
- **Routing**: Expo Router with typed routes enabled
- **State/Data**: TanStack Query (no custom wrapper hooks)
- **Styling**: react-native-unistyles with adaptive light/dark themes
- **i18n**: Lingui with `Trans` from `@lingui/react/macro` and `t` from `@lingui/core/macro`
- **CMS**: Sanity with schemas in `studio/schemaTypes/`

## Code Conventions

- **Files**: `kebab-case.tsx`
- **Components**: `PascalCase` exports
- **Imports**: Always use `@/` alias for `src/`, never relative paths
- **React**: Destructure imports (`import { useState } from 'react'`), no default React import
- **Styling**: Unistyles only, no inline styles
- **Strings**: Lingui only, no hardcoded user-facing text
- **Types**: Strict mode, never use `any`
- **Package manager**: bun only (no npm/yarn)

## Git Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/) specification for all commit messages.

### Format
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring (no feature or fix)
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (deps, config, build)
- `ci`: CI/CD changes

### Examples
```
feat(quiz): add timer for timed quiz mode
fix(i18n): correct Spanish translation for results screen
chore(deps): update expo to v52
refactor(components): extract shared button styles
```
