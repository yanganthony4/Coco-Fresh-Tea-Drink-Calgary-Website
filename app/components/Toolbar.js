"use client"

import Link from "next/link"
import { useState } from "react"
import bcrypt from "bcryptjs"
import LazyImage from "../LazyImage"
import { useTina } from "tinacms/dist/react"

// Default data for initial rendering
const defaultData = {
  logo: "/images/logo.png",
  locationText: "FIND YOUR COCO!",
  navLinks: [
    { label: "HOME", href: "/" },
    { label: "PROMOTIONS", href: "/promotions" },
    { label: "MENU", href: "/menu" },
  ],
  dropdownLinks: [
    { label: "HOME", href: "/" },
    { label: "PROMOTIONS", href: "/promotions" },
    { label: "MENU", href: "/menu" },
    { label: "LOCATIONS", href: "/locations" },
    { label: "OUR STORY", href: "/about" },
    { label: "CONTACT US", href: "/contact-us" },
  ],
}

export default function Toolbar({ data = defaultData }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const storedHashedPassword = bcrypt.hashSync("password123", 10)

  // Use TinaCMS data
  const { data: tinaData } = useTina({
    query: `
      query GetToolbarData {
        logo
        locationText
        navLinks {
          label
          href
        }
        dropdownLinks {
          label
          href
        }
      }
    `,
    variables: {},
    data,
  })

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
            src={tinaData?.logo || defaultData.logo}
            alt="CoCo Logo"
            className="w-32 h-auto"
            placeholder="/images/placeholder.jpg"
          />
        </Link>

        {/* Navigation Links - Hidden on Small Screens */}
        <nav className="hidden md:flex space-x-5">
          {(tinaData?.navLinks || defaultData.navLinks).map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="hover:text-orange-300 text-md text-orange-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Location Section and Hamburger Dropdown */}
      <div className="relative flex items-center space-x-4">
        {/* Location Section */}
        <a href="/locations">
          <div className="flex items-center space-x-2">
            <LazyImage
              src="/images/locationicon.png"
              alt="Location Icon"
              className="w-6 h-6"
              placeholder="/images/placeholder.jpg"
            />
            <p className="text-sm text-orange-500 hover:text-orange-300">
              {tinaData?.locationText || defaultData.locationText}
            </p>
          </div>
        </a>

        {/* Hamburger Icon with Dropdown */}
        <div className="relative">
          <button onClick={toggleDropdown} className="focus:outline-none">
            <LazyImage
              src="/images/hamburgericon.png"
              alt="Hamburger Icon"
              className="w-8 h-8"
              placeholder="/images/placeholder.jpg"
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 w-[300px] md:w-[500px] z-50">
              <nav className="flex flex-col space-y-3">
                {(tinaData?.dropdownLinks || defaultData.dropdownLinks).map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="hover:text-orange-300 text-sm text-orange-500 ml-auto"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}