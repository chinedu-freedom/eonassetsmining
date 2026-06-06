export function Card({ className = "", children }) {
  return (
    <div className={`bg-[#131823] border border-white/5 rounded-2xl overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children }) {
  return <div className={`px-6 py-5 border-b border-white/5 ${className}`}>{children}</div>;
}

export function CardTitle({ className = "", children }) {
  return <h3 className={`text-lg font-medium text-white ${className}`}>{children}</h3>;
}

export function CardContent({ className = "", children }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardDescription({ className = "", children }) {
  return <p className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}>{children}</p>;
}

export function CardFooter({ className = "", children }) {
  return <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>;
}


