import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/FontAwesome'

// Store
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@store/store'
import { bootstrapAsync } from '@store/slices/auth.slice'
import { tabNavigatorStyles } from '@navigation/tab-navigator.styles'
import { RootStackParamList } from './types'

// Screens
import { SignIn } from '@screens/sign-in'
import { SignUp } from '@screens/sign-up'
import { Home } from '@screens/home'
import { Settings } from '@screens/settings'
import { NoteDetails } from '@screens/note-details'

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
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, userToken } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(bootstrapAsync())
  }, [dispatch])

  if (isLoading) {
    return <></>
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken == null ? (
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
