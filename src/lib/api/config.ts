// 필수 환경변수가 비어있으면 조용히 undefined로 넘어가지 않고 바로 에러로 알려줍니다.
function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// items API의 base URL - 서버마다 tenantId가 달라, 매번 조합해서 만듭니다.
export function getItemsEndpoint(): string {
  const baseUrl = requireEnv(process.env.NEXT_PUBLIC_BASE_URL, "BASE_URL");
  const tenantId = requireEnv(
    process.env.NEXT_PUBLIC_TENANT_ID,
    "NEXT_PUBLIC_TENANT_ID",
  );
  return `${baseUrl}/${tenantId}/items`;
}

// 이미지 업로드 API의 base URL입니다.
export function getImagesUploadEndpoint(): string {
  const baseUrl = requireEnv(process.env.NEXT_PUBLIC_BASE_URL, "BASE_URL");
  const tenantId = requireEnv(
    process.env.NEXT_PUBLIC_TENANT_ID,
    "NEXT_PUBLIC_TENANT_ID",
  );
  return `${baseUrl}/${tenantId}/images/upload`;
}
