export function Card({ children, className, onClick }) {
    return (
      <div className={`border rounded-lg shadow-md p-4 bg-white ${className}`} onClick={onClick}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ children, className }) {
    return <div className={`p-2 ${className}`}>{children}</div>;
  }
  