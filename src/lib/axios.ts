import axios from 'axios'
export const api = axios.create({
  baseURL: '/api',
})

export const apiFasitify = axios.create({
  baseURL: 'http://localhost:8080',
})
