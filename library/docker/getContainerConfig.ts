export interface GetContainerConfigResult {
  containerNamePrefix: string
}

/**
 * 
 * @date 2022-05-14
 */
export function getContainerConfig(): GetContainerConfigResult {
  return {
    containerNamePrefix: "app-",
  };
}