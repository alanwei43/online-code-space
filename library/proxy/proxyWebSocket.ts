import http from "http";
import { getProxyServer } from "./getProxyServer";
export type ProxyWebSocketParams = {
  request: http.IncomingMessage
  socket: any
  header: any
  options: any
}

/**
 * 
 * @date 2022-05-14
 */
export function proxyWebSocket(params: ProxyWebSocketParams): void {
  getProxyServer().ws(params.request, params.socket, params.header, params.options);
}