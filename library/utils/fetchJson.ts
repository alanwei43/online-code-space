import { fetch } from "undici";
/**
 * 获取JSON
 * @date 2022-05-16
 */
export async function fetchJson<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  params?: Record<string, string>,
  body?: any): Promise<T> {
  console.log(`method: ${method}, url: ${url}, params: ${JSON.stringify(params || {})}, body: ${JSON.stringify(body || {})}`);
  const search = new URLSearchParams(params);
  const response = await fetch(`${url}?${search.toString()}`, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await response.json() as T;
  return data;
}