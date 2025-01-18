"use client"; // Add this directive to make it a Client Component

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import emailjs from 'emailjs-com';
import Toolbar from '../components/Toolbar';


export default function ContactPage() {
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    // Initialize EmailJS with your User ID
    emailjs.init('YOUR_USER_ID');  // Replace with your actual EmailJS User ID
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData(event.target);

    try {
      // Sending form data to EmailJS
      await emailjs.sendForm(
        'YOUR_SERVICE_ID',  // Your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Your EmailJS template ID
        formData,
        'YOUR_USER_ID'     // Your EmailJS user ID
      );
      alert("Your message has been sent. We'll get back to you soon.");
    } catch (error) {
      console.error('Error sending message', error);
      alert('Failed to send message. Please try again later.');
    }

    setIsPending(false);
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <header>
        <Toolbar />
        <h1 style={{ margin: 0, fontSize: '2em' }}>Contact Us</h1>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/images/purpledrink.png"
              alt="Contact Us"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4 text-black">Contact Us</h1>
              <p className="text-black">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <input
                  name="name"
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black cursor-text"
                  required
                />
              </div>
              <div className="space-y-2">
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black cursor-text"
                  required
                />
              </div>
              <div className="space-y-2">
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black cursor-text"
                  required
                />
              </div>
              <div className="space-y-2">
                <input
                  name="subject"
                  placeholder="Subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black cursor-text"
                  required
                />
              </div>
              <div className="space-y-2">
                <textarea
                  name="message"
                  placeholder="Your message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black cursor-text min-h-[100px]"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-[#FFD9A0] hover:bg-[#E5C38D] text-black py-2 rounded-md transition-colors"
              >
                {isPending ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="space-y-2"
              >
                <h3 className="text-xl font-semibold text-black">{faq.question}</h3>
                <p className="text-black">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer Section */}
      <footer className="bg-orange-300 py-6 text-center">
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-white">Privacy Policy</a>
          <a href="#" className="text-white">Accessibility</a>
        </div>
        <img src="/images/sun.png" alt="Sun" className="w-12 h-12 mx-auto mt-4" />
      </footer>
    </div>
  );
}

const faqs = [
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
];
