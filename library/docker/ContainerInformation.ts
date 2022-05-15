export interface ContainerInformation {
  id: string,
  name: string
  state: string,
  ip: string,
  ports: Array<{
    ip: string,
    publicPort: number,
    privatePort: number,
    type: string
  }>,
  data?: any,
}

