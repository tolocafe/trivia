import type { PostHogCustomStorage } from 'posthog-react-native'
import { Platform } from 'react-native'
import { createMMKV } from 'react-native-mmkv'
import { createMockMMKV } from 'react-native-mmkv/lib/createMMKV/createMockMMKV'

// Static web rendering runs this module in Node, where MMKV's web backend
// (localStorage) throws. Use MMKV's in-memory mock there so reads return empty.
export const isServer = Platform.OS === 'web' && typeof window === 'undefined'

export const storage = isServer ? createMockMMKV() : createMMKV()

export const STORAGE_KEYS = {
	locale: 'app.locale',
} as const

// PostHog storage adapter using MMKV
export const postHogStorage: PostHogCustomStorage = {
	getItem: (key: string) => storage.getString(key) ?? null,
	setItem: (key: string, value: string) => storage.set(key, value),
}
