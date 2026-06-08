import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './RestaurantDetail.css'

const restaurant = {
  id: 1,
  name: "La Terrazza d'Eataly",
  cuisine: 'Italian · Fine Dining',
  rating: 4.9,
  reviews: 284,
  address: 'Via Torino 5, Milano',
  phone: '+39 02 1234 567',
  hours: '11:00 AM — 11:00 PM',
  priceRange: '€€€',
  description: 'Expansive rooftop restaurant with panoramic city views and curated truffle menus. Signature artisanal pasta menus crafted daily by our award-winning executive chef. Every dish tells a story of Italian tradition reimagined for the modern palate.',
  tags: ['Rooftop', 'Fine Dining', 'Pasta', 'Wine Bar', 'Private Events'],
  images: [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400',
  ],
  menu: [
    { id: 1, category: 'Starters',    name: 'Burrata Pugliese',       desc: 'Fresh burrata, cherry tomatoes, basil pesto',                price: 14, image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=200' },
    { id: 2, category: 'Starters',    name: 'Carpaccio di Manzo',     desc: 'Premium beef fillet, arugula, parmesan shavings',            price: 18, image: 'https://images.unsplash.com/photo-1544025162-d76538485696?w=200' },
    { id: 3, category: 'Mains',       name: 'Tagliatelle al Tartufo', desc: 'Fresh pasta, black winter truffle, parmigiano',              price: 34, image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=200' },
    { id: 4, category: 'Mains',       name: 'Risotto ai Funghi',      desc: 'Wild porcini, white truffle oil, superfine Arborio',        price: 28, image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=200' },
    { id: 5, category: 'Desserts',    name: 'Tiramisu Classico',      desc: 'Mascarpone, Venetian espresso, premium cocoa',              price: 14, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200' },
    { id: 6, category: 'Desserts',    name: 'Panna Cotta',            desc: 'Vanilla bean panna cotta, wild berry coulis',               price: 12, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200' },
  ],
  reviews: [
    { id: 1, name: 'Julia P.',       rating: 5, comment: 'The Osso Buco was transcendental. Exceptional service from Marco.',   time: '2 days ago',  avatar: 'JP' },
    { id: 2, name: 'Alessandro R.',  rating: 5, comment: 'Best Italian in Milano. The truffle pasta is a must try!',            time: '1 week ago',  avatar: 'AR' },
    { id: 3, name: 'Sarah M.',       rating: 4, comment: 'Amazing ambiance and food. Slightly long wait but worth it.',         time: '2 weeks ago', avatar: 'SM' },
  ],
}

const menuCategories = ['All', 'Starters', 'Mains', 'Desserts']

const RestaurantDetail = () => {
  const navigate             = useNavigate()
  const [activeImg,   setActiveImg]   = useState(0)
  const [activeMenu,  setActiveMenu]  = useState('All')
  const [saved,       setSaved]       = useState(false)

  const filteredMenu = activeMenu === 'All'
    ? restaurant.menu
    : restaurant.menu.filter(m => m.category === activeMenu)

  return (
    <div className="rd-page">

      {/* Navbar */}
      <nav className="ot-nav">
        <div className="ot-nav__logo">Eataly</div>
        <div className="ot-nav__right">
          <span className="ot-nav__icon">🔍</span>
          <div className="ot-nav__avatar">JD</div>
        </div>
      </nav>

      {/* Hero image gallery */}
      <div className="rd-gallery">
        <div className="rd-gallery__main">
          <img src={restaurant.images[activeImg]} alt={restaurant.name} />
          <button
            className="rd-back-btn"
            onClick={() => navigate('/explore')}
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
        <div className="rd-gallery__thumbs">
          {restaurant.images.slice(1).map((img, i) => (
            <div
              key={i}
              className={`rd-gallery__thumb ${activeImg === i + 1 ? 'rd-gallery__thumb--active' : ''}`}
              onClick={() => setActiveImg(i + 1)}
            >
              <img src={img} alt="" />
            </div>
          ))}
        </div>
      </div>

      <div className="rd-container">

        {/* Restaurant info + Book button */}
        <div className="rd-info-row">
          <div className="rd-info">
            <h1 className="rd-name">{restaurant.name}</h1>
            <p className="rd-cuisine">{restaurant.cuisine} · {restaurant.priceRange}</p>
            <div className="rd-meta">
              <span className="rd-rating">⭐ {restaurant.rating}</span>
              <span className="rd-reviews">({restaurant.reviews.length} reviews)</span>
              <span className="rd-dot">·</span>
              <span className="rd-address">📍 {restaurant.address}</span>
            </div>
            <div className="rd-tags">
              {restaurant.tags.map((tag, i) => (
                <span key={i} className="rd-tag">{tag}</span>
              ))}
            </div>
          </div>
          <Link to="/reservation" className="rd-book-btn">
            📅 Book a Table
          </Link>
        </div>

        {/* About */}
        <div className="rd-section">
          <h2 className="rd-section__title">About</h2>
          <p className="rd-description">{restaurant.description}</p>
          <div className="rd-details">
            <div className="rd-detail-item">
              <span>📞</span>
              <span>{restaurant.phone}</span>
            </div>
            <div className="rd-detail-item">
              <span>🕐</span>
              <span>{restaurant.hours}</span>
            </div>
            <div className="rd-detail-item">
              <span>📍</span>
              <span>{restaurant.address}</span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="rd-section">
          <h2 className="rd-section__title">Menu Highlights</h2>

          {/* Menu category tabs */}
          <div className="rd-menu-tabs">
            {menuCategories.map(cat => (
              <button
                key={cat}
                className={`rd-menu-tab ${activeMenu === cat ? 'rd-menu-tab--active' : ''}`}
                onClick={() => setActiveMenu(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu items */}
          <div className="rd-menu-grid">
            {filteredMenu.map(item => (
              <div key={item.id} className="rd-menu-item">
                <div className="rd-menu-item__image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="rd-menu-item__info">
                  <p className="rd-menu-item__name">{item.name}</p>
                  <p className="rd-menu-item__desc">{item.desc}</p>
                </div>
                <span className="rd-menu-item__price">€{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="rd-section">
          <div className="rd-section__header">
            <h2 className="rd-section__title">Reviews</h2>
            <div className="rd-overall-rating">
              <span className="rd-overall-rating__value">⭐ {restaurant.rating}</span>
              <span className="rd-overall-rating__count">({restaurant.reviews.length} reviews)</span>
            </div>
          </div>

          <div className="rd-reviews">
            {restaurant.reviews.map(review => (
              <div key={review.id} className="rd-review">
                <div className="rd-review__header">
                  <div className="rd-review__avatar">{review.avatar}</div>
                  <div>
                    <p className="res-review__name">{review.name}</p>
                    <p className="res-review__time">{review.time}</p>
                  </div>
                  <div className="res-review__stars">
                    {'⭐'.repeat(review.rating)}
                  </div>
                </div>
                <p className="res-review__comment">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rd-cta">
          <div className="rd-cta__left">
            <h3>Ready to dine?</h3>
            <p>Book your table now and experience Italian excellence.</p>
          </div>
          <Link to="/reservation" className="rd-book-btn">
            📅 Reserve Now
          </Link>
        </div>

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
