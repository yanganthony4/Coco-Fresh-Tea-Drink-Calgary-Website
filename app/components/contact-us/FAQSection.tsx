"use client"

import { JSX, useState } from "react"
import { motion } from "framer-motion"

interface FAQItemProps {
  faq: Faq;
  index: number;
}

function FAQItem({ faq, index }: FAQItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-[#FF9800] p-5 cursor-pointer transition-all duration-300 mb-6 last:mb-12 text-left m-auto "
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
        <span
          className={`text-white text-lg transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▲
        </span>
      </div>

      <motion.p
        initial={{ height: 0, opacity: 0 }}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="text-white mt-2 overflow-hidden"
      >
        {faq.answer}
      </motion.p>
    </motion.div>
  )
}

interface Faq {
  readonly question: string
  readonly answer: string
}

export default function FAQSection(): JSX.Element {
  const faqs: readonly Faq[] = [
    {
      question: "Where can I collect reward points with my purchase?",
      answer: "You can collect points by ordering in our app or in the store. Points are synced with your phone number.",
    },
    {
      question: "How to collect points in-store?",
      answer: "Tell our staff your phone number linked to your account. You'll earn 1 point per drink purchased.",
    },
    {
      question: "Need help with the Coco app?",
      answer: "Contact support@gosnappy.io for any issues with your account or points.",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-24 max-w-5xl w-full px-4 md:px-0 md:ml-0 md:pl-0 text-left relative z-10 pb-32"
    >
      <h2 className="text-4xl font-bold text-left mb-12 text-black uppercase tracking-wide">
        Frequently Asked Questions
      </h2>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} index={index} />
        ))}
      </div>
    </motion.div>
  )
}
