"use client"

export function Textarea({ className = "", ...props }) {
  return (
    <textarea className={`w-full p-2 border rounded-md bg-white text-gray-900 resize-none ${className}`} {...props} />
  )
}

