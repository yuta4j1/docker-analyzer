import useSWR, { mutate } from 'swr'
import type { DockerContainer } from '../types/docker/container'

export function useContainerList() {
  const { data, error } = useSWR('/containers', async () => {
    return window.dockerApi.get<DockerContainer[]>({
      url: 'containers/json?all=1',
    })
  })

  return {
    data,
    error,
    isLoading: !error && !data,
    mutate: () => mutate('/containers'),
  }
}
