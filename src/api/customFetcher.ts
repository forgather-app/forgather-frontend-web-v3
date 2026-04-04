const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

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
  headers?: HeadersInit;
  signal?: AbortSignal;
}): Promise<T> => {
  const queryString = params
    ? `?${new URLSearchParams(params).toString()}`
    : "";

  const response = await fetch(`${BASE_URL}${url}${queryString}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(data ? { body: JSON.stringify(data) } : {}),
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

export default customFetcher;
