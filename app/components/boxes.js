"use client"

import Link from "next/link"

export default function Boxes() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-5 w-full mx-auto">
      {/* Box 1 */}
    <div className="flex flex-col bg-orange-300 text-white max-w-[400px] h-[400px] rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl p-6 relative font-sora">
        <h3 className="text-2xl font-bold mb-4">WANT TO DROP BY?</h3>
        <p className="text-lg">
          Locate your nearest CoCo outlet and enjoy your favorite drinks. We are just around the corner!
        </p>
        <Link href="/locations" className="group text-lg cursor-pointer absolute bottom-4 right-4">
          LOCATIONS
          <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-2 pl-3">
            &#8594;
          </span>
        </Link>
      </div>

      {/* Box 2 */}
      <div className="flex flex-col bg-orange-300 text-white max-w-[400px] h-[400px] rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl p-6 relative font-sora">
        <h3 className="text-2xl font-bold mb-4">WANT TO LEARN OUR STORY?</h3>
        <p className="text-lg">
          Discover the journey of CoCo and how we became your go-to place for refreshing drinks.
        </p>
        <Link href="/about-us" className="group text-lg cursor-pointer absolute bottom-4 right-4">
          OUR STORY
          <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-2 pl-3">
            &#8594;
          </span>
        </Link>
      </div>

      {/* Box 3 */}
      <div className="flex flex-col bg-orange-300 text-white max-w-[400px] h-[400px] rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl p-6 relative font-sora">
        <h3 className="text-2xl font-bold mb-4">HAVE A QUESTION?</h3>
        <p className="text-lg">
          Reach out to us for any inquiries or feedback. We&apos;re here to make your experience delightful!
        </p>
        <Link href="/contact" className="group text-lg cursor-pointer absolute bottom-4 right-4">
          CONTACT US
          <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-2 pl-3">
            &#8594;
          </span>
        </Link>
      </div>
    </div>
  )
}

