"use client";

import ContactForm from "../components/ContactForm";
import FAQSection from "../components/FAQSection";
import { ErrorBoundary } from "../components/ErrorBoundary"; 

export default function ContactPage() {
  return (
    <div className="pt-20 px-4 sm:px-6 md:px-10">
      {/* Contact Form Section */}
      <div className="flex justify-center">
        <ErrorBoundary fallback={<p className="text-red-500">Something went wrong loading the contact form.</p>}>
          <ContactForm />
        </ErrorBoundary>
      </div>

      {/* FAQ Section */}
      <div className="flex justify-center">
        <FAQSection />
      </div>
    </div>
  );
}
