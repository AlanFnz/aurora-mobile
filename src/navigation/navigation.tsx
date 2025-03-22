import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

// Store
import { tabNavigatorStyles } from '@navigation/tab-navigator.styles'
import { RootState } from '@store/store'
import { useSelector } from 'react-redux'
import { RootStackParamList } from './types'

// Screens
import { Home } from '@screens/home'
import { NoteDetails } from '@screens/note-details'
import { Settings } from '@screens/settings'
import { SignIn } from '@screens/sign-in'
import { SignUp } from '@screens/sign-up'

const Stack = createStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NoteDetails" component={NoteDetails} />
    </Stack.Navigator>
  )
}

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={tabNavigatorStyles}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={18} />
          ),
        }}
      />

      <Tab.Screen
        name="SettingsTab"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={18} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export function Navigation() {
  const { isLoading, accessToken } = useSelector(
    (state: RootState) => state.auth,
  )

  if (isLoading) return <></> // TODO: add activity indicator or something

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {accessToken == null ? (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ title: 'Sign in', headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ title: 'Sign Up', headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen name="AuthStack" component={HomeTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
