"use client";

import ContactForm from "../components/contact-us/ContactForm";
import FAQSection from "../components/contact-us/FAQSection";

export default function ContactPage() {
  return (
    <div className="pt-20 px-4 sm:px-6 md:px-10">
      {/* Contact Form Section */}
      <div className="flex justify-center">
        <ContactForm />
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
