"use client"

export function Popover({ children }) {
  return <div className="relative">{children}</div>
}

export function PopoverTrigger({ asChild, children }) {
  if (asChild) return children
  return <button>{children}</button>
}

export function PopoverContent({ children, className = "", align = "center" }) {
  const alignClass = align === "start" ? "left-0" : "left-1/2 -translate-x-1/2"
  return (
    <div className={`absolute ${alignClass} w-full mt-1 bg-white border rounded-md shadow-lg z-10 ${className}`}>
      {children}
    </div>
  )
}

