import { defineConfig, defineSchema } from 'tinacms';

const schema = defineSchema({
  collections: [
    // Promotions Page
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
    // Toolbar
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
    // Homepage Information Boxes
    {
      label: "Boxes",
      name: "boxes",
      path: "content/boxes",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Description",
          name: "description",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          label: "Link Text",
          name: "linkText",
        },
        {
          type: "string",
          label: "Link URL",
          name: "linkHref",
        },
      ],
    },
    // Categories
    {
      label: 'Categories',
      name: 'categories',
      path: 'content/categories',
      fields: [
        {
          name: 'categories',
          label: 'Categories',
          type: 'object',
          list: true,
          fields: [
            {
              name: 'category',
              label: 'Category Name',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
});

export const tinaConfig = defineConfig({
  schema,
  apiURL: process.env.NEXT_PUBLIC_TINA_API_URL,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.NEXT_PUBLIC_TINA_TOKEN,
});

export default tinaConfig;