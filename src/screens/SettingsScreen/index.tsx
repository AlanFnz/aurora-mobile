import React from 'react'
import BackgroundLayers from '@root/src/components/BackgroundLayers'
import { performSignOut } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { Container, SignOutButton, SignOutText, Title } from './styles'

const SettingsScreen: React.FC = () => {
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

export default SettingsScreen
