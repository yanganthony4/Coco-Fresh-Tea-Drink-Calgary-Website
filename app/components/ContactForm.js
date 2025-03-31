"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import emailjs from "emailjs-com"

export default function ContactForm() {
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID)
  }, [])

  // Simple sanitization for inputs
  function sanitizeInput(input) {
    return input
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsPending(true)

    // Honeypot trap
    if (event.target._gotcha.value !== "") {
      alert("Spam detected.")
      setIsPending(false)
      return
    }

    const formData = new FormData(event.target)
    const sanitizedData = {
      name: sanitizeInput(formData.get("name")),
      email: sanitizeInput(formData.get("email")),
      message: sanitizeInput(formData.get("message")),
    }

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        sanitizedData,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      )
      alert("Your message has been sent. We'll get back to you soon.")
      event.target.reset()
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error sending message", error)
      }      
      alert("Failed to send message. Please try again later.")
    }

    setIsPending(false)
  }

  return (
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 items-center">
      {/* Left Side - Image (Hidden on Mobile) */}
      <motion.div
        className="hidden md:flex relative w-full h-[400px] bg-[#F7E6D5] items-center justify-center"
        animate={{ opacity: [0, 1], scale: [0.95, 1] }}
        transition={{ duration: 1 }}
      >
        <img
          src="/images/contactdrinks.webp"
          alt="Placeholder"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Right Side - Contact Form (Full Width on Mobile) */}
      <motion.div
        className="w-full md:w-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl md:text-5xl font-bold relative md:-top-7 pt-4 text-[#040202]">
          CONTACT US
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot Field (Hidden) */}
          <input
            type="text"
            name="_gotcha"
            style={{ display: "none" }}
            tabIndex="-1"
            autoComplete="off"
          />

          <div>
            <input
              name="name"
              placeholder="Full Name"
              className="w-full border-b-2 border-gray-600 focus:outline-none focus:border-[#FF9800] bg-transparent text-black placeholder-black py-2"
              required
            />
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="E-mail"
              className="w-full border-b-2 border-gray-600 focus:outline-none focus:border-[#FF9800] bg-transparent text-black placeholder-black py-2"
              required
            />
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Message"
              className="w-full border-b-2 border-gray-600 focus:outline-none focus:border-[#FF9800] bg-transparent text-black placeholder-black py-2 h-24 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#FF9800] hover:bg-[#ff99008b] text-[#080707] font-bold py-3 transition-colors"
          >
            {isPending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.div>
    </div>
  )
}