export interface GetConfig {
  adminUrl: string
}

/**
 * 
 * @date 2022-05-15
 */
export function getConfig(): GetConfig {
  return {
    adminUrl: "http://localhost:2019"
  };
}