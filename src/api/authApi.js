import axios from "axios";

const AUTH_URL = "http://localhost:5000/auth";

export const registerUser = async (formData) => {
  const response = await axios.post(`${AUTH_URL}/register`, formData);
  return response.data;
};

export const loginUser = async (formData) => {
  const response = await axios.post(`${AUTH_URL}/login`, formData);
  return response.data;
};