import axios from 'axios'

// TODO: refine error handling
export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
    console.error('API error:', error.response.data)
    throw new Error(error.response.data?.error || 'API request failed')
  }
  console.error('Unexpected error:', error)
  throw new Error('Unexpected error occurred')
}
