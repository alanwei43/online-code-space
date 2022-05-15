export type GetContainerRunTimesParams = {}
export interface GetContainerRunTimesResult {
  image: string
  cmd: Array<string>
}

/**
 * 获取运行时
 * @date 2022-05-14
 */
export function getContainerRunTimes(): Record<string, GetContainerRunTimesResult> {
  return {
    node: {
      image: 'alanway/code-server:node',
      cmd: ["code-server", "--bind-addr", "0.0.0.0:8080", "--auth", "none"]
    },
    jdk: {
      image: "alanway/code-server:jdk",
      cmd: ["code-server", "--bind-addr", "0.0.0.0:8080", "--auth", "none"]
    },
    ideac: {
      image: "registry.jetbrains.team/p/prj/containers/projector-idea-c",
      cmd: []
    }
  };
}