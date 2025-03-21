import type { CollectionConfig } from 'payload'
import { lexicalEditor, FixedToolbarFeature } from '@payloadcms/richtext-lexical'
import writeStaticData from '@/app/(payload)/hooks/writeStaticData'

export const TutorialsOverview: CollectionConfig = {
  slug: 'tutorials-overview',
  labels: {
    singular: 'Tutorials Overview',
    plural: 'Tutorials Overview Content',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['id'],
  },
  hooks: {
    afterChange: [(args: any) => writeStaticData(args)],
    afterDelete: [(args: any) => writeStaticData(args)],
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [FixedToolbarFeature(), ...defaultFeatures],
        admin: {
          placeholder: 'Write the overview content here...',
        },
      }),
      admin: {
        description: 'Introductory content for the Tutorials section.',
      },
    },
  ],
}