import { NoteListItem } from '@screens/home/components/folder/folder.types'
import { axiosInstance, handleApiError } from '../api'

export interface Folder {
  id: number
  folderName: string
  notes: NoteListItem[]
}

export const fetchFolders = async (): Promise<Folder[] | undefined> => {
  try {
    const { data } = await axiosInstance.get('/folders')
    return data
  } catch (error) {
    return handleApiError(error)
  }
}

export const createFolder = async (
  folderName: string,
): Promise<Folder | undefined> => {
  try {
    const { data } = await axiosInstance.post('/folders', { folderName })
    return data
  } catch (error) {
    return handleApiError(error)
  }
}

export const updateFolder = async (
  folderId: number,
  folderName: string,
): Promise<Folder | undefined> => {
  try {
    const { data } = await axiosInstance.put(`/folders/${folderId}`, {
      folderName,
    })
    return data
  } catch (error) {
    return handleApiError(error)
  }
}

export const deleteFolder = async (
  folderId: number,
  cascadeDelete = false,
): Promise<{ success: true } | undefined> => {
  try {
    await axiosInstance.delete(`/folders/${folderId}`, {
      params: { cascadeDelete },
    })
    return { success: true }
  } catch (error) {
    return handleApiError(error)
  }
}
