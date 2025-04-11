import { Mail } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import React, { type JSX } from "react"

export const metadata: Metadata = {
  title: "CoCo Fresh Tea & Juice Calgary | Web Accessibility | ",
  description:
    "Discover how CoCo Fresh Tea & Juice Calgary ensures an inclusive and accessible experience for all customers. Learn more about our commitment!",
  alternates: {
    canonical: "https://www.coco-bubble-tea.ca/accessibility", // Canonical URL
  },
}

const AccessibilityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-black mb-6">ACCESSIBILITY</h1>
        <div className="space-y-6">
          {renderSection(
            null,
            "CoCo Bubble Tea is committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability.",
          )}
          {renderSection(
            "Our Commitment",
            "We aim to comply with all applicable standards, including WCAG 2.0 accessibility standards up to level AA.",
            "If you experience any difficulty in accessing any part of this website, please feel free to email us at:",
            React.createElement(
              "div",
              { className: "mt-2" },
              React.createElement(
                Link,
                {
                  href: "mailto:marketing@cocobubbletea.com",
                  className: "inline-flex items-center text-[#FF5C28] hover:underline",
                },
                React.createElement(Mail, { className: "mr-2 h-4 w-4" }),
                "marketing@cocobubbletea.com",
              ),
            ),
          )}
          {renderSection(
            "Our Promise",
            "We will work with you to provide the information, item, or transaction you seek through an alternate communication method or one that is accessible for you consistent with applicable law.",
          )}
          {renderSection(
            "Contact Us",
            "If you have any questions or concerns about the accessibility of our website, please don't hesitate to reach out to us.",
            React.createElement(
              "div",
              { className: "mt-2" },
              React.createElement(
                Link,
                {
                  href: "/contact-us",
                  className:
                    "inline-flex items-center px-4 py-2 bg-[#FF5C28] text-white rounded-md hover:bg-opacity-90 transition-colors duration-300",
                },
                React.createElement(Mail, { className: "mr-2 h-4 w-4" }),
                "Contact Us",
              ),
            ),
          )}
        </div>
      </div>
    </div>
  )
}

function renderSection(title: string | null, ...content: (string | JSX.Element)[]): JSX.Element {
  return React.createElement(
    "section",
    { className: "mb-6" },
    title && React.createElement("h2", { className: "text-2xl font-bold text-black mb-3" }, title),
    React.createElement(
      "div",
      {
        className:
          "bg-[#FFB485] rounded-md p-6 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
      },
      content.map((text, index) =>
        React.createElement("p", { key: index, className: index < content.length - 1 ? "mb-3" : "" }, text),
      ),
    ),
  )
}

export default AccessibilityPage
