import { defineConfig } from 'tinacms';

export default defineConfig({
  apis: {
    tina: {
      clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
      token: process.env.NEXT_PUBLIC_TINA_TOKEN,
    },
  },
  //schemas
  //promotions page
  const schema = defineSchema({
    collections: [
      {
        label: "Promotions Page",
        name: "promotionsPage",
        path: "content/promotions",
        fields: [
          {
            type: "string",
            label: "Banner Image URL",
            name: "bannerImage",
            description: "The URL of the banner image for the promotions page.",
          },
        ],
      },
    ],
  }),
  //tool bar
  const schema = defineSchema({
    collections: [
      {
        label: "Toolbar",
        name: "toolbar",
        path: "content/toolbar",
        fields: [
          {
            type: "string",
            label: "Logo Image URL",
            name: "logo",
          },
          {
            type: "string",
            label: "Location Text",
            name: "locationText",
          },
          {
            type: "object",
            label: "Navigation Links",
            name: "navLinks",
            list: true,
            fields: [
              {
                type: "string",
                label: "Label",
                name: "label",
              },
              {
                type: "string",
                label: "URL",
                name: "href",
              },
            ],
          },
          {
            type: "object",
            label: "Dropdown Links",
            name: "dropdownLinks",
            list: true,
            fields: [
              {
                type: "string",
                label: "Label",
                name: "label",
              },
              {
                type: "string",
                label: "URL",
                name: "href",
              },
            ],
          },
        ],
      },
    ],
  }),
  //homepage information boxes
  const schema = defineSchema({
    collections: [
      {
        label: "Boxes", // Label for the collection in the TinaCMS UI
        name: "boxes", // Name of the collection (used in queries)
        path: "content/boxes", // Path where the content is stored
        fields: [
          {
            type: "string", // Field type (text input)
            label: "Title", // Label for the field in the TinaCMS UI
            name: "title", // Name of the field (used in queries)
          },
          {
            type: "string", // Field type (text input)
            label: "Description", // Label for the field in the TinaCMS UI
            name: "description", // Name of the field (used in queries)
            ui: {
              component: "textarea", // Use a textarea for the description field
            },
          },
          {
            type: "string", // Field type (text input)
            label: "Link Text", // Label for the field in the TinaCMS UI
            name: "linkText", // Name of the field (used in queries)
          },
          {
            type: "string", // Field type (text input)
            label: "Link URL", // Label for the field in the TinaCMS UI
            name: "linkHref", // Name of the field (used in queries)
          },
        ],
      },
    ],
  }),
  export default {
    schema: {
      collections: [
        {
          label: 'Categories', // Label for the collection in the CMS
          name: 'categories', // Unique name for the collection
          path: 'content/categories', // Path where the data will be stored
          fields: [
            {
              name: 'categories',
              label: 'Categories',
              type: 'object',
              list: true, // This indicates it's a list of items
              fields: [
                {
                  name: 'category',
                  label: 'Category Name',
                  type: 'string', // Each item in the list is a string
                },
              ],
            },
          ],
        },
      ],
    },
  },
  
  
  // Export the Tina config
  export const tinaConfig = defineConfig({
    schema,
    apiURL: process.env.NEXT_PUBLIC_TINA_API_URL, 
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, 
    token: process.env.NEXT_PUBLIC_TINA_TOKEN, 
})
});