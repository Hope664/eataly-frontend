import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Settings.css'

const Settings = () => {
  const [form, setForm] = useState({
    name: 'Eataly Milano Smeraldo',
    cuisine: 'Authentic Italian, Gourmet',
    description: 'Experience the best of Italian cuisine at Milano Smeraldo. From artisanal pasta to wood-fired pizzas and premium wines, we bring the heart of Italy to your table.',
    email: 'milan.smeraldo@eataly.it',
    phone: '+39 02 437631',
    instagram: 'Instagram.com/eatalymilano',
    facebook: 'facebook.com/eataly',
    location: 'Piazza XXV Aprile, 10, Milano',
  })
  const [theme, setTheme] = useState('light')
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="dash-layout">

      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar__brand">
          <p className="dash-sidebar__name">Eataly SaaS</p>
          <p className="dash-sidebar__sub">Luxury Venue Management</p>
        </div>
        <nav className="dash-sidebar__nav">
          <Link to="/dashboard"    className="dash-nav-item"><span>▦</span> Dashboard</Link>
          <Link to="/reservations" className="dash-nav-item"><span>📅</span> Reservations</Link>
          <Link to="/menu"         className="dash-nav-item"><span>🍽️</span> Menu</Link>
          <Link to="/orders"       className="dash-nav-item"><span>📦</span> Orders</Link>
          <Link to="/analytics"    className="dash-nav-item"><span>📊</span> Analytics</Link>
          <Link to="/staff"        className="dash-nav-item"><span>👥</span> Staff</Link>
        </nav>
        <div className="dash-sidebar__bottom">
          <button className="dash-manage-btn">Manage Bookings</button>
          <Link to="/settings" className="dash-nav-item dash-nav-item--active"><span>⚙️</span> Settings</Link>
          <Link to="/support"  className="dash-nav-item"><span>💬</span> Support</Link>
        </div>
      </aside>

      {/* Main */}
      <div className="dash-main">

        {/* Navbar */}
        <nav className="dash-nav">
          <div className="dash-nav__search">
            <span>🔍</span>
            <input type="text" placeholder="Search settings..." />
          </div>
          <div className="dash-nav__right">
            <span className="dash-nav__icon">🔔</span>
            <div className="dash-nav__user">
              <div>
                <p className="dash-nav__user-name">Alessandro Rossi</p>
                <p className="dash-nav__user-role">General Manager</p>
              </div>
              <div className="dash-nav__avatar">AR</div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="dash-content">

          {/* Header */}
          <div className="settings-header">
            <div>
              <h1 className="settings-title">Restaurant Settings</h1>
              <p className="settings-subtitle">
                Manage your venue's identity, operational rules, and team access.
              </p>
            </div>
            <button
              className={`settings-save-btn ${saved ? 'settings-save-btn--saved' : ''}`}
              onClick={handleSave}
            >
              {saved ? '✅ Saved!' : 'Save Changes'}
            </button>
          </div>

          {/* Main settings card */}
          <div className="settings-main-card">

            {/* Top row — Venue Profile + Opening Hours */}
            <div className="settings-top-row">

              {/* Venue Profile */}
              <div className="settings-section">
                <h3 className="settings-section__title">🏠 Venue Profile</h3>

                {/* Restaurant image + logo */}
                <div className="settings-venue-image">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600"
                    alt="restaurant"
                  />
                  <div className="settings-venue-logo">
                    <span>🍴</span>
                  </div>
                </div>

                {/* Name + Cuisine */}
                <div className="settings-row">
                  <div className="settings-group">
                    <label>Restaurant Name</label>
                    <input
                      type="text"
                      name="name"
                      className="settings-input"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="settings-group">
                    <label>Cuisine Type</label>
                    <input
                      type="text"
                      name="cuisine"
                      className="settings-input"
                      value={form.cuisine}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="settings-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="settings-input settings-textarea"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>
              </div>

              {/* Opening Hours */}
              <div className="settings-section">
                <h3 className="settings-section__title">🕐 Opening Hours</h3>
                <div className="settings-hours">
                  <div className="settings-hour-row">
                    <span>Mon – Thu</span>
                    <span className="settings-hour-time">11:00 – 23:00</span>
                  </div>
                  <div className="settings-hour-row">
                    <span>Fri – Sat</span>
                    <span className="settings-hour-time">11:00 – 01:00</span>
                  </div>
                  <div className="settings-hour-row">
                    <span>Sunday</span>
                    <span className="settings-hour-time">10:00 – 22:00</span>
                  </div>
                </div>
                <button className="settings-modify-btn">Modify Schedule</button>
              </div>

            </div>

            {/* Middle row — Contact + Social + Location */}
            <div className="settings-mid-row">

              {/* Contact Info */}
              <div className="settings-section">
                <h3 className="settings-section__title">✉️ Contact Info</h3>
                <div className="settings-group">
                  <input
                    type="email"
                    name="email"
                    className="settings-input"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="settings-group">
                  <input
                    type="tel"
                    name="phone"
                    className="settings-input"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Social Presence */}
              <div className="settings-section">
                <h3 className="settings-section__title">🔗 Social Presence</h3>
                <div className="settings-group">
                  <div className="settings-social-input">
                    <span>📷</span>
                    <input
                      type="text"
                      name="instagram"
                      className="settings-input settings-input--social"
                      value={form.instagram}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="settings-group">
                  <div className="settings-social-input">
                    <span>👥</span>
                    <input
                      type="text"
                      name="facebook"
                      className="settings-input settings-input--social"
                      value={form.facebook}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="settings-section">
                <h3 className="settings-section__title">📍 Location</h3>
                <div className="settings-group">
                  <div className="settings-location-input">
                    <span>📍</span>
                    <input
                      type="text"
                      name="location"
                      className="settings-input settings-input--social"
                      value={form.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom row — Theme + Account */}
            <div className="settings-bottom-row">

              {/* Theme Preferences */}
              <div className="settings-section">
                <h3 className="settings-section__title">🎨 Theme Preferences</h3>
                <div className="settings-theme-options">
                  <div
                    className={`settings-theme-btn ${theme === 'light' ? 'settings-theme-btn--active' : ''}`}
                    onClick={() => setTheme('light')}
                  >
                    <div className="settings-theme-preview settings-theme-preview--light" />
                    <span>Light Mode</span>
                  </div>
                  <div
                    className={`settings-theme-btn ${theme === 'dark' ? 'settings-theme-btn--active' : ''}`}
                    onClick={() => setTheme('dark')}
                  >
                    <div className="settings-theme-preview settings-theme-preview--dark" />
                    <span>Dark Mode</span>
                  </div>
                </div>
              </div>

              {/* Account & Security */}
              <div className="settings-section">
                <h3 className="settings-section__title">🔒 Account & Security</h3>
                <div className="settings-security-grid">
                  <div className="settings-security-item">
                    <span className="settings-security-icon">👥</span>
                    <div>
                      <p className="settings-security-title">Team Management</p>
                      <p className="settings-security-sub">12 active members</p>
                    </div>
                  </div>
                  <div className="settings-security-item">
                    <span className="settings-security-icon">🔑</span>
                    <div>
                      <p className="settings-security-title">Security Keys</p>
                      <p className="settings-security-sub">2FA enabled</p>
                    </div>
                  </div>
                  <div className="settings-security-item">
                    <span className="settings-security-icon">🔔</span>
                    <div>
                      <p className="settings-security-title">Alert Rules</p>
                      <p className="settings-security-sub">Push & Email</p>
                    </div>
                  </div>
                  <div className="settings-security-item settings-security-item--red">
                    <span className="settings-security-icon">🚪</span>
                    <div>
                      <p className="settings-security-title">Logout</p>
                      <p className="settings-security-sub">Switch account</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Settings