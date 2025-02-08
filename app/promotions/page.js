
"use client";

import { useEffect, useRef, useState } from "react";
import PromotionsList from "../promotions/PromotionsList";

export default function Promotions() {
    const [isEmojiVisible, setIsEmojiVisible] = useState(false);
    const cocoRef = useRef(null);

    useEffect(() => {
        if (!cocoRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsEmojiVisible(entry.isIntersecting);
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(cocoRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">

            <div className="flex-1 flex flex-col relative">
                {/* Promotions Banner Section */}
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

                        {/* Promotions List Component */}
                        <PromotionsList />

                    </div>
                </div>
            </div>


        </div>
    );
}
