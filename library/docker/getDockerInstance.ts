import Docker from "dockerode";

export type GetDockerInstanceParams = {}
export type GetDockerInstanceResult = Docker
export type GetDockerInstanceDef = {
  (): GetDockerInstanceResult
  __instance?: GetDockerInstanceResult
}

/**
 * 获取 docker 实例
 * @date 2022-05-14
 */
export const getDockerInstance: GetDockerInstanceDef = function (): GetDockerInstanceResult {
  if (getDockerInstance.__instance) {
    return getDockerInstance.__instance;
  }
  getDockerInstance.__instance = new Docker({
    "host": "127.0.0.1",
    "port": 2375
  });
  return getDockerInstance.__instance;
}