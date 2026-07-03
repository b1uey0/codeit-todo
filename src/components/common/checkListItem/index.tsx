"use client";

import { InputHTMLAttributes, ReactNode } from "react";

import IcCheckboxOff from "@/../public/icons/checkbox.svg";
import IcCheckboxOn from "@/../public/icons/checkbox-checked.svg";

interface CheckListItemProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "children"
> {
  children: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  variant?: "list" | "detail";
}

const VARIANTS = {
  // 메인 페이지 목록에서 사용하는 pill 형태
  list: {
    shape: "rounded-[27px] h-12.5",
    checkedStyle: "bg-violet-200",
    text: "text-16-regular",
    checkedText: "line-through",
  },
  // 상세 페이지에서 사용하는 카드 형태
  detail: {
    shape: "rounded-3xl h-16 justify-center",
    checkedStyle: "bg-violet-200",
    text: "text-16-bold",
    checkedText: "underline",
  },
};

export default function CheckListItem({
  children,
  checked,
  onChange,
  variant = "list",
  className,
  ...props
}: CheckListItemProps) {
  const { shape, checkedStyle, text, checkedText } = VARIANTS[variant];
  const Icon = checked ? IcCheckboxOn : IcCheckboxOff;

  return (
    <label
      className={`flex items-center gap-3 w-full px-4 border-2 border-slate-900 cursor-pointer ${shape} ${
        checked ? checkedStyle : "bg-white"
      } ${className ?? ""}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
        {...props}
      />
      <Icon className="shrink-0" />
      <span className={`${text} ${checked ? checkedText : ""}`}>
        {children}
      </span>
    </label>
  );
}
