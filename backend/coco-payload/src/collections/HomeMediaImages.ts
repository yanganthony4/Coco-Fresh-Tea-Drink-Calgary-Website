import type { CollectionConfig } from 'payload'

export const HomeMediaImages: CollectionConfig = {
  slug: 'home-media-images',
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
}
