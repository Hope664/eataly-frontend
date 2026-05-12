import axios from 'axios'

// Base URL from .env file
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Automatically attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ── Auth ──────────────────────────────────────
export const registerUser = (data) => API.post('/auth/register', data)
export const loginUser    = (data) => API.post('/auth/login', data)
export const getMe        = ()     => API.get('/auth/me')
export const logoutUser   = (data) => API.post('/auth/logout', data)

// ── Restaurant ───────────────────────────────
export const createRestaurant  = (data) => API.post('/restaurants', data)
export const getMyRestaurant   = ()     => API.get('/restaurants/owner/my-restaurant')
export const updateRestaurant  = (id, data) => API.put(`/restaurants/${id}`, data)

// ── Menu ─────────────────────────────────────
export const getMenu        = (restaurantId) => API.get(`/menu/${restaurantId}`)
export const createMenu     = (restaurantId) => API.post(`/menu/${restaurantId}`)
export const addCategory    = (restaurantId, data) => API.post(`/menu/${restaurantId}/categories`, data)
export const addMenuItem    = (restaurantId, categoryId, data) =>
  API.post(`/menu/${restaurantId}/categories/${categoryId}/items`, data)

// ── Bookings ──────────────────────────────────
export const getRestaurantBookings = (restaurantId, params) =>
  API.get(`/bookings/restaurant/${restaurantId}`, { params })
export const updateBookingStatus = (bookingId, data) =>
  API.put(`/bookings/${bookingId}/status`, data)

// ── Orders ───────────────────────────────────
export const getRestaurantOrders = (restaurantId, params) =>
  API.get(`/orders/restaurant/${restaurantId}`, { params })
export const updateOrderStatus = (orderId, data) =>
  API.put(`/orders/${orderId}/status`, data)

export default API