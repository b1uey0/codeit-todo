"use client";

import { useState } from "react";

import Button from "@/components/common/button";
import CheckListItem from "@/components/common/checkListItem";
import ImageUploadButton from "@/components/common/imageUploadButton";
import IcImg from "@/../public/icons/img.svg";

interface DetailPageProps {
  id: string;
}

export default function DetailPage({ id }: DetailPageProps) {
  const [checked, setChecked] = useState(false);
  const [memo, setMemo] = useState("오메가 3, 프로폴리스, 아연 챙겨먹기");
  const [imagePath, setImagePath] = useState<string | null>(null);

  return (
    <div className="flex flex-col w-full pt-8 px-1 md:px-6 lg:px-90 pb-10 gap-6">
      <CheckListItem
        id={id}
        variant="detail"
        checked={checked}
        onChange={setChecked}
      >
        비타민 챙겨 먹기
      </CheckListItem>

      {/** 이미지 / 메모 영역 */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative shrink-0 w-full h-77.75 lg:w-96 flex items-center justify-center rounded-3xl border-2 border-slate-300 bg-slate-50 overflow-hidden">
          {imagePath ? (
            <img
              src={imagePath}
              alt="업로드한 이미지"
              className="w-full h-full object-cover"
            />
          ) : (
            <IcImg />
          )}
          <ImageUploadButton
            variant={imagePath ? "edit" : "add"}
            className="absolute bottom-2 right-2"
            onImageSelect={(_file, previewUrl) => setImagePath(previewUrl)}
          />
        </div>

        <div className="relative w-full lg:flex-1 h-77.75 rounded-2xl bg-[url('/images/memo.svg')] bg-cover bg-center px-6 py-5 flex flex-col gap-3 overflow-y-auto">
          <span className="text-16-bold text-center">Memo</span>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="text-16-regular flex-1 w-full resize-none bg-transparent outline-none leading-6"
          />
        </div>
      </div>

      {/** 수정 / 삭제 버튼 */}
      <div className="flex justify-end gap-3">
        <Button variant={checked ? "completeActive" : "complete"}>
          수정 완료
        </Button>
        <Button variant="delete">
          삭제하기
        </Button>
      </div>
    </div>
  );
}
