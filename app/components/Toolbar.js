import React from 'react';
import Image from 'next/image';

const Toolbar = () => {
    return (
        <div class="flex items-center text-orange-500 p-4 " style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
            <div class="text-lg font-bold">
                Insert Logo
            </div>
            <nav class="flex space-x-5 ml-auto">
                <a href='/' class="hover:text-orange-300 text-lg">Home</a>
                <a href='/promotions' class="hover:text-orange-300 text-lg">Promotions</a>
                <a href='/menu' class="hover:text-orange-300 text-lg">Menu</a>
                <a href='/locations' class="hover:text-orange-300 text-lg">Locations</a>
                <a href='/build-a-drink' class="hover:text-orange-300 text-lg">Build A Drink</a>
                <a href='/about' class="hover:text-orange-300 text-lg">About Us</a>
            </nav>
            <a
                href='https://www.instagram.com/cocobubbletea.calgary/'
                target="_blank"
                rel="noopener noreferrer"
                className="ml-5"
            >
                <img 
                    src="/images/instalogo.png"
                    alt='Coco Calgary Instagram'
                    width={24}
                    height={24}
                />
            </a>
            <a
                href='https://www.tiktok.com/@cocoteacalgary'
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2"
            >
                <img 
                    src="/images/tiktoklogo.png"
                    alt='Coco Calgary Tiktok'
                    width={40}
                    height={40}
                />
            </a>
        </div>
    );
};

export default Toolbar;