import http from "http";

/**
 * 
 * @date 2022-05-14
 */
export function writeResponoseJson(response: http.OutgoingMessage, data: any): void {
  response.setHeader("content-type", "application/json");
  response.end(JSON.stringify(data), "utf-8");
}