"use client";

export default function PromotionsList() {
    const promotions = [
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
    ];

    return (
        <div className="w-full lg:w-3/5">
            {promotions.map(({ id, title, description, timeFrame, images, price }) => (
                <section
                    key={id}
                    className="w-full bg-[#fbf2d7] p-6  mb-8 last:mb-0 flex flex-col md:flex-row items-center justify-between min-h-[250px]"
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
            ))}
        </div>
    );
}
