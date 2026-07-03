import { ButtonHTMLAttributes, ReactNode } from "react";

import IcPlus from "@/../public/icons/plus.svg";
import IcCheck from "@/../public/icons/check.svg";
import IcClose from "@/../public/icons/close.svg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "add" | "addActive" | "delete" | "complete" | "completeActive";
}

const VARIANTS = {
  // 추가하기
  add: { icon: IcPlus, bg: "bg-slate-200", text: "text-slate-900" },
  // 추가하기 - 활성화
  addActive: { icon: IcPlus, bg: "bg-violet-600", text: "text-white" },
  // 삭제하기
  delete: { icon: IcClose, bg: "bg-rose-500", text: "text-white" },
  // 수정 완료
  complete: { icon: IcCheck, bg: "bg-slate-200", text: "text-slate-900" },
  // 수정 완료 - 활성화
  completeActive: { icon: IcCheck, bg: "bg-lime-300", text: "text-slate-900" },
};

export default function Button({
  children,
  className,
  variant = "add",
  ...props
}: ButtonProps) {
  const { icon: Icon, bg, text } = VARIANTS[variant];
  const isAddVariant = variant === "add" || variant === "addActive";
  const size = isAddVariant
    ? "w-14 h-14 sm:w-41 sm:h-13"
    : "w-41 h-13";

  return (
    <button className={`relative ${className}`} {...props}>
      <div
        className={`absolute top-1 left-[3.65px] ${size} rounded-3xl border-2 border-slate-900 bg-slate-900`}
      />
      <div
        className={`relative flex ${size} rounded-3xl border-2 gap-1 border-slate-900 ${bg} ${text} items-center justify-center`}
      >
        <Icon />
        <span
          className={`text-16-bold ${isAddVariant ? "hidden sm:inline" : ""}`}
        >
          {children}
        </span>
      </div>
    </button>
  );
}
