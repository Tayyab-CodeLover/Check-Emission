// src/services/authService.js
import axios from "axios";

const API_URL = "YOUR_API_BASE_URL";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

export const signup = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Signup failed";
  }
};
