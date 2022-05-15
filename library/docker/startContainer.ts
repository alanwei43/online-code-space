import { getDockerInstance } from "./getDockerInstance"

export type StartContainerResult = string

/**
 * 启动容器
 * @date 2022-05-15
 */
export async function startContainer(id: string): Promise<StartContainerResult> {
  const docker = getDockerInstance();
  const container = docker.getContainer(id);
  const doStart = await container.start({});
  return doStart + "";
}