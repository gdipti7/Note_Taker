import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://note-taker-backend-59x2.onrender.com/api/notes'

export const getAllNotes = async () => {
  const response = await axios.get(API_URL, { withCredentials: true })
  return response.data
}

export const getNoteById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, { withCredentials: true })
  return response.data
}

export const createNote = async (noteData) => {
  const response = await axios.post(API_URL, noteData, { withCredentials: true })
  return response.data
}

export const updateNote = async (id, noteData) => {
  const response = await axios.put(`${API_URL}/${id}`, noteData, { withCredentials: true })
  return response.data
}

export const deleteNote = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, { withCredentials: true })
  return response.data
}