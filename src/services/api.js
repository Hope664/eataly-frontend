import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// ── Axios instance ──────────────────────────────────────
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// ── Request interceptor: attach Bearer token ────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response interceptor: handle 401 + token refresh ───
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config

    // If 401 and we haven't retried yet
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) throw new Error('No refresh token')

        const { data } = await axios.post(`${BASE_URL}/api/auth/refresh`, {
          refreshToken,
        })

        localStorage.setItem('accessToken', data.accessToken)
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken)
        }

        original.headers.Authorization = `Bearer ${data.accessToken}`
        return api(original)
      } catch {
        // Refresh failed — clear storage and redirect to login
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

// ── Auth ────────────────────────────────────────────────
export const authAPI = {
  register: (data)          => api.post('/api/auth/register', data),
  login:    (data)          => api.post('/api/auth/login', data),
  logout:   (refreshToken)  => api.post('/api/auth/logout', { refreshToken }),
  getMe:    ()              => api.get('/api/auth/me'),
  updateProfile: (data)     => api.put('/api/auth/update-profile', data),
  changePassword: (data)    => api.put('/api/auth/change-password', data),
}

export const loginUser = (data) => authAPI.login(data)
export const registerUser = (data) => authAPI.register(data)

// ── Restaurants ─────────────────────────────────────────
export const restaurantAPI = {
  getAll:       (params)    => api.get('/api/restaurants', { params }),
  getOne:       (id)        => api.get(`/api/restaurants/${id}`),
  getMyRestaurant: ()       => api.get('/api/restaurants/owner/my-restaurant'),
  create:       (data)      => api.post('/api/restaurants', data),
  update:       (id, data)  => api.put(`/api/restaurants/${id}`, data),
  delete:       (id)        => api.delete(`/api/restaurants/${id}`),
  uploadCover:  (id, file)  => {
    const form = new FormData()
    form.append('image', file)
    return api.post(`/api/restaurants/${id}/cover-image`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  uploadLogo: (id, file) => {
    const form = new FormData()
    form.append('image', file)
    return api.post(`/api/restaurants/${id}/logo`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}

// ── Menu ────────────────────────────────────────────────
export const menuAPI = {
  getByRestaurant: (restaurantId, params) =>
    api.get(`/api/menu/${restaurantId}`, { params }),
  getOne:       (id)         => api.get(`/api/menu/item/${id}`),
  createMenu:   (restaurantId) =>
    api.post(`/api/menu/${restaurantId}`),
  addCategory:  (restaurantId, data) =>
    api.post(`/api/menu/${restaurantId}/categories`, data),
  addItem:      (restaurantId, categoryId, data) =>
    api.post(`/api/menu/${restaurantId}/categories/${categoryId}/items`, data),
  updateItem:   (restaurantId, categoryId, itemId, data) =>
    api.put(`/api/menu/${restaurantId}/categories/${categoryId}/items/${itemId}`, data),
  deleteItem:   (restaurantId, categoryId, itemId) =>
    api.delete(`/api/menu/${restaurantId}/categories/${categoryId}/items/${itemId}`),
  uploadItemImage: (restaurantId, categoryId, itemId, file) => {
    const form = new FormData()
    form.append('image', file)
    return api.post(`/api/menu/${restaurantId}/categories/${categoryId}/items/${itemId}/image`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}

// ── Orders ──────────────────────────────────────────────
export const orderAPI = {
  getMyOrders:     ()             => api.get('/api/orders/my-orders'),
  getRestaurantOrders: (restaurantId, params) =>
    api.get(`/api/orders/restaurant/${restaurantId}`, { params }),
  getOne:     (id)        => api.get(`/api/orders/${id}`),
  create:     (restaurantId, data) =>
    api.post(`/api/orders/${restaurantId}`, data),
  update:     (id, data)  => api.put(`/api/orders/${id}`, data),
  updateStatus: (id, status) => api.patch(`/api/orders/${id}/status`, { status }),
}

// ── Bookings ────────────────────────────────────────────
export const bookingAPI = {
  getMyBookings:     ()             => api.get('/api/bookings/my-bookings'),
  getRestaurantBookings: (restaurantId, params) =>
    api.get(`/api/bookings/restaurant/${restaurantId}`, { params }),
  getOne:     (id)        => api.get(`/api/bookings/${id}`),
  create:     (restaurantId, data) =>
    api.post(`/api/bookings/${restaurantId}`, data),
  updateStatus: (bookingId, status) =>
    api.put(`/api/bookings/${bookingId}/status`, { status }),
  cancel:     (bookingId) =>
    api.put(`/api/bookings/${bookingId}/cancel`),
}

export default api