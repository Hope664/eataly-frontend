import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { loginUser } from '../../services/api'
import './login.css'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  // Form state — one object holds both fields
  const [form, setForm] = useState({ email: '', password: '' })
  const [error,   setError]   = useState('')    // error message to show user
  const [loading, setLoading] = useState(false) // disable button while submitting

  // Called every time user types — updates only the changed field
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('') // clear error when user starts typing
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // prevent page reload on form submit

    // Basic validation
    if (!form.email || !form.password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      const res = await loginUser({
        email:    form.email,
        password: form.password,
      })

      const { user, accessToken, refreshToken } = res.data

      // Only restaurant owners can use this app
      if (user.role !== 'restaurant_owner') {
        setError('This portal is for restaurant owners only')
        setLoading(false)
        return
      }

      // Save tokens and user to context + localStorage
      login(user, accessToken, refreshToken)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      {/* Left side — decorative panel */}
      <div className="auth-banner">
        <div className="auth-banner__overlay" />
        <div className="auth-banner__content">
          <div className="auth-logo">
            <span className="auth-logo__icon">🍽️</span>
            <span className="auth-logo__text">Eataly</span>
          </div>
          <h1 className="auth-banner__title">
            Manage your restaurant<br />with ease
          </h1>
          <p className="auth-banner__subtitle">
            Your all-in-one platform for menus,<br />
            bookings and orders.
          </p>
        </div>
      </div>

      {/* Right side — login form */}
      <div className="auth-form-side">
        <div className="auth-form-container">

          {/* Header */}
          <div className="auth-form-header">
            <h2 className="auth-form-title">Welcome back</h2>
            <p className="auth-form-subtitle">Sign in to your restaurant account</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="auth-error">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Email field */}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="form-input"
                placeholder="you@restaurant.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            {/* Password field */}
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Footer link */}
          <p className="auth-footer-text">
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;