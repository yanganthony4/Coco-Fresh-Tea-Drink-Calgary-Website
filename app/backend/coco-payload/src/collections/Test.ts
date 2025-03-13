import { CollectionConfig } from 'payload';

export const Test: CollectionConfig = {
  slug: 'test', // Collection slug
  fields: [
    {
      name: 'message', // Field for the test message
      type: 'text',
      required: true,
    },
  ],
};

