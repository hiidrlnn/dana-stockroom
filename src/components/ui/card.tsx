import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-white/10
        bg-[#0F172A]
        p-6
        shadow-lg
        ${className}
      `}>
      {children}
    </div>
  );
}
