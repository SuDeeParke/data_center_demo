import axios from 'axios';

const URL = process.env.VUE_APP_API;

const request = axios.create({
  baseURL: URL,
  timeout: 5000,
});

export default request;
