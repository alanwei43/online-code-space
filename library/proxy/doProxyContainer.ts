import http from "http";
import { proxyWs, ProxyWsParams } from "./proxyWs";
import { getAllContainers } from "../docker/getAllContainers";
import { parse } from "url";
import { writeResponoseJson } from "../utils";
import { getContainerConfig } from "../docker/getContainerConfig";
import { proxyHttp, ProxyHttpParams } from "./proxyHttp";

export type DoProxyContainerParams = {
  request: http.IncomingMessage
  response?: http.ServerResponse
  socket?: any
  socketHeaders?: any
}
export type DoProxyContainerResult = {
  success: boolean
  message?: string
}

/**
 * 
 * @date 2022-05-14
 */
export async function doProxyContainer(
  params: DoProxyContainerParams
): Promise<DoProxyContainerResult> {
  const config = getContainerConfig();
  // const parsedUrl = parse(params.request.url + "", true);
  // const { pathname, query } = parsedUrl;
  const [_, appId, realUrl] = /^\/[_-\w\d]+\/([\w\d]+)(.*)$/g.exec(params.request.url + "") || [];
  if (!appId) {
    const data = {
      success: false,
      message: `not found id in pathname`
    };
    params.response && writeResponoseJson(params.response, data);
    return data;
  }

  const containers = await getAllContainers();
  const container = containers.find(c => c.id === appId || c.name === appId);
  if (!container) {
    const data = {
      success: false,
      message: `not found ${appId}`
    };
    params.response && writeResponoseJson(params.response, data);
    return data;
  }
  const targetOrigin = `http://${container.ip}:${config.editorPort}`;

  params.request.url = realUrl || "/";
  if (params.socket) {

    /**
     * proxy web socket
     */
    proxyWs({
      request: params.request,
      socket: params.socket,
      header: params.socketHeaders,
      options: {
        target: targetOrigin
      }
    });
  }
  if (params.response) {
    proxyHttp({
      request: params.request,
      response: params.response,
      options: {
        target: targetOrigin
      }
    });
  }
  return {
    success: true
  };
}