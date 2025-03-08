"use client";

import { useForm, usePlugin } from "tinacms";

export default function PromotionsList() {
  // Define editable fields with TinaCMS
  const [formData, form] = useForm({
    initialValues: {
      promotions: [
        {
          id: 1,
          title: "Strawberry Series",
          description: "Dive into berry delights at participating locations!",
          timeFrame: "Available until March 31, 2025",
          images: ["/images/strawberryPromo.png"],
          price: "$6.64",
        },
        {
          id: 2,
          title: "Creme Brulee Series",
          description: "A refreshing escape at participating locations!",
          timeFrame: "Available until April 15, 2025",
          images: ["/images/cremebruleeposter.png"],
          price: "$6.80",
        },
        {
          id: 3,
          title: "Brown Sugar Series",
          description: "Indulge in caramel flavors at selected locations!",
          timeFrame: "Available all year round",
          images: ["/images/mangodream.png"],
          price: "$6.80",
        },
      ],
    },
    onSubmit: (data) => {
      console.log("Updated Promotions Data:", data.promotions);
      //logic for saving to backend
    },
    fields: [
      {
        name: "promotions",
        label: "Promotions",
        component: "group-list",
        itemProps: (item) => ({
          key: item.id,
          label: item.title,
        }),
        defaultItem: () => ({
          id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
          title: "New Promotion",
          description: "Description of the new promotion",
          timeFrame: "Available until...",
          images: ["/placeholder.svg"],
          price: "$0.00",
        }),
        fields: [
          {
            name: "title",
            label: "Title",
            component: "text",
          },
          {
            name: "description",
            label: "Description",
            component: "textarea",
          },
          {
            name: "timeFrame",
            label: "Time Frame",
            component: "text",
          },
          {
            name: "images",
            label: "Images",
            component: "group-list",
            itemProps: (item) => ({
              key: item,
              label: item,
            }),
            defaultItem: () => "/placeholder.svg",
            fields: [
              {
                name: "image",
                label: "Image URL",
                component: "text",
              },
            ],
          },
          {
            name: "price",
            label: "Price",
            component: "text",
          },
        ],
      },
    ],
  });

  // Connect the form to TinaCMS
  usePlugin(form);

  // Extract promotions from formData
  const promotions = formData.promotions;

  return (
    <div className="w-full lg:w-3/5">
      {promotions.map(({ id, title, description, timeFrame, images, price }) => (
        <section
          key={id}
          className="w-full bg-[#fbf2d7] p-6 shadow-lg mb-8 last:mb-0 rounded-lg flex flex-col md:flex-row items-center justify-between min-h-[250px]"
        >
          {/* Image */}
          <div className="flex-shrink-0 flex items-center justify-center p-4 w-full md:w-2/5">
            {images.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc || "/placeholder.svg"}
                alt={`${title} Promotion`}
                className="w-full h-auto object-contain max-w-[450px]"
                loading="lazy"
              />
            ))}
          </div>

          {/* Text */}
          <div className="text-center md:text-left p-4 md:w-3/5">
            <h2 className="text-2xl md:text-3xl font-bold text-[#7c3d14] mb-2 font-caveat">
              {title} <span className="text-[#f04e23]">NEW!</span>
            </h2>
            <p className="text-lg text-gray-700 font-medium mb-2 font-signika">
              Refresh with choices from <span className="font-bold">{price}</span>.
            </p>
            <p className="text-gray-600 font-signika">{description}</p>
            <p className="text-sm text-gray-500 mt-4 font-signika">{timeFrame}</p>
          </div>
        </section>
      ))}
    </div>
  );
}