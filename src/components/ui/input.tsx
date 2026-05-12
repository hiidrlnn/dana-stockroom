import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: Props) {
  return (
    <input
      className={`
        w-full
        rounded-xl
        border
        border-white/10
        bg-[#1E293B]
        px-4
        py-3
        text-white
        outline-none
        transition
        focus:border-sky-500
        ${className}
      `}
      {...props}
    />
  );
}
