import axios from 'axios';

// Single configured Axios client - every network call in the app goes through this.
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Converts any Axios error into a friendly, human readable message.
export function getErrorMessage(error) {
  if (error?.code === 'ECONNABORTED') {
    return 'The request timed out. Please check your connection and try again.';
  }
  if (error?.response) {
    const { status } = error.response;
    if (status === 404) return 'We could not find what you were looking for (404).';
    if (status >= 500) return `The server ran into a problem (${status}). Please try again shortly.`;
    return `The request failed with status ${status}.`;
  }
  if (error?.request) {
    return 'Network error. Please check your internet connection.';
  }
  return error?.message || 'Something went wrong.';
}

export default apiClient;
