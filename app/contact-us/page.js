"use client"

import ContactForm from "../components/ContactForm"
import FAQSection from "../components/FAQSection"

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center">
      <div className="relative container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-4 w-full max-w-6xl items-stretch">
        {/* Left Side: Even Bigger Animated Image */}
        <motion.div
          className="relative flex-1 overflow-visible"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src="/images/mim.png"
            alt="Bubble Tea"
            style={{ width: IMAGE_WIDTH }}
            className="absolute left-[-22%] top-1/2 transform -translate-y-1/2 pointer-events-none z-0"
          />
        </motion.div>

        {/* Right Side: Contact Form - Lighter Orange Border, No Shadow */}
        <motion.div
          className="relative flex-1 z-10 lg:ml-[-20px] bg-[#F7E6D5] border-4 border-[#FFD9A0] rounded-lg p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-4xl font-bold mb-4 text-[#653128]">Contact Us</h1>
            <p className="text-[#653128]">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col space-y-4 w-full"
          >
            <input
              name="name"
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-700"
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone number"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-700"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-700"
              required
            />
            <input
              name="subject"
              placeholder="Subject"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-700"
              required
            />
            <textarea
              name="message"
              placeholder="Your message"
              className="w-full h-32 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-700"
              required  
            />
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#FF9800] hover:bg-[#E5C38D] text-[#653128] font-bold py-2 rounded-md transition-colors flex items-center justify-center"
            >
              {isPending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  )
}
