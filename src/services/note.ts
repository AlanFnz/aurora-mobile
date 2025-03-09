import { axiosInstance } from '../api'

export interface Note {
  id: number
  title: string
  content?: string
  audioUrl?: string
  folderId: number
  modifiedDate: number
}

export const fetchNoteById = async (noteId: number): Promise<Note> => {
  const { data } = await axiosInstance.get(`/notes/${noteId}`)
  return data
}

export const createNote = async (
  note: Omit<Note, 'id' | 'modifiedDate'>,
): Promise<Note> => {
  const { data } = await axiosInstance.post('/notes', note)
  return data
}

export const updateNote = async (
  note: Partial<Note> & { id: number },
): Promise<Note> => {
  const { data } = await axiosInstance.put(`/notes/${note.id}`, note)
  return data
}

export const deleteNote = async (noteId: number) => {
  await axiosInstance.delete(`/notes/${noteId}`)
  return { success: true }
}
