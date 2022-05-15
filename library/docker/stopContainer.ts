import { getDockerInstance } from "./getDockerInstance"
/**
 * 停止容器
 * @date 2022-05-15
 */
export async function stopContainer(id: string): Promise<string> {
  const docker = getDockerInstance();
  const container = docker.getContainer(id);
  const stop = await container.stop();
  return stop + "";
}