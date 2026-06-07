import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { restaurantAPI, menuAPI } from '../../../services/api'
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
  })
  const [menuImageFile, setMenuImageFile] = useState(null)
  const [menuImagePreview, setMenuImagePreview] = useState(null)
  const [menuSaved, setMenuSaved] = useState(false)
  const [menuError, setMenuError] = useState('')
  const [menuLoading, setMenuLoading] = useState(false)
  const [savedMenuItems, setSavedMenuItems] = useState([])

  // Restaurant info form
  const [restaurant, setRestaurant] = useState({
    name: '',
    phone: '',
    openingHours: '',
    address: '',
    cuisine: '',
  })
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [infoError, setInfoError] = useState('')
  const [infoLoading, setInfoLoading] = useState(false)
  const [restaurantId, setRestaurantId] = useState(null)

  const handleMenuChange = (e) => {
    setMenuItem({ ...menuItem, [e.target.name]: e.target.value })
    setMenuError('')
  }

  const handleMenuImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setMenuImageFile(file)
      setMenuImagePreview(URL.createObjectURL(file))
    }
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  // Save menu item to state (will be saved to DB after restaurant is created)
  const handleSaveProduct = () => {
    if (!menuItem.name || !menuItem.price || !menuItem.description) {
      setMenuError('Please fill in all menu item fields')
      return
    }
    setSavedMenuItems([...savedMenuItems, { ...menuItem, imageFile: menuImageFile }])
    setMenuSaved(true)
    setMenuError('')
    // Reset form for another item
    setMenuItem({ name: '', category: 'Dessert', price: '', description: '' })
    setMenuImageFile(null)
    setMenuImagePreview(null)
  }

  const handleSaveInfo = async () => {
    if (!menuSaved) {
      setInfoError('Please save a menu item first')
      return
    }
    if (!restaurant.name || !restaurant.phone || !restaurant.address) {
      setInfoError('Please fill in all restaurant information')
      return
    }

    setInfoLoading(true)
    setInfoError('')

    try {
      // Step 1 — Create restaurant
      const res = await restaurantAPI.create({
        name: restaurant.name,
        phone: restaurant.phone,
        address: {
          street: restaurant.address,
          city: restaurant.address,
          country: 'Rwanda',
        },
        cuisine: restaurant.cuisine ? [restaurant.cuisine] : ['General'],
        openingHours: restaurant.openingHours,
      })

      const newRestaurantId = res.data.restaurant._id
      setRestaurantId(newRestaurantId)

      // Step 2 — Upload logo if provided
      if (logoFile) {
        try {
          await restaurantAPI.uploadLogo(newRestaurantId, logoFile)
        } catch (e) {
          console.log('Logo upload failed:', e.message)
        }
      }

      // Step 3 — Create empty menu
      const menuRes = await menuAPI.createMenu(newRestaurantId)

      // Step 4 — Add categories and items
      const categoryMap = {}
      let currentMenu = menuRes.data.menu

      for (const item of savedMenuItems) {
        if (!categoryMap[item.category]) {
          const catRes = await menuAPI.addCategory(newRestaurantId, { name: item.category })
          currentMenu = catRes.data.menu
          const newCat = currentMenu.categories.find(c => c.name === item.category)
          if (newCat) {
            categoryMap[item.category] = newCat._id
          } else {
            throw new Error('Failed to create category')
          }
        }

        const categoryId = categoryMap[item.category]

        const itemRes = await menuAPI.addItem(newRestaurantId, categoryId, {
          name: item.name,
          description: item.description,
          price: Number(item.price),
        })

        const updatedMenu = itemRes.data.menu
        const cat = updatedMenu.categories.id(categoryId)
        const newItem = cat?.items?.[cat.items.length - 1]

        if (item.imageFile && newItem) {
          try {
            await menuAPI.uploadItemImage(newRestaurantId, categoryId, newItem._id, item.imageFile)
          } catch (e) {
            console.log('Item image upload failed:', e.message)
          }
        }
      }

      navigate('/dashboard')

    } catch (err) {
      setInfoError(err.response?.data?.message || 'Failed to save restaurant info. Please try again.')
    } finally {
      setInfoLoading(false)
    }
  }

  return (
    <div className="onboard-page">

      {/* Background */}
      <div className="onboard-bg" />

      {/* Left card — Add Menu Item */}
      <div className="onboard-card onboard-card--left">

        <div className="onboard-logo">
          <span>𝓦</span>
        </div>

        <h2 className="onboard-card__title">Add Menu Item</h2>

        {menuSaved && (
          <div className="onboard-success">
            ✅ {savedMenuItems.length} item(s) saved! Add more or fill restaurant info.
          </div>
        )}
        {menuError && (
          <div className="onboard-error">⚠️ {menuError}</div>
        )}

        <div className="onboard-form">

          <div className="onboard-group">
            <label>Menu Item Name</label>
            <input
              type="text"
              name="name"
              className="onboard-input"
              placeholder="e.g. Beef Steak"
              value={menuItem.name}
              onChange={handleMenuChange}
            />
          </div>

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

          <div className="onboard-group">
            <label>Set Price</label>
            <input
              type="number"
              name="price"
              className="onboard-input"
              placeholder="5500"
              value={menuItem.price}
              onChange={handleMenuChange}
            />
          </div>

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
                disabled={menuLoading}
              >
                Save Product
              </button>
            </div>
            {menuImagePreview && (
              <img
                src={menuImagePreview}
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

          {/* Restaurant Name */}
          <div className="onboard-group">
            <label>Restaurant Name</label>
            <input
              type="text"
              className="onboard-input"
              placeholder="e.g. Eataly Milano"
              value={restaurant.name}
              onChange={e => setRestaurant({ ...restaurant, name: e.target.value })}
            />
          </div>

          {/* Two column row — Logo + Phone */}
          <div className="onboard-row">
            <div className="onboard-group">
              <label>Company Logo</label>
              <label className="onboard-logo-upload">
                {logoPreview
                  ? <img src={logoPreview} alt="logo" className="onboard-logo-preview" />
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

          {/* Cuisine */}
          <div className="onboard-group">
            <label>Cuisine Type</label>
            <input
              type="text"
              className="onboard-input"
              placeholder="e.g. Italian, Rwandan, Chinese"
              value={restaurant.cuisine}
              onChange={e => setRestaurant({ ...restaurant, cuisine: e.target.value })}
            />
          </div>

          <button
            className={`onboard-save-info-btn ${!menuSaved ? 'onboard-save-info-btn--disabled' : ''}`}
            onClick={handleSaveInfo}
            disabled={!menuSaved || infoLoading}
          >
            {infoLoading ? 'Saving...' : 'Save Info'}
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