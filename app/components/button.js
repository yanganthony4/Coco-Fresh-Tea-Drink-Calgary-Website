export function Button({ children, onClick }) {
    return (
      <button
        className="px-4 py-2 bg-black text-black rounded-lg hover:bg-gray-800"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  