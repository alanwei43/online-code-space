export interface GetContainerConfigResult {
  containerNamePrefix: string
  editorPort: number
}

/**
 * 
 * @date 2022-05-14
 */
export function getContainerConfig(): GetContainerConfigResult {
  return {
    containerNamePrefix: "app-",
    editorPort: 8080
  };
}