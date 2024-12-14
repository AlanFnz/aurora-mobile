import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@store/index'
import { bootstrapAsync } from '@store/auth.slice'
import { setFolders } from '@store/folders.slice'
import foldersMockData from '@store/mocks/folders.mocks'

const AppInitializer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(bootstrapAsync())
    dispatch(setFolders(foldersMockData))
  }, [dispatch])

  return null
}

export default AppInitializer
