import { axiosInstance, handleApiError } from '../api'

export const fetchFolders = async () => {
  try {
    const { data } = await axiosInstance.get('/folders')
    return data
  } catch (error) {
    return handleApiError(error)
  }
}

export const createFolder = async (folderName: string) => {
  try {
    const { data } = await axiosInstance.post('/folders', { folderName })
    return data
  } catch (error) {
    return handleApiError(error)
  }
}

export const deleteFolder = async (folderId: number) => {
  try {
    await axiosInstance.delete(`/folders/${folderId}`)
    return { success: true }
  } catch (error) {
    return handleApiError(error)
  }
}
