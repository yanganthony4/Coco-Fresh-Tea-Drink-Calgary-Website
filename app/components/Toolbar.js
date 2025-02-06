"use client";

import Link from "next/link";
import React, { useState } from "react";
import bcrypt from "bcryptjs";

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
        <header className="bg-white shadow-sm border-b">
            <div className="flex items-center justify-between p-4">
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
                        <Link href="/" className="hover:text-orange-300 text-lg text-orange-500">
                            Home
                        </Link>
                        <Link href="/promotions" className="hover:text-orange-300 text-lg text-orange-500">
                            Promotions
                        </Link>
                        <Link href="/build-a-drink" className="hover:text-orange-300 text-lg text-orange-500">
                            Menu
                        </Link>
                    </nav>
                </div>

                {/* Location Section and Hamburger Dropdown */}
                <div className="relative flex items-center space-x-4">
                    {/* Location Section */}
                    <div className="flex items-center space-x-2">
                        <img src="/images/locationicon.png" alt="Location Icon" className="w-6 h-6" />
                        <Link href="/locations" className="text-lg text-orange-500 hover:text-orange-300">
                            Find a store
                        </Link>
                    </div>

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
                        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 w-48 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform transition-all duration-300 ease-in-out z-50">
                            <nav className="flex flex-col space-y-3">
                                {/* Render Home, Promotions, and Menu only on small screens */}
                                <div className="md:hidden flex flex-col space-y-3">
                                    <Link
                                        href="/"
                                        className="hover:text-orange-300 text-lg text-orange-500"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href="/promotions"
                                        className="hover:text-orange-300 text-lg text-orange-500"
                                    >
                                        Promotions
                                    </Link>
                                    <Link
                                        href="/build-a-drink"
                                        className="hover:text-orange-300 text-lg text-orange-500"
                                    >
                                        Menu
                                    </Link>
                                </div>

                                {/* Always visible links */}
                                <Link href="/locations" className="hover:text-orange-300 text-lg text-orange-500">
                                    Locations
                                </Link>
                                <Link href="/about" className="hover:text-orange-300 text-lg text-orange-500">
                                    About Us
                                </Link>
                                <Link href="/contact" className="hover:text-orange-300 text-lg text-orange-500">
                                    Contact Us
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Toolbar;
