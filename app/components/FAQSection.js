"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function FAQSection() {
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
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-24 max-w-3xl mx-auto text-center relative z-10 pb-32"
    >
      <h2 className="text-4xl font-bold text-center mb-12 text-[#FF9800] uppercase tracking-wide">
        Frequently Asked Questions
      </h2>

      <div className="space-y-6">
        {faqs.map((faq, index) => {
          const [open, setOpen] = useState(false)

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gradient-to-r from-[#FFB74D] to-[#FF9800] p-5 cursor-pointer transition-all duration-300 mb-6 last:mb-12"
              onClick={() => setOpen(!open)}
            >
              {/* Question */}
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                <span className={`text-white text-lg transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
                  ▲
                </span>
              </div>

              {/* Answer - Left-Aligned Text */}
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-white text-left mt-2 overflow-hidden"
              >
                {faq.answer}
              </motion.p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
