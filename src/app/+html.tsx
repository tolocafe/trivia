import { ScrollViewStyleReset } from 'expo-router/html'
import type { PropsWithChildren } from 'react'

import { colors } from '@/lib/tokens'

import '../lib/styles'

const SITE_URL = 'https://trivia.tolo.cafe'
const SITE_TITLE = 'TOLO Trivia'
const SITE_DESCRIPTION =
  'Test your coffee knowledge with TOLO Trivia! Answer questions about brewing, roasting, origins, and more.'

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="theme-color" content={colors.espresso} />

        {/* Favicon & Manifest */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={SITE_URL} />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />

        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body>{children}</body>
    </html>
  )
}

const responsiveBackground = `
body {
  background-color: ${colors.light.background};
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: ${colors.dark.background};
  }
}
`

