"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "../app/components/Layout";
import DrinkImageSlider from "../app/components/DrinkImageSlider";
import Boxes from "./components/boxes";
import DynamicImageSection from "./components/DynamicImageSection" 

export default function Home() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        "/images/homepage.png",
        "/images/cremebruleeposter.png",
        "/images/strawberryPromo.png",
        "/images/mangodream.png",
    ];

    // Automatically change the image every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Layout>
            <section className="relative bg-orange-100">
                <div className="relative">
                    {/* Main Background Image */}
                    <img
                        src={images[currentImageIndex]}
                        alt="Promotional Background"
                        className="w-full"
                        style={{
                            height: "105vh",
                            objectFit: "cover",
                            width: "100%",
                        }}
                    />

                    {/* Conditional Rendering for Overlay */}
                    {images[currentImageIndex] === "/images/homepage.png" && (
                        <div className="absolute inset-0">
                            <img
                                src="/images/sparkupeverymoment.png"
                                alt="Blank filler"
                                className="absolute top-[45%] right-[0.01%] transform translate-y-[-72%] w-[40%] h-auto"
                            />
                        </div>
                    )}

                    {/* Buttons for Background Navigation */}
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-4 h-4 rounded-full ${
                                    currentImageIndex === index
                                        ? "bg-orange-500"
                                        : "bg-orange-200"
                                } transition-colors duration-300`}
                            ></button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Build-a-Drink Feature Promo */}
            <section className="py-12 bg-white">
                <h2 className="text-3xl font-bold text-[#653128] text-center">
                    Our Signature Drinks
                </h2>
                <DrinkImageSlider />
                <div className="flex justify-center items-center mt-6">
                    <Link href="/menu" legacyBehavior>
                        <a className="flex items-center space-x-2 text-2xl font-bold text-[#653128]">
                            <span className="underline">Explore More</span>
                            <span className="text-2xl no-underline">&#8594;</span>
                        </a>
                    </Link>
                </div>
            </section>

            

            {/* Boxes Section */}
            <section className="bg-orange-300 py-12">
                <Boxes />
            </section>

            

            {/* Boxes Section */}
            <section className="bg-orange-300 ">
                <DynamicImageSection />
            </section>
        </Layout>
    );
}
