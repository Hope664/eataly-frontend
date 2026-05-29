import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Checkout.css'

const initialItems = [
  { id: 1, name: 'Truffle Tagliatelle', desc: 'Handmade pasta, seasonal black truffle, parmigiano reggiano', price: 32.00, qty: 1, image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=200' },
  { id: 2, name: 'Burrata Di Bufala',   desc: 'Fresh burrata, heirloom tomatoes, balsamic glaze',           price: 24.00, qty: 1, image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=200' },
]

const Checkout = () => {
  const [items, setItems]         = useState(initialItems)
  const [payment, setPayment]     = useState('apple')
  const [promo, setPromo]         = useState('')

  const updateQty = (id, delta) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, qty: Math.max(1, item.qty + delta) }
        : item
    ))
  }

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const subtotal    = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const deliveryFee = 4.99
  const serviceTax  = 5.04
  const grandTotal  = subtotal + deliveryFee + serviceTax

  return (
    <div className="checkout-page">

      {/* Navbar */}
      <nav className="checkout-nav">
        <div className="checkout-nav__left">
          <Link to="/explore" className="checkout-nav__back">←</Link>
          <span className="checkout-nav__logo">Eataly</span>
        </div>

        {/* Breadcrumb steps */}
        <div className="checkout-steps">
          <span className="checkout-step checkout-step--active">● Cart Review</span>
          <span className="checkout-step__arrow">›</span>
          <span className="checkout-step">Payment</span>
          <span className="checkout-step__arrow">›</span>
          <span className="checkout-step">Confirmation</span>
        </div>

        <div className="checkout-nav__right">
          <span>🔔</span>
          <div className="checkout-nav__avatar">JD</div>
        </div>
      </nav>

      {/* Main layout */}
      <div className="checkout-layout">

        {/* LEFT */}
        <div className="checkout-left">

          {/* Header */}
          <div className="checkout-header">
            <h1 className="checkout-title">Checkout</h1>
            <span className="checkout-count">{items.length} Items in Cart</span>
          </div>

          {/* Items */}
          <div className="checkout-items">
            {items.map(item => (
              <div key={item.id} className="checkout-item">
                <div className="checkout-item__image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="checkout-item__info">
                  <p className="checkout-item__name">{item.name}</p>
                  <p className="checkout-item__desc">{item.desc}</p>
                  <div className="checkout-item__bottom">
                    <div className="checkout-item__qty">
                      <button onClick={() => updateQty(item.id, -1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, +1)}>+</button>
                    </div>
                    <button
                      className="checkout-item__remove"
                      onClick={() => removeItem(item.id)}
                    >
                      🗑 Remove
                    </button>
                  </div>
                </div>
                <p className="checkout-item__price">${(item.price * item.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Bottom row — Delivery + Payment */}
          <div className="checkout-bottom-row">

            {/* Delivery Address */}
            <div className="checkout-card">
              <div className="checkout-card__header">
                <h3>Delivery Address</h3>
                <button className="checkout-edit-btn">✏️ Edit</button>
              </div>
              <div className="checkout-address">
                <span className="checkout-address__icon">📍</span>
                <div>
                  <p className="checkout-address__name">Home Office</p>
                  <p className="checkout-address__text">123 Culinary U ay, Suite 456</p>
                  <p className="checkout-address__text">New York, NY 10012</p>
                  <p className="checkout-address__eta">Estimated: 45-60 mins</p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="checkout-card">
              <h3>Payment Method</h3>
              <div className="checkout-payments">
                <div
                  className={`checkout-payment ${payment === 'apple' ? 'checkout-payment--active' : ''}`}
                  onClick={() => setPayment('apple')}
                >
                  <span className="checkout-payment__icon">🍎</span>
                  <div>
                    <p className="checkout-payment__name">Apple Pay</p>
                    <p className="checkout-payment__sub">Default Wallet Account</p>
                  </div>
                  {payment === 'apple' && <span className="checkout-payment__check">✓</span>}
                </div>

                <div
                  className={`checkout-payment ${payment === 'visa' ? 'checkout-payment--active' : ''}`}
                  onClick={() => setPayment('visa')}
                >
                  <span className="checkout-payment__icon">💳</span>
                  <div>
                    <p className="checkout-payment__name">Visa Card</p>
                    <p className="checkout-payment__sub">Ending in 4242</p>
                  </div>
                  {payment === 'visa' && <span className="checkout-payment__check">✓</span>}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT — Order Summary */}
        <div className="checkout-right">
          <div className="checkout-summary">
            <h3 className="checkout-summary__title">Order Summary</h3>

            <div className="checkout-summary__rows">
              <div className="checkout-summary__row">
                <span>Subtotal ({items.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="checkout-summary__row">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="checkout-summary__row">
                <span>Service Tax</span>
                <span>${serviceTax.toFixed(2)}</span>
              </div>
            </div>

            <div className="checkout-summary__total">
              <span>Grand Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            {/* Promo code */}
            <div className="checkout-promo">
              <p className="checkout-promo__label">Promo Code</p>
              <div className="checkout-promo__row">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={promo}
                  onChange={e => setPromo(e.target.value)}
                  className="checkout-promo__input"
                />
                <button className="checkout-promo__btn">Apply</button>
              </div>
            </div>

            {/* Place Order */}
            <button className="checkout-place-btn">
              Place Order →
            </button>

            {/* Sustainability note */}
            <div className="checkout-note">
              <span>🌿</span>
              <p>Your order supports local sustainable farmers in the Tuscany region. We've offset the carbon for this delivery.</p>
            </div>

            {/* Terms */}
            <p className="checkout-terms">
              By clicking "Place Order", you agree to Eataly's{' '}
              <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout