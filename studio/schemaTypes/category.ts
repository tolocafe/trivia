import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'category',
	title: 'Category',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'internationalizedArrayString',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: (doc) =>
					(
						doc.title as Array<{ _key: string; value: string }> | undefined
					)?.find((t) => t._key === 'en')?.value || '',
				maxLength: 96,
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'internationalizedArrayText',
		}),
		defineField({
			name: 'parent',
			title: 'Parent Category',
			type: 'reference',
			to: [{ type: 'category' }],
			description: 'Leave empty for top-level categories',
		}),
		defineField({
			name: 'color',
			title: 'Color',
			type: 'string',
			description: 'Hex color code for the category card',
			validation: (rule) =>
				rule.regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex color' }),
		}),
		defineField({
			name: 'icon',
			title: 'Icon',
			type: 'string',
			description: 'SF Symbol name or emoji',
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: 'order',
			title: 'Display Order',
			type: 'number',
			initialValue: 0,
		}),
	],
	preview: {
		select: {
			title: 'title',
			parentTitle: 'parent.title',
			media: 'image',
		},
		prepare({ title, parentTitle, media }) {
			const titleArray = title as
				| Array<{ _key: string; value: string }>
				| undefined
			const parentArray = parentTitle as
				| Array<{ _key: string; value: string }>
				| undefined
			const titleText =
				titleArray?.find((t) => t._key === 'en')?.value || 'Untitled'
			const parentText = parentArray?.find((t) => t._key === 'en')?.value
			return {
				title: titleText,
				subtitle: parentText ? `→ ${parentText}` : 'Top Level',
				media,
			}
		},
	},
	orderings: [
		{
			title: 'Display Order',
			name: 'orderAsc',
			by: [{ field: 'order', direction: 'asc' }],
		},
	],
})
