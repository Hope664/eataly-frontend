import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'

const categories = ['All Items', 'Appetizers', 'Mains', 'Desserts', 'Wines']

const featured = [
  {
    id: 1,
    name: 'Tagliatelle al Tartufo',
    price: 34,
    description: 'Fresh house-made egg pasta with black winter truffles, Parmigiano Reggiano DOP, and organic butter.',
    badge: 'Best Seller',
    badgeClass: 'badge--green',
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600',
  },
  {
    id: 2,
    name: 'Barolo Riserva 2016',
    price: 110,
    description: 'Intense ruby red, complex aromas.',
    badge: 'Premium Pairing',
    badgeClass: 'badge--dark',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600',
    toggle: true,
  },
]

const appetizers = [
  { id: 1, name: 'Burrata Pugliese',   price: 14, description: 'Fresh burrata cheese, cherry tomatoes, and basil pesto.',          status: 'Available', image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=300' },
  { id: 2, name: 'Carpaccio di Manzo', price: 18, description: 'Premium beef fillet, arugula, parmesan, shavings, lemon.',          status: 'Available', image: 'https://images.unsplash.com/photo-1544025162-d76538485696?w=300' },
  { id: 3, name: 'Upload Placeholder', price: 0,  description: 'Drag and drop dish image or click to browse files.',               status: 'Upload',    image: '' },
  { id: 4, name: 'Fritto Misto',       price: 16, description: 'Crispy calamari, shrimp, and seasonal vegetables.',                status: 'Sold Out',  image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300' },
]

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All Items')
  const [toggleOn, setToggleOn]             = useState(true)

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

          {/* Header */}
          <div className="menu-header">
            <div>
              <h1 className="menu-title">Menu Management</h1>
              <p className="menu-subtitle">Curate your culinary offerings and seasonal specials.</p>
            </div>
            <button className="menu-add-btn">+ Add New Dish</button>
          </div>

          {/* Category tabs */}
          <div className="menu-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`menu-tab ${activeCategory === cat ? 'menu-tab--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured & Seasonal */}
          <div className="menu-section">
            <div className="menu-section__header">
              <h2>Featured & Seasonal</h2>
              <span className="menu-top-label">TOP PERFORMERS</span>
            </div>

            <div className="menu-featured-grid">
              {featured.map(item => (
                <div key={item.id} className="featured-card">
                  <div className="featured-card__image">
                    <img src={item.image} alt={item.name} />
                    <span className={`menu-badge ${item.badgeClass}`}>{item.badge}</span>
                  </div>
                  <div className="featured-card__body">
                    <div className="featured-card__top">
                      <div>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                      </div>
                      <span className="featured-card__price">€{item.price}</span>
                    </div>
                    <div className="featured-card__actions">
                      {item.toggle ? (
                        <div
                          className={`menu-toggle ${toggleOn ? 'menu-toggle--on' : ''}`}
                          onClick={() => setToggleOn(!toggleOn)}
                        >
                          <div className="menu-toggle__dot" />
                        </div>
                      ) : (
                        <div className="menu-icons">
                          <button className="menu-icon-btn">✏️</button>
                          <button className="menu-icon-btn menu-icon-btn--red">🗑</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Appetizers */}
          <div className="menu-section">
            <div className="menu-section__header">
              <h2>All Appetizers</h2>
              <div className="menu-section__actions">
                <button className="menu-filter-btn">≡ Filter</button>
                <button className="menu-filter-btn">↕ Sort</button>
              </div>
            </div>

            <div className="menu-grid">
              {appetizers.map(item => (
                item.status === 'Upload' ? (
                  <div key={item.id} className="dish-card dish-card--upload">
                    <span className="dish-card__upload-icon">📷</span>
                    <p className="dish-card__upload-text">Drag and drop dish image</p>
                    <p className="dish-card__upload-sub">or click to browse files</p>
                    <button className="dish-card__library-btn">Select from Library</button>
                  </div>
                ) : (
                  <div key={item.id} className="dish-card">
                    <div className="dish-card__image">
                      <img src={item.image} alt={item.name} />
                      <span className="dish-card__price-badge">€{item.price}</span>
                      {item.status === 'Sold Out' && (
                        <div className="dish-card__sold-out">Out of Stock</div>
                      )}
                    </div>
                    <div className="dish-card__body">
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                      <div className="dish-card__footer">
                        <span className={`dish-card__status ${item.status === 'Available' ? 'dish-card__status--available' : 'dish-card__status--soldout'}`}>
                          {item.status}
                        </span>
                        <div className="menu-icons">
                          <button className="menu-icon-btn">✏️</button>
                          <button className="menu-icon-btn">🗑</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Menu