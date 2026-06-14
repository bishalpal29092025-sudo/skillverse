import { TextareaHTMLAttributes } from "react";

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export default function Textarea({
  error,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      <textarea
        className={`
          w-full
          min-h-[120px]
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
          resize-none
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