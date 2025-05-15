import axios from 'axios'

const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
