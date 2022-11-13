import axios, { requestWithoutErrorToast } from 'helpers/axios';
import type { Type_LoginRequest, Type_LoginResult } from './types/auth';

type LoginFn = (params: Type_LoginRequest) => Promise<Type_LoginResult>;

const login: LoginFn = ({ phone, password }) => {
  return requestWithoutErrorToast({
    url: '/login/cellphone',
    params: {
      phone,
      password,
    },
  });
};

const logout = () => {
  return axios({
    method: 'post',
    url: '/logout',
  });
};

export default {
  login,
  logout,
};
