"use client";

import { useEffect, useState } from "react";

type Promotion = {
  id: number;
  title: string;
  description: string;
  timeFrame: string;
  images: string[];
  price: string;
};

export default function PromotionsList() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/promotions?limit=10")
      .then((res) => res.json())
      .then((data) => {
        const formatted: Promotion[] = data.docs.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          timeFrame: item.timeFrame,
          images: item.images?.map(
            (img: any) =>
              `http://localhost:3000/api/promotion-media/file/${img.filename}`
          ),
          price: item.price,
        }));
        setPromotions(formatted);
      });
  }, []);

  return (
    <div className="w-full lg:w-3/5">
      {promotions.map(
        ({ id, title, description, timeFrame, images, price }) => (
          <section
            key={id}
            className="w-full bg-[#fbf2d7] p-6 shadow-lg mb-8 last:mb-0 rounded-lg flex flex-col md:flex-row items-center justify-between min-h-[250px]"
          >
            {/* Image */}
            <div className="flex-shrink-0 flex items-center justify-center p-4 w-full md:w-2/5">
              {images?.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc || "/placeholder.svg"}
                  alt={`${title} Promotional Image of current discounts and deals. `}
                  className="w-full h-auto object-contain max-w-[450px]"
                  loading="lazy"
                />
              ))}
            </div>

            {/* Text */}
            <div className="text-center md:text-left p-4 md:w-3/5">
              <h2 className="text-2xl md:text-3xl font-bold text-[#7c3d14] mb-2">
                {title} <span className="text-[#f04e23]">NEW!</span>
              </h2>
              <p className="text-lg text-gray-700 font-medium mb-2">
                Refresh with choices from <span className="font-bold">{price}</span>.
              </p>
              <p className="text-gray-600">{description}</p>
              <p className="text-sm text-gray-500 mt-4">{timeFrame}</p>
            </div>
          </section>
        )
      )}
    </div>
  );
}
