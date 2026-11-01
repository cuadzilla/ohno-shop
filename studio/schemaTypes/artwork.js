import { defineType, defineField } from 'sanity';

export const artwork = defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Web address name',
      description: 'Click Generate. This becomes the piece\'s page address.',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Main photo',
      description:
        'Shown in the gallery as a square. After uploading, click the photo and drag the circle to choose what stays in the frame.',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'More photos',
      description:
        'Optional. Close-ups, side views, or the piece on a wall. Any shape works, and they appear in full on the piece\'s page.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'sold',
      title: 'Sold',
      description: 'Turn on after the piece sells. It stays in the gallery with a "Sold" label.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image', sold: 'sold', price: 'price' },
    prepare({ title, media, sold, price }) {
      return { title, media, subtitle: sold ? 'SOLD' : `$${price ?? ''}` };
    },
  },
});
