import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AddDish.css'

const categories = ['Appetizers', 'Mains', 'Desserts', 'Wines', 'Drinks', 'Salads']

const AddDish = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    category: 'Appetizers',
    price: '',
    description: '',
    status: 'Available',
    featured: false,
  })
  const [image, setImage]   = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
    setError('')
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.price || !form.description) {
      setError('Please fill in all required fields')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/menu')
    }, 1500)
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
          <Link to="/menu"         className="dash-nav-item dash-nav-item--active"><span>🍽️</span> Menu</Link>
          <Link to="/orders"       className="dash-nav-item"><span>📦</span> Orders</Link>
          <Link to="/analytics"    className="dash-nav-item"><span>📊</span> Analytics</Link>
          <Link to="/staff"        className="dash-nav-item"><span>👥</span> Staff</Link>
        </nav>
        <div className="dash-sidebar__bottom">
          <button className="dash-manage-btn">Manage Bookings</button>
          <Link to="/settings" className="dash-nav-item"><span>⚙️</span> Settings</Link>
          <Link to="/support"  className="dash-nav-item"><span>💬</span> Support</Link>
        </div>
      </aside>

      {/* Main */}
      <div className="dash-main">

        {/* Navbar */}
        <nav className="dash-nav">
          <div className="dash-nav__search">
            <span>🔍</span>
            <input type="text" placeholder="Search orders, customers, or items..." />
          </div>
          <div className="dash-nav__right">
            <span className="dash-nav__icon">🔔</span>
            <div className="dash-nav__user">
              <div>
                <p className="dash-nav__user-name">Admin Portal</p>
                <p className="dash-nav__user-role">Eataly Milano</p>
              </div>
              <div className="dash-nav__avatar">AP</div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="dash-content">

          {/* Breadcrumb */}
          <div className="adish-breadcrumb">
            <Link to="/menu">Menu</Link>
            <span> › </span>
            <span>Add New Dish</span>
          </div>

          {/* Header */}
          <div className="adish-header">
            <div>
              <h1 className="adish-title">Add New Dish</h1>
              <p className="adish-subtitle">Fill in the details to add a new item to your menu</p>
            </div>
            <Link to="/menu" className="adish-cancel-btn">← Back to Menu</Link>
          </div>

          {error && <div className="adish-error">⚠️ {error}</div>}

          {/* Form layout */}
          <form onSubmit={handleSubmit} className="adish-form">

            {/* Left — form fields */}
            <div className="adish-left">

              {/* Dish name */}
              <div className="adish-card">
                <h3 className="adish-card__title">Basic Information</h3>

                <div className="adish-group">
                  <label>Dish Name <span className="adish-required">*</span></label>
                  <input
                    type="text"
                    name="name"
                    className="adish-input"
                    placeholder="e.g. Tagliatelle al Tartufo"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="adish-row">
                  <div className="adish-group">
                    <label>Category <span className="adish-required">*</span></label>
                    <select
                      name="category"
                      className="adish-input"
                      value={form.category}
                      onChange={handleChange}
                    >
                      {categories.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="adish-group">
                    <label>Price (€) <span className="adish-required">*</span></label>
                    <input
                      type="number"
                      name="price"
                      className="adish-input"
                      placeholder="0.00"
                      value={form.price}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="adish-group">
                  <label>Description <span className="adish-required">*</span></label>
                  <textarea
                    name="description"
                    className="adish-input adish-textarea"
                    placeholder="Describe the dish, ingredients, and preparation..."
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>
              </div>

              {/* Status & Options */}
              <div className="adish-card">
                <h3 className="adish-card__title">Status & Options</h3>

                <div className="adish-group">
                  <label>Availability Status</label>
                  <div className="adish-status-options">
                    {['Available', 'Sold Out', 'Coming Soon'].map(s => (
                      <label key={s} className={`adish-radio ${form.status === s ? 'adish-radio--active' : ''}`}>
                        <input
                          type="radio"
                          name="status"
                          value={s}
                          checked={form.status === s}
                          onChange={handleChange}
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="adish-group">
                  <label className="adish-checkbox-label">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={form.featured}
                      onChange={handleChange}
                    />
                    <span>Mark as Featured / Best Seller</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Right — image upload */}
            <div className="adish-right">

              <div className="adish-card">
                <h3 className="adish-card__title">Dish Image</h3>

                {/* Drop zone */}
                <div
                  className={`adish-dropzone ${preview ? 'adish-dropzone--has-image' : ''}`}
                  onDrop={handleDrop}
                  onDragOver={e => e.preventDefault()}
                  onClick={() => document.getElementById('dish-image-input').click()}
                >
                  {preview ? (
                    <img src={preview} alt="preview" className="adish-preview" />
                  ) : (
                    <>
                      <span className="adish-dropzone__icon">📷</span>
                      <p className="adish-dropzone__text">Drag and drop dish image</p>
                      <p className="adish-dropzone__sub">or click to browse files</p>
                      <p className="adish-dropzone__hint">PNG, JPG up to 10MB</p>
                    </>
                  )}
                </div>
                <input
                  id="dish-image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  style={{ display: 'none' }}
                />

                {preview && (
                  <button
                    type="button"
                    className="adish-remove-image"
                    onClick={() => { setPreview(null); setImage(null) }}
                  >
                    🗑 Remove Image
                  </button>
                )}
              </div>

              {/* Summary preview */}
              {form.name && (
                <div className="adish-card adish-preview-card">
                  <h3 className="adish-card__title">Preview</h3>
                  <div className="adish-preview-item">
                    {preview && (
                      <div className="adish-preview-image">
                        <img src={preview} alt="preview" />
                      </div>
                    )}
                    <div>
                      <p className="adish-preview-name">{form.name}</p>
                      <p className="adish-preview-cat">{form.category}</p>
                      {form.price && (
                        <p className="adish-preview-price">€{form.price}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>

          </form>

          {/* Action buttons */}
          <div className="adish-actions">
            <Link to="/menu" className="adish-btn-cancel">Cancel</Link>
            <button
              type="submit"
              className="adish-btn-save"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Saving...' : '+ Save Dish'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AddDish