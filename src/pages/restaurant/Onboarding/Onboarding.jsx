import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Onboarding.css'

const categories = ['Dessert', 'Main Course', 'Starter', 'Drinks', 'Salads']

const Onboarding = () => {
  const navigate = useNavigate()

  // Menu item form
  const [menuItem, setMenuItem] = useState({
    name: '',
    category: 'Dessert',
    price: '',
    description: '',
    image: null,
  })
  const [menuSaved, setMenuSaved] = useState(false)
  const [menuError, setMenuError] = useState('')

  // Restaurant info form
  const [restaurant, setRestaurant] = useState({
    logo: null,
    phone: '',
    openingHours: '',
    address: '',
  })
  const [infoError, setInfoError] = useState('')

  const handleMenuChange = (e) => {
    setMenuItem({ ...menuItem, [e.target.name]: e.target.value })
    setMenuError('')
  }

  const handleMenuImageChange = (e) => {
    const file = e.target.files[0]
    if (file) setMenuItem({ ...menuItem, image: URL.createObjectURL(file) })
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) setRestaurant({ ...restaurant, logo: URL.createObjectURL(file) })
  }

  const handleSaveProduct = () => {
    if (!menuItem.name || !menuItem.price || !menuItem.description) {
      setMenuError('Please fill in all menu item fields')
      return
    }
    setMenuSaved(true)
    setMenuError('')
  }

  const handleSaveInfo = () => {
    if (!menuSaved) {
      setInfoError('Please save a menu item first')
      return
    }
    if (!restaurant.phone || !restaurant.address || !restaurant.openingHours) {
      setInfoError('Please fill in all restaurant information')
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="onboard-page">

      {/* Background */}
      <div className="onboard-bg" />

      {/* Left card — Add Menu Item */}
      <div className="onboard-card onboard-card--left">

        {/* Logo */}
        <div className="onboard-logo">
          <span>𝓦</span>
        </div>

        <h2 className="onboard-card__title">Add Menu Item</h2>

        {menuSaved && (
          <div className="onboard-success">✅ Menu item saved!</div>
        )}
        {menuError && (
          <div className="onboard-error">⚠️ {menuError}</div>
        )}

        <div className="onboard-form">

          {/* Menu Item Name */}
          <div className="onboard-group">
            <label>Menu Item Name</label>
            <input
              type="text"
              name="name"
              className="onboard-input"
              placeholder="Beef"
              value={menuItem.name}
              onChange={handleMenuChange}
            />
          </div>

          {/* Food Category */}
          <div className="onboard-group">
            <label>Food Category</label>
            <div className="onboard-select-wrap">
              <select
                name="category"
                className="onboard-input onboard-select"
                value={menuItem.category}
                onChange={handleMenuChange}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Set Price */}
          <div className="onboard-group">
            <label>Set Price</label>
            <input
              type="number"
              name="price"
              className="onboard-input"
              placeholder="5,500 RWF"
              value={menuItem.price}
              onChange={handleMenuChange}
            />
          </div>

          {/* Description */}
          <div className="onboard-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              className="onboard-input"
              placeholder="Fresh tropical juice mixed with berries"
              value={menuItem.description}
              onChange={handleMenuChange}
            />
          </div>

          {/* Product Image */}
          <div className="onboard-group">
            <label>Product Image</label>
            <div className="onboard-image-row">
              <label className="onboard-upload-btn">
                + Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMenuImageChange}
                  style={{ display: 'none' }}
                />
              </label>
              <button
                className="onboard-save-btn"
                onClick={handleSaveProduct}
              >
                Save Product
              </button>
            </div>
            {menuItem.image && (
              <img
                src={menuItem.image}
                alt="preview"
                className="onboard-image-preview"
              />
            )}
          </div>

        </div>
      </div>

      {/* Right card — Restaurant Information */}
      <div className="onboard-card onboard-card--right">

        <h2 className="onboard-card__title">Restaurant Information</h2>

        {infoError && (
          <div className="onboard-error">⚠️ {infoError}</div>
        )}

        <div className="onboard-form">

          {/* Two column row — Logo + Phone */}
          <div className="onboard-row">
            <div className="onboard-group">
              <label>Company Logo</label>
              <label className="onboard-logo-upload">
                {restaurant.logo
                  ? <img src={restaurant.logo} alt="logo" className="onboard-logo-preview" />
                  : <span>Upload Logo</span>
                }
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            <div className="onboard-group">
              <label>Phone Number</label>
              <input
                type="tel"
                className="onboard-input"
                placeholder="+250 7XX XXX XXX"
                value={restaurant.phone}
                onChange={e => setRestaurant({ ...restaurant, phone: e.target.value })}
              />
            </div>
          </div>

          {/* Two column row — Opening Hours + Address */}
          <div className="onboard-row">
            <div className="onboard-group">
              <label>Opening Hours</label>
              <input
                type="text"
                className="onboard-input"
                placeholder="08:00 AM — 11:00 PM"
                value={restaurant.openingHours}
                onChange={e => setRestaurant({ ...restaurant, openingHours: e.target.value })}
              />
            </div>

            <div className="onboard-group">
              <label>Restaurant Address</label>
              <input
                type="text"
                className="onboard-input"
                placeholder="Kigali, Rwanda"
                value={restaurant.address}
                onChange={e => setRestaurant({ ...restaurant, address: e.target.value })}
              />
            </div>
          </div>

          {/* Save Info button */}
          <button
            className={`onboard-save-info-btn ${!menuSaved ? 'onboard-save-info-btn--disabled' : ''}`}
            onClick={handleSaveInfo}
            disabled={!menuSaved}
          >
            Save Info
          </button>

          {!menuSaved && (
            <p className="onboard-hint">
              💡 Save a menu item first to enable this button
            </p>
          )}

        </div>
      </div>

    </div>
  )
}

export default Onboarding