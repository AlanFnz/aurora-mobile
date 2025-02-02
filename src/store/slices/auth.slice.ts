import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AppDispatch } from '@store/store'
import { API_URL } from '@env'

interface AuthState {
  isLoading: boolean
  isSignout: boolean
  userToken: string | null
}

const initialState: AuthState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    restoreToken: (state, action: PayloadAction<string | null>) => {
      state.userToken = action.payload
      state.isLoading = false
    },
    signIn: (state, action: PayloadAction<string>) => {
      state.isSignout = false
      state.userToken = action.payload
    },
    signOut: state => {
      state.isSignout = true
      state.userToken = null
    },
  },
})

export const { restoreToken, signIn, signOut } = authSlice.actions

export const bootstrapAsync = () => async (dispatch: any) => {
  let userToken = null
  try {
    userToken = await AsyncStorage.getItem('userToken')
  } catch (e) {
    console.error(e)
  }
  dispatch(restoreToken(userToken))
}

// TODO: use axios
export const performSignUp =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()
      if (!response.ok) {
        console.error('Signup error:', data)
      } else {
        console.log('Signup successful:', data)
        dispatch(signIn(data.token))
      }
    } catch (error) {
      console.error('Error during sign up:', error)
    }
  }

export const performSignIn =
  (username: string, password: string) => async (dispatch: any) => {
    const response = await fetch(`${API_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    const data = await response.json()
    if (response.ok && data.token) {
      await AsyncStorage.setItem('userToken', data.token)
      dispatch(signIn(data.token))
    } else {
      console.error('Login error:', data.error || data)
      throw new Error(data.error || 'Login failed')
    }
  }

// TODO: remove
export const performMockSignIn =
  (username: string, password: string) => async (dispatch: any) => {
    if (username === 'user' && password === 'password') {
      const userToken = 'dummy-auth-token'
      await AsyncStorage.setItem('userToken', userToken)
      dispatch(signIn(userToken))
    }
  }

export const performSignOut = () => async (dispatch: any) => {
  await AsyncStorage.removeItem('userToken')
  dispatch(signOut())
}

export default authSlice.reducer
