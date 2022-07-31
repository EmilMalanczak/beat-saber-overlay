import axios from 'axios'

import type { AxiosInstance, AxiosRequestConfig } from 'axios'

import { SCORESABER_URL } from 'constants/api'

const config: AxiosRequestConfig = {
  baseURL: SCORESABER_URL,
  timeout: 120_000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}

export const scoresaber: AxiosInstance = axios.create(config)
