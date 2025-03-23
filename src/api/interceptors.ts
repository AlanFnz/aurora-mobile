import axios from 'axios'

import { API_URL } from '@env'

import { signOut } from '@store/slices'
import { store } from '@store/store'

import { axiosInstance } from './axios-instance'
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from './token-service'

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

export const setupInterceptors = () => {
  axiosInstance.interceptors.request.use(async config => {
    const token = await getAccessToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  axiosInstance.interceptors.response.use(
    res => res,
    async error => {
      const originalRequest = error.config
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
            .then(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              return axiosInstance(originalRequest)
            })
            .catch(err => Promise.reject(err))
        }

        isRefreshing = true

        try {
          const refreshToken = await getRefreshToken()
          const { data } = await axios.post(`${API_URL}/api/auth/refresh`, {
            refreshToken,
          })

          await setAccessToken(data.accessToken)
          processQueue(null, data.accessToken)

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
          return axiosInstance(originalRequest)
        } catch (err) {
          processQueue(err, null)
          await clearTokens()
          store.dispatch(signOut())
          return Promise.reject(err)
        } finally {
          isRefreshing = false
        }
      }

      return Promise.reject(error)
    },
  )
}
