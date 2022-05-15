export type GetContainerRunTimesParams = {}
export interface GetContainerRunTimesResult {
  image: string
}

/**
 * 获取运行时
 * @date 2022-05-14
 */
export function getContainerRunTimes(): Record<string, GetContainerRunTimesResult> {
  return {
    node: {
      image: 'code-server-local'
    },
    jdk: {
      image: "alanway/code-server:jdk",
    },
    ideac: {
      image: "registry.jetbrains.team/p/prj/containers/projector-idea-c",
    }
  };
}