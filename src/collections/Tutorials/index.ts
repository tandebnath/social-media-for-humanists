import type { CollectionConfig } from 'payload'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import writeStaticData from '@/app/(payload)/hooks/writeStaticData'

export const Tutorials: CollectionConfig = {
  slug: 'tutorials',
  labels: {
    singular: 'Tutorial Series',
    plural: 'Tutorial Collections',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'seriesName',
    defaultColumns: ['seriesName', 'sortOrder'],
  },
  hooks: {
    afterChange: [(args: any) => writeStaticData(args)],
    afterDelete: [(args: any) => writeStaticData(args)],
  },
  fields: [
    {
      name: 'sortOrder',
      type: 'number',
      required: true,
      unique: true,
      admin: {
        description: 'Controls the display order of tutorial series. Lower appears first.',
        position: 'sidebar',
      },
    },
    {
      name: 'seriesName',
      type: 'text',
      required: true,
    },
    {
      name: 'seriesSlug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Used for routing or SEO (e.g., "/tutorials/[seriesSlug]")',
      },
    },
    {
      name: 'tutorials',
      type: 'array',
      required: true,
      labels: {
        singular: 'Tutorial',
        plural: 'Tutorials',
      },
      fields: [
        {
          name: 'sortOrder',
          type: 'number',
          required: true,
          admin: {
            description: 'Controls the order of tutorials in this series.',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            description: 'Used for routing (e.g., "/tutorials/[seriesSlug]/[slug]")',
          },
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'contentType',
          type: 'select',
          required: true,
          options: [
            { label: 'Text', value: 'text' },
            { label: 'External Link', value: 'link' },
          ],
          admin: {
            description: 'Select how this tutorial content will be shown.',
          },
        },
        {
          name: 'content',
          type: 'richText',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.contentType === 'text',
            description: 'Use for text-based tutorials.',
          },
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [FixedToolbarFeature(), ...defaultFeatures],
            admin: {
              placeholder: 'Write the tutorial content here...',
            },
          }),
        },
        {
          name: 'linkContent',
          type: 'text',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.contentType === 'link',
            description: 'Provide an external link (e.g., Colab).',
          },
        },
      ],
    },
  ],
}
