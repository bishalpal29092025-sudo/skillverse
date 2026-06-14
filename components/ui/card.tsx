import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-gray-800
        bg-[#111827]
        p-6
        shadow-lg
        ${className}
      `}
    >
      {children}
    </div>
  );
}