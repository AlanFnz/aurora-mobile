import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AppDispatch } from '@store/store'
import { axiosInstance, handleApiError } from '@api/index'

interface AuthState {
  isLoading: boolean
  isSignout: boolean
  accessToken: string | null
  refreshToken: string | null
}

const initialState: AuthState = {
  isLoading: true,
  isSignout: false,
  accessToken: null,
  refreshToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    restoreToken: (
      state,
      action: PayloadAction<{
        accessToken: string | null
        refreshToken: string | null
      }>,
    ) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.isLoading = false
    },
    signIn: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>,
    ) => {
      state.isSignout = false
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    signOut: state => {
      state.isSignout = true
      state.accessToken = null
      state.refreshToken = null
    },
  },
})

export const { restoreToken, signIn, signOut } = authSlice.actions

export const bootstrapAsync = () => async (dispatch: any) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken')
    const refreshToken = await AsyncStorage.getItem('refreshToken')
    dispatch(restoreToken({ accessToken, refreshToken }))
  } catch (e) {
    console.error(e)
    dispatch(restoreToken({ accessToken: null, refreshToken: null }))
  }
}

export const performSignUp =
  ({ username, password }: { username: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      await axiosInstance.post('users/register', { username, password })
      dispatch(performSignIn({ username, password }))
    } catch (error) {
      handleApiError(error)
      cleanup()
    }
  }

export const performSignIn =
  ({ username, password }: { username: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      const { data } = await axiosInstance.post('auth/login', {
        username,
        password,
      })
      if (data.accessToken && data.refreshToken) {
        await AsyncStorage.setItem('accessToken', data.accessToken)
        await AsyncStorage.setItem('refreshToken', data.refreshToken)

        dispatch(
          signIn({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          }),
        )
      }
    } catch (error) {
      handleApiError(error)
      cleanup()
    }
  }

export const performSignOut = () => async (dispatch: any) => {
  await AsyncStorage.removeItem('accessToken')
  await AsyncStorage.removeItem('refreshToken')
  dispatch(signOut())
}

const cleanup = () => async (dispatch: any) => {
  await AsyncStorage.removeItem('accessToken')
  await AsyncStorage.removeItem('refreshToken')
  dispatch(signOut())
}

export default authSlice.reducer
