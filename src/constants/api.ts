import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export const BEATSAVER_URL = 'https://api.beatsaver.com'
export const SCORESABER_URL = 'https://scoresaber.com/api'

export const HTTPStatus = {
  port: '6557',
  entry: '/socket'
}

export const DEFAULT_IP = '127.0.0.1'

export const CONNECTION_RECONNECT_TIME = 3000

const config: AxiosRequestConfig = {
  baseURL: '/api',
  timeout: 120_000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}

export const api: AxiosInstance = axios.create(config)
