import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { registerUser } from '../../services/api'
import '../Login/Login.css'
import './Register.css'

const Register = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    name:     '',
    email:    '',
    phone:    '',
    password: '',
    confirm:  '',
  })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Please fill in all required fields')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const res = await registerUser({
        name:     form.name,
        email:    form.email,
        phone:    form.phone,
        password: form.password,
        role:     'restaurant_owner', // auto-set for restaurant app
      })

      const { user, accessToken, refreshToken } = res.data
      login(user, accessToken, refreshToken)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      {/* Left Banner — same as login */}
      <div className="auth-banner">
        <div className="auth-banner__overlay" />
        <div className="auth-banner__content">
          <div className="auth-logo">
            <span className="auth-logo__icon">🍽️</span>
            <span className="auth-logo__text">Eataly</span>
          </div>
          <h1 className="auth-banner__title">
            Join thousands of<br />restaurants worldwide
          </h1>
          <p className="auth-banner__subtitle">
            Register your restaurant and start<br />
            accepting bookings and orders today.
          </p>

          {/* Feature list */}
          <ul className="banner-features">
            <li>✅ Easy menu management</li>
            <li>✅ Real-time table bookings</li>
            <li>✅ Live order tracking</li>
            <li>✅ Customer analytics</li>
          </ul>
        </div>
      </div>

      {/* Right — Register form */}
      <div className="auth-form-side">
        <div className="auth-form-container">

          <div className="auth-form-header">
            <h2 className="auth-form-title">Create your account</h2>
            <p className="auth-form-subtitle">
              Register your restaurant on Eataly
            </p>
          </div>

          {error && (
            <div className="auth-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Full name <span className="required">*</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                className="form-input"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email address <span className="required">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="form-input"
                placeholder="you@restaurant.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label" htmlFor="phone">
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                className="form-input"
                placeholder="+1 234 567 8900"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            {/* Password row — two fields side by side */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password <span className="required">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Min 8 characters"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirm">
                  Confirm password <span className="required">*</span>
                </label>
                <input
                  id="confirm"
                  type="password"
                  name="confirm"
                  className="form-input"
                  placeholder="Repeat password"
                  value={form.confirm}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register