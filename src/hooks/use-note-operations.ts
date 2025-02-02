import { useDispatch, useSelector } from 'react-redux'

import {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from '@store/queries/notes.queries'
import { RootState } from '@store/store'
import {
  addFolder,
  addNoteToFolder,
  setFolders,
} from '@store/slices/folders.slice'
import { useCreateFolderMutation } from '@store/queries/folders.queries'

export const useNoteOperations = () => {
  const dispatch = useDispatch()
  const folders = useSelector((state: RootState) => state.folders)

  const [createNote] = useCreateNoteMutation()
  const [updateNoteMutation] = useUpdateNoteMutation()
  const [deleteNoteMutation] = useDeleteNoteMutation()

  const [createFolder] = useCreateFolderMutation()

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
      const createdFolder = await createFolder({
        folderName: newFolderName,
      }).unwrap()
      targetFolderId = createdFolder.id

      dispatch(
        addFolder({
          id: createdFolder.id,
          folderName: createdFolder.folderName,
          notes: [],
        }),
      )
    }

    if (!targetFolderId)
      throw new Error('Folder ID or new folder name is required')

    const createdNote = await createNote({
      title,
      content,
      audioUrl,
      folderId: targetFolderId,
    }).unwrap()

    dispatch(
      addNoteToFolder({
        folderId: targetFolderId,
        note: {
          id: createdNote.id,
          title: createdNote.title,
          snippet: createdNote.content ? createdNote.content.slice(0, 50) : '',
          modifiedDate: createdNote.modifiedDate,
        },
      }),
    )

    return createdNote
  }

  const updateNote = async ({
    id,
    title,
    content,
  }: {
    id: number
    title: string
    content: string
  }) => {
    if (!id) return
    const updatedNote = await updateNoteMutation({
      id,
      title,
      content,
    }).unwrap()

    const updatedFolders = folders.map(folder => ({
      ...folder,
      notes: folder.notes.map(note =>
        note.id === id
          ? {
              ...note,
              title: updatedNote.title,
              snippet: updatedNote.content
                ? updatedNote.content.slice(0, 50)
                : '',
              modifiedDate: updatedNote.modifiedDate,
            }
          : note,
      ),
    }))

    dispatch(setFolders(updatedFolders))

    return updatedNote
  }

  const deleteNote = async (noteId: number) => {
    if (!noteId) return
    await deleteNoteMutation(noteId)

    const updatedFolders = folders.map(folder => ({
      ...folder,
      notes: folder.notes.filter(note => note.id !== noteId),
    }))

    dispatch(setFolders(updatedFolders))
  }

  return { createNewNote, updateNote, deleteNote }
}
