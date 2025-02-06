export function Select({ children, onValueChange }) {
    return (
      <div className="relative">
        <select className="w-full p-2 border rounded" onChange={(e) => onValueChange(e.target.value)}>
          {children}
        </select>
      </div>
    );
  }
  
  export function SelectTrigger({ children }) {
    return <>{children}</>;
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
  