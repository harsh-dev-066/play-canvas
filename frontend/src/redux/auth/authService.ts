import axios from 'axios';
import { deleteAllCookies, getCookie, setCookie } from '../../utils/cookieHelper';
import { deleteOneLocalStorage, setSessionStorage } from '../../utils/StorageHelper';
// This file is responsible for sending/receiving http requests
const token = getCookie('token');

const AUTH_URL = `${process.env.REACT_APP_SERVER_URL}/auth/`;
const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/server/`;

// Register User Service
const register = async (userData: object) => {
  const response = await axios.post(AUTH_URL + 'register', userData);
  // If response.data is received, save to local storage

  return response.data;
};

// Logout User Service
const logout = async (payload: Record<string, any>) => {
  console.log({ payload });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.get(AUTH_URL + 'logout', config);
  deleteAllCookies();
  deleteOneLocalStorage('user');
  await payload.cb();
};

// Login User Service
const login = async (userData: Record<string, any>) => {
  const response: any = await axios.post(AUTH_URL + 'login', userData);
  const data: Record<string, any> = response.data.result;

  if (response.data.status === 200) {
    data.token && setCookie('token', data.token);
    setSessionStorage('user', { email: data.email, name: data.name });
  }
  console.log('response.data', response.data);

  return response.data;
};

// Server availability check
const checkServer = async () => {
  const response = await axios.get(SERVER_URL + 'check');
  return response.data;
};

const authService = {
  register,
  logout,
  login,
  checkServer,
};

export default authService;
