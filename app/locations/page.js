"use client";
import Toolbar from '../components/Toolbar.js';
import Footer from '../components/Footer.js'
import dynamic from 'next/dynamic';
//import map component
const Map = dynamic(() => import('../components/Map'), { ssr: false });


export default function LocationsPage() {
    const imageSettings = [
        {
            src: '/images/ddlogo.png',
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
        <div className="relative w-full min-h-screen flex flex-col">
            <Toolbar />
            <div>
                <Map />
            </div>
            <div className="flex items-center">
            <h1 className="text-4xl font-bold text-cocoBrown ml-9">
                Can't Make It?
            </h1>

            <div className="ml-4 flex-grow border-t border-gray-300"></div>
                {[//images
                    {
                        src: '/images/ddlogo.png',
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
                ].map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        style={{
                            position: 'absolute',
                            width: image.width,
                            height: image.height,
                            top: image.top || 'auto',
                            bottom: image.bottom || 'auto',
                            left: image.left || 'auto',
                            right: image.right || 'auto',
                        }}
                    />
                ))}
            </div>
            <Footer />
        </div>
    )};