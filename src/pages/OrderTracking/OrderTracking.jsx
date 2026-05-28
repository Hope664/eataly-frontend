import './OrderTracking.css'
import { Link } from 'react-router-dom'

const steps = [
  { id: 1, label: 'Order Received', time: '12:30 PM', done: true },
  { id: 2, label: 'Preparing',      time: '12:35 PM', done: true },
  { id: 3, label: 'Out for Delivery', time: 'In transit', done: true },
  { id: 4, label: 'Delivered',      time: 'Pending',   done: false },
]

const orderItems = [
  { id: 1, name: 'Tonnarelli Cacio e Pepe', desc: 'Fresh Pasta, Pecorino Romano', price: 20.00, image: 'https://images.unsplash.com/photo-1551183053-bf91798b4ded?w=100' },
  { id: 2, name: 'Pizza Margherita',        desc: 'San Marzano, D.O.P. Basil',   price: 14.00, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100' },
]

const OrderTracking = () => {
  return (
    <div className="ot-page">

      {/* Navbar */}
      <nav className="ot-nav">
        <div className="ot-nav__logo">Eataly</div>
        <div className="ot-nav__right">
          <span className="ot-nav__icon">🔍</span>
          <div className="ot-nav__avatar">JD</div>
        </div>
      </nav>

      <div className="ot-container">

        {/* Breadcrumb */}
        <div className="ot-breadcrumb">
          <Link to="/orders">Orders</Link>
          <span> › </span>
          <span>#ATL-49601</span>
        </div>

        {/* Hero heading */}
        <h1 className="ot-title">Your order is<br />on the way</h1>
        <p className="ot-subtitle">Arriving from Eataly Italiana Smeralda</p>

        {/* Time badge */}
        <div className="ot-time-badge">
          <span>🕐</span>
          <span>12:45 PM</span>
        </div>

        {/* Map card */}
        <div className="ot-map-card">
          <div className="ot-map-bg">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800"
              alt="map"
            />
            <div className="ot-map-overlay" />
          </div>

          {/* Courier info */}
          <div className="ot-courier">
            <div className="ot-courier__avatar">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="courier" />
            </div>
            <div className="ot-courier__info">
              <p className="ot-courier__name">Marco S.</p>
              <p className="ot-courier__role">Arriving · Courier</p>
            </div>
            <div className="ot-courier__actions">
              <button className="ot-courier-btn ot-courier-btn--green">
                📞 Contact
              </button>
              <button className="ot-courier-btn ot-courier-btn--gray">
                💬 Message
              </button>
            </div>
          </div>
        </div>

        {/* Order Progress */}
        <div className="ot-section">
          <h3 className="ot-section__title">Order Progress</h3>
          <div className="ot-steps">
            {steps.map((step, index) => (
              <div key={step.id} className="ot-step">
                {/* Line before */}
                {index > 0 && (
                  <div className={`ot-step__line ${steps[index].done ? 'ot-step__line--done' : ''}`} />
                )}
                <div className={`ot-step__circle ${step.done ? 'ot-step__circle--done' : ''}`}>
                  {step.done ? '✓' : ''}
                </div>
                <p className="ot-step__label">{step.label}</p>
                <p className="ot-step__time">{step.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="ot-section">
          <h3 className="ot-section__title">Order Summary</h3>
          <div className="ot-items">
            {orderItems.map(item => (
              <div key={item.id} className="ot-item">
                <div className="ot-item__image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="ot-item__info">
                  <p className="ot-item__name">{item.name}</p>
                  <p className="ot-item__desc">{item.desc}</p>
                </div>
                <p className="ot-item__price">€{item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="ot-totals">
            <div className="ot-totals__row">
              <span>Subtotal</span>
              <span>€32.10</span>
            </div>
            <div className="ot-totals__row">
              <span>Delivery Fee</span>
              <span>Free</span>
            </div>
            <div className="ot-totals__row">
              <span>Service Fee</span>
              <span>€1.90</span>
            </div>
            <div className="ot-totals__row ot-totals__row--total">
              <span>Total</span>
              <span>€34.00</span>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="ot-section">
          <div className="ot-address">
            <span className="ot-address__icon">📍</span>
            <div>
              <p className="ot-address__title">Delivery Address</p>
              <p className="ot-address__text">Via della Vite, 35</p>
              <p className="ot-address__text">00187 Roma, Italy</p>
              <p className="ot-address__note">"Note: Gate 1074, Please leave at the door."</p>
            </div>
          </div>
        </div>

        {/* Help */}
        <div className="ot-section ot-help">
          <p className="ot-help__title">Need help with this order?</p>
          <p className="ot-help__sub">Our support team is available 24/7 for any questions regarding your delivery.</p>
          <button className="ot-help__btn">Support Center</button>
        </div>

      </div>

      {/* Bottom tab bar */}
      <div className="ot-tabbar">
        <Link to="/explore"  className="ot-tab">🔍<span>Explore</span></Link>
        <Link to="/orders"   className="ot-tab ot-tab--active">📦<span>Orders</span></Link>
        <Link to="/bookings" className="ot-tab">📅<span>Bookings</span></Link>
        <Link to="/profile"  className="ot-tab">👤<span>Profile</span></Link>
      </div>

    </div>
  )
}

export default OrderTracking