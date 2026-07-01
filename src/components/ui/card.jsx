export function Card({ className = "", children }) {
  return (
    <div className={`bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children }) {
  return <div className={`px-6 py-5 border-b border-gray-100 ${className}`}>{children}</div>;
}

export function CardTitle({ className = "", children }) {
  return <h3 className={`text-lg font-semibold text-[#475f7b] ${className}`}>{children}</h3>;
}

export function CardContent({ className = "", children }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardDescription({ className = "", children }) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
}

export function CardFooter({ className = "", children }) {
  return <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>;
}


