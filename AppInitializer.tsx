import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@store/index'
import { bootstrapAsync } from '@store/authSlice'
import { setFolders } from '@store/foldersSlice'
import foldersMockData from '@store/mockData/folders.mockData'

const AppInitializer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(bootstrapAsync())
    dispatch(setFolders(foldersMockData))
  }, [dispatch])

  return null
}

export default AppInitializer
