import jwtDecode from 'jwt-decode';
import moment from 'moment';

const MIN_TOKEN_LIFESPAN = 1800;

export const isToken = () => !!localStorage.getItem('access_token');

export const addToken = (data) => {
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
};

export const removeToken = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const storageToken = () => ({
  access_token: localStorage.getItem('access_token'),
  refresh_token: localStorage.getItem('refresh_token'),
});

export const getAccessToken = () => storageToken().access_token && jwtDecode(storageToken().access_token);

export const getRefreshToken = () => storageToken().refresh_token && jwtDecode(storageToken().refresh_token);

export const isTokenExpiry = () => {
  const tokenExpiry = moment.unix(getAccessToken().exp);
  return tokenExpiry.diff(moment(), 'seconds') < MIN_TOKEN_LIFESPAN;
};

export const isRefreshTokenExpiry = () => {
  const tokenExpiry = moment.unix(getRefreshToken().exp);
  return tokenExpiry.diff(moment(), 'seconds') < MIN_TOKEN_LIFESPAN;
};

export const setLocStorage = (key, val) => {
  localStorage.setItem(key, val);
};

export const getLocStorage = (key) => localStorage.getItem(key);

export const removeLocStorage = (key) => {
  localStorage.removeItem(key);
};
