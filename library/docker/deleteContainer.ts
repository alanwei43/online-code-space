import { getDockerInstance } from "./getDockerInstance"

/**
 * 删除容器
 * @date 2022-05-15
 */
export async function deleteContainer(id: string): Promise<string> {
  const docker = getDockerInstance();
  const container = docker.getContainer(id);
  const rm = await container.remove();
  return rm + "";
}