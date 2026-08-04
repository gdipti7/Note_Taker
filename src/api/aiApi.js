import axios from 'axios'

const AI_URL = 'https://note-taker-backend-59x2.onrender.com/api/ai'

export const summariseNote = async (content) => {
  const response = await axios.post(`${AI_URL}/summarise`, { content }, { withCredentials: true })
  return response.data
}