import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Notifications.css'

const tabs = ['All Activity', 'Reservations', 'Payments', 'Kitchen', 'System']

const notifications = [
  {
    id: 1,
    icon: '👤',
    iconBg: '#E5E7EB',
    borderColor: '#9CA3AF',
    title: 'New VIP Reservation',
    urgent: true,
    desc: <>Table for 4 requested by <strong>Mr. Alessandro Rossi</strong> for tonight at 20:30. Dietary: Nut Allergy.</>,
    time: '2 minutes ago',
    action: 'View Booking details →',
    category: 'Reservations',
  },
  {
    id: 2,
    icon: '✅',
    iconBg: '#2A7A4B',
    iconColor: '#fff',
    borderColor: '#2A7A4B',
    title: 'Payment Successful',
    desc: <>Order #ET-4829 has been fully paid via Digital Wallet. Amount: <strong>€412.50</strong>.</>,
    time: '45 minutes ago',
    action: 'Receipt PDF ↓',
    category: 'Payments',
  },
  {
    id: 3,
    icon: '⚠️',
    iconBg: '#FEF3C7',
    borderColor: '#F59E0B',
    title: 'Ingredient Low Stock',
    desc: <>Inventory alert: <strong>Fresh Black Truffles</strong> are below threshold (400g remaining). Order required for weekend service.</>,
    time: '2 hours ago',
    action: 'Contact Supplier →',
    category: 'Kitchen',
  },
  {
    id: 4,
    icon: '⚙️',
    iconBg: '#F3F4F6',
    borderColor: '#9CA3AF',
    title: 'System Maintenance Completed',
    desc: <>The analytics engine has been updated to V4.2. New reporting modules for 'Seasonal Trends' are now available.</>,
    time: '4 hours ago',
    action: 'Read Patch Notes 📋',
    category: 'System',
  },
  {
    id: 5,
    icon: '⭐',
    iconBg: '#FEF3C7',
    iconColor: '#F59E0B',
    borderColor: '#F59E0B',
    title: '5-Star Review Received',
    desc: <>"The Osso Buco was transcendental. Exceptional service from Marco." — <strong>Julia P.</strong></>,
    time: '6 hours ago',
    action: 'Post response →',
    category: 'System',
  },
]

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('All Activity')
  const [items, setItems]         = useState(notifications)

  const filtered = activeTab === 'All Activity'
    ? items
    : items.filter(n => n.category === activeTab)

  const markAllRead = () => {
    setItems(items.map(n => ({ ...n, read: true })))
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
          <Link to="/dashboard"      className="dash-nav-item"><span>▦</span> Dashboard</Link>
          <Link to="/reservations"   className="dash-nav-item"><span>📅</span> Reservations</Link>
          <Link to="/menu"           className="dash-nav-item"><span>🍽️</span> Menu</Link>
          <Link to="/restaurant-orders"         className="dash-nav-item"><span>📦</span> Orders</Link>
          <Link to="/analytics"      className="dash-nav-item"><span>📊</span> Analytics</Link>
          <Link to="/staff"          className="dash-nav-item"><span>👥</span> Staff</Link>
        </nav>
        <div className="dash-sidebar__bottom">
          <button className="dash-manage-btn">Manage Bookings</button>
          <Link to="/notifications"  className="dash-nav-item dash-nav-item--active"><span>🔔</span> Notifications</Link>
          <Link to="/settings"       className="dash-nav-item"><span>⚙️</span> Settings</Link>
          <Link to="/support"        className="dash-nav-item"><span>💬</span> Support</Link>
        </div>
      </aside>

      {/* Main */}
      <div className="dash-main">

        {/* Navbar */}
        <nav className="dash-nav">
          <div className="dash-nav__search">
            <span>🔍</span>
            <input type="text" placeholder="Search notifications..." />
          </div>
          <div className="dash-nav__right">
            <div className="dash-nav__user">
              <div className="dash-nav__avatar">RO</div>
              <div>
                <p className="dash-nav__user-name">Restaurant Owner</p>
              </div>
              <span>▾</span>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="dash-content">

          {/* Header */}
          <div className="notif-header">
            <div>
              <h1 className="notif-title">Notification Center</h1>
              <p className="notif-subtitle">
                Manage real-time updates across your luxury venue ecosystem.
              </p>
            </div>
            <div className="notif-header__actions">
              <button className="notif-mark-btn" onClick={markAllRead}>
                ✓ Mark all as read
              </button>
              <button className="notif-settings-btn">
                ⚙️ Notification Settings
              </button>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="notif-tabs">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`notif-tab ${activeTab === tab ? 'notif-tab--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'All Activity' && '📋 '}
                {tab === 'Reservations' && '📅 '}
                {tab === 'Payments' && '💳 '}
                {tab === 'Kitchen' && '🍳 '}
                {tab === 'System' && '⚙️ '}
                {tab}
                {tab === 'All Activity' && (
                  <span className="notif-tab__count">2</span>
                )}
              </button>
            ))}
          </div>

          {/* Notification cards */}
          <div className="notif-list">
            {filtered.map(n => (
              <div
                key={n.id}
                className={`notif-card ${n.read ? 'notif-card--read' : ''}`}
                style={{ borderLeftColor: n.borderColor }}
              >
                <div
                  className="notif-card__icon"
                  style={{
                    background: n.iconBg,
                    color: n.iconColor || '#374151'
                  }}
                >
                  {n.icon}
                </div>
                <div className="notif-card__body">
                  <div className="notif-card__title-row">
                    <h3>{n.title}</h3>
                    {n.urgent && <span className="notif-urgent">URGENT</span>}
                  </div>
                  <p className="notif-card__desc">{n.desc}</p>
                  <div className="notif-card__footer">
                    <span className="notif-card__time">🕐 {n.time}</span>
                    <a href="#" className="notif-card__action">{n.action}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load more */}
          <div className="notif-load-more">
            <button className="notif-load-btn">Load earlier notifications</button>
            <p className="notif-count">Displaying 5 of 48 recent updates</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Notifications