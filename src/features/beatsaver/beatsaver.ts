import axios from 'axios'

import type { AxiosInstance, AxiosRequestConfig } from 'axios'

import { BEATSAVER_URL } from 'constants/api'

const config: AxiosRequestConfig = {
  baseURL: BEATSAVER_URL,
  timeout: 120_000,
  headers: {
    'Content-Type': 'application/json'
  }
}

export const beatsaver: AxiosInstance = axios.create(config)
