"use client"

import Image from "next/image"

interface Story {
  readonly id: number
  readonly title: string
  readonly subtitle: string
  readonly text: string
  readonly imageUrl: string
  readonly reverse: boolean
}

const storyContent: readonly Story[] = [
  {
    id: 1,
    title: "A Global Bubble Tea Leader",
    subtitle: "Our Beginning",
    text: "CoCo Bubble Tea was founded in 1997 by Chairman Tommy Hung. In a world where culture blends with tea, CoCo found its core mission, 'Consistency and Continuity', to bring the highest quality tea with unmatchable services to customers. Over decades, CoCo has kept its promise in quality and services with innovative drinks, stylish store designs, fresh ingredients, and distinctive recipes. With the first New York store opening in 2011, CoCo successfully expanded globally. CoCo aims to create a diverse and sustainable community for its customers while embracing tradition and innovation.",
    imageUrl: "/images/122b2bb7-e065-4676-9692-86ff09443f32-retina-large.webp",
    reverse: false,
  },
  {
    id: 2,
    title: "Fresh Ingredients, Creative Drinks",
    subtitle: "Canadian Experience",
    text: "In Canada, CoCo Bubble Tea offers a diverse menu of creative drinks made with fresh ingredients, served in stylish and welcoming stores. From classic milk teas to bold fruit infusions, CoCo brings an authentic and innovative bubble tea experience to communities across the country. As CoCo expands in Canada, it remains dedicated to inclusivity, sustainability, and a passion for tea.",
    imageUrl: "/images/image3.webp",
    reverse: true,
  },
  {
    id: 3,
    title: "Sustainability & Inclusivity",
    subtitle: "Our Vision",
    text: "CoCo dedicates itself to everything we do. We seek high-quality ingredients, deliver trendy drinks with passion and dedication, and provide service from the heart. Our mission is to consistently give you the best bubble tea experience possible.",
    imageUrl: "/images/image1.webp",
    reverse: false,
  },
]

export default function StorySection(): JSX.Element {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2
        className="text-3xl md:text-5xl font-bold text-center mb-20 reveal-on-scroll opacity-100 transition-all duration-700 animated-underline"
        style={{ transform: "translateY(40px)" }}
      >
        OUR STORY!
      </h2>

      <div className="space-y-32">
        {storyContent.map(({ id, title, subtitle, text, imageUrl, reverse }) => (
          <div
            key={id}
            className="relative grid md:grid-cols-2 gap-12 md:gap-16 items-center reveal-on-scroll opacity-100 transition-all duration-700"
            style={{ transform: "translateY(40px)" }}
          >
            <div className={`relative ${reverse ? "md:order-2" : "md:order-1"}`}>
              <div className="absolute -inset-4 bg-[#FF6B35]/10 transform -rotate-2 -z-10" />
              <Image
                src={imageUrl}
                alt={title}
                width={600}
                height={400}
                className="w-full h-auto max-h-[500px] object-contain rounded-lg"
              />
            </div>
            <div className={`${reverse ? "md:order-1" : "md:order-2"}`}>
              <span className="text-[#FF6B35] font-medium mb-3 block">{subtitle}</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">{title}</h3>
              <p className="text-lg leading-relaxed">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
