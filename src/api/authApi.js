import axios from 'axios'

const API_URL = '/auth'

export const registerUser = async (formData) => {
  const response = await axios.post(`${API_URL}/register`, formData, { withCredentials: true })
  return response.data
}

export const loginUser = async (formData) => {
  const response = await axios.post(`${API_URL}/login`, formData, { withCredentials: true })
  return response.data
}