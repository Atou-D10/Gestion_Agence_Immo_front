import axios from '../api/axios';

export const getProperties = async () => {
  const response = await axios.get('/properties');
  return response.data;
};
