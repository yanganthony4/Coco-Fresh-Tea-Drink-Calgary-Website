"use client"

export function Select({ value, onValueChange, children }) {
  return <div className="relative">{children}</div>
}

export function SelectTrigger({ children, className = "" }) {
  return (
    <button className={`w-full p-2 text-left border rounded-md bg-white text-gray-900 ${className}`}>{children}</button>
  )
}

export function SelectValue({ placeholder }) {
  return <span className="text-gray-900">{placeholder}</span>
}

export function SelectContent({ children }) {
  return <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">{children}</div>
}

export function SelectItem({ value, children }) {
  return <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-900">{children}</div>
}

