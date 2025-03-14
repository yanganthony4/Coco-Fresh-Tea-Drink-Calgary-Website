"use client";

export function Select({ children, onValueChange, value, className = "" }) {
  return (
    <div className="relative">
      <select
        className={`w-full p-2 border rounded bg-white appearance-none cursor-pointer ${className}`}
        onChange={(e) => onValueChange(e.target.value)}
        value={value}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

export function SelectTrigger({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function SelectValue({ placeholder }) {
  return <option value="" disabled>{placeholder}</option>;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ children, value }) {
  return <option value={value}>{children}</option>;
}
