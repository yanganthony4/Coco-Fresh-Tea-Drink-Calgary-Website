import { Mail } from "lucide-react"
import Link from "next/link"

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#FF5C28] mb-8 text-center">Accessibility</h1>

        <div className="space-y-8">
          <div className="bg-[#FFB485] rounded-md p-6 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <p className="mb-4 text-center">
              CoCo Bubble Tea is committed to providing a website that is accessible to the widest possible audience,
              regardless of technology or ability.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 text-center">Our Commitment</h2>
            <div className="bg-[#FFB485] rounded-md p-6 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <p className="mb-4 text-center">
                We aim to comply with all applicable standards, including WCAG 2.0 accessibility standards up to level
                AA.
              </p>
              <p className="text-center">
                If you experience any difficulty in accessing any part of this website, please feel free to email us at:
              </p>
              <div className="flex justify-center mt-2">
                <Link
                  href="mailto:marketing@cocobubbletea.com"
                  className="inline-flex items-center text-[#FF5C28] hover:underline"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  marketing@cocobubbletea.com
                </Link>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 text-center">Our Promise</h2>
            <div className="bg-[#FFB485] rounded-md p-6 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <p className="text-center">
                We will work with you to provide the information, item, or transaction you seek through an alternate
                communication method or one that is accessible for you consistent with applicable law.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 text-center">Contact Us</h2>
            <div className="bg-[#FFB485] rounded-md p-6 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <p className="mb-4 text-center">
                If you have any questions or concerns about the accessibility of our website, please don't hesitate to
                reach out to us.
              </p>
              <div className="flex justify-center">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center px-4 py-2 bg-[#FF5C28] text-white rounded-md hover:bg-opacity-90 transition-colors duration-300"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

