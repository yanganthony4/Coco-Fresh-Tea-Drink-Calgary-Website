import { defineConfig } from 'tinacms';

export default defineConfig({
  apis: {
    tina: {
      clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
      token: process.env.NEXT_PUBLIC_TINA_TOKEN,
    },
  },
  //schemas
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
  
  // Export the Tina config
  export const tinaConfig = defineConfig({
    schema,
    apiURL: process.env.NEXT_PUBLIC_TINA_API_URL, 
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, 
    token: process.env.NEXT_PUBLIC_TINA_TOKEN, 
})
});