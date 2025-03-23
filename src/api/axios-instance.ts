import axios from 'axios'

import { API_URL } from '@env'

export const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
})
