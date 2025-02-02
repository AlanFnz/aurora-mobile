import { useEffect, useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import { DialogType, useDialog } from '@context/dialog'
import { useFetchNoteDetailsQuery } from '@store/queries/notes.queries'
import { RootStackParamList } from '@navigation/types'
import { useNoteOperations } from '@hooks/use-note-operations'
import { useToast } from '@hooks/use-toast'
import { formatTimestampToDateTime } from '@utils/time'

export const useNoteDetailsScreen = ({
  noteId,
  isNew,
}: {
  noteId: number
  isNew?: boolean
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { showToast } = useToast()
  const { createNewNote, updateNote, deleteNote } = useNoteOperations()
  const { showDialog } = useDialog()
  const { data: note, isLoading } = useFetchNoteDetailsQuery(noteId, {
    skip: isNew,
  })

  const [title, setTitle] = useState('')
  const [modifiedDate, setModifiedDate] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setModifiedDate(formatTimestampToDateTime(note.modifiedDate))
      setContent(note.content || '')
    } else if (isNew) {
      setTitle('')
      setContent('')
      setModifiedDate('')
    }
  }, [note, isNew])

  const handleSave = async () => {
    if (isNew) {
      showDialog(
        DialogType.FolderSelection,
        async ({ folderId, newFolderName }) => {
          try {
            await createNewNote({
              title,
              content,
              folderId: folderId || null,
              newFolderName,
            })
            showToast({
              isSuccess: true,
              message: 'Note created successfully!',
            })
          } catch (error) {
            console.error(error)
            showToast({
              isSuccess: false,
              message: 'Failed to create note.',
            })
          }
        },
      )
    } else if (note) {
      try {
        await updateNote({ id: note.id, title, content })
        showToast({ isSuccess: true, message: 'Note updated successfully!' })
      } catch (error) {
        console.error(error)
        showToast({ isSuccess: false, message: 'Failed to update note.' })
      }
    }
  }

  const handleDelete = async () => {
    if (!note) return
    showDialog(
      DialogType.Confirmation,
      async () => {
        try {
          await deleteNote(note.id)
          navigation.navigate('Home')
          showToast({
            isSuccess: true,
            message: 'Note deleted successfully!',
            additionalOffset: 70,
          })
        } catch (error) {
          console.error(error)
          showToast({
            isSuccess: false,
            message: 'Failed to delete note.',
          })
        }
      },
      {
        message: 'Are you sure you want to delete this note?',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    )
  }

  return {
    title,
    modifiedDate,
    content,
    isLoading,
    setTitle,
    setContent,
    handleSave,
    handleDelete,
  }
}
