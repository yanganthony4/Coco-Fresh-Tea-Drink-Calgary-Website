"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import emailjs from "emailjs-com"

export default function ContactPage() {
  const IMAGE_WIDTH = "1000%" // Huge image for impact

  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    emailjs.init("3OhHXYVtaPA-m2hAk")
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    setIsPending(true)

    try {
      await emailjs.sendForm(
        "sumaiyakurshid@gmail.com",
        "template_n1x13ps",
        event.target,
        "3OhHXYVtaPA-m2hAk"
      )
      alert("Your message has been sent. We'll get back to you soon.")
      event.target.reset()
    } catch (error) {
      console.error("Error sending message", error)
      alert("Failed to send message. Please try again later.")
    }

    setIsPending(false)
  }

  const faqs = [
    {
      question: "Where can I collect reward points with my purchase?",
      answer:
        "You can collect points by ordering in our app or in the store. Points are synced with your phone number.",
    },
    {
      question: "How to collect points in-store?",
      answer:
        "Tell our staff your phone number linked to your account. You'll earn 1 point per drink purchased.",
    },
    {
      question: "Need help with the Coco app?",
      answer:
        "Contact support@gosnappy.io for any issues with your account or points.",
    },
  ]

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

      {/* FAQ Section - Animated (No Borders) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24 max-w-3xl mx-auto text-center relative z-10"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-[#653128]">
          Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-4 rounded-lg"
            >
              <h3 className="text-xl font-semibold text-[#653128]">{faq.question}</h3>
              <p className="text-black">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
