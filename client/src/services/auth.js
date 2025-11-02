import api from './api';

export const register = (payload) => api.post('/auth/register', payload).then(r => r.data);
export const login = (payload) => api.post('/auth/login', payload).then(r => r.data);

export const saveAuth = ({ token, user }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
