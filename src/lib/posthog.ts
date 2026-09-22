import { PostHog } from 'posthog-react-native'

import { isServer, postHogStorage } from '@/lib/storage'

export const posthog = new PostHog(
	process.env.EXPO_PUBLIC_POSTHOG_API_KEY ?? '',
	{
		host: 'https://us.i.posthog.com',
		customStorage: postHogStorage,
		// Disable without an API key, and during static web rendering so the
		// build never preloads feature flags or queues events.
		disabled: isServer || !process.env.EXPO_PUBLIC_POSTHOG_API_KEY,
	},
)
