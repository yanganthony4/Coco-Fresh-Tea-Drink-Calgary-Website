"use client"

import ContactForm from "../components/ContactForm"
import FAQSection from "../components/FAQSection"

export default function ContactPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white px-6 md:px-12">
      {/* Contact Form Section */}
      <ContactForm />

      {/* FAQ Section */}
      <FAQSection />
    </div>
  )
}
