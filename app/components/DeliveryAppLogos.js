"use client";

import Image from "next/image";

const DeliveryAppLogos = () => {
  // Delivery apps array – note that the fourth item is empty (placeholder)
  const deliveryApps = [
    { src: "/images/ubereats.png", alt: "Uber Eats", link: "https://www.ubereats.com/" },
    { src: "/images/doordash.png", alt: "DoorDash", link: "https://www.doordash.com/" },
    { src: "/images/skipthedishes.png", alt: "SkipTheDishes", link: "https://www.skipthedishes.com/" },
    { src: "", alt: "", link: "" } // Placeholder for the fourth image.
  ];

  // Optional: fallback for failed image loading
  const handleImageError = (index) => {
    const fallbackSrc = "/images/deliverydriver.png";
    // Since we're not auto-cycling images now, you can handle errors by
    // optionally updating the deliveryApps array via state if needed.
  };

  return (
    <section className="flex items-center justify-center bg-white py-20 mx-10">
      {/* Flex container for 4 images in a row */}
      <div className="flex flex-row items-center gap-10 max-w-5xl w-full">
        {deliveryApps.map((app, index) => (
          <a
            key={index}
            href={app.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            // On hover, scale the image container with a smooth animation.
            className="block transition-transform duration-500 hover:scale-110"
          >
            {app.src ? (
              <Image
                src={app.src}
                alt={app.alt}
                width={200}
                height={150}
                className="rounded-lg object-contain"
                onError={() => handleImageError(index)}
              />
            ) : (
              // For the empty item, show a placeholder container.
              <div className="w-[200px] h-[150px] rounded-lg bg-gray-200 flex items-center justify-center">
                <span className="text-sm text-gray-500">Coming Soon</span>
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
};

export default DeliveryAppLogos;
