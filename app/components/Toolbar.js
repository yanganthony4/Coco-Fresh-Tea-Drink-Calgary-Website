"use client"

import Link from "next/link"
import { useState } from "react"
import bcrypt from "bcryptjs"
import LazyImage from "../LazyImage"

const Toolbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const storedHashedPassword = bcrypt.hashSync("password123", 10)

  const handleLogin = () => {
    const validUsername = "admin"
    if (username === validUsername && bcrypt.compareSync(password, storedHashedPassword)) {
      setIsLoggedIn(true)
      setShowLoginPrompt(false)
      alert("Login successful!")
    } else {
      alert("Invalid username or password")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername("")
    setPassword("")
    alert("You have logged out")
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <header className="sticky top-0 z-50 bg-white flex items-center justify-between p-4 toolbar">
      {/* Left Section with Logo and Navigation Links */}
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <Link href="/">
          <LazyImage
            src="/images/logo.svg"
            alt="CoCo Logo"
            className="w-32 h-auto"
            placeholder="/images/placeholder.jpg"
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
      <div className="flex items-center">
        {/* Location Section - Text hidden on small screens */}
        <div className="flex items-center mr-4">
          <a href="/locations" className="flex items-center">
            <LazyImage
              src="/images/locationicon.png"
              alt="Location Icon"
              className="w-6 h-6 object-contain"
              placeholder="/images/placeholder.jpg"
            />
            <span className="text-sm text-orange-500 hover:text-orange-300 hidden sm:inline ml-2">FIND YOUR COCO!</span>
          </a>
        </div>

        {/* Hamburger Icon with Dropdown */}
        <div className="relative">
          <button onClick={toggleDropdown} className="focus:outline-none flex items-center justify-center">
            <LazyImage
              src="/images/hamburgericon.png"
              alt="Hamburger Icon"
              className="w-8 h-8 object-contain"
              placeholder="/images/placeholder.jpg"
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 w-[300px] md:w-[500px] z-50">
              <nav className="flex flex-col space-y-3">
                <Link
                  href="/"
                  className="hover:text-orange-300 text-sm text-orange-500 ml-auto"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/promotions"
                  className="hover:text-orange-300 text-sm text-orange-500 ml-auto"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  PROMOTIONS
                </Link>
                <Link
                  href="/menu"
                  className="hover:text-orange-300 text-sm text-orange-500 ml-auto"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  MENU
                </Link>
                <Link
                  href="/locations"
                  className="hover:text-orange-300 text-sm text-orange-500 ml-auto"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  LOCATIONS
                </Link>
                <Link
                  href="/about"
                  className="hover:text-orange-300 text-sm text-orange-500 ml-auto"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  OUR STORY
                </Link>
                <Link
                  href="/contact-us"
                  className="hover:text-orange-300 text-sm text-orange-500 ml-auto"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  CONTACT US
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Toolbar

