"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Button from "@/components/common/button";
import CheckListItem from "@/components/common/checkListItem";
import ImageUploadButton from "@/components/common/imageUploadButton";
import IcImg from "@/../public/icons/img.svg";

import { deleteItem, getItem, updateItem } from "@/lib/api/items";
import { uploadImage } from "@/lib/api/images";

interface DetailPageProps {
  id: string;
}

// 상세 페이지("/items/[id]") - 할 일을 id 값에 맞춰 불러와, 이름 / 메모 / 이미지 / 완료 여부를 수정, 삭제까지 담당합니다.
export default function DetailPage({ id }: DetailPageProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [checked, setChecked] = useState(false);
  const [memo, setMemo] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // id 값이 바뀔 때마다 (다른 항목 상세로 진입할 때마다), 해당 항목 데이터를 새로 불러와서 폼에 채웁니다.
  useEffect(() => {
    getItem(Number(id))
      .then((item) => {
        setName(item.name);
        setChecked(item.isCompleted);
        setMemo(item.memo ?? "");
        setImageUrl(item.imageUrl);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [id]);

  // 이미지 업로드 버튼에서 파일 선택 시 실행 - 유효성 체크 후 미리보기를 먼저 띄우고 업로드합니다.
  const handleImageSelect = async (file: File, previewUrl: string) => {
    const isEnglishFileName = /^[a-zA-Z0-9_.-]+$/.test(file.name);
    if (!isEnglishFileName) {
      alert("이미지 파일 이름은 영어로만 이루어져야 해요.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 해요.");
      return;
    }

    // 업로드가 끝날 때까지는 미리보기부터 보여줍니다.
    setImageUrl(previewUrl);

    try {
      const { url } = await uploadImage(file);
      setImageUrl(url);
    } catch (err) {
      console.error(err);
      alert("이미지 업로드에 실패했어요.");
    }
  };

  // [수정 완료] 버튼 클릭 시 현재 폼 상태를 서버에 반영하고 '메인(/)'으로 이동합니다.
  // imageUrl이 없으면(=업로드를 하지 않은 경우.) 필드 자체를 보내지 않고, 기존 이미지를 유지합니다.
  const handleSubmit = async () => {
    try {
      await updateItem(Number(id), {
        name,
        memo,
        isCompleted: checked,
        ...(imageUrl ? { imageUrl } : {}),
      });
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("수정에 실패했어요.");
    }
  };

  // [삭제하기] 버튼 클릭 시 항목을 삭제하고 '메인(/)'으로 이동합니다.
  const handleDelete = async () => {
    try {
      await deleteItem(Number(id));
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("삭제에 실패했어요.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full justify-center pt-8 px-1 md:px-6 lg:px-90">
        <p className="text-16-regular text-slate-400">불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pt-8 px-1 md:px-6 lg:px-90 pb-10 gap-6">
      <CheckListItem
        id={id}
        variant="detail"
        checked={checked}
        onChange={setChecked}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className="w-full bg-transparent text-center outline-none"
        />
      </CheckListItem>

      {/** 이미지 / 메모 영역 */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div
          className={`relative shrink-0 w-full h-77.75 lg:w-96 flex items-center justify-center rounded-3xl bg-slate-50 overflow-hidden ${
            imageUrl ? "" : "border-2 border-dashed border-slate-300"
          }`}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="업로드 이미지"
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <IcImg />
          )}
          <ImageUploadButton
            variant={imageUrl ? "edit" : "add"}
            className="absolute bottom-2 right-2"
            onImageSelect={handleImageSelect}
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
        <Button
          variant={checked ? "completeActive" : "complete"}
          onClick={handleSubmit}
        >
          수정 완료
        </Button>
        <Button variant="delete" onClick={handleDelete}>
          삭제하기
        </Button>
      </div>
    </div>
  );
}
