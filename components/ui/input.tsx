import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function Input({
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      <input
        className={`
          w-full
          rounded-xl
          border
          border-gray-700
          bg-[#111827]
          px-4
          py-3
          text-white
          outline-none
          transition-all
          focus:border-[#14F195]
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}