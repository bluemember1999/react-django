import { AUTH_DATA } from 'config/base';

export const setItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const getItem = (key) => {
  return localStorage.getItem(key);
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};

export const getAuthData = () => {
  const authData = getItem(AUTH_DATA);

  return authData ? JSON.parse(authData) : null;
};

export const setAuthData = (data) => {
  setItem(AUTH_DATA, JSON.stringify(data));
};

export const clearAuthData = () => {
  removeItem(AUTH_DATA);
};