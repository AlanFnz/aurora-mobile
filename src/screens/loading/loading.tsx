import React from 'react'
import { ActivityIndicator } from 'react-native'

import { BackgroundLayers } from '@components/background-layers'
import colors from '@theme/colors'

import { Container } from './loading.styled'

export const Loading: React.FC = () => {
  return (
    <>
      <BackgroundLayers />
      <Container>
        <ActivityIndicator
          size="large"
          color={colors.common.offWhite}
          testID="activity-indicator"
        />
      </Container>
    </>
  )
}
