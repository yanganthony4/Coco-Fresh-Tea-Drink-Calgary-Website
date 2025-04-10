"use client"

export function Button({ children, className = "", variant = "default", ...props }) {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors"
  const variants = {
    default: "bg-amber-500 text-white hover:bg-amber-600",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

