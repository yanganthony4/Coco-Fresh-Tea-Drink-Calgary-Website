"use client";

import Link from "next/link";
import { useEffect, useState, MouseEvent } from "react";
import { usePathname } from "next/navigation";
import LazyImage from "../LazyImage";

const Toolbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const toggleDropdown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On mobile: header is always white.
  // On desktop: if on home page and not scrolled, header is transparent; otherwise white.
  const headerBgClass =
    isHomePage && !scrolled ? "bg-white md:bg-transparent" : "bg-white";

  return (
    <>
      {/* Fixed Top Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerBgClass}`}
      >
        <div className="flex items-center justify-between p-4 toolbar">
          {/* Logo & Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/">
              <LazyImage
                src="/images/art/logo.svg"
                alt="CoCo Logo"
                className="w-32 h-auto"
                placeholder="/images/art/placeholder.jpg"
              />
            </Link>
            <nav className="hidden md:flex space-x-5 font-sora">
              <Link
                href="/"
                className="hover:text-orange-300 text-md text-orange-500"
              >
                HOME
              </Link>
              <Link
                href="/promotions"
                className="hover:text-orange-300 text-md text-orange-500"
              >
                PROMOTIONS
              </Link>
              <Link
                href="/menu"
                className="hover:text-orange-300 text-md text-orange-500"
              >
                MENU
              </Link>
            </nav>
          </div>

          {/* Location & Hamburger Icon */}
          <div className="relative flex items-center space-x-4">
            <a href="/locations" className="font-sora">
              <div className="flex items-center space-x-2">
                <LazyImage
                  src="/images/art/locationicon.svg"
                  alt="Location Icon"
                  className="w-6 h-6"
                  placeholder="/images/art/placeholder.jpg"
                />
                <p className="text-sm text-orange-500 hover:text-orange-300">
                  FIND YOUR COCO!
                </p>
              </div>
            </a>
            <div className="relative">
              <button onClick={toggleDropdown} className="focus:outline-none">
                <LazyImage
                  src="/images/art/hamburgericon.svg"
                  alt="Hamburger Icon"
                  className="w-8 h-8"
                  placeholder="/images/art/placeholder.jpg"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Height Sliding Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-[250px] md:w-[250px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isDropdownOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Top Section: Avatar (left) & Close Button (right) */}
          <div className="flex items-center justify-between p-4">
            <LazyImage
              src="/icons/cocoavataronlyblack.svg"
              alt="CoCo Avatar"
              className="w-12 h-12"
            />
            <button
              onClick={toggleDropdown}
              className="text-orange-500 text-3xl focus:outline-none"
            >
              &times;
            </button>
          </div>
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-6 p-4 flex-grow font-sora">
            {[
              { href: "/", label: "HOME" },
              { href: "/promotions", label: "PROMOTIONS" },
              { href: "/menu", label: "MENU" },
              { href: "/locations", label: "LOCATIONS" },
              { href: "/about", label: "OUR STORY" },
              { href: "/contact-us", label: "CONTACT US" },
              { href: "/build-a-drink", label: "BUILD A DRINK" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsDropdownOpen(false)}
                className="text-xl text-orange-500 hover:text-orange-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {/* Bottom Section: Accessibility and Privacy Policy */}
          <div className="mt-auto p-4">
            <nav className="flex flex-col space-y-6 font-sora">
              <Link
                href="/accessibility"
                onClick={() => setIsDropdownOpen(false)}
                className="text-xl text-orange-500 hover:text-orange-300 uppercase"
              >
                Accessibility
              </Link>
              <Link
                href="/privacy"
                onClick={() => setIsDropdownOpen(false)}
                className="text-xl text-orange-500 hover:text-orange-300 uppercase"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toolbar;
