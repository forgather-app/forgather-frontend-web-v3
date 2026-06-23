import { apiClient } from "./apiClient";

export const customFetcher = async <T>({
  url,
  method,
  params,
  data,
  headers,
  signal,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: Record<string, string>;
  data?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}): Promise<T> => {
  const response = await apiClient.request<T>({
    url,
    method,
    params,
    data,
    headers,
    signal,
  });

  return response.data;
};

export default customFetcher;
