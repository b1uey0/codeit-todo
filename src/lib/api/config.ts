function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getItemsEndpoint(): string {
  const baseUrl = requireEnv(process.env.NEXT_PUBLIC_BASE_URL, "BASE_URL");
  const tenantId = requireEnv(
    process.env.NEXT_PUBLIC_TENANT_ID,
    "NEXT_PUBLIC_TENANT_ID",
  );
  return `${baseUrl}/${tenantId}/items`;
}

export function getImagesUploadEndpoint(): string {
  const baseUrl = requireEnv(process.env.NEXT_PUBLIC_BASE_URL, "BASE_URL");
  const tenantId = requireEnv(
    process.env.NEXT_PUBLIC_TENANT_ID,
    "NEXT_PUBLIC_TENANT_ID",
  );
  return `${baseUrl}/${tenantId}/images/upload`;
}
