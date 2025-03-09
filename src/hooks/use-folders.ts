import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchFolders, createFolder, deleteFolder } from '@services/folder'

export const useFetchFolders = () => {
  return useQuery({
    queryKey: ['folders'],
    queryFn: fetchFolders,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })
}

export const useCreateFolder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] })
    },
  })
}

export const useDeleteFolder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] })
    },
  })
}
