import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'
import { schemaTypes } from './schemaTypes'

const languages = [
	{ id: 'en', title: 'English' },
	{ id: 'es', title: 'Español' },
]

export default defineConfig({
	name: 'default',
	title: 'TOLO Trivia',

	projectId: 'uen7ijyc',
	dataset: 'production',

	plugins: [
		structureTool(),
		visionTool(),
		internationalizedArray({
			languages,
			fieldTypes: ['string', 'text'],
		}),
	],

	schema: {
		types: schemaTypes,
	},
})
