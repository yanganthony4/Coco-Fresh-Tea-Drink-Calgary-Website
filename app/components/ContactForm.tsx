"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import emailjs from "emailjs-com"
import ReCAPTCHA from "react-google-recaptcha"

export default function ContactForm() {
  const [isPending, setIsPending] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [captchaError, setCaptchaError] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "")
    setCaptchaError(null)
  }, [])

  function sanitizeInput(input: string) {
    return input
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)
    setCaptchaError(null)

    // ✅ Rate Limiter: Block if submitted too recently
    const lastSubmit = localStorage.getItem("lastSubmitTime")
    if (lastSubmit && Date.now() - Number(lastSubmit) < 30000) {
      setCaptchaError("You're submitting too quickly. Please wait a moment.")
      setIsPending(false)
      return
    }
    localStorage.setItem("lastSubmitTime", Date.now().toString())

    // Check CAPTCHA before submission
    if (!captchaToken) {
      setCaptchaError("Please complete the reCAPTCHA before submitting.")
      setIsPending(false)
      return
    }

    const form = event.target as HTMLFormElement
    const honeypot = form._gotcha as HTMLInputElement
    if (honeypot.value !== "") {
      alert("Spam detected.")
      setIsPending(false)
      return
    }

    const formData = new FormData(form)
    const sanitizedData = {
      name: sanitizeInput(formData.get("name") as string),
      email: sanitizeInput(formData.get("email") as string),
      message: sanitizeInput(formData.get("message") as string),
      "g-recaptcha-response": captchaToken,
    }

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        sanitizedData,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID || ""
      )

      setFormSubmitted(true)
      form.reset()
      setCaptchaToken(null)
      recaptchaRef.current?.reset()
    } catch (error) {
      console.error("Error sending message:", error)
      alert("Failed to send message. Please try again later.")
    }

    setIsPending(false)
  }

  function handleCaptchaChange(token: string | null) {
    setCaptchaToken(token)
    if (!token) {
      setCaptchaError("reCAPTCHA verification failed. Please try again.")
    } else {
      setCaptchaError(null)
    }
  }

  return (
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 items-center">
      {/* Left Side - Image */}
      <motion.div
        className="hidden md:flex relative w-full h-[400px] bg-[#F7E6D5] items-center justify-center"
        animate={{ opacity: [0, 1], scale: [0.95, 1] }}
        transition={{ duration: 1 }}
      >
        <img src="/images/contactdrinks.webp" alt="Bubble tea drinks" className="w-full h-full object-cover" />
      </motion.div>

      {/* Right Side - Form */}
      <motion.div
        className="w-full md:w-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl md:text-5xl font-bold relative md:-top-7 pt-4 text-[#040202]">CONTACT US</h1>

        {formSubmitted ? (
          <div className="p-6 bg-green-100 border border-green-300 rounded-md">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Thank you!</h3>
            <p className="text-green-600">Your message has been sent. We'll get back to you soon.</p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot */}
            <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

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

            {/* Visible reCAPTCHA */}
            <div>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                onChange={handleCaptchaChange}
                size="normal"
              />
            </div>

            {/* Styled Error Message */}
            {captchaError && (
              <div className="mt-4 p-3 rounded-md bg-red-100 border border-red-300 text-red-800 text-sm font-medium shadow-sm">
                {captchaError}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#FF9800] hover:bg-[#ff99008b] text-[#080707] font-bold py-3 transition-colors"
            >
              {isPending ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  )
}
