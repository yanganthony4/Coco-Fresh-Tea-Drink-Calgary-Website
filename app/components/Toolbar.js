"use client";

import Link from "next/link";
import React, { useState } from "react";
import bcrypt from "bcryptjs";
import LazyImage from "../LazyImage";


const Toolbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const storedHashedPassword = bcrypt.hashSync("password123", 10);

    const handleLogin = () => {
        const validUsername = "admin";
        if (username === validUsername && bcrypt.compareSync(password, storedHashedPassword)) {
            setIsLoggedIn(true);
            setShowLoginPrompt(false);
            alert("Login successful!");
        } else {
            alert("Invalid username or password");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername("");
        setPassword("");
        alert("You have logged out");
    };

    return (

        <header className="sticky relative top-0 z-50 bg-white  flex items-center justify-between p-4 toolbar">
            {/* Left Section with Logo and Navigation Links */}
            <div className="flex items-center space-x-8">
                {/* Logo */}
                <Link href="/">
                    <img
                        src="/images/logo.png"
                        alt="CoCo Logo"
                        className="w-32 h-auto"
                        loading="lazy"
                    />
                </Link>

                {/* Navigation Links - Hidden on Small Screens */}
                <nav className="hidden md:flex space-x-5">
                    <Link href="/" className="hover:text-orange-300 text-md text-orange-500">
                        HOME
                    </Link>
                    <Link href="/promotions" className="hover:text-orange-300 text-md text-orange-500">
                        PROMOTIONS
                    </Link>
                    <Link href="/menu" className="hover:text-orange-300 text-md text-orange-500">
                        MENU
                    </Link>
                </nav>
            </div>

            {/* Location Section and Hamburger Dropdown */}
            <div className="relative flex items-center space-x-4">
                {/* Location Section */}
                <a href="/locations">
                    <div className="flex items-center space-x-2">
                        <img src="/images/locationicon.png" alt="Location Icon" className="w-6 h-6"/>
                        <p  className="text-sm text-orange-500 hover:text-orange-300">FIND YOUR COCO!</p>
                    </div>
                </a>

                {/* Hamburger Icon with Dropdown */}
                <div className="group relative">
                    <div className="cursor-pointer">
                        <img
                            src="/images/hamburgericon.png"
                            alt="Hamburger Icon"
                            className="w-8 h-8"
                        />
                    </div>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 w-[500px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform transition-all duration-300 ease-in-out z-50">
                        <nav className="flex flex-col space-y-3">
                            <Link
                                href="/"
                                className="hover:text-orange-300 text-sm text-orange-500 ml-auto"
                            >
                                HOME
                            </Link>
                            <Link
                                href="/promotions"
                                className="hover:text-orange-300 text-sm text-orange-500 ml-auto"
                            >
                                PROMOTIONS
                            </Link>
                            <Link
                                href="/build-a-drink"
                                className="hover:text-orange-300 text-sm text-orange-500 ml-auto"
                            >
                                MENU
                            </Link>
                            <Link href="/locations" className="hover:text-orange-300 text-sm text-orange-500 ml-auto">
                                LOCATIONS
                            </Link>
                            <Link href="/about" className="hover:text-orange-300 text-sm text-orange-500 ml-auto">
                                OUR STORY
                            </Link>
                            <Link href="/contact-us" className="hover:text-orange-300 text-sm text-orange-500 ml-auto">
                                CONTACT US
                            </Link>
                        </nav>


                    </div>
                </div>
            </div>
        </header>
    );
};

export default Toolbar;