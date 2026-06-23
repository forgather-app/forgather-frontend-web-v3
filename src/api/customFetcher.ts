import type { Method } from "axios";
import { apiClient } from "./apiClient";

export const customFetcher = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const { method = "GET", headers, body, signal } = options ?? {};

  const response = await apiClient.request<T>({
    url,
    method: method as Method,
    headers: headers as Record<string, string> | undefined,
    data: body,
    signal: signal ?? undefined,
  });

  return response.data;
};

export default customFetcher;
