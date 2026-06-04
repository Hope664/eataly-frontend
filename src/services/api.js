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
  getOne:   (id)        => api.get(`/api/menu/item/${id}`),
  create:   (data)      => api.post('/api/menu', data),
  update:   (id, data)  => api.put(`/api/menu/${id}`, data),
  delete:   (id)        => api.delete(`/api/menu/${id}`),
}

// ── Orders ──────────────────────────────────────────────
export const orderAPI = {
  getAll:     (params)      => api.get('/api/orders', { params }),
  getOne:     (id)          => api.get(`/api/orders/${id}`),
  create:     (data)        => api.post('/api/orders', data),
  update:     (id, data)    => api.put(`/api/orders/${id}`, data),
  updateStatus: (id, status) => api.patch(`/api/orders/${id}/status`, { status }),
}

// ── Bookings ────────────────────────────────────────────
export const bookingAPI = {
  getAll:   (params)        => api.get('/api/bookings', { params }),
  getOne:   (id)            => api.get(`/api/bookings/${id}`),
  create:   (data)          => api.post('/api/bookings', data),
  update:   (id, data)      => api.put(`/api/bookings/${id}`, data),
  cancel:   (id)            => api.patch(`/api/bookings/${id}/cancel`),
}

export default api