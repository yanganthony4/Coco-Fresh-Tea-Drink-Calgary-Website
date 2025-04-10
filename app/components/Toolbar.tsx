"use client"

import Link from "next/link"
import { useEffect, useState, MouseEvent } from "react"
import { usePathname } from "next/navigation"
import LazyImage from "../LazyImage"

const Toolbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const toggleDropdown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsDropdownOpen(!isDropdownOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Determine toolbar background
  const isHomePage = pathname === "/"
  const backgroundClass = isHomePage
    ? scrolled
      ? "bg-white"
      : "bg-transparent"
    : "bg-white"

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${backgroundClass}`}>
      <div className="flex items-center justify-between p-4 toolbar">
        {/* Logo & Nav */}
        <div className="flex items-center space-x-8">
          <Link href="/">
            <LazyImage
              src="/images/logo.png"
              alt="CoCo Logo"
              className="w-32 h-auto"
              placeholder="/images/placeholder.jpg"
            />
          </Link>

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

        {/* Location & Dropdown */}
        <div className="relative flex items-center space-x-4">
          <a href="/locations">
            <div className="flex items-center space-x-2">
              <LazyImage
                src="/images/locationicon.png"
                alt="Location Icon"
                className="w-6 h-6"
                placeholder="/images/placeholder.jpg"
              />
              <p className="text-sm text-orange-500 hover:text-orange-300">FIND YOUR COCO!</p>
            </div>
          </a>

          <div className="relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
              <LazyImage
                src="/images/hamburgericon.png"
                alt="Hamburger Icon"
                className="w-8 h-8"
                placeholder="/images/placeholder.jpg"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 w-[300px] md:w-[500px] z-50">
                <nav className="flex flex-col space-y-3">
                  {[
                    { href: "/", label: "HOME" },
                    { href: "/promotions", label: "PROMOTIONS" },
                    { href: "/menu", label: "MENU" },
                    { href: "/locations", label: "LOCATIONS" },
                    { href: "/about", label: "OUR STORY" },
                    { href: "/contact-us", label: "CONTACT US" },
                  ].map((link) => (
                    <Link
                      key={link.href}
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
      </div>
    </header>
  )
}

export default Toolbar
