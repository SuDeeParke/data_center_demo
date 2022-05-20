/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import request from '../utils/request';

export function login(phone, password) {
  return request({
    url: '/user/login',
    method: 'POST',
    data: {
      phone,
      password,
    },
  });
}
