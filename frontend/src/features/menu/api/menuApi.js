import axios from 'axios';

const api = axios.create({
  baseURL: '/api/menu-items',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllMenuItems = () => api.get('/');
export const getAvailableMenuItems = () => api.get('/available');
export const getMenuItem = (id) => api.get(`/${id}`);
export const createMenuItem = (item) => api.post('/', item);
export const updateMenuItem = (id, item) => api.put(`/${id}`, item);
export const deleteMenuItem = (id) => api.delete(`/${id}`);

export default {
  getAllMenuItems,
  getAvailableMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};

