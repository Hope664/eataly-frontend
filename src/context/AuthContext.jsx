import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  // ── On mount: restore session from token ─────────────
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        try {
          const res = await authAPI.getMe()
          // Backend returns { user: {...} } or the user object directly
          setUser(res.data.user || res.data)
        } catch {
          // Token invalid or expired and refresh failed → clear storage
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          setUser(null)
        }
      }
      setLoading(false)
    }
    restoreSession()
  }, [])

  // ── Login: called after successful POST /api/auth/login
  // Expected response shape: { accessToken, refreshToken, user }
  const login = (userData, accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    setUser(userData)
  }

  // ── Logout: clears local state + notifies backend ────
  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) await authAPI.logout(refreshToken)
    } catch {
      // Ignore logout API errors — still clear locally
    } finally {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      setUser(null)
    }
  }

  // ── Update user in context after profile edits ───────
  const updateUser = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }))
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)