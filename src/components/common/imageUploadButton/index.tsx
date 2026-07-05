import { ButtonHTMLAttributes, ChangeEvent, useRef } from "react";

import IcPlus from "@/../public/icons/plus.svg";
import IcEdit from "@/../public/icons/edit.svg";

interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> {
  variant?: "add" | "edit";
  onImageSelect?: (file: File, previewUrl: string) => void;
}

const VARIANTS = {
  // 추가하기
  add: { icon: IcPlus, bg: "bg-slate-200", border: "" },
  // 수정하기
  edit: {
    icon: IcEdit,
    bg: "bg-slate-900/50",
    border: "border-2 border-slate-900",
  },
};

export default function ImageUploadButton({
  className,
  variant = "add",
  onImageSelect,
  ...props
}: ButtonProps) {
  const { icon: Icon, bg, border } = VARIANTS[variant];
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    onImageSelect?.(file, previewUrl);

    e.target.value = "";
  };

  return (
    <>
      <button
        type="button"
        className={`w-16 h-16 flex items-center justify-center rounded-full ${bg} ${border} ${className}`}
        onClick={() => inputRef.current?.click()}
        {...props}
      >
        <Icon />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </>
  );
}
