import type { CollectionConfig } from 'payload';

export const PromotionMedia: CollectionConfig = {
  slug: 'promotion-media',
  upload: {
    staticDir: 'promotion-media',
    mimeTypes: ['image/*'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
};


