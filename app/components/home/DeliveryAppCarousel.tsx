"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type MainImage = { src: string; alt: string };
type SmallImage = { src: string; alt: string; link: string };

export default function DeliveryAppCarouselMap() {
  const [mainImage, setMainImage] = useState<MainImage>({
    src: "/images/art/deliveryimage.webp",
    alt: "Main Image",
  });

  const [smallImages, setSmallImages] = useState<SmallImage[]>([
    {
      src: "/images/webps/ubereats.webp",
      alt: "Uber Eats Logo",
      link: "https://www.ubereats.com/ca/brand-city/calgary-ab/coco-fresh-tea-juice",
    },
    {
      src: "/images/webps/doordash.webp",
      alt: "DoorDash Logo",
      link: "https://www.doordash.com/en-CA/store/coco-fresh-tea-&-juice-(canada)-calgary-364209/1332864/",
    },
    {
      src: "/images/webps/skipthedishes.webp",
      alt: "SkipTheDishes Logo",
      link: "https://www.skipthedishes.com/brands/coco-fresh-tea-and-juice",
    },
    {
      src: "/images/webps/fantuan.webp",
      alt: "Fantuan Logo",
      link: "https://order.fantuan.ca/en-US/restaurantlist/search?keyword=coco%20fresh%20tea&suggestKeyword=CoCo&controlSearchSource=SUGGEST",
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const iv = setInterval(
      () => setActiveIndex(i => (i + 1) % smallImages.length),
      2500
    );
    return () => clearInterval(iv);
  }, [smallImages.length]);

  const handleError = (i: number) => {
    const fallback = "/images/main-image.webp";
    if (i === -1) {
      setMainImage(m => ({ ...m, src: fallback }));
    } else {
      setSmallImages(imgs =>
        imgs.map((img, idx) =>
          idx === i ? { ...img, src: fallback } : img
        )
      );
    }
  };

  return (
    <section className="flex items-center justify-center bg-white py-4 md:py-8">
      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10 w-full px-4 md:px-0">
        {/* Main image */}
        <div className="flex-1">
          <Image
            src={mainImage.src}
            alt={mainImage.alt}
            width={500}
            height={220}
            className="rounded-lg object-cover transition-transform duration-500 hover:scale-105"
            onError={() => handleError(-1)}
          />
        </div>

        {/* Logos */}
        <div className="flex-1 border-t-4 md:border-l-4 md:border-t-0 border-grey-500 pt-8 pb-8 md:pt-0 md:pl-5 mt-5 md:mt-0">
          <div className="grid grid-cols-2 gap-4 mb-12 justify-center justify-items-center sm:flex sm:flex-wrap sm:justify-center sm:items-center">
            {smallImages.map((img, idx) => (
              <a
                key={idx}
                href={img.link}
                target="_blank"
                rel="noreferrer noopener"
                className="block transition-transform duration-500 hover:scale-110"
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  width={75}
                  height={75}
                  className="rounded-lg object-contain w-[75px] h-[75px] sm:w-[100px] sm:h-[100px]"
                  onError={() => handleError(idx)}
                />
              </a>
            ))}
          </div>

          <p className="text-center text-xs md:text-sm font-medium text-[#653128] animate-pulse mt-20 leading-relaxed max-w-md mx-auto">
            Enjoy the refreshing taste of Coco&apos;s Bubble Tea and Fresh Juice delivered straight to your door. Sip on
            your favorites without leaving the comfort of home!
          </p>
        </div>
      </div>
    </section>
  );
}
