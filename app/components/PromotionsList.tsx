"use client";

type Promotion = {
  id: number;
  title: string;
  description: string;
  timeFrame: string;
  images: string[];
  price: string;
};

const promotions: Promotion[] = [
  {
    id: 1,
    title: "Creme Brulee Special",
    description: "Try our new Creme Brulee drinks made with the highest quality!",
    timeFrame: "April 1 - April 30, 2025",
    images: ["/images/cremebruleeposter.webp"],
    price: "4.99"
  },
  {
    id: 2,
    title: "Strawberry Special",
    description: "Try our new Strawberry drinks made with the highest quality!",
    timeFrame: "April 1 - April 30, 2025",
    images: ["/images/strawberryPromo.webp"],
    price: "4.99"
  },
  {
    id: 3,
    title: "Mango Dream",
    description: "Try our new Mango drinks made with the highest quality!",
    timeFrame: "April 1 - April 30, 2025",
    images: ["/images/mangodream.webp"],
    price: "4.99"
  },
]

export default function PromotionsList() {

  return (
    <div className="w-full lg:w-3/5">
      {promotions.map(
        ({ id, title, description, timeFrame, images, price }) => (
          <section
            key={id}
            className="w-full bg-[#fbf2d7] p-6 shadow-lg mb-8 last:mb-0 rounded-lg flex flex-col md:flex-row items-center justify-between min-h-[250px]"
          >
            {/* Image */}
            <div className="flex-shrink-0 flex items-center justify-center  w-full md:w-2/5">
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
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black mb-2 uppercase">
                {title} <span className="text-[#f04e23]">NEW!</span>
              </h2>
              <p className="text-lg text-gray-700 font-medium mb-2">
                <span className="font-bold">{price}</span>
              </p>
              <p className="text-gray-600">{description}</p>
              <p className="text-sm text-gray-500 mt-4 uppercase">{timeFrame}</p>
            </div>
          </section>
        )
      )}
    </div>
  );
}
