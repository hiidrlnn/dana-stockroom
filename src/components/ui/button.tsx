import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className = "", ...props }: Props) {
  return (
    <button
      className={`
        rounded-xl
        bg-sky-500
        px-5
        py-3
        font-medium
        text-white
        transition
        hover:bg-sky-400
        ${className}
      `}
      {...props}>
      {children}
    </button>
  );
}
