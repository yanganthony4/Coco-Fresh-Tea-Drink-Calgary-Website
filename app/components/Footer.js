"use client";

import Toolbar from "./Toolbar";
import { useForm, usePlugin } from "tinacms";

export default function Layout({ children }) {
  // Define editable fields with TinaCMS
  const [formData, form] = useForm({
    initialValues: {
      footerLinks: [
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Accessibility", href: "/accessibility" },
      ],
    },
    onSubmit: (data) => {
      console.log("Updated Footer Data:", data.footerLinks);
//logic for saving updates to backend
    },
    fields: [
      {
        name: "footerLinks",
        label: "Footer Links",
        component: "group-list",
        itemProps: (item) => ({
          key: item.href,
          label: item.text,
        }),
        defaultItem: () => ({
          text: "New Link",
          href: "/",
        }),
        fields: [
          {
            name: "text",
            label: "Link Text",
            component: "text",
          },
          {
            name: "href",
            label: "Link URL",
            component: "text",
          },
        ],
      },
    ],
  });

  // Connect the form to TinaCMS
  usePlugin(form);

  // Extract footer links from formData
  const footerLinks = formData.footerLinks;

  return (
    <div className="min-h-screen flex flex-col">
      <Toolbar />

      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-orange-300 py-6 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          {footerLinks.map((link, index) => (
            <a key={index} href={link.href} className="text-white hover:underline">
              {link.text}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}