export type Port = {
  iP: string
  privatePort: number
  publicPort: number
  type: string
}

export type Labels = {
  [key: string]: string
}

export type HostConfig = {
  networkMode: string
}

export type Network = {
  networkID: string
  endpointID: string
  gateway: string
  iPAddress: string
  iPPrefixLen: number
  iPv6Gateway: string
  globalIPv6Address: string
  globalIPv6PrefixLen: number
  macAddress: string
}

export type Networks = {
  [key: string]: Networks
}

export type NetworkSettings = {
  networks: Networks
}

export type Mount = {
  type: string
  source: string
  destination: string
  mode: string
  rW: boolean
  propagation: string
}

export type DockerContainer = {
  id: string
  names: string[]
  image: string
  imageID: string
  command: string
  created: number
  ports: Port[]
  labels: Labels
  state: string
  status: string
  hostConfig: HostConfig
  networkSettings: NetworkSettings
  mounts: Mount[]
}
