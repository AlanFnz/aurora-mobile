import React, { useEffect } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '@store/.'
import { bootstrapAsync } from '@store/slices'

const AppInitializer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(bootstrapAsync())

    const subscription = AppState.addEventListener(
      'change',
      (state: AppStateStatus) => {
        if (state === 'active') {
          dispatch(bootstrapAsync())
        }
      },
    )

    return () => {
      subscription.remove()
    }
  }, [dispatch])

  return null
}

export default AppInitializer
