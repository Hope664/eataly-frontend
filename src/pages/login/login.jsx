import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { loginUser } from '../../services/api'
import './login.css'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please fill in all fields')
      return
    }
    setLoading(true)
    try {
      const res = await loginUser({ email: form.email, password: form.password })
      const { user, accessToken, refreshToken } = res.data
      if (user.role !== 'restaurant_owner') {
        setError('This portal is for restaurant owners only')
        setLoading(false)
        return
      }
      login(user, accessToken, refreshToken)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrapper">

      {/* Background */}
      <div className="auth-bg" />

      {/* Card */}
      <div className="auth-card">

        {/* Logo */}
        <div className="auth-card__logo">
          <span>🍽️</span>
        </div>

        <h2 className="auth-card__title">Welcome back</h2>
        <p className="auth-card__subtitle">Sign in your account</p>

        {error && <div className="auth-card__error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="auth-card__form">

          <input
            type="text"
            name="email"
            className="auth-input"
            placeholder="Email / Phone number"
            value={form.email}
            onChange={handleChange}
          />

          <div className="auth-input-wrap">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="auth-input"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <span
              className="auth-input-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>

        </form>

        <p className="auth-card__footer">
          Don't have an account?{' '}
          <Link to="/register" className="auth-card__link">Sign up</Link>
        </p>

      </div>
    </div>
  )
}

export default Login