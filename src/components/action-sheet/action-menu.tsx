import { Text } from 'react-native'
import React, { forwardRef } from 'react'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet'

import { NoiseLayer } from '@components/noise-layer'

import { BodyContainer, DialogContainer } from './action-menu.styled'

export const ActionMenu = forwardRef<ActionSheetRef>((props, ref) => {
  return (
    <ActionSheet
      containerStyle={{ backgroundColor: 'transparent', width: '100%' }}
      ref={ref}>
      <DialogContainer>
        <NoiseLayer opacity={0.15} customStyle={{ borderRadius: 10 }} />
        <BodyContainer>
          <Text style={{ color: 'white' }}>Test</Text>
          <Text style={{ color: 'white' }}>Test</Text>
          <Text style={{ color: 'white' }}>Test</Text>
          <Text style={{ color: 'white' }}>Test</Text>
          <Text style={{ color: 'white' }}>Test</Text>
          <Text style={{ color: 'white' }}>Test</Text>
          <Text style={{ color: 'white' }}>Test</Text>
        </BodyContainer>
      </DialogContainer>
    </ActionSheet>
  )
})

ActionMenu.displayName = 'ActionMenu'
