import { InputHTMLAttributes } from "react";

type SearchBarProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

export default function SearchBar({ className, ...props }: SearchBarProps) {
  return (
    <div className={`relative w-full h-14 ${className ?? ""}`}>
      <div className="absolute top-1 left-1 w-full h-13 rounded-3xl border-2 border-slate-900 bg-slate-900" />
      <div className="relative flex items-center w-full h-13 rounded-3xl border-2 border-slate-900 bg-slate-100 px-6">
        <input
          type="text"
          className="w-full bg-transparent text-16-regular text-slate-900 outline-none placeholder:text-slate-500"
          placeholder="할 일을 입력해주세요"
          {...props}
        />
      </div>
    </div>
  );
}
