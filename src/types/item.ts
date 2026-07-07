// 할 일 항목 하나를 나타내는 타입입니다.
export interface Item {
  id: number;
  tenantId: string;
  name: string;
  // 아직 메모/이미지를 등록하지 않은 항목이 있어 null을 허용합니다.
  memo: string | null;
  imageUrl: string | null;
  isCompleted: boolean;
}

// 항목 생성 시 필요한 값 - 처음 추가할 때는 이름만 입력받습니다.
export interface CreateItemDto {
  name: string;
}

// 항목 수정 시 필요한 값 - 바뀐 필드만 골라 보내는 부분 수정(PATCH)이라 전부 선택값입니다.
export interface UpdateItemDto {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}
