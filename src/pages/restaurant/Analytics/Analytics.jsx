import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Analytics.css'

const revenueData = {
  weekly: [
    { day: 'Mon', revenue: 3200, orders: 24 },
    { day: 'Tue', revenue: 2800, orders: 18 },
    { day: 'Wed', revenue: 4100, orders: 32 },
    { day: 'Thu', revenue: 3600, orders: 28 },
    { day: 'Fri', revenue: 4800, orders: 38 },
    { day: 'Sat', revenue: 5200, orders: 42 },
    { day: 'Sun', revenue: 3900, orders: 30 },
  ],
  monthly: [
    { day: 'Wk1', revenue: 18000, orders: 142 },
    { day: 'Wk2', revenue: 22000, orders: 168 },
    { day: 'Wk3', revenue: 19500, orders: 155 },
    { day: 'Wk4', revenue: 24000, orders: 188 },
  ],
}

const topDishes = [
  { id: 1, name: 'Tagliatelle al Tartufo', orders: 142, revenue: 4828, trend: '+12%', image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=100' },
  { id: 2, name: 'Barolo Riserva 2016',    orders: 98,  revenue: 10780, trend: '+8%',  image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=100' },
  { id: 3, name: 'Burrata Pugliese',        orders: 87,  revenue: 1218, trend: '+5%',  image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=100' },
  { id: 4, name: 'Risotto ai Funghi',       orders: 76,  revenue: 2128, trend: '-2%',  image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=100' },
  { id: 5, name: 'Fritto Misto',            orders: 65,  revenue: 1040, trend: '+3%',  image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100' },
]

const customerStats = [
  { label: 'New Customers',      value: 124, icon: '👤', color: '#2A7A4B', trend: '+18%' },
  { label: 'Returning Customers', value: 386, icon: '🔄', color: '#3B82F6', trend: '+7%'  },
  { label: 'VIP Members',        value: 48,  icon: '⭐', color: '#F59E0B', trend: '+12%' },
  { label: 'Avg. Spend / Guest', value: '€84', icon: '💰', color: '#8B5CF6', trend: '+5%' },
]

const reviews = [
  { id: 1, name: 'Julia P.',       rating: 5, comment: 'The Osso Buco was transcendental. Exceptional service from Marco.',  time: '2 hours ago'  },
  { id: 2, name: 'Alessandro R.',  rating: 5, comment: 'Best Italian restaurant in Milano. The truffle pasta is a must try!', time: '5 hours ago'  },
  { id: 3, name: 'Sarah M.',       rating: 4, comment: 'Amazing ambiance and food. Slightly long wait time but worth it.',    time: '1 day ago'    },
]

const maxRevenue = (data) => Math.max(...data.map(d => d.revenue))

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('weekly')
  const currentData = revenueData[activeTab]
  const maxVal      = maxRevenue(currentData)

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
          <Link to="/menu"         className="dash-nav-item"><span>🍽️</span> Menu</Link>
          <Link to="/orders"       className="dash-nav-item"><span>📦</span> Orders</Link>
          <Link to="/analytics"    className="dash-nav-item dash-nav-item--active"><span>📊</span> Analytics</Link>
          <Link to="/staff"        className="dash-nav-item"><span>👥</span> Staff</Link>
        </nav>
        <div className="dash-sidebar__bottom">
          <button className="dash-manage-btn">Manage Bookings</button>
          <Link to="/settings"      className="dash-nav-item"><span>⚙️</span> Settings</Link>
          <Link to="/support"       className="dash-nav-item"><span>💬</span> Support</Link>
        </div>
      </aside>

      {/* Main */}
      <div className="dash-main">

        {/* Navbar */}
        <nav className="dash-nav">
          <div className="dash-nav__search">
            <span>🔍</span>
            <input type="text" placeholder="Search analytics..." />
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

          {/* Header */}
          <div className="an-header">
            <div>
              <h1 className="an-title">Analytics</h1>
              <p className="an-subtitle">Track your venue performance and business insights.</p>
            </div>
            <div className="an-header__actions">
              <button className="an-export-btn">↓ Export Report</button>
              <div className="dash-tabs">
                {['weekly', 'monthly'].map(tab => (
                  <button
                    key={tab}
                    className={`dash-tab ${activeTab === tab ? 'dash-tab--active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* KPI cards */}
          <div className="an-kpi-grid">
            <div className="an-kpi-card an-kpi-card--green">
              <div className="an-kpi-card__icon">💰</div>
              <div>
                <p className="an-kpi-card__label">Total Revenue</p>
                <p className="an-kpi-card__value">€83,240</p>
                <p className="an-kpi-card__trend an-kpi-card__trend--up">↑ 12% vs last week</p>
              </div>
            </div>
            <div className="an-kpi-card">
              <div className="an-kpi-card__icon">🧾</div>
              <div>
                <p className="an-kpi-card__label">Total Orders</p>
                <p className="an-kpi-card__value">1,284</p>
                <p className="an-kpi-card__trend an-kpi-card__trend--up">↑ 8% vs last week</p>
              </div>
            </div>
            <div className="an-kpi-card">
              <div className="an-kpi-card__icon">📅</div>
              <div>
                <p className="an-kpi-card__label">Reservations</p>
                <p className="an-kpi-card__value">342</p>
                <p className="an-kpi-card__trend an-kpi-card__trend--up">↑ 5% vs last week</p>
              </div>
            </div>
            <div className="an-kpi-card">
              <div className="an-kpi-card__icon">⭐</div>
              <div>
                <p className="an-kpi-card__label">Avg. Rating</p>
                <p className="an-kpi-card__value">4.8</p>
                <p className="an-kpi-card__trend an-kpi-card__trend--up">↑ 0.2 vs last week</p>
              </div>
            </div>
            <div className="an-kpi-card">
              <div className="an-kpi-card__icon">👥</div>
              <div>
                <p className="an-kpi-card__label">Total Guests</p>
                <p className="an-kpi-card__value">2,847</p>
                <p className="an-kpi-card__trend an-kpi-card__trend--down">↓ 2% vs last week</p>
              </div>
            </div>
          </div>

          {/* Revenue + Orders chart */}
          <div className="an-charts-row">

            {/* Revenue chart */}
            <div className="dash-card an-chart-card">
              <div className="dash-card__header">
                <div>
                  <h3>Revenue & Orders</h3>
                  <p>Performance breakdown by day</p>
                </div>
              </div>
              <div className="an-chart">
                {currentData.map((d, i) => (
                  <div key={i} className="an-chart__bar-wrap">
                    <div className="an-chart__bars">
                      <div
                        className="an-chart__bar an-chart__bar--revenue"
                        style={{ height: `${(d.revenue / maxVal) * 100}%` }}
                      />
                      <div
                        className="an-chart__bar an-chart__bar--orders"
                        style={{ height: `${(d.orders / 50) * 100}%` }}
                      />
                    </div>
                    <span className="an-chart__label">{d.day}</span>
                  </div>
                ))}
              </div>
              <div className="an-chart__legend">
                <span className="an-legend-item an-legend-item--revenue">Revenue</span>
                <span className="an-legend-item an-legend-item--orders">Orders</span>
              </div>
            </div>

            {/* Customer stats */}
            <div className="dash-card an-customer-card">
              <div className="dash-card__header">
                <h3>Customer Insights</h3>
              </div>
              <div className="an-customer-grid">
                {customerStats.map((s, i) => (
                  <div key={i} className="an-customer-stat">
                    <div
                      className="an-customer-stat__icon"
                      style={{ background: s.color + '20', color: s.color }}
                    >
                      {s.icon}
                    </div>
                    <p className="an-customer-stat__value">{s.value}</p>
                    <p className="an-customer-stat__label">{s.label}</p>
                    <p className="an-customer-stat__trend">{s.trend}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Top dishes + Reviews */}
          <div className="an-bottom-row">

            {/* Top dishes */}
            <div className="dash-card">
              <div className="dash-card__header">
                <h3>Top Performing Dishes</h3>
                <a href="#" className="dash-view-all">View All →</a>
              </div>
              <div className="an-dishes">
                {topDishes.map((dish, i) => (
                  <div key={dish.id} className="an-dish">
                    <span className="an-dish__rank">#{i + 1}</span>
                    <div className="an-dish__image">
                      <img src={dish.image} alt={dish.name} />
                    </div>
                    <div className="an-dish__info">
                      <p className="an-dish__name">{dish.name}</p>
                      <p className="an-dish__orders">{dish.orders} orders</p>
                    </div>
                    <div className="an-dish__right">
                      <p className="an-dish__revenue">€{dish.revenue.toLocaleString()}</p>
                      <p className={`an-dish__trend ${dish.trend.startsWith('+') ? 'an-dish__trend--up' : 'an-dish__trend--down'}`}>
                        {dish.trend}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="dash-card">
              <div className="dash-card__header">
                <h3>Recent Reviews</h3>
                <a href="#" className="dash-view-all">View All →</a>
              </div>
              <div className="an-reviews">
                {reviews.map(r => (
                  <div key={r.id} className="an-review">
                    <div className="an-review__header">
                      <div className="an-review__avatar">
                        {r.name.charAt(0)}
                      </div>
                      <div>
                        <p className="an-review__name">{r.name}</p>
                        <p className="an-review__time">{r.time}</p>
                      </div>
                      <div className="an-review__stars">
                        {'⭐'.repeat(r.rating)}
                      </div>
                    </div>
                    <p className="an-review__comment">"{r.comment}"</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Analytics