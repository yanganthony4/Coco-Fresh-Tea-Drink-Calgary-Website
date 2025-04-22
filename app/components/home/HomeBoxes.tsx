import Link from "next/link";
import { JSX } from "react";

export default function Boxes(): JSX.Element {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 w-full px-4 sm:px-10 md:px-0">
      {/* Box 1 */}
      <div className="flex flex-col bg-orange-300 text-white transition-transform duration-500 hover:scale-105 p-3 sm:p-6 aspect-[4/3] sm:aspect-square">
        <div className="flex-grow">
          <h3 className="text-3xl sm:text-3xl font-sora mb-3 sm:mb-4">WANT TO DROP BY?</h3>
          <p className="text-xl sm:text-lg">
            Locate your nearest CoCo and enjoy your favorite drinks. We are just around the corner!
          </p>
        </div>
        <div className="mt-3 sm:mt-4">
          <Link href="/locations" className="group text-sm sm:text-lg cursor-pointer flex items-center justify-end font-sora">
            LOCATIONS
            <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-2 pl-3">
              &#8594;
            </span>
          </Link>
        </div>
      </div>

      {/* Box 2 */}
      <div className="flex flex-col bg-orange-300 text-white transition-transform duration-500 hover:scale-105 p-3 sm:p-6 aspect-[4/3] sm:aspect-square">
        <div className="flex-grow">
          <h3 className="text-3xl sm:text-3xl font-sora mb-3 sm:mb-4">WANT TO LEARN OUR STORY?</h3>
          <p className="text-xl">
            Discover the journey of CoCo and how we became your go-to place for refreshing drinks.
          </p>
        </div>
        <div className="mt-3 sm:mt-4">
          <Link href="/about" className="group text-xl sm:text-lg cursor-pointer flex items-center justify-end font-sora">
            OUR STORY
            <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-2 pl-3">
              &#8594;
            </span>
          </Link>
        </div>
      </div>

      {/* Box 3 */}
      <div className="flex flex-col bg-orange-300 text-white transition-transform duration-500 hover:scale-105 p-3 sm:p-6 aspect-[4/3] sm:aspect-square">
        <div className="flex-grow">
          <h3 className="text-3xl sm:text-3xl font-bold mb-3 sm:mb-4 font-sora">HAVE A QUESTION?</h3>
          <p className="text-xl">
            Reach out to us for any inquiries or feedback. We&apos;re here to make your experience delightful!
          </p>
        </div>
        <div className="mt-3 sm:mt-4">
          <Link href="/contact-us" className="group text-xl sm:text-lg cursor-pointer flex items-center justify-end font-sora">
            CONTACT US
            <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-2 pl-3">
              &#8594;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
