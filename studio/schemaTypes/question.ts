import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'question',
  title: 'Question',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Question Text',
      type: 'text',
      rows: 3,
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
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'text',
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
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Foundation', value: 'foundation' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Professional', value: 'professional' },
        ],
        layout: 'radio',
      },
      initialValue: 'foundation',
    }),
    defineField({
      name: 'explanation',
      title: 'Explanation',
      type: 'text',
      rows: 3,
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
    defineField({
      name: 'timeLimit',
      title: 'Time Limit (seconds)',
      type: 'number',
      initialValue: 20,
      validation: (rule) => rule.min(5).max(60),
    }),
  ],
  preview: {
    select: {
      title: 'text',
      categoryTitle: 'category.title',
      difficulty: 'difficulty',
      media: 'image',
    },
    prepare({ title, categoryTitle, difficulty, media }) {
      return {
        title: title?.substring(0, 60) + (title?.length > 60 ? '...' : ''),
        subtitle: `${categoryTitle || 'No category'} • ${difficulty || 'foundation'}`,
        media,
      }
    },
  },
})
