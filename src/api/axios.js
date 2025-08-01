// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // ton backend Laravel
  headers: {
    Accept: 'application/json'
  }

});

export default instance;
