"use client"

import React, { useState, useRef, useEffect } from "react"

export function Popover({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={popoverRef}>
      {React.Children.map(children, (child) => {
        if (child.type === PopoverTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen),
            isOpen,
          })
        }
        if (child.type === PopoverContent) {
          return isOpen ? child : null
        }
        return child
      })}
    </div>
  )
}

export function PopoverTrigger({ asChild, children, onClick }) {
  if (asChild) {
    return React.cloneElement(children, { onClick })
  }
  return <button onClick={onClick}>{children}</button>
}

export function PopoverContent({ children, className = "", align = "center" }) {
  const alignClass = align === "start" ? "left-0" : "left-1/2 -translate-x-1/2"
  return (
    <div className={`absolute ${alignClass} w-full mt-1 bg-white border rounded-md shadow-lg z-10 ${className}`}>
      {children}
    </div>
  )
}

