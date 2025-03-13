import { CollectionConfig } from 'payload';

export const Test: CollectionConfig = {
  slug: 'test', // Collection slug
  access: {
    read: () => true, // Allow public read access
  }, 
  fields: [
    {
      name: 'message', // Field for the test message
      type: 'text',
      required: true,
    },
  ],
};

