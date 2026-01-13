import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'question',
	title: 'Question',
	type: 'document',
	fields: [
		defineField({
			name: 'text',
			title: 'Question Text',
			type: 'internationalizedArrayText',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'reference',
			to: [{ type: 'category' }],
			validation: (rule) => rule.required(),
			description: 'The subcategory this question belongs to',
		}),
		defineField({
			name: 'answers',
			title: 'Answers',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'answer',
					fields: [
						defineField({
							name: 'text',
							title: 'Answer Text',
							type: 'internationalizedArrayString',
							validation: (rule) => rule.required(),
						}),
					],
					preview: {
						select: {
							title: 'text',
						},
						prepare({ title }) {
							const titleArray = title as
								| Array<{ _key: string; value: string }>
								| undefined
							return {
								title:
									titleArray?.find((t) => t._key === 'en')?.value || 'Untitled',
							}
						},
					},
				},
			],
			validation: (rule) => rule.required().min(2).max(4),
		}),
		defineField({
			name: 'correctAnswerIndex',
			title: 'Correct Answer Index',
			type: 'number',
			description:
				'Zero-based index of the correct answer (0 = first, 1 = second, etc.)',
			validation: (rule) => rule.required().min(0).max(3),
		}),
		defineField({
			name: 'explanation',
			title: 'Explanation',
			type: 'internationalizedArrayText',
			description: 'Explanation shown after answering (optional)',
		}),
		defineField({
			name: 'image',
			title: 'Question Image',
			type: 'image',
			options: {
				hotspot: true,
			},
			description: 'Optional image to illustrate the question',
		}),
	],
	preview: {
		select: {
			title: 'text',
			categoryTitle: 'category.title',
			media: 'image',
		},
		prepare({ title, categoryTitle, media }) {
			const titleArray = title as
				| Array<{ _key: string; value: string }>
				| undefined
			const categoryArray = categoryTitle as
				| Array<{ _key: string; value: string }>
				| undefined
			const titleText = titleArray?.find((t) => t._key === 'en')?.value || ''
			const categoryText = categoryArray?.find((t) => t._key === 'en')?.value
			return {
				title:
					titleText.substring(0, 60) + (titleText.length > 60 ? '...' : ''),
				subtitle: categoryText || 'No category',
				media,
			}
		},
	},
})
