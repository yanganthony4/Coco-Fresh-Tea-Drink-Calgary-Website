import type { CollectionConfig } from 'payload'

export const Promotions: CollectionConfig = {
    slug: 'promotions',
    access: {
      read: () => true,
      create: () => true,
    },
    hooks: {
      afterDelete: [
        async ({ doc, req }) => {
          if (doc.images && Array.isArray(doc.images)) {
            for (const imageId of doc.images) {
              try {
                await req.payload.delete({
                  collection: 'promotion-media',
                  id: typeof imageId === 'string' ? imageId : imageId.id, 
                });
              } catch (err) {
                console.error(`Failed to delete promotion-media image ${imageId}:`, err);
              }
            }
          }
        },
      ],
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
          },
          {
            name: 'description',
            type: 'text',
            required: true,
          },
          {
            name: 'timeFrame',
            type: 'text',
            required: true,
          },
          {
            name: 'price',
            type: 'text',
            required: true,
          },
          {
            name: 'images',
            type: 'upload',
            relationTo: 'promotion-media',
            required: true,
            hasMany: true,
          },
    ],
  };