type PidsStats = {
  current?: number
}
type BlkioStats = {}
type StorageStats = {}
type CpuUsage = {
  totalUsage: number
  usageInKernelmode: number
  usageInUsermode: number
}

type CpuStats = {
  cpu_usage: CpuUsage
  throttlingData: ThrottlingData
}

type ThrottlingData = {
  periods: number
  throttledPeriods: number
  throttledTime: number
}
type PrecpuStats = {
  cpuUsage: CpuUsage
  throttlingData: ThrottlingData
}
type MemoryStats = {
  stats: {
    cache: number
    pgpgout: number
    rss: number
    totalMappedFile: number
    totalCache: number
  }
  maxUsage: number
  usage: number
  failcnt: number
  limit: number
}

export type ContainerStats = {
  id: string
  name: string
  read: string
  preread: string
  pidsStats: PidsStats
  blkioStats: BlkioStats
  numProcs: number
  storageStats: StorageStats
  cpuStats: CpuStats
  precpuStats: PrecpuStats
  memoryStats: MemoryStats
}
