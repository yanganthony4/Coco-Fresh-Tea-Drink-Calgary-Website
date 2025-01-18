"use client";
import Toolbar from '../components/Toolbar.js';
import Footer from '../components/Footer.js'
import dynamic from 'next/dynamic';
// Dynamically import the Map component
const Map = dynamic(() => import('../components/Map'), { ssr: false });


export default function LocationsPage() {
    const imageSettings = [
        {
            src: '/images/dd.png',
            alt: 'DoorDash',
            width: '100px',
            height: 'auto',
            top: '10%',
            left: '5%',
        },
        {
            src: '/images/fantuan.png',
            alt: 'Fantuan',
            width: '100px',
            height: 'auto',
            top: '15%',
            right: '10%',
        },
        {
            src: '/images/skip.png',
            alt: 'Skip',
            width: '100px',
            height: 'auto',
            top: '30%',
            left: '89%',
        },
        {
            src: '/images/uber.png',
            alt: 'Uber',
            width: '100px',
            height: 'auto',
            bottom: '20%',
            right: '15%',
        },
    ];

    return (
        <>
            <div className="relative w-full min-h-screen flex flex-col">
                <Toolbar/>
                {/* Background */}
                <div
                    className="relative w-full bg-no-repeat bg-cover bg-center flex-1"
                    style={{
                        backgroundImage: "url('/images/locationsbg.png')",
                    }}
                ></div>

                {/* Main Content */}
                <section className="relative flex flex-col items-center justify-center w-full text-center lg:text-left flex-1">
                    <h1
                        style={{
                            fontSize: "48px",
                            fontWeight: "bold",
                            color: "#653128",
                            marginBottom: "1rem",
                        }}
                    >
                        Can't make the trip?
                    </h1>

                    {/* Delivery Links */}
                    <div className="relative w-full h-full">
                        {imageSettings.map((image, index) => (
                            <a
                                key={index}
                                href="#"
                                className="block"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    position: 'absolute',
                                    width: image.width,
                                    height: image.height,
                                    top: image.top || 'auto',
                                    bottom: image.bottom || 'auto',
                                    left: image.left || 'auto',
                                    right: image.right || 'auto',
                                }}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-contain"
                                />
                            </a>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <Map/>
                <Footer />
            </div>
        </>
    );
}
