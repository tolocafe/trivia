import { createClient } from '@sanity/client'

export const sanityClient = createClient({
	apiVersion: '2024-01-01',
	dataset: 'production',
	projectId: 'uen7ijyc',
	useCdn: true,
})
