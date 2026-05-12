import { createContext, useContext, useState, useEffect } from 'react'
import { getMe } from '../services/api'

// Step 1: Create the context (a global box that holds data)
const AuthContext = createContext()

// Step 2: Create the Provider (wraps the app and gives data to all children)
export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null)   // logged in user object
  const [loading, setLoading] = useState(true)   // checking if user is logged in

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        try {
          const res = await getMe()
          setUser(res.data.user)
        } catch {
          // Token expired or invalid — clear it
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        }
      }
      setLoading(false)
    }
    checkUser()
  }, [])

  // Called after successful login
  const login = (userData, accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    setUser(userData)
  }

  // Called on logout
  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Step 3: Custom hook so any component can use auth data easily
export const useAuth = () => useContext(AuthContext)