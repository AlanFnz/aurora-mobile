import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AppDispatch } from '@store/store'
import { axiosInstance, handleApiError } from '@api/api'

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

export const performSignUp =
  ({ username, password }: { username: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      await axiosInstance.post('users/register', { username, password })
      dispatch(performSignIn({ username, password }))
    } catch (error) {
      handleApiError(error)
    }
  }

export const performSignIn =
  ({ username, password }: { username: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      const { data } = await axiosInstance.post('users/login', {
        username,
        password,
      })
      if (data.token) {
        await AsyncStorage.setItem('userToken', data.token)
        dispatch(signIn(data.token))
      }
    } catch (error) {
      handleApiError(error)
    }
  }

export const performSignOut = () => async (dispatch: any) => {
  await AsyncStorage.removeItem('userToken')
  dispatch(signOut())
}

export default authSlice.reducer
