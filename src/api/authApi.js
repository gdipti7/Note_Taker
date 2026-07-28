import axios from 'axios'


const AUTH_URL = 'https://note-taker-backend-59x2.onrender.com/auth'

export const registerUser = async (formData) => {
  const response = await axios.post(`${AUTH_URL}/register`, formData, { withCredentials: true })
  return response.data
}

export const loginUser = async (formData) => {
  const response = await axios.post(`${AUTH_URL}/login`, formData, { withCredentials: true })
  return response.data
}