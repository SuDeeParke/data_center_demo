import axios from 'axios';

const URL = process.env.VUE_APP_API ? process.env.VUE_APP_API : '/none';

const request = axios.create({
  baseURL: URL,
  timeout: 5000,
});

export default request;
