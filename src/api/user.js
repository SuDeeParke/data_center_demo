/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import request from '../utils/request';

export const login = (phone, password) => request({
  url: '/user/login',
  method: 'POST',
  data: {
    phone,
    password,
  },
});

export const register = (data) => request({
  url: '/user/register',
  method: 'POST',
  data: {
    ...data,
  },
});
