# TOLO Trivia

Coffee trivia quiz app built with Expo/React Native. Test your coffee knowledge with questions about brewing, roasting, origins, and more.

**Languages:** English, Spanish

## Getting Started

```bash
bun install
bun start
```

## Development

```bash
bun ios       # iOS simulator
bun android   # Android emulator
bun web       # Browser
```

## Code Quality

```bash
bun lint      # Run oxlint
bun typecheck # Run tsgo
bun format    # Format with oxfmt
```

## Sanity Studio

Content is managed via Sanity CMS. Data is publicly accessible (read-only).

```bash
cd studio
bun install
bun dev                                              # Local development
bunx sanity schema deploy && bunx sanity deploy      # Deploy schema + studio
```

| Key | Value |
|-----|-------|
| Project ID | `uen7ijyc` |
| Dataset | `production` |

## Tech Stack

- **Framework**: Expo / React Native
- **Routing**: Expo Router
- **Data**: TanStack Query + Sanity CMS
- **Styling**: react-native-unistyles
- **i18n**: Lingui

## Links

- App: [trivia.tolo.cafe](https://trivia.tolo.cafe)
- Studio: [tolo-trivia.sanity.studio](https://tolo-trivia.sanity.studio)
