export type GetContainerRunTimesParams = {}
export interface GetContainerRunTimesResult {
  image: string
  description: string
  allowGit: boolean
}

/**
 * 获取运行时
 * @date 2022-05-14
 */
export function getContainerRuntimes(): Record<string, GetContainerRunTimesResult> {
  return {
    node: {
      image: 'code-server-local',
      description: `Visual Studio Code`,
      allowGit: true
    },
    // jdk: {
    //   image: "alanway/code-server:jdk",
    // },
    ideac: {
      // image: "registry.jetbrains.team/p/prj/containers/projector-idea-c",
      image: "ideac",
      description: "IDEA Community",
      allowGit: true
    },
    pycharmc: {
      image: "registry.jetbrains.team/p/prj/containers/projector-pycharm-c",
      description: "Pycharm Community",
      allowGit: false
    },
    webstorm: {
      image: "registry.jetbrains.team/p/prj/containers/projector-webstorm",
      description: "WebStorm",
      allowGit: false
    }
  };
}

export type GetContainerRuntimesItem = GetContainerRunTimesResult & { id: string };
export function getContainerRuntimesList(): Array<GetContainerRuntimesItem> {
  const runtimes = getContainerRuntimes();
  return Object.keys(runtimes).map(key => ({
    id: key,
    ...runtimes[key]
  }));
}