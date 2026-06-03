import { useParams, useNavigate, Link } from 'react-router-dom'
import './OrderDetail.css'

const orderData = {
  1: {
    id: 'INV-5012',
    date: 'Oct 20, 2023 · 7:42 PM',
    status: 'In Progress',
    type: 'Dine In',
    table: 'Table 12',
    customer: { name: 'Alessandro Bianchi', email: 'alex@email.com', phone: '+39 02 555 0001', avatar: 'AB', visits: 8 },
    items: [
      { id: 1, name: 'Berry Smoothie',      desc: 'Fresh mixed berries, yogurt, honey',  qty: 2, price: 12.00, image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=100' },
      { id: 2, name: 'Truffle Tagliatelle', desc: 'Black truffle, parmigiano, butter',   qty: 1, price: 34.00, image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=100' },
      { id: 3, name: 'Tiramisu Classico',   desc: 'Mascarpone, espresso, cocoa powder', qty: 1, price: 14.00, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=100' },
    ],
    subtotal: 72.00,
    serviceCharge: 7.20,
    tax: 5.80,
    total: 85.00,
    payment: 'Card',
    notes: 'Guest has nut allergy. No garnish on dessert.',
    timeline: [
      { time: '7:42 PM', event: 'Order Placed',     done: true  },
      { time: '7:45 PM', event: 'Kitchen Received', done: true  },
      { time: '7:58 PM', event: 'Being Prepared',   done: true  },
      { time: '8:15 PM', event: 'Ready to Serve',   done: false },
      { time: '—',       event: 'Served',            done: false },
    ],
  },
}

const OrderDetail = () => {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const order      = orderData[id] || orderData[1]

  return (
    <div className="dash-layout">

      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar__brand">
          <p className="dash-sidebar__name">Eataly SaaS</p>
          <p className="dash-sidebar__sub">Luxury Venue Management</p>
        </div>
        <nav className="dash-sidebar__nav">
          <Link to="/dashboard"          className="dash-nav-item"><span>▦</span> Dashboard</Link>
          <Link to="/reservations"       className="dash-nav-item"><span>📅</span> Reservations</Link>
          <Link to="/menu"               className="dash-nav-item"><span>🍽️</span> Menu</Link>
          <Link to="/restaurant-orders"  className="dash-nav-item dash-nav-item--active"><span>📦</span> Orders</Link>
          <Link to="/analytics"          className="dash-nav-item"><span>📊</span> Analytics</Link>
          <Link to="/staff"              className="dash-nav-item"><span>👥</span> Staff</Link>
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
            <input type="text" placeholder="Search orders..." />
          </div>
          <div className="dash-nav__right">
            <span className="dash-nav__icon">🔔</span>
            <span className="dash-nav__icon">⚙️</span>
            <div className="dash-nav__user">
              <div>
                <p className="dash-nav__user-name">Chef Marco</p>
                <p className="dash-nav__user-role">Executive Manager</p>
              </div>
              <div className="dash-nav__avatar">CM</div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="dash-content">

          {/* Breadcrumb */}
          <div className="od-breadcrumb">
            <Link to="/restaurant-orders">Orders</Link>
            <span> › </span>
            <span>{order.id}</span>
          </div>

          {/* Header */}
          <div className="od-header">
            <div>
              <h1 className="od-title">Order {order.id}</h1>
              <p className="od-subtitle">{order.date}</p>
            </div>
            <div className="od-header__actions">
              <button className="od-print-btn">🖨 Print Receipt</button>
              <span className={`od-status od-status--${order.status.toLowerCase().replace(' ', '-')}`}>
                {order.status}
              </span>
            </div>
          </div>

          {/* Main grid */}
          <div className="od-grid">

            {/* Left column */}
            <div className="od-left">

              {/* Order items */}
              <div className="dash-card od-items-card">
                <div className="dash-card__header">
                  <h3>Order Items</h3>
                  <span className="od-type-badge">{order.type} · {order.table}</span>
                </div>
                <div className="od-items">
                  {order.items.map(item => (
                    <div key={item.id} className="od-item">
                      <div className="od-item__image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="od-item__info">
                        <p className="od-item__name">{item.name}</p>
                        <p className="od-item__desc">{item.desc}</p>
                      </div>
                      <div className="od-item__right">
                        <span className="od-item__qty">x{item.qty}</span>
                        <span className="od-item__price">€{(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="od-totals">
                  <div className="od-totals__row">
                    <span>Subtotal</span>
                    <span>€{order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="od-totals__row">
                    <span>Service Charge (10%)</span>
                    <span>€{order.serviceCharge.toFixed(2)}</span>
                  </div>
                  <div className="od-totals__row">
                    <span>Tax</span>
                    <span>€{order.tax.toFixed(2)}</span>
                  </div>
                  <div className="od-totals__row od-totals__row--total">
                    <span>Total</span>
                    <span>€{order.total.toFixed(2)}</span>
                  </div>
                  <div className="od-totals__row od-totals__payment">
                    <span>Payment Method</span>
                    <span>💳 {order.payment}</span>
                  </div>
                </div>
              </div>

              {/* Special notes */}
              {order.notes && (
                <div className="dash-card od-notes-card">
                  <h3>⚠️ Special Notes</h3>
                  <p>{order.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="od-actions">
                <button
                  className="od-btn od-btn--cancel"
                  onClick={() => navigate('/restaurant-orders')}
                >
                  ← Back to Orders
                </button>
                <button className="od-btn od-btn--ready">
                  ✅ Mark as Ready
                </button>
                <button className="od-btn od-btn--served">
                  🍽 Mark as Served
                </button>
              </div>

            </div>

            {/* Right column */}
            <div className="od-right">

              {/* Customer info */}
              <div className="dash-card od-customer-card">
                <h3>Customer Details</h3>
                <div className="od-customer">
                  <div className="od-customer__avatar">
                    {order.customer.avatar}
                  </div>
                  <div>
                    <p className="od-customer__name">{order.customer.name}</p>
                    <p className="od-customer__visits">{order.customer.visits} visits</p>
                  </div>
                </div>
                <div className="od-customer__details">
                  <div className="od-customer__detail">
                    <span>📧</span>
                    <span>{order.customer.email}</span>
                  </div>
                  <div className="od-customer__detail">
                    <span>📞</span>
                    <span>{order.customer.phone}</span>
                  </div>
                </div>
              </div>

              {/* Order timeline */}
              <div className="dash-card od-timeline-card">
                <h3>Order Timeline</h3>
                <div className="od-timeline">
                  {order.timeline.map((step, i) => (
                    <div key={i} className="od-timeline__step">
                      <div className={`od-timeline__dot ${step.done ? 'od-timeline__dot--done' : ''}`}>
                        {step.done ? '✓' : ''}
                      </div>
                      {i < order.timeline.length - 1 && (
                        <div className={`od-timeline__line ${step.done ? 'od-timeline__line--done' : ''}`} />
                      )}
                      <div className="od-timeline__info">
                        <p className={`od-timeline__event ${step.done ? 'od-timeline__event--done' : ''}`}>
                          {step.event}
                        </p>
                        <p className="od-timeline__time">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick stats */}
              <div className="dash-card od-quick-stats">
                <h3>Order Info</h3>
                <div className="od-info-list">
                  <div className="od-info-item">
                    <span>Order Type</span>
                    <span>{order.type}</span>
                  </div>
                  <div className="od-info-item">
                    <span>Table</span>
                    <span>{order.table}</span>
                  </div>
                  <div className="od-info-item">
                    <span>Items</span>
                    <span>{order.items.length} items</span>
                  </div>
                  <div className="od-info-item">
                    <span>Payment</span>
                    <span>{order.payment}</span>
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

export default OrderDetail