// API 응답이 실패(res.ok === false)일 때 던지는 에러입니다.
// status, body를 들고 있어, 각 페이지에서 실패 사유별로 다르게 처리 가능합니다.
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// 모든 API 호출이 거쳐가는 공통 fetch 래퍼입니다.
// items.ts, images.ts에서 매번 헤더 설정 / 에러 처리를 반복하지 않도록 하기 위해 만들었습니다.
export async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  // 이미지 업로드처럼 body가 FormData면 Content-Type을 직접 지정하면 안 돼서 분기 처리
  const isFormData = init?.body instanceof FormData;

  const res = await fetch(url, {
    ...init,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => undefined);
    throw new ApiError(res.status, `${res.status} ${res.statusText}`, body);
  }

  // 삭제 성공(204 No Content)처럼 body가 없는 응답은 json 파싱하면 에러라서 예외 처리했습니다.
  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}
