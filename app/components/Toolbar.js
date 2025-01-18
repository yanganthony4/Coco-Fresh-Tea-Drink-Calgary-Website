'use client'
import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

const Toolbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
    const [showLoginPrompt, setShowLoginPrompt] = useState(false); // Toggle login prompt visibility
    const [username, setUsername] = useState(''); // Store username input
    const [password, setPassword] = useState(''); // Store password input

    // Pre-hashed password for demo purposes
    const storedHashedPassword = bcrypt.hashSync('password123', 10); // Replace 'password123' with your actual password

    const handleLogin = () => {
        const validUsername = 'admin'; // Replace with your actual username

        // Compare the hashed password
        if (username === validUsername && bcrypt.compareSync(password, storedHashedPassword)) {
            setIsLoggedIn(true);
            setShowLoginPrompt(false);
            alert('Login successful!');
        } else {
            alert('Invalid username or password');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
        alert('You have logged out');
    };

    return (
        <div className="flex items-center text-orange-500 p-4" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
            <a href="/" className="mr-auto">
                <img src="/images/logo.png" alt="CoCo Logo" className="w-32 h-auto" />
            </a>
            <nav className="flex space-x-5 ml-auto">
                <a href="/" className="hover:text-orange-300 text-lg">Home</a>
                <a href="/promotions" className="hover:text-orange-300 text-lg">Promotions</a>
                <a href="/menu" className="hover:text-orange-300 text-lg">Menu</a>
                <a href="/locations" className="hover:text-orange-300 text-lg">Locations</a>
                <a href="/build-a-drink" className="hover:text-orange-300 text-lg">Build A Drink</a>
                <a href="/about" className="hover:text-orange-300 text-lg">About Us</a>
                <a href="/contact-us" className="hover:text-orange-300 text-lg">Contact Us</a>
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
            {!isLoggedIn ? (
                <button
                    onClick={() => setShowLoginPrompt(true)}
                    className="ml-5 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-300"
                >
                    Admin Login
                </button>
            ) : (
                <button
                    onClick={handleLogout}
                    className="ml-5 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-300"
                >
                    Logout
                </button>
            )}

            {showLoginPrompt && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
                    onClick={() => setShowLoginPrompt(false)} // Close modal on background click
                >
                    <div
                        className="bg-white p-6 rounded shadow-md"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                    >
                        <h2 className="text-lg font-bold mb-4">Admin Login</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full mb-3 px-4 py-2 border rounded"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full mb-3 px-4 py-2 border rounded"
                        />
                        <button
                            onClick={handleLogin}
                            className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-300"
                        >
                            Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Toolbar;