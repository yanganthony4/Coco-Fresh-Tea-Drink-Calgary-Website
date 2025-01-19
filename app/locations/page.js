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
        <div className="relative w-full min-h-screen flex flex-col">
            <Toolbar/>
            <div className="">
                <Map/>
            </div>
            <div className="bg-orange-300">
                <h1 className="text-4xl text-center font-bold text-cocoBrown">
                    Can't Make It?
                </h1>

            </div>
            <Footer />
        </div>
    
    );
}
