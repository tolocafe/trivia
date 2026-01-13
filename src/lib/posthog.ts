import { PostHog } from 'posthog-react-native'

import { postHogStorage } from '@/lib/storage'

export const posthog = new PostHog(
	process.env.EXPO_PUBLIC_POSTHOG_API_KEY ?? '',
	{
		host: 'https://us.i.posthog.com',
		customStorage: postHogStorage,
		// Disable if no API key (development without key)
		disabled: !process.env.EXPO_PUBLIC_POSTHOG_API_KEY,
	},
)
