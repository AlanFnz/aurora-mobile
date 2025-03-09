import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '@store/.'
import { bootstrapAsync } from '@store/slices'

const AppInitializer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(bootstrapAsync())
  }, [dispatch])

  return null
}

export default AppInitializer
