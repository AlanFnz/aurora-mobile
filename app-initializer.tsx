import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '@store/.'
import { bootstrapAsync, setFolders } from '@store/slices'
import { foldersMockData } from '@store/mocks'

const AppInitializer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(bootstrapAsync())
    dispatch(setFolders(foldersMockData))
  }, [dispatch])

  return null
}

export default AppInitializer
