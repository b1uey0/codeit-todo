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

export default function MainPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newTodoName, setNewTodoName] = useState("");

  useEffect(() => {
    getItems({ page: 1, pageSize: 100 })
      .then(setItems)
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

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

  const handleToggle = async (item: Item, checked: boolean) => {
    // 우선 화면부터 바꾸고, API가 실패하면 원래 상태
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

  const todoItems = items.filter((item) => !item.isCompleted);
  const doneItems = items.filter((item) => item.isCompleted);

  return (
    <div className="flex flex-col justify-center pt-8 px-4 md:px-6 lg:px-90 gap-4 md:gap-8 lg:gap-12">
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
              todoItems.map((item) => (
                <CheckListItem
                  key={item.id}
                  id={String(item.id)}
                  variant="list"
                  checked={item.isCompleted}
                  onChange={(checked) => handleToggle(item, checked)}
                >
                  {item.name}
                </CheckListItem>
              ))
            )}
          </div>
          {/** 활성화 후 - done */}
          <div className="flex flex-col w-full gap-4 lg:flex-1">
            <IcDone />
            {doneItems.length === 0 ? (
              <EmptyCheckList variant="done" />
            ) : (
              doneItems.map((item) => (
                <CheckListItem
                  key={item.id}
                  id={String(item.id)}
                  variant="list"
                  checked={item.isCompleted}
                  onChange={(checked) => handleToggle(item, checked)}
                >
                  {item.name}
                </CheckListItem>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
