
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchDevelopers() {
  const response = await api.get('/users');
  return response.data;
}

export async function fetchDeveloper(id) {
  const response = await api.get(`/users/${id}`);
  return response.data;
}

export async function fetchDeveloperPosts(id) {
  const response = await api.get(`/users/${id}/posts`);
  return response.data;
}

export default api;
