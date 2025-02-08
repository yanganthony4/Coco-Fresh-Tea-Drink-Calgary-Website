"use client"

import Link from "next/link"

export default function boxes() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-20 py-12">
      {/* Box 1 */}
      <div className="flex flex-col bg-[#fbf2d7] text-[#653128] w-80 h-80 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl p-6 relative">
        <h3 className="text-3xl font-bold mb-4">Find Your CoCo</h3>
        <p className="text-lg">
          Locate your nearest CoCo outlet and enjoy your favorite drinks. We are just around the corner!
        </p>
        <Link href="/locations" className="group text-lg underline cursor-pointer absolute bottom-4 right-4">
          Locations
          <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-2">
            &#8594;
          </span>
        </Link>
      </div>

      {/* Box 2 */}
      <div className="flex flex-col bg-[#fbf2d7] text-[#653128] w-80 h-80 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl p-6 relative">
        <h3 className="text-3xl font-bold mb-4">Want to Learn Our Story?</h3>
        <p className="text-lg">
          Discover the journey of CoCo and how we became your go-to place for refreshing drinks.
        </p>
        <Link href="/about" className="group text-lg underline cursor-pointer absolute bottom-4 right-4">
          About Us
          <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-2">
            &#8594;
          </span>
        </Link>
      </div>

      {/* Box 3 */}
      <div className="flex flex-col bg-[#fbf2d7] text-[#653128] w-80 h-80 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl p-6 relative">
        <h3 className="text-3xl font-bold mb-4">Have a Question?</h3>
        <p className="text-lg">
          Reach out to us for any inquiries or feedback. We're here to make your experience delightful!
        </p>
        <Link href="/contact" className="group text-lg underline cursor-pointer absolute bottom-4 right-4">
          Contact Us
          <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-2">
            &#8594;
          </span>
        </Link>
      </div>
    </div>
  )
}

