"use client";

import Image from "next/image";
import { useState } from "react";
import promotions from "../json/promotions-items.json";

type Promotion = {
  id: number;
  title: string;
  description: string;
  timeFrame: string;
  images: string[];
};

function isNew(timeFrame: string): boolean {
  const match = timeFrame.match(/(\w+ \d{1,2}) - (\w+ \d{1,2}), (\d{4})/);
  if (!match) return false;

  const [_, startStr, endStr, yearStr] = match;
  const start = new Date(`${startStr}, ${yearStr}`);
  const end = new Date(`${endStr}, ${yearStr}`);
  const today = new Date();

  return today >= start && today <= end;
}

export default function PromotionsList() {
  const [openPromotionId, setOpenPromotionId] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setOpenPromotionId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-[60%] mx-auto h-auto font-sora md:w-auto">
      {promotions.map(({ id, title, description, timeFrame, images }) => (
        <section
          key={id}
          className="w-full bg-[#fbf2d7] rounded-md mb-8 last:mb-0 flex flex-col items-center justify-center"
        >
          {/* Image */}
          <button
            onClick={() => toggleDropdown(id)}
            aria-expanded={openPromotionId === id}
            aria-controls={`promotion-desc-${id}`}
            className="w-full focus:outline-none"
          >
            <div className="relative overflow-hidden md:w-[700px] md:h-[400px]">
              {/* "NEW" badge */}
              {isNew(timeFrame) && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-xl font-bold px-2 py-1 rounded shadow z-10">
                  NEW
                </div>
              )}
              
              {images.map((imgSrc, index) => (
                <Image
                  key={index}
                  src={imgSrc || "/placeholder.svg"}
                  alt={`${title} promotional image of current discounts and deals.`}
                  fill
                  className="object-fill transition-transform hover:scale-105"
                  loading="lazy"
                />
              ))}
            </div>
          </button>


          {/* Text Dropdown */}
          <div
            id={`promotion-desc-${id}`}
            className={`transition-all duration-300 ease-in-out overflow-hidden w-full max-w-[500px] bg-[#fbf2d7] ${
              openPromotionId === id ? "max-h-[500px] p-5 md:px-0 md:py-3" : "max-h-0 opacity-0"
            }`}
          >
            <h2 className="text-black uppercase text-xl md:text-3xl pl-3">
              {title}
            </h2>
            <p className="text-sm text-orange-500 uppercase pl-3">{timeFrame}</p>

            <p className="text-black pb-2 pl-3">{description}</p>
          </div>
        </section>
      ))}
    </div>
  );
}
