import { getContainerConfig } from "./getContainerConfig";
import { getContainerRunTimes } from "./getContainerRunTimes";
import { getDockerInstance } from "./getDockerInstance";
import type { Container } from "dockerode";

export type CreateContainerParams = {
  name: string
  runtime: string
}
export interface CreateContainerResult { }

/**
 * 创建容器
 * @date 2022-05-14
 */
export async function createContainer(params: CreateContainerParams): Promise<Container> {
  const allRuntimes = getContainerRunTimes();
  const config = getContainerConfig();

  const rt = allRuntimes[params.runtime];
  if (!rt) {
    return Promise.reject(new Error(`不存在该运行时: ${params.runtime}`));
  }
  const options = {
    name: `${config.containerNamePrefix}${params.name}`,
    Image: rt.image,
    AttachStdin: false,
    AttachStdout: false,
    AttachStderr: false,
    Tty: false,
    Cmd: rt.cmd,
    OpenStdin: false,
    StdinOnce: false,
    PublishAllPorts: true,
    HostConfig: {
      Memory: 1 * 1024/** Byte */ * 1024 /* MB */ * 1024,
      NetworkMode: "bridge"
    }
    // DiskQuota: 1 * 1024/** Byte */ * 1024 /* MB */ * 500,
  };
  const docker = getDockerInstance();
  const container = await docker.createContainer(options);
  return container;
}