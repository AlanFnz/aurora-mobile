import { createFolder, deleteFolder, fetchFolders } from '@services/folder'
import { AppDispatch } from '@store/store'
import { addFolder, removeFolder, setFolders } from '@store/slices'

export const performFetchFolders = () => async (dispatch: AppDispatch) => {
  const folders = await fetchFolders()
  if (folders) {
    dispatch(setFolders(folders))
  }
}

export const performCreateFolder =
  (folderName: string) => async (dispatch: AppDispatch) => {
    const newFolder = await createFolder(folderName)
    if (newFolder) {
      dispatch(addFolder(newFolder))
    }
  }

export const performDeleteFolder =
  (folderId: number) => async (dispatch: AppDispatch) => {
    const result = await deleteFolder(folderId)
    if (result.success) {
      dispatch(removeFolder(folderId))
    }
  }
