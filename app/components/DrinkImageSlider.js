"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function DrinkImageSlider() {
    const drinks = [
        { name: "ChocoDream", src: "/images/ChocoDream.png" },
        { name: "Grapefruit", src: "/images/grapefruit.png" },
        { name: "BSMT", src: "/images/bsmt.png" },
        { name: "Popping", src: "/images/popping.png" },
        { name: "Matcha", src: "/images/matcha.png" },
    ];

    const [currentDrinkIndex, setCurrentDrinkIndex] = useState(0);

    // Automatically rotate the drinks
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDrinkIndex((prevIndex) => (prevIndex + 1) % drinks.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const calculatePosition = (index) => {
        const position =
            (index - currentDrinkIndex + drinks.length) % drinks.length;

        switch (position) {
            case 0:
                return "translate-x-0 translate-y-0 scale-125 z-10 opacity-100"; // Center image
            case 1:
                return "translate-x-[200px] translate-y-[-20px] scale-110 z-5 opacity-90"; // Right side
            case drinks.length - 1:
                return "translate-x-[-200px] translate-y-[-20px] scale-110 z-5 opacity-90"; // Left side
            case 2:
                return "translate-x-[400px] translate-y-[-40px] scale-100 z-0 opacity-75"; // Far right
            case drinks.length - 2:
                return "translate-x-[-400px] translate-y-[-40px] scale-100 z-0 opacity-75"; // Far left
            default:
                return "translate-y-[-50px] scale-90 opacity-50 z-0"; // Fallback
        }
    };

    return (
        <div className="relative h-[500px] flex justify-center items-center overflow-hidden bg-white">
            {drinks.map((drink, index) => {
                const positionClasses = calculatePosition(index);
                const isCenter =
                    (index - currentDrinkIndex + drinks.length) % drinks.length === 0;

                return (
                    <div
                        key={index}
                        className={`absolute transition-transform duration-700 ease-in-out ${positionClasses}`}
                    >
                        <Image
                            src={drink.src}
                            alt={drink.name}
                            width={280} // Larger image size
                            height={360} // Larger image size
                            className="rounded-lg"
                            priority={isCenter} // Prioritize the central image
                            loading={isCenter ? "eager" : "lazy"} // Lazy loading for non-central images
                        />
                        {isCenter && (
                            <p className="text-center mt-4 text-[#653128] text-lg font-bold">
                                {drink.name}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
