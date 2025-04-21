"use client";

import Image from "next/image";

type DeliveryApp = {
  src: string;
  alt: string;
  link: string;
};

const DeliveryAppLogos = () => {
  const deliveryApps: DeliveryApp[] = [
    { src: "/images/webps/ubereats.webp", alt: "Uber Eats Logo", link: "https://www.ubereats.com/ca/brand-city/calgary-ab/coco-fresh-tea-juice" },
    { src: "/images/webps/doordash.webp", alt: "DoorDash Logo", link: "https://www.doordash.com/en-CA/store/coco-fresh-tea-&-juice-(canada)-calgary-364209/1332864/" },
    { src: "/images/webps/skipthedishes.webp", alt: "SkipTheDishes Logo", link: "https://www.skipthedishes.com/brands/coco-fresh-tea-and-juice" },
    { src: "/images/webps/fantuan.webp", alt: "SkipTheDishes Logo", link: "https://order.fantuan.ca/en-US/restaurantlist/search?keyword=coco%20fresh%20tea&suggestKeyword=CoCo&controlSearchSource=SUGGEST" },
  ];

  const handleImageError = (index: number) => {
    console.warn(`Image at index ${index} failed to load.`);
  };

  return (
    <section className="flex items-center justify-center bg-white py-4">
      <div className="flex flex-wrap justify-center items-center gap-4">
        {deliveryApps.map((app, index) => (
          <a
            key={index}
            href={app.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-transform duration-500 hover:scale-110"
          >
            {app.src ? (
              <Image
                src={app.src || "/placeholder.svg"}
                alt={app.alt}
                width={100}
                height={100}
                className="rounded-lg object-contain w-[75px] h-[75px] sm:w-[100px] sm:h-[100px] "
                onError={() => handleImageError(index)}
              />
            ) : (
              <div className="w-[100px] h-[75px] sm:w-[150px] sm:h-[112px] md:w-[175px] md:h-[131px] lg:w-[200px] lg:h-[150px] rounded-lg bg-gray-200 flex items-center justify-center">
                <span className="text-xs sm:text-sm text-gray-500">Coming Soon</span>
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
};

export default DeliveryAppLogos;
