"use client"

import Link from "next/link"

export default function Boxes() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {/* Box 1 */}
      <div className="flex flex-col bg-orange-300 text-white rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl p-6 min-h-[300px] sm:min-h-[400px]">
        <div className="flex-grow">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">WANT TO DROP BY?</h3>
          <p className="text-base sm:text-lg">
            Locate your nearest CoCo and enjoy your favorite drinks. We are just around the corner!
          </p>
        </div>
        <div className="mt-4">
          <Link href="/locations" className="group text-base sm:text-lg cursor-pointer flex items-center justify-end">
            LOCATIONS
            <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-2 pl-3">
              &#8594;
            </span>
          </Link>
        </div>
      </div>

      {/* Box 2 */}
      <div className="flex flex-col bg-orange-300 text-white rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl p-6 min-h-[300px] sm:min-h-[400px]">
        <div className="flex-grow">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">WANT TO LEARN OUR STORY?</h3>
          <p className="text-base sm:text-lg">
            Discover the journey of CoCo and how we became your go-to place for refreshing drinks.
          </p>
        </div>
        <div className="mt-4">
          <Link href="/about" className="group text-base sm:text-lg cursor-pointer flex items-center justify-end">
            OUR STORY
            <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-2 pl-3">
              &#8594;
            </span>
          </Link>
        </div>
      </div>

      {/* Box 3 */}
      <div className="flex flex-col bg-orange-300 text-white rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl p-6 min-h-[300px] sm:min-h-[400px]">
        <div className="flex-grow">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">HAVE A QUESTION?</h3>
          <p className="text-base sm:text-lg">
            Reach out to us for any inquiries or feedback. We&apos;re here to make your experience delightful!
          </p>
        </div>
        <div className="mt-4">
          <Link href="/contact-us" className="group text-base sm:text-lg cursor-pointer flex items-center justify-end">
            CONTACT US
            <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-2 pl-3">
              &#8594;
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

