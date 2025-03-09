import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchNoteById,
  createNote,
  updateNote,
  deleteNote,
  Note,
} from '@services/note'

export const useFetchNote = (noteId?: number, isNew?: boolean) => {
  return useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId!),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    enabled: !!noteId && !isNew,
  })
}

export const useCreateNote = () => {
  const queryClient = useQueryClient()
  return useMutation<Note, Error, Omit<Note, 'id' | 'modifiedDate'>>({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}

export const useUpdateNote = () => {
  const queryClient = useQueryClient()
  return useMutation<Note, Error, Partial<Note> & { id: number }>({
    mutationFn: updateNote,
    onSuccess: updatedNote => {
      queryClient.setQueryData(['note', updatedNote.id], updatedNote)
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}

export const useDeleteNote = () => {
  const queryClient = useQueryClient()
  return useMutation<{ success: boolean }, Error, number>({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}
