import { axiosInstance } from './axios';

// Send code for AI review
export const reviewCode = (code, language) =>
  axiosInstance.post('/review', { code, language }).then(r => r.data);

// Get review history
export const fetchHistory = () =>
  axiosInstance.get('/review/history').then(r => r.data);

// Get one review by ID
export const fetchReview = (id) =>
  axiosInstance.get(`/review/${id}`).then(r => r.data);

// Delete a review
export const deleteReview = (id) =>
  axiosInstance.delete(`/review/${id}`).then(r => r.data);