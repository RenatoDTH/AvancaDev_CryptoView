import axios from 'axios';

const apiKey = process.env.API_KEY;

const api = axios.create({
  baseURL: 'https://min-api.cryptocompare.com/data',
  headers: {
    authorization: `Apikey ${apiKey}`,
  },
});

export default api;
