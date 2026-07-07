"use client";

import { FormEvent, useEffect, useState } from "react";

import Button from "../common/button";
import SearchBar from "../common/searchBar";

import IcTodo from "@/../public/images/badge-todo.svg";
import IcDone from "@/../public/images/badge-done.svg";
import CheckListItem from "../common/checkListItem";
import EmptyCheckList from "../common/emptyCheckList";

import { createItem, getItems, updateItem } from "@/lib/api/items";
import type { Item } from "@/types/item";

// 메인 페이지("/") - 할 일 목록을 불러와서 todo / done으로 나눠 보여주고, 추가 / 완료 토글 기능을 담당합니다.
export default function MainPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newTodoName, setNewTodoName] = useState("");

  // 마운트될 때 한 번만 전체 목록을 가져옵니다. (최대 100개까지)
  useEffect(() => {
    getItems({ page: 1, pageSize: 100 })
      .then(setItems)
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  // 검색바 옆 [추가하기] 버튼 클릭 시 새 할 일을 생성합니다.
  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();

    const name = newTodoName.trim();
    if (!name) return;

    try {
      const created = await createItem({ name });
      setItems((prev) => [...prev, created]);
      setNewTodoName("");
    } catch (err) {
      console.error(err);
      alert("할 일 추가에 실패했습니다.");
    }
  };

  // 체크리스트 아이템의 완료 여부 토글 기능입니다. (todo <-> done 이동)
  const handleToggle = async (item: Item, checked: boolean) => {
    // 우선 화면부터 바꾸고, API가 실패하면 원래 상태로 돌아옵니다.
    setItems((prev) =>
      prev.map((it) =>
        it.id === item.id ? { ...it, isCompleted: checked } : it,
      ),
    );

    try {
      await updateItem(item.id, { isCompleted: checked });
    } catch (err) {
      console.error(err);
      setItems((prev) =>
        prev.map((it) =>
          it.id === item.id ? { ...it, isCompleted: item.isCompleted } : it,
        ),
      );
    }
  };

  // isCompleted 기준으로 todo / done 두 컬럼에 나눠 담습니다.
  const todoItems = items.filter((item) => !item.isCompleted);
  const doneItems = items.filter((item) => item.isCompleted);

  return (
    <main className="flex flex-col justify-center pt-8 px-4 md:px-6 lg:px-90 gap-4 md:gap-8 lg:gap-12">
      {/** Search-Bar / todo-list 추가 btn 레이아웃 */}
      <form onSubmit={handleAddTodo} className="flex gap-3 sm:gap-4">
        <SearchBar
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
        />
        <Button
          type="submit"
          variant={newTodoName.trim() ? "addActive" : "add"}
        >
          추가하기
        </Button>
      </form>

      {isLoading ? (
        <p className="text-16-regular text-slate-400 text-center">
          불러오는 중...
        </p>
      ) : (
        /** todo-list 활성화 전 / 후 */
        <div className="flex gap-8 flex-col lg:flex-row">
          {/** 활성화 전 - todo */}
          <div className="flex flex-col w-full gap-4 lg:flex-1">
            <IcTodo />
            {todoItems.length === 0 ? (
              <EmptyCheckList variant="todo" />
            ) : (
              <ul className="flex flex-col gap-4">
                {todoItems.map((item) => (
                  <CheckListItem
                    key={item.id}
                    id={String(item.id)}
                    variant="list"
                    checked={item.isCompleted}
                    onChange={(checked) => handleToggle(item, checked)}
                  >
                    {item.name}
                  </CheckListItem>
                ))}
              </ul>
            )}
          </div>
          {/** 활성화 후 - done */}
          <div className="flex flex-col w-full gap-4 lg:flex-1">
            <IcDone />
            {doneItems.length === 0 ? (
              <EmptyCheckList variant="done" />
            ) : (
              <ul className="flex flex-col gap-4">
                {doneItems.map((item) => (
                  <CheckListItem
                    key={item.id}
                    id={String(item.id)}
                    variant="list"
                    checked={item.isCompleted}
                    onChange={(checked) => handleToggle(item, checked)}
                  >
                    {item.name}
                  </CheckListItem>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
