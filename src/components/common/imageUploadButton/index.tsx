import { ButtonHTMLAttributes, ReactNode } from "react";

import IcPlus from "@/../public/icons/plus.svg";
import IcEdit from "@/../public/icons/edit.svg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "add" | "edit";
}

const VARIANTS = {
  // 추가하기
  add: { icon: IcPlus, bg: "bg-slate-200", border: "" },
  // 수정하기
  edit: { icon: IcEdit, bg: "bg-slate-900/50", border: "border-2 border-slate-900" },
};

export default function ImageUploadButton({
  className,
  variant = "add",
  ...props
}: ButtonProps) {
  const { icon: Icon, bg, border } = VARIANTS[variant];

  return (
    <button
      className={`w-16 h-16 flex items-center justify-center rounded-full ${bg} ${border} ${className}`}
      {...props}
    >
      <Icon />
    </button>
  );
}
