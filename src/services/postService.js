import apiClient from './api';

export const getUsers = () => apiClient.get('/users').then((res) => res.data);

export const getUserById = (id) =>
  apiClient.get(`/users/${id}`).then((res) => res.data);

export const getPostsByUser = (id) =>
  apiClient.get('/posts', { params: { userId: id } }).then((res) => res.data);

export const getAllPosts = () => apiClient.get('/posts').then((res) => res.data);

// Returns the full axios response so the caller can check for status 201.
export const createPost = (payload) => apiClient.post('/posts', payload);
