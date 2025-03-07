import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import { API_URL } from '@env'

export const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
})

axiosInstance.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('userToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// TODO: refine error handling
export const handleApiError = (error: any) => {
  if (axios.isAxiosError(error) && error.response) {
    console.error('API error:', error.response.data)
    return error.response.data
  }
  console.error('Unexpected error:', error)
  return { error: 'Unexpected error occurred' }
}
