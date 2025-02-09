import React from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '@store/store'
import { performSignOut } from '@store/slices/auth.slice'
import { BackgroundLayers } from '@components/background-layers'

import { Container, SignOutButton, SignOutText, Title } from './styles'

export const Settings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  const handleSignOut = () => {
    dispatch(performSignOut())
  }

  return (
    <>
      <BackgroundLayers />
      <Container>
        <Title>Settings</Title>
        <SignOutButton onPress={handleSignOut}>
          <SignOutText>Sign Out</SignOutText>
        </SignOutButton>
      </Container>
    </>
  )
}
