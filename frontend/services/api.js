import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const verifyToken = () => api.get('/auth/verify');
export const getBoards = () => api.get('/boards');
export const createBoard = (boardData) => api.post('/boards', boardData);
export const updateBoard = (id, boardData) => api.put(`/boards/${id}`, boardData);
export const deleteBoard = (id) => api.delete(`/boards/${id}`);
export const addLink = (boardId, linkData) => api.post(`/boards/${boardId}/links`, linkData);
export const updateLink = (boardId, linkId, linkData) => api.put(`/boards/${boardId}/links/${linkId}`, linkData);
export const deleteLink = (boardId, linkId) => api.delete(`/boards/${boardId}/links/${linkId}`);

export default api;