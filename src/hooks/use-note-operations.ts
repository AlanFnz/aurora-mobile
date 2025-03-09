import { useQueryClient } from '@tanstack/react-query'
import { useCreateNote, useDeleteNote, useUpdateNote } from '@hooks/use-notes'

import { useCreateFolder } from './use-folders'

export const useNoteOperations = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: createNote } = useCreateNote()
  const { mutateAsync: updateNote } = useUpdateNote()
  const { mutateAsync: deleteNote } = useDeleteNote()
  const { mutateAsync: createFolder } = useCreateFolder()

  const createNewNote = async ({
    title,
    content,
    audioUrl,
    folderId,
    newFolderName,
  }: {
    title: string
    content: string
    audioUrl?: string
    folderId: number | null
    newFolderName?: string
  }) => {
    let targetFolderId = folderId

    if (!folderId && newFolderName) {
      const createdFolder = await createFolder(newFolderName)
      targetFolderId = createdFolder.id
      await queryClient.invalidateQueries({ queryKey: ['folders'] }) // refresh folder list
    }

    if (!targetFolderId)
      throw new Error('Folder ID or new folder name is required')

    const createdNote = await createNote({
      title,
      content,
      audioUrl,
      folderId: targetFolderId,
    })

    await queryClient.invalidateQueries({ queryKey: ['folders'] })

    return createdNote
  }

  const updateNoteDetails = async ({
    id,
    title,
    content,
  }: {
    id: number
    title: string
    content: string
  }) => {
    if (!id) return
    await updateNote({ id, title, content })

    await queryClient.invalidateQueries({ queryKey: ['note', id] }) // refresh note details
    await queryClient.invalidateQueries({ queryKey: ['folders'] })
  }

  const deleteNoteById = async (noteId: number) => {
    if (!noteId) return
    await deleteNote(noteId)
    await queryClient.invalidateQueries({ queryKey: ['folders'] })
  }

  return {
    createNewNote,
    updateNote: updateNoteDetails,
    deleteNote: deleteNoteById,
  }
}
