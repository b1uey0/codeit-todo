"use client";

import { HTMLAttributes, MouseEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";

import IcCheckboxOff from "@/../public/icons/checkbox.svg";
import IcCheckboxOn from "@/../public/icons/checkbox-checked.svg";

interface CheckListItemProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "onChange" | "children" | "onClick"
> {
  id: string;
  children: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  variant?: "list" | "detail";
}

const VARIANTS = {
  // 메인 페이지 Item
  list: {
    shape: "rounded-[27px] h-12.5",
    checkedStyle: "bg-violet-200",
    text: "text-16-regular",
    checkedText: "line-through",
    contentWrapper: "",
  },
  // 상세 페이지 Item
  detail: {
    shape: "rounded-3xl h-16 justify-center",
    checkedStyle: "bg-violet-200",
    text: "text-16-bold",
    checkedText: "underline",
    // input이 실제 너비를 가질 수 있도록 span이 남은 공간을 채우게 함
    contentWrapper: "flex-1 min-w-0",
  },
};

export default function CheckListItem({
  id,
  children,
  checked,
  onChange,
  variant = "list",
  className,
  ...props
}: CheckListItemProps) {
  const router = useRouter();
  const { shape, checkedStyle, text, checkedText, contentWrapper } =
    VARIANTS[variant];
  const Icon = checked ? IcCheckboxOn : IcCheckboxOff;
  // 메인 목록(list)에서는 <ul>의 항목이라 <li>로, 상세페이지(detail)에서는 단독 카드라 <div>로 렌더링합니다.
  const Tag = variant === "list" ? "li" : "div";

  const handleCheckboxClick = (e: MouseEvent) => {
    e.stopPropagation();
    onChange(!checked);
  };

  return (
    <Tag
      onClick={() => router.push(`/items/${id}`)}
      className={`flex items-center gap-3 w-full px-4 border-2 border-slate-900 cursor-pointer ${shape} ${
        checked ? checkedStyle : "bg-white"
      } ${className ?? ""}`}
      {...props}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={handleCheckboxClick}
        className="shrink-0"
      >
        <Icon />
      </button>
      <span
        className={`${text} ${checked ? checkedText : ""} ${contentWrapper}`}
      >
        {children}
      </span>
    </Tag>
  );
}
