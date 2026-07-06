import { apiFetch } from "./client";
import { getImagesUploadEndpoint } from "./config";

interface UploadImageResponse {
  url: string;
}

// POST /api/{tenantId}/images/upload - 이미지 업로드 후 저장된 URL을 받아 item의 imageUrl로 사용
export function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  return apiFetch<UploadImageResponse>(getImagesUploadEndpoint(), {
    method: "POST",
    body: formData,
  });
}
