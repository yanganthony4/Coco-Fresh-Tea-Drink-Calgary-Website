"use client";

import React, { useState, useRef, useEffect, ReactNode, ReactElement } from "react";
import { ChevronDown } from "lucide-react";

// ------------------------------------------------------------------
// Main Select Component
// ------------------------------------------------------------------
interface SelectProps {
  value: any;
  onValueChange: (value: any) => void;
  children: ReactNode;
  multiple?: boolean;
}

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children, multiple = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (newValue: any) => {
    if (multiple) {
      if (Array.isArray(value)) {
        if (value.includes(newValue)) {
          onValueChange(value.filter((v: any) => v !== newValue));
        } else {
          onValueChange([...value, newValue]);
        }
      } else {
        onValueChange([newValue]);
      }
    } else {
      onValueChange(newValue);
      setIsOpen(false);
    }
  };

  return (
    <div ref={selectRef} className="relative inline-block text-left">
      <div onClick={() => setIsOpen(!isOpen)}>
        <SelectTrigger isOpen={isOpen}>
          <SelectValue value={value} />
        </SelectTrigger>
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full rounded-md bg-white border shadow-lg z-10">
          <SelectContent onSelect={handleSelect} multiple={multiple}>
            {children}
          </SelectContent>
        </div>
      )}
    </div>
  );
};

// ------------------------------------------------------------------
// SelectTrigger Component
// ------------------------------------------------------------------
interface SelectTriggerProps {
  children: ReactNode;
  isOpen: boolean;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ children, isOpen }) => {
  return (
    <button
      type="button"
      className="w-full p-2 text-left border rounded-md bg-white text-gray-900 flex items-center justify-between"
    >
      {children}
      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>
  );
};

// ------------------------------------------------------------------
// SelectValue Component
// ------------------------------------------------------------------
interface SelectValueProps {
  value: any;
}

export const SelectValue: React.FC<SelectValueProps> = ({ value }) => {
  let display = "";
  if (Array.isArray(value)) {
    display = value.length ? value.join(", ") : "Select option(s)";
  } else {
    display = value !== undefined && value !== null && value !== "" ? value : "Select an option";
  }
  return <span>{display}</span>;
};

// ------------------------------------------------------------------
// SelectContent Component
// ------------------------------------------------------------------
interface SelectContentProps {
  children: ReactNode;
  onSelect: (value: any) => void;
  multiple: boolean;
}

export const SelectContent: React.FC<SelectContentProps> = ({ children, onSelect, multiple }) => {
  return (
    <div className="py-1">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Clone each child to inject onSelect and multiple props if applicable.
          return React.cloneElement(child as ReactElement<SelectItemProps>, { onSelect, multiple });
        }
        return child;
      })}
    </div>
  );
};

// ------------------------------------------------------------------
// SelectItem Component
// ------------------------------------------------------------------
interface SelectItemProps {
  value: any;
  children: ReactNode;
  onSelect?: (value: any) => void;
  multiple?: boolean;
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, children, onSelect = () => {}, multiple }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(value);
  };

  return (
    <div onClick={handleClick} className="px-3 py-2 cursor-pointer hover:bg-gray-100">
      {children}
    </div>
  );
};
