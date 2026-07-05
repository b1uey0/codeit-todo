import IcEmptyTodoLg from "@/../public/images/empty-todo-lg.svg";
import IcEmptyTodoSm from "@/../public/images/empty-todo-sm.svg";
import IcEmptyDoneLg from "@/../public/images/empty-done-lg.svg";
import IcEmptyDoneSm from "@/../public/images/empty-done-sm.svg";

interface EmptyCheckListProps {
  variant: "todo" | "done";
}

const VARIANTS = {
  // 활성화 전 - todo 목록이 비어있을 때
  todo: {
    ImageLg: IcEmptyTodoLg,
    ImageSm: IcEmptyTodoSm,
    lines: ["할 일이 없어요.", "TODO를 새롭게 추가해주세요!"],
  },
  // 활성화 후 - done 목록이 비어있을 때
  done: {
    ImageLg: IcEmptyDoneLg,
    ImageSm: IcEmptyDoneSm,
    lines: ["아직 다 한 일이 없어요.", "해야 할 일을 체크해보세요!"],
  },
};

export default function EmptyCheckList({ variant }: EmptyCheckListProps) {
  const { ImageLg, ImageSm, lines } = VARIANTS[variant];

  return (
    <div className="flex flex-col items-center gap-3">
      <ImageSm className="md:hidden" />
      <ImageLg className="hidden md:block" />
      <p className="text-16-bold text-slate-400 text-center leading-5">
        {lines[0]}
        <br />
        {lines[1]}
      </p>
    </div>
  );
}
