import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

const revenueData = {
  daily: [
    { day: 'Mon', value: 3200 },
    { day: 'Tue', value: 2800 },
    { day: 'Wed', value: 4100 },
    { day: 'Thu', value: 3600 },
    { day: 'Fri', value: 4800 },
    { day: 'Sat', value: 5200 },
    { day: 'Sun', value: 3900 },
  ],
  weekly: [
    { day: 'Wk1', value: 18000 },
    { day: 'Wk2', value: 22000 },
    { day: 'Wk3', value: 19500 },
    { day: 'Wk4', value: 24000 },
  ],
  monthly: [
    { day: 'Jan', value: 62000 },
    { day: 'Feb', value: 58000 },
    { day: 'Mar', value: 71000 },
    { day: 'Apr', value: 68000 },
    { day: 'May', value: 75000 },
    { day: 'Jun', value: 82000 },
  ],
}

const activities = [
  { id: 1, icon: '📅', color: '#2A7A4B', title: 'New Reservation',  desc: 'Table for 6, Dr. Moretti at 8:30 PM',              time: '2 mins ago'  },
  { id: 2, icon: '🍳', color: '#F59E0B', title: 'Kitchen Update',   desc: 'Osso Buco is now 86ing (Out of Stock)',             time: '15 mins ago' },
  { id: 3, icon: '⭐', color: '#3B82F6', title: 'New Review',       desc: '"Incredible service and authentic flavors." - 5 Stars', time: '1 hour ago'  },
  { id: 4, icon: '💰', color: '#8B5CF6', title: 'Payout Processed', desc: '€3,420.00 transferred to bank',                    time: '1 hour ago'  },
]

const orders = [
  { id: 1, customer: 'Alessandro Bianchi', avatar: 'AB', table: 'Table 12',      status: 'In Progress', statusClass: 'status--progress', total: '€184.00', time: '12 mins ago' },
  { id: 2, customer: 'Giulia Romano',      avatar: 'GR', table: 'Table 4 (VIP)', status: 'Seated',      statusClass: 'status--seated',   total: '€342.50', time: '45 mins ago' },
  { id: 3, customer: 'Luca Rossi',         avatar: 'LR', table: 'Takeaway',      status: 'Pending',     statusClass: 'status--pending',  total: '€42.00',  time: 'Just now'    },
]

const peakData = [
  { hour: '6PM',  value: 30 },
  { hour: '7PM',  value: 55 },
  { hour: '8PM',  value: 90 },
  { hour: '9PM',  value: 70 },
  { hour: '10PM', value: 40 },
]

const maxRevenue = (data) => Math.max(...data.map(d => d.value))

const Dashboard = () => {
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
          <Link to="/dashboard"    className="dash-nav-item dash-nav-item--active">
            <span>▦</span> Dashboard
          </Link>
          <Link to="/reservations" className="dash-nav-item">
            <span>📅</span> Reservations
          </Link>
          <Link to="/menu"         className="dash-nav-item">
            <span>🍽️</span> Menu
          </Link>
          <Link to="/orders"       className="dash-nav-item">
            <span>📦</span> Orders
          </Link>
          <Link to="/analytics"    className="dash-nav-item">
            <span>📊</span> Analytics
          </Link>
          <Link to="/staff"        className="dash-nav-item">
            <span>👥</span> Staff
          </Link>
        </nav>

        <div className="dash-sidebar__bottom">
          <button className="dash-manage-btn">Manage Bookings</button>
          <Link to="/settings" className="dash-nav-item">
            <span>⚙️</span> Settings
          </Link>
          <Link to="/support" className="dash-nav-item">
            <span>💬</span> Support
          </Link>
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

          {/* Welcome banner */}
          <div className="dash-banner">
            <div className="dash-banner__left">
              <h1 className="dash-banner__title">welcome back, Marco</h1>
              <p className="dash-banner__sub">
                Your venue is at 85% capacity for tonight's dinner service.<br />
                Revenue is up 12% compared to last Tuesday.
              </p>
              <div className="dash-banner__stats">
                <div className="dash-banner__stat">
                  <p className="dash-banner__stat-label">TODAY'S REVENUE</p>
                  <p className="dash-banner__stat-value">€14,280.00</p>
                </div>
                <div className="dash-banner__stat">
                  <p className="dash-banner__stat-label">LIVE RESERVATIONS</p>
                  <p className="dash-banner__stat-value">142 Guests</p>
                </div>
              </div>
            </div>

            {/* Peak hour CSS chart */}
            <div className="dash-banner__chart">
              <p className="dash-banner__chart-title">Peak Hour<br />Prediction</p>
              <div className="css-chart">
                {peakData.map((d, i) => (
                  <div key={i} className="css-chart__bar-wrap">
                    <div
                      className="css-chart__bar"
                      style={{ height: `${d.value}%` }}
                    />
                    <span className="css-chart__label">{d.hour}</span>
                  </div>
                ))}
              </div>
              <p className="dash-banner__chart-sub">8:30 PM Expected Peak</p>
            </div>
          </div>

          {/* Middle row */}
          <div className="dash-middle">

            {/* Revenue chart */}
            <div className="dash-card dash-revenue">
              <div className="dash-card__header">
                <div>
                  <h3>Revenue Trends</h3>
                  <p>Weekly performance analysis.</p>
                </div>
                <div className="dash-tabs">
                  {['daily', 'weekly', 'monthly'].map(tab => (
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

              {/* CSS bar chart */}
              <div className="css-chart css-chart--revenue">
                {currentData.map((d, i) => (
                  <div key={i} className="css-chart__bar-wrap">
                    <div
                      className="css-chart__bar css-chart__bar--green"
                      style={{ height: `${(d.value / maxVal) * 100}%` }}
                    />
                    <span className="css-chart__label">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="dash-card dash-activity">
              <div className="dash-card__header">
                <h3>Activity Feed</h3>
              </div>
              <div className="dash-activity__list">
                {activities.map(a => (
                  <div key={a.id} className="dash-activity__item">
                    <div
                      className="dash-activity__icon"
                      style={{ background: a.color + '20', color: a.color }}
                    >
                      {a.icon}
                    </div>
                    <div className="dash-activity__info">
                      <p className="dash-activity__title">{a.title}</p>
                      <p className="dash-activity__desc">{a.desc}</p>
                      <p className="dash-activity__time">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom row */}
          <div className="dash-bottom">

            {/* Recent Orders */}
            <div className="dash-card dash-orders">
              <div className="dash-card__header">
                <h3>Recent Orders</h3>
                <a href="#" className="dash-view-all">View All →</a>
              </div>
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>CUSTOMER</th>
                    <th>TABLE</th>
                    <th>STATUS</th>
                    <th>TOTAL</th>
                    <th>TIME</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td>
                        <div className="dash-customer">
                          <div className="dash-customer__avatar">{o.avatar}</div>
                          <span>{o.customer}</span>
                        </div>
                      </td>
                      <td>{o.table}</td>
                      <td>
                        <span className={`dash-status ${o.statusClass}`}>
                          {o.status}
                        </span>
                      </td>
                      <td><strong>{o.total}</strong></td>
                      <td className="dash-time">{o.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Staff Efficiency */}
            <div className="dash-card dash-staff">
              <h3>Staff Efficiency</h3>
              <div className="dash-staff__shifts">
                <div className="dash-shift">
                  <div className="dash-shift__header">
                    <span>Morning Shift</span>
                    <span className="dash-shift__pct">94%</span>
                  </div>
                  <div className="dash-progress">
                    <div className="dash-progress__bar" style={{ width: '94%' }} />
                  </div>
                </div>
                <div className="dash-shift">
                  <div className="dash-shift__header">
                    <span>Evening Shift</span>
                    <span className="dash-shift__pct">88%</span>
                  </div>
                  <div className="dash-progress">
                    <div className="dash-progress__bar" style={{ width: '88%' }} />
                  </div>
                </div>
              </div>
              <button className="dash-roster-btn">Manage Rosters</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard