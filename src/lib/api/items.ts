import type { CreateItemDto, Item, UpdateItemDto } from "@/types/item";
import { apiFetch } from "./client";
import { getItemsEndpoint } from "./config";

// 할 일 항목 API - MainPage(목록), DetailPage(상세)에서 사용합니다.

interface GetItemsParams {
  page?: number;
  pageSize?: number;
}

// GET /api/{tenantId}/items - 항목 목록 조회
// page/pageSize는 선택값이라 넘어온 것만 쿼리스트링에 붙입니다.
export function getItems(params?: GetItemsParams) {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize));

  const query = searchParams.toString();
  const url = query ? `${getItemsEndpoint()}?${query}` : getItemsEndpoint();

  return apiFetch<Item[]>(url);
}

// GET /api/{tenantId}/items/{itemId} - 항목 상세 조회
export function getItem(id: Item["id"]) {
  return apiFetch<Item>(`${getItemsEndpoint()}/${id}`);
}

// POST /api/{tenantId}/items - 항목 등록
export function createItem(dto: CreateItemDto) {
  return apiFetch<Item>(getItemsEndpoint(), {
    method: "POST",
    body: JSON.stringify(dto),
  });
}

// PATCH /api/{tenantId}/items/{itemId} - 항목 수정
// name, memo, imageUrl, isCompleted 중 바뀐 값만 골라서 넘기면 됩니다. (부분 수정)
export function updateItem(id: Item["id"], dto: UpdateItemDto) {
  return apiFetch<Item>(`${getItemsEndpoint()}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}

// DELETE /api/{tenantId}/items/{itemId} - 항목 삭제
export function deleteItem(id: Item["id"]) {
  return apiFetch<void>(`${getItemsEndpoint()}/${id}`, {
    method: "DELETE",
  });
}
