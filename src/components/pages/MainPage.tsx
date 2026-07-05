"use client";

import { useState } from "react";

import Button from "../common/button";
import SearchBar from "../common/searchBar";

import IcTodo from "@/../public/images/badge-todo.svg";
import IcDone from "@/../public/images/badge-done.svg";
import CheckListItem from "../common/checkListItem";
import EmptyCheckList from "../common/emptyCheckList";

export default function MainPage() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col justify-center pt-8 px-1 md:px-6 lg:px-90 gap-4 md:gap-8 lg:gap-12">
      {/** Search-Bar / todo-list 추가 btn 레이아웃 */}
      <div className="flex gap-3 sm:gap-4">
        <SearchBar />
        <Button children="추가하기" />
      </div>

      {/** todo-list 활성화 전 / 후 */}
      <div className="flex gap-8 flex-col lg:flex-row">
        {/** 활성화 전 - todo */}
        <div className="flex flex-col w-full gap-4 lg:flex-1">
          <IcTodo />
          {checked ? (
            <EmptyCheckList variant="todo" />
          ) : (
            <CheckListItem
              id="1"
              variant="list"
              checked={checked}
              onChange={setChecked}
            >
              비타민 챙겨 먹기
            </CheckListItem>
          )}
        </div>
        {/** 활성화 후 - done */}
        <div className="flex flex-col w-full gap-4 lg:flex-1">
          <IcDone />
          {checked ? (
            <CheckListItem
              id="1"
              variant="list"
              checked={true}
              onChange={() => setChecked(false)}
            >
              비타민 챙겨 먹기
            </CheckListItem>
          ) : (
            <EmptyCheckList variant="done" />
          )}
        </div>
      </div>
    </div>
  );
}
