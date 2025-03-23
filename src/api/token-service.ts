import AsyncStorage from '@react-native-async-storage/async-storage'

export const getAccessToken = async () =>
  await AsyncStorage.getItem('accessToken')

export const getRefreshToken = async () =>
  await AsyncStorage.getItem('refreshToken')

export const setAccessToken = async (token: string) =>
  await AsyncStorage.setItem('accessToken', token)

export const clearTokens = async () => {
  await AsyncStorage.removeItem('accessToken')
  await AsyncStorage.removeItem('refreshToken')
}
