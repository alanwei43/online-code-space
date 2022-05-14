import { getDockerInstance } from "./getDockerInstance";
import { ContainerInfo } from "./ContainerInfo";
import { getContainerConfig } from "./getContainerConfig";

export type GetAllContainersResult = Array<ContainerInfo>

export type GetAllContainersParams = {
  refresh?: boolean
}
export type GetAllContainersDef = {
  (refresh?: boolean): Promise<GetAllContainersResult>
  __cache?: GetAllContainersResult
}

/**
 * 获取所有运行实例
 * @date 2022-05-14
 */
export const getAllContainers: GetAllContainersDef = async function (refresh?: boolean): Promise<GetAllContainersResult> {
  if (getAllContainers.__cache && refresh !== true) {
    return getAllContainers.__cache;
  }

  const docker = getDockerInstance();
  const options: {} = {
    all: true
  };
  const config = getContainerConfig();
  const containers = await docker.listContainers(options)
  getAllContainers.__cache = containers.filter(container => container.Names[0].startsWith("/" + config.containerNamePrefix))
    .map(container => {
      const name = container.Names[0].substring(config.containerNamePrefix.length + 1);
      const ip = (container.NetworkSettings.Networks["bridge"] || {}).IPAddress;
      const ports = (container.Ports || []).map(p => ({
        ip: p.IP,
        publicPort: p.PublicPort,
        privatePort: p.PrivatePort,
        type: p.Type
      }));
      const c: ContainerInfo = {
        id: container.Id,
        name: name,
        state: container.State,
        ip: ip,
        ports: ports
      };
      return c;
    });
  return getAllContainers.__cache;
}