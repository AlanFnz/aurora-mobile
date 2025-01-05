import React from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '@store/index'
import { performSignOut } from '@store/auth.slice'
import BackgroundLayers from '@components/background-layers'

import { Container, SignOutButton, SignOutText, Title } from './styles'

const Settings: React.FC = () => {
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

export default Settings
