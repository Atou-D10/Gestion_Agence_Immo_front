import axios from '../api/axios';

export const login = async (credentials) => {
  const response = await axios.post('/login', credentials);
  return response.data;
};

export const register = async (data) => {
  const response = await axios.post('/register', data);
  return response.data;
};
