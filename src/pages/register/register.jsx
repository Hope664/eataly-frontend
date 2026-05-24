import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { registerUser } from '../../services/api'
import '../login/login.css'
import './register.css'

const Register = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({
    firstName: '', secondName: '',
    email: '', password: '', confirm: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.firstName || !form.secondName || !form.email || !form.password || !form.confirm) {
      setError('Please fill in all fields')
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
        name: `${form.firstName} ${form.secondName}`,
        email: form.email,
        password: form.password,
        role: 'restaurant_owner',
      })
      const { user, accessToken, refreshToken } = res.data
      login(user, accessToken, refreshToken)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">

      {/* LEFT — same splash panel */}
      <div className="auth-splash">
        <div className="auth-splash__overlay" />
        <div className="auth-splash__content">
          <div className="auth-splash__logo">🍽️</div>
          <h1 className="auth-splash__title">
            Ethical Dining<br />At Your<br />Fingertips
          </h1>
          <div className="auth-splash__buttons">
            <Link to="/register" className="splash-btn splash-btn--white">Sign Up</Link>
            <Link to="/login"    className="splash-btn splash-btn--outline">Login</Link>
          </div>
        </div>
      </div>

      {/* RIGHT — register card */}
      <div className="auth-side">
        <div className="auth-card">

          <div className="auth-card__logo">🍽️</div>
          <h2 className="auth-card__title">Create account</h2>
          <p className="auth-card__subtitle">Register your restaurant on Eataly</p>

          {error && <div className="auth-card__error">⚠️ {error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-row">
              <input
                type="text"
                name="firstName"
                className="auth-input"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="secondName"
                className="auth-input"
                placeholder="Second name"
                value={form.secondName}
                onChange={handleChange}
              />
            </div>

            <input
              type="email"
              name="email"
              className="auth-input"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              className="auth-input"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <input
              type="password"
              name="confirm"
              className="auth-input"
              placeholder="Confirm password"
              value={form.confirm}
              onChange={handleChange}
            />

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p className="auth-card__footer">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">Login</Link>
          </p>

        </div>
      </div>

    </div>
  )
}

export default Register