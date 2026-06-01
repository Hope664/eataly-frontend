import { createContext, useContext, useState, useEffect } from 'react'
// import { getMe } from '../services/api'  // ← commented out until backend is ready

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        try {
          // const res = await getMe()   // ← commented out until backend is ready
          // setUser(res.data.user)      // ← commented out until backend is ready
        } catch {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        }
      }
      setLoading(false)
    }
    checkUser()
  }, [])

  const login = (userData, accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    setUser(userData)
  }

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

export const useAuth = () => useContext(AuthContext)