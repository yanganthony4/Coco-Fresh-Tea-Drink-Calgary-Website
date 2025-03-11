"use client"

import Link from "next/link"
import { defineSchema, defineConfig } from "tinacms"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { useTina } from "tinacms/dist/react"

// Define content schema
const schema = defineSchema({
  collections: [
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
  ],
})

// Export Tina config
export const tinaConfig = defineConfig({
  schema,
  apiURL: process.env.NEXT_PUBLIC_TINA_API_URL, 
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, 
  token: process.env.NEXT_PUBLIC_TINA_TOKEN, 
})

// Default data for initial rendering
const defaultData = {
  boxes: [
    {
      title: "WANT TO DROP BY?",
      description: "Locate your nearest CoCo and enjoy your favorite drinks. We are just around the corner!",
      linkText: "LOCATIONS",
      linkHref: "/locations",
    },
    {
      title: "WANT TO LEARN OUR STORY?",
      description: "Discover the journey of CoCo and how we became your go-to place for refreshing drinks.",
      linkText: "OUR STORY",
      linkHref: "/about",
    },
    {
      title: "HAVE A QUESTION?",
      description: "Reach out to us for any inquiries or feedback. We're here to make your experience delightful!",
      linkText: "CONTACT US",
      linkHref: "/contact-us",
    },
  ],
}

export default function Boxes({ data = defaultData }) {
  // Use TinaCMS data
  const { data: tinaData } = useTina({
    query: `
      query GetBoxes {
        boxes {
          title
          description
          linkText
          linkHref
        }
      }
    `,
    variables: {},
    data,
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {(tinaData?.boxes || defaultData.boxes).map((box, index) => (
        <div
          key={index}
          className="flex flex-col bg-orange-300 text-white rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl p-6 min-h-[300px] sm:min-h-[400px]"
        >
          <div className="flex-grow">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">{box.title}</h3>
            <p className="text-base sm:text-lg">{box.description}</p>
          </div>
          <div className="mt-4">
            <Link
              href={box.linkHref}
              className="group text-base sm:text-lg cursor-pointer flex items-center justify-end"
            >
              {box.linkText}
              <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-2 pl-3">
                &#8594;
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}