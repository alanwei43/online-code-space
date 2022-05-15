import { getContainerConfig } from "./getContainerConfig";
import { getContainerRunTimes } from "./getContainerRunTimes";
import { getDockerInstance } from "./getDockerInstance";
import type { Container } from "dockerode";
import { getAllContainers } from "./getAllContainers";
import { Protocol } from "../utils/";

export type CreateContainerParams = {
  name: string
  runtime: string
  cmd?: Array<string>
}
export interface CreateContainerResult { }

/**
 * 创建容器
 * @date 2022-05-14
 */
export async function createContainer(params: CreateContainerParams): Promise<Protocol<Container>> {

  const allRuntimes = getContainerRunTimes();
  const config = getContainerConfig();

  const rt = allRuntimes[params.runtime];
  if (!rt) {
    return {
      success: false,
      msg: `不存在该运行时: ${params.runtime}`
    };
  }
  params.name = params.name.replace(/\W/g, "-");
  const containers = await getAllContainers();
  if (containers.find(c => c.name === params.name)) {
    return {
      success: false,
      msg: `应用已经存在 ${params.name}`
    };
  }
  const options = {
    name: `${config.containerNamePrefix}${params.name}`,
    Image: rt.image,
    AttachStdin: false,
    AttachStdout: false,
    AttachStderr: false,
    Tty: false,
    Cmd: params.cmd || [],
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
  // console.log(`create options: ${JSON.stringify(options)}`);
  const container = await docker.createContainer(options);
  return {
    success: true,
    result: container
  }
}