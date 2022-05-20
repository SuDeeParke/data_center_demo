/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import request from '../utils/request';
import { encode } from '../utils/tools';

export const login = (phone, password) => request({
  url: '/user/login',
  method: 'POST',
  data: {
    phone,
    password,
  },
});

export const register = (data) => {
  const {
    name,
    phone,
    email,
  } = data;
  const password = encode(data.password);
  return request({
    url: '/user/register',
    method: 'POST',
    data: {
      name,
      phone,
      email,
      password,
    },
  });
};
