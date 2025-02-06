    "use client"

    import { useEffect, useRef, useState } from "react"
    import Toolbar from "../components/Toolbar"

    export default function Promotions() {
    const [isEmojiVisible, setIsEmojiVisible] = useState(false)
    const cocoRef = useRef(null)

    useEffect(() => {
        if (!cocoRef.current) return

        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            setIsEmojiVisible(entry.isIntersecting)
            })
        },
        { threshold: 0.5 },
        )

        observer.observe(cocoRef.current)

        return () => observer.disconnect()
    }, [])

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
        title: "Grapefruit Series",
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
        
    ]

    return (
        <div className="min-h-screen flex flex-col">
        <Toolbar />

        <div className="flex-1flex flex-col relative">
            {/* Promotions Banner Section - Full width at 100% zoom, gets smaller when zoomed out */}
            <section className="w-full relative overflow-hidden">
                <div className="relative h-[600px] w-full">
                    <img
                    src="/images/Promotionsbanner.png"
                    alt="Promotions Background"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                    loading="lazy"
                    />
                </div>
            </section>

            {/* Main Content Section */}
            <div className="container mx-auto px-4 lg:px-6 pt-1 pb-20">
            <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
                {/* Left Side Content */}
                <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start lg:sticky lg:top-8">
                {/* Emoji Animation and CoCo text */}
                <div className="flex flex-col items-center py-20 px-24 lg:items-start" ref={cocoRef}>
                    <div className={`${isEmojiVisible ? "animate-bounce" : ""} mb-4 px-7`}>
                    <img src="/images/cocoemoji.png" alt="Coco Emoji" className="w-24 lg:w-32" loading="lazy" />
                    </div>
                    <div className="text-5xl lg:text-7xl font-bold text-black font-museo flex">
                    {["C", "o", "C", "o"].map((letter, index) => (
                        <span
                        key={index}
                        className={`${isEmojiVisible ? "animate-bounce" : ""}`}
                        style={{ animationDelay: `${index * 0.2}s`, animationDuration: "1s" }}
                        >
                        {letter}
                        </span>
                    ))}
                    </div>
                </div>
                </div>

                {/* Vertical Line */}
                <div className="hidden lg:block w-0.5 bg-[#E7D4B5] h-auto self-stretch" />

                {/* Promotions List */}
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
            </div>
            </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <footer className="bg-orange-300 py-6 mt-auto">
            <div className="flex justify-center space-x-6">
            <a href="#" className="text-white hover:underline">
                Privacy Policy
            </a>
            <a href="#" className="text-white hover:underline">
                Accessibility
            </a>
            </div>
        </footer>
        </div>
    )
    }

