import React from 'react';
import Link from 'next/link'; // Import Link for navigation
import Image from 'next/image';

const Toolbar = () => {
    return (
        <div className="flex items-center text-orange-500 p-4" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
            <div className="text-lg font-bold">
                Insert Logo
            </div>
            <nav className="flex space-x-5 ml-auto">
                <Link href="/promotions" passHref>
                    <p className="hover:text-orange-300 text-lg">Promotions</p>
                </Link>
                <Link href="/menu" passHref>
                    <p className="hover:text-orange-300 text-lg">Menu</p>
                </Link>
                <Link href="/locations" passHref>
                    <p className="hover:text-orange-300 text-lg">Locations</p>
                </Link>
                <Link href="/build-a-drink" passHref>
                    <p className="hover:text-orange-300 text-lg">Build A Drink</p>
                </Link>
                <Link href="/about" passHref>
                    <p className="hover:text-orange-300 text-lg">About Us</p>
                </Link>
                <Link href="/login" passHref> 
                <p className="hover:text-orange-300 text-lg ml-5">Login</p>
            </Link>
            </nav>
            <a
                href="https://www.instagram.com/cocobubbletea.calgary/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-5"
            >
                <img 
                    src="/images/instalogo.png"
                    alt="Coco Calgary Instagram"
                    width={24}
                    height={24}
                />
            </a>
            <a
                href="https://www.tiktok.com/@cocoteacalgary"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2"
            >
                <img 
                    src="/images/tiktoklogo.png"
                    alt="Coco Calgary Tiktok"
                    width={40}
                    height={40}
                />
            </a>
        </div>
    );
};

export default Toolbar;
