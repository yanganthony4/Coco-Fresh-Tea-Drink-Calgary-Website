"use client"

import React, { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export function Select({ value, onValueChange, children, multiple = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef(null)

  const handleSelect = (newValue) => {
    if (multiple) {
      // For multiple selection, toggle the value
      const currentValues = Array.isArray(value) ? value : []
      const newValues = currentValues.includes(newValue)
        ? currentValues.filter((v) => v !== newValue)
        : [...currentValues, newValue]
      onValueChange(newValues)
    } else {
      // For single selection, just set the value and close
      onValueChange(newValue)
      setIsOpen(false)
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={selectRef}>
      {React.Children.map(children, (child) => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen),
            isOpen,
          })
        }
        if (child.type === SelectContent) {
          return isOpen
            ? React.cloneElement(child, {
                onSelect: handleSelect,
                multiple,
              })
            : null
        }
        return child
      })}
    </div>
  )
}

export function SelectTrigger({ children, className = "", onClick, isOpen }) {
  return (
    <button
      type="button"
      className={`w-full p-2 text-left border rounded-md bg-white text-gray-900 flex justify-between items-center ${className} ${isOpen ? "border-gray-400" : ""}`}
      onClick={onClick}
    >
      {children}
      <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>
  )
}

export function SelectValue({ children, placeholder }) {
  return <span className="text-gray-900">{children || placeholder}</span>
}

export function SelectContent({ children, onSelect, multiple }) {
  return (
    <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10 max-h-60 overflow-auto">
      {React.Children.map(children, (child) => {
        if (child.type === SelectItem) {
          return React.cloneElement(child, { onSelect, multiple })
        }
        return child
      })}
    </div>
  )
}

export function SelectItem({ value, children, onSelect, multiple }) {
  const handleClick = (e) => {
    if (!multiple) {
      e.stopPropagation()
    }
    onSelect(value)
  }

  return (
    <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-900" onClick={handleClick}>
      {children}
    </div>
  )
}

