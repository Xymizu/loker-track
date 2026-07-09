import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { fromApi, toApi } from '../lib/jobMapper'

const JOBS_KEY = ['jobs']

export function useJobs() {
  const queryClient = useQueryClient()

  const {
    data: jobs = [],
    isLoading: loading,
    error: queryError,
    refetch: refresh,
  } = useQuery({
    queryKey: JOBS_KEY,
    queryFn: async () => {
      const { data } = await api.listJobs()
      return data.map(fromApi)
    },
  })

  const invalidate = () => queryClient.invalidateQueries({ queryKey: JOBS_KEY })

  const addMutation = useMutation({
    mutationFn: (job) => api.createJob(toApi(job)),
    onSuccess: invalidate,
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, patch }) => {
      const current = jobs.find((j) => j.id === id)
      const merged = { ...current, ...patch }
      return api.updateJob(id, toApi(merged))
    },
    onSuccess: invalidate,
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => api.deleteJob(id),
    onSuccess: invalidate,
  })

  const error =
    queryError?.message || addMutation.error?.message || updateMutation.error?.message || null

  async function addJob(job) {
    await addMutation.mutateAsync(job)
  }

  async function updateJob(id, patch) {
    await updateMutation.mutateAsync({ id, patch })
  }

  async function deleteJob(id) {
    await deleteMutation.mutateAsync(id)
  }

  return { jobs, loading, error, addJob, updateJob, deleteJob, refresh }
}
