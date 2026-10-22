import api from './api.js';

export const getPostsByUser = async (userId) => {
  const { data } = await api.get('/posts', { params: { userId } });
  return data;
};

export const createPost = async (payload) => {
  const res = await api.post('/posts', payload);
  return res; // status 201 Created
};