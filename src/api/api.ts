import axios from 'axios'
import { API_URL } from '@env'

export const axiosInstance = axios.create({
  baseURL: `${API_URL}/api/users`,
  headers: { 'Content-Type': 'application/json' },
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
