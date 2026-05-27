import './EditProfile.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const EditProfile = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@eataly.com',
    phone: '+1 234 567 8900',
    location: 'Downtown, New York',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => {
      navigate('/profile')
    }, 1500)
  }

  return (
    <div className="profile-layout">

      {/* Sidebar — same as profile */}
      <aside className="profile-sidebar">
        <div className="sidebar__logo">
          <span>🍽️</span>
          <span>Eataly</span>
        </div>
        <nav className="sidebar__nav">
          <Link to="/explore"  className="sidebar__item"><span>🔍</span> Explore</Link>
          <Link to="/orders"   className="sidebar__item"><span>📦</span> Orders</Link>
          <Link to="/bookings" className="sidebar__item"><span>📅</span> Bookings</Link>
          <Link to="/profile"  className="sidebar__item sidebar__item--active"><span>👤</span> Profile</Link>
          <Link to="/cooking"  className="sidebar__item"><span>👨‍🍳</span> Cooking Classes</Link>
        </nav>
        <div className="sidebar__bottom">
          <Link to="/settings" className="sidebar__item"><span>⚙️</span> Settings</Link>
          <Link to="/pages"    className="sidebar__item"><span>📄</span> Pages</Link>
        </div>
      </aside>

      {/* Main */}
      <main className="profile-main">

        {/* Breadcrumb */}
        <div className="edit-breadcrumb">
          <Link to="/profile">Profile</Link>
          <span> › </span>
          <span>Edit Profile</span>
        </div>

        <h2 className="edit-title">Edit Profile</h2>
        <p className="edit-subtitle">Update your personal information</p>

        {success && (
          <div className="edit-success">
            ✅ Profile updated successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="edit-form">

          {/* Avatar section */}
          <div className="edit-avatar-section">
            <div className="edit-avatar">
              <img src={avatar} alt="avatar" />
            </div>
            <div className="edit-avatar-info">
              <p className="edit-avatar-name">John Doe</p>
              <p className="edit-avatar-email">johndoe@eataly.com</p>
              <button type="button" className="edit-avatar-btn">
                📷 Change Photo
              </button>
            </div>
          </div>

          {/* Personal info */}
          <div className="edit-card">
            <h3 className="edit-card__title">Personal Information</h3>

            <div className="edit-row">
              <div className="edit-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="edit-input"
                  placeholder="First name"
                />
              </div>
              <div className="edit-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="edit-input"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="edit-row">
              <div className="edit-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="edit-input"
                  placeholder="Email"
                />
              </div>
              <div className="edit-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="edit-input"
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div className="edit-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="edit-input"
                placeholder="Your location"
              />
            </div>
          </div>

          {/* Change password */}
          <div className="edit-card">
            <h3 className="edit-card__title">Change Password</h3>
            <p className="edit-card__sub">Leave blank if you don't want to change your password</p>

            <div className="edit-group">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                className="edit-input"
                placeholder="Enter current password"
              />
            </div>

            <div className="edit-row">
              <div className="edit-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  className="edit-input"
                  placeholder="New password"
                />
              </div>
              <div className="edit-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="edit-input"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="edit-actions">
            <Link to="/profile" className="edit-cancel-btn">
              Cancel
            </Link>
            <button type="submit" className="edit-save-btn">
              Save Changes
            </button>
          </div>

        </form>
      </main>
    </div>
  )
}

export default EditProfile