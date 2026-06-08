import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { restaurantAPI } from '../../services/api'
import './RestaurantDetail.css'

const menuCategories = ['All', 'Starters', 'Mains', 'Desserts']

const RestaurantDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImg,   setActiveImg]   = useState(0)
  const [activeMenu,  setActiveMenu]  = useState('All')
  const [saved,       setSaved]       = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    restaurantAPI.getOne(id)
      .then(res => {
        setRestaurant(res.data.restaurant)
        localStorage.setItem('selectedRestaurantId', id)
      })
      .catch(() => setRestaurant(null))
      .finally(() => setLoading(false))
  }, [id])

  const handleBookClick = () => {
    if (id) localStorage.setItem('selectedRestaurantId', id)
    navigate('/reservation')
  }

  const filteredMenu = activeMenu === 'All'
    ? restaurant?.menu || []
    : (restaurant?.menu || []).filter(m => m.category === activeMenu)

  if (loading) {
    return (
      <div className="rd-page">
        <nav className="ot-nav">
          <div className="ot-nav__logo">Eataly</div>
          <div className="ot-nav__right">
            <span className="ot-nav__icon">🔍</span>
            <div className="ot-nav__avatar">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</div>
          </div>
        </nav>
        <div className="rd-loading">Loading restaurant...</div>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className="rd-page">
        <nav className="ot-nav">
          <div className="ot-nav__logo">Eataly</div>
          <div className="ot-nav__right">
            <span className="ot-nav__icon">🔍</span>
            <div className="ot-nav__avatar">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</div>
          </div>
        </nav>
        <div className="rd-error-state">
          <p>Restaurant not found.</p>
          <button onClick={() => navigate('/explore')} className="rd-back-btn">← Back to Explore</button>
        </div>
      </div>
    )
  }

  return (
    <div className="rd-page">

      {/* Navbar */}
      <nav className="ot-nav">
        <div className="ot-nav__logo">Eataly</div>
        <div className="ot-nav__right">
          <span className="ot-nav__icon">🔍</span>
          <div className="ot-nav__avatar">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</div>
        </div>
      </nav>

      {/* Hero image gallery */}
      <div className="rd-gallery">
        <div className="rd-gallery__main">
          <img
            src={
              (restaurant.images && restaurant.images[activeImg]) ||
              restaurant.coverImage ||
              'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'
            }
            alt={restaurant.name}
          />
          <button
            className="rd-back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
          <button
            className={`rd-save-btn ${saved ? 'rd-save-btn--saved' : ''}`}
            onClick={() => setSaved(!saved)}
          >
            {saved ? '❤️' : '🤍'}
          </button>
        </div>
        {(restaurant.images || []).length > 1 && (
          <div className="rd-gallery__thumbs">
            {(restaurant.images || []).slice(1).map((img, i) => (
              <div
                key={i}
                className={`rd-gallery__thumb ${activeImg === i + 1 ? 'rd-gallery__thumb--active' : ''}`}
                onClick={() => setActiveImg(i + 1)}
              >
                <img src={img} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rd-container">

        {/* Restaurant info + Book button */}
        <div className="rd-info-row">
          <div className="rd-info">
            <h1 className="rd-name">{restaurant.name}</h1>
            <p className="rd-cuisine">
              {restaurant.cuisine || ''}
              {restaurant.priceRange ? ' · ' + restaurant.priceRange : ''}
            </p>
            <div className="rd-meta">
              {restaurant.rating && (
                <>
                  <span className="rd-rating">⭐ {restaurant.rating}</span>
                  <span className="rd-reviews">({restaurant.reviews?.length || 0} reviews)</span>
                  <span className="rd-dot">·</span>
                </>
              )}
              {restaurant.address && <span className="rd-address">📍 {restaurant.address}</span>}
            </div>
            {(restaurant.tags || []).length > 0 && (
              <div className="rd-tags">
                {restaurant.tags.map((tag, i) => (
                  <span key={i} className="rd-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
          <button onClick={handleBookClick} className="rd-book-btn">
            📅 Book a Table
          </button>
        </div>

        {/* About */}
        {restaurant.description && (
          <div className="rd-section">
            <h2 className="rd-section__title">About</h2>
            <p className="rd-description">{restaurant.description}</p>
            <div className="rd-details">
              {restaurant.phone && (
                <div className="rd-detail-item">
                  <span>📞</span>
                  <span>{restaurant.phone}</span>
                </div>
              )}
              {restaurant.workingHours && (
                <div className="rd-detail-item">
                  <span>🕐</span>
                  <span>{restaurant.workingHours}</span>
                </div>
              )}
              {restaurant.address && (
                <div className="rd-detail-item">
                  <span>📍</span>
                  <span>{restaurant.address}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Menu */}
        {(restaurant.menu || []).length > 0 && (
          <div className="rd-section">
            <h2 className="rd-section__title">Menu Highlights</h2>

            <div className="rd-menu-tabs">
              {['All', ...new Set((restaurant.menu || []).map(m => m.category))].map(cat => (
                <button
                  key={cat}
                  className={`rd-menu-tab ${activeMenu === cat ? 'rd-menu-tab--active' : ''}`}
                  onClick={() => setActiveMenu(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="rd-menu-grid">
              {filteredMenu.map(item => (
                <div key={item._id || item.id} className="rd-menu-item">
                  <div className="rd-menu-item__image">
                    <img src={item.image || 'https://via.placeholder.com/200'} alt={item.name} />
                  </div>
                  <div className="rd-menu-item__info">
                    <p className="rd-menu-item__name">{item.name}</p>
                    <p className="rd-menu-item__desc">{item.desc || item.description || ''}</p>
                  </div>
                  <span className="rd-menu-item__price">€{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {(restaurant.reviews || []).length > 0 && (
          <div className="rd-section">
            <div className="rd-section__header">
              <h2 className="rd-section__title">Reviews</h2>
              {restaurant.rating && (
                <div className="rd-overall-rating">
                  <span className="rd-overall-rating__value">⭐ {restaurant.rating}</span>
                  <span className="rd-overall-rating__count">({restaurant.reviews.length} reviews)</span>
                </div>
              )}
            </div>

            <div className="rd-reviews">
              {restaurant.reviews.map(review => (
                <div key={review._id || review.id} className="rd-review">
                  <div className="rd-review__header">
                    <div className="rd-review__avatar">{review.avatar || review.name?.charAt(0)}</div>
                    <div>
                      <p className="rd-review__name">{review.name}</p>
                      {review.time && <p className="rd-review__time">{review.time}</p>}
                    </div>
                    {review.rating && (
                      <div className="rd-review__stars">
                        {'⭐'.repeat(review.rating)}
                      </div>
                    )}
                  </div>
                  {review.comment && <p className="rd-review__comment">"{review.comment}"</p>}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Bottom tab bar */}
      <div className="ot-tabbar">
        <Link to="/explore"  className="ot-tab ot-tab--active">🔍<span>Explore</span></Link>
        <Link to="/orders"   className="ot-tab">📦<span>Orders</span></Link>
        <Link to="/bookings" className="ot-tab">📅<span>Bookings</span></Link>
        <Link to="/profile"  className="ot-tab">👤<span>Profile</span></Link>
      </div>

    </div>
  )
}

export default RestaurantDetail
