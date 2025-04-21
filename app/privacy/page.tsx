import React, { JSX } from "react";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";

// Metadata type
interface MetadataProps {
  title: string;
  description: string;
  alternates: {
    canonical: string;
  };
}

// Updated metadata for SEO
export const metadata: MetadataProps = {
  title: "Privacy Policy | CoCo Fresh Tea & Juice Calgary",
  description: "Read CoCo Fresh Tea & Juice Calgary's privacy policy and learn how we collect, use, and protect your personal data on our website.",
  alternates: {
    canonical: "https://www.coco-bubble-tea.ca/privacy", // canonical URL
  },
};

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white mt-16 font-sora">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#000000] mb-8">PRIVACY POLICY</h1>

        <div className="space-y-8">
          <div className="bg-orange-300 rounded-md p-6 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <p className="mb-4">
              This privacy policy will help you understand how CoCo Fresh Tea & Juice Calgary uses and protects the data you provide to us when you visit our website.
            </p>
            <p>
              We reserve the right to change this policy at any given time, of which you will be promptly updated. If you want to make sure that you are up to date with the latest changes, we advise you to frequently visit this page.
            </p>
          </div>

          {renderSection("What User Data We Collect", [
            "Your IP address.",
            "Your contact information and email address.",
            "Other information such as interests and preferences.",
            "Data profile regarding your online behavior on our website.",
          ])}

          {renderSection("Why We Collect Your Data", [
            "To better understand your needs.",
            "To improve our services and products.",
            "To send you promotional emails containing the information we think you will find interesting.",
            "To contact you to fill out surveys and participate in other types of market research.",
            "To customize our website according to your online behavior and personal preferences.",
          ])}

          {renderSection("Safeguarding and Securing the Data", [
            "CoCo Fresh Tea & Juice Calgary is committed to securing your data and keeping it confidential. We have done all in our power to prevent data theft, unauthorized access, and disclosure by implementing the latest technologies and software, which help us safeguard all the information we collect online.",
          ])}

          {renderSection("Our Cookie Policy", [
            "Once you agree to allow our website to use cookies, you also agree to use the data it collects regarding your online behavior (analyze web traffic, web pages you spend the most time on, and websites you visit).",
            "The data we collect by using cookies is used to customize our website to your needs. After we use the data for statistical analysis, the data is completely removed from our systems.",
            "Please note that cookies don’t allow us to gain control of your computer in any way. They are strictly used to monitor which pages you find useful and which you do not so that we can provide a better experience for you.",
          ])}

          {renderSection("Links to Other Websites", [
            "Our website contains links that lead to other websites. If you click on these links CoCo Fresh Tea & Juice Calgary is not held responsible for your data and privacy protection. Visiting those websites is not governed by this privacy policy agreement. Make sure to read the privacy policy documentation of the website you go to from our website.",
          ])}

          {renderSection("Restricting the Collection of your Personal Data", [
            "At some point, you might wish to restrict the use and collection of your personal data. You can achieve this by doing the following:",
            "When you are filling the forms on the website, make sure to check if there is a box that you can leave unchecked, if you don’t want to disclose your personal information.",
            "If you have already agreed to share your information with us, feel free to contact us via email and we will be more than happy to change this for you.",
            "CoCo Fresh Tea & Juice Calgary will not lease, sell or distribute your personal information to any third parties unless we have your permission. We might do so if the law forces us. Your personal information will be used when we need to send you promotional materials if you agree to this privacy policy.",
          ])}

          <p className="text-sm text-gray-600 mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

// helper function to render each section with title and content
function renderSection(title: string, content: (string | string[])[]): JSX.Element {
  return (
    <section>
      <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
        {title}
        <ArrowRight className="h-6 w-6 text-[#FF5C28]" />
      </h2>
      <div className="bg-orange-300 rounded-md p-6 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        {content.map((item, index) => (
          typeof item === "string" ? (
            <p key={index}>{item}</p>
          ) : (
            <ul key={index} className="list-disc list-inside space-y-2">
              {item.map((listItem, subIndex) => (
                <li key={subIndex}>{listItem}</li>
              ))}
            </ul>
          )
        ))}
      </div>
    </section>
  );
}

export default PrivacyPolicy;
