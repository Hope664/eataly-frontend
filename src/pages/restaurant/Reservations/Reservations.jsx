import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../../pages/restaurant/Dashboard/Dashboard.css'
import './Reservations.css'

const reservations = [
  { id: 1, name: 'Sophia Chen',    avatar: 'SC', memberType: 'VIP Member · 12 visits',  time: '19:30 PM', party: 4, preference: '🌿 Terrace View',  status: 'Confirmed', },
  { id: 2, name: 'Jameson Blake',  avatar: 'JB', memberType: 'New Guest',                time: '20:15 PM', party: 2, preference: '🍷 Near Cellar',   status: 'Pending',   },
  { id: 3, name: 'Elena Moretti',  avatar: 'EM', memberType: 'Regular · 4 visits',       time: '18:00 PM', party: 6, preference: '🍽 Main Dining',   status: 'Cancelled', },
  { id: 4, name: "Liam O'Connor",  avatar: 'LO', memberType: 'Corporate Account',        time: '21:00 PM', party: 8, preference: '🔒 Private Suite', status: 'Confirmed', },
]

const peakData = [
  { time: '17:00', value: 45 },
  { time: '18:00', value: 75 },
  { time: '19:00', value: 95 },
  { time: '20:00', value: 80 },
  { time: '21:00', value: 55 },
  { time: '22:00', value: 35 },
]

const tabs = ['All Bookings', 'Pending', 'Confirmed', 'Waitlist']

const Reservations = () => {
  const [activeTab,    setActiveTab]    = useState('All Bookings')
  const [showDecline,  setShowDecline]  = useState(false)
  const [declineReason, setDeclineReason] = useState('')
  const [selected,     setSelected]     = useState(null)

  const filtered = activeTab === 'All Bookings'
    ? reservations
    : reservations.filter(r => r.status === activeTab)

  const handleDecline = (r) => {
    setSelected(r)
    setShowDecline(true)
  }

  return (
    <div className="res-mgmt-layout">

      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar__brand">
          <p className="dash-sidebar__name">Eataly SaaS</p>
          <p className="dash-sidebar__sub">Luxury Venue Management</p>
        </div>
        <nav className="dash-sidebar__nav">
          <Link to="/dashboard"    className="dash-nav-item"><span>▦</span> Dashboard</Link>
          <Link to="/reservations" className="dash-nav-item dash-nav-item--active"><span>📅</span> Reservations</Link>
          <Link to="/menu"         className="dash-nav-item"><span>🍽️</span> Menu</Link>
          <Link to="/restaurant-orders"       className="dash-nav-item"><span>📦</span> Orders</Link>
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
            <input type="text" placeholder="Search reservations..." />
          </div>
          <div className="dash-nav__right">
            <span className="dash-nav__icon">🔔</span>
            <span className="dash-nav__icon">⚙️</span>
            <div className="dash-nav__user">
              <div>
                <p className="dash-nav__user-name">Marco Rossi</p>
                <p className="dash-nav__user-role">General Manager</p>
              </div>
              <div className="dash-nav__avatar">MR</div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="dash-content">

          {/* Header */}
          <div className="resv-header">
            <div>
              <h1 className="resv-title">Reservations</h1>
              <p className="resv-subtitle">
                Review and manage today's incoming table requests.
              </p>
            </div>
            <div className="resv-today-badge">
              <div>
                <p className="resv-today-label">Upcoming Today</p>
                <p className="resv-today-count">24</p>
              </div>
              <span className="resv-today-icon">📈</span>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="resv-filters">
            <div className="resv-tabs">
              {tabs.map(tab => (
                <button
                  key={tab}
                  className={`resv-tab ${activeTab === tab ? 'resv-tab--active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="resv-filter-actions">
              <button className="resv-filter-btn">≡ More Filters</button>
              <button className="resv-filter-btn">↓ Export List</button>
            </div>
          </div>

          {/* Table */}
          <div className="resv-table-wrap">
            <table className="resv-table">
              <thead>
                <tr>
                  <th>CUSTOMER</th>
                  <th>TIME</th>
                  <th>PARTY</th>
                  <th>PREFERENCE</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id}>
                    <td>
                      <div className="resv-customer">
                        <div className="resv-avatar">{r.avatar}</div>
                        <div>
                          <p className="resv-customer__name">{r.name}</p>
                          <p className="resv-customer__type">{r.memberType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="resv-time">{r.time}</td>
                    <td className="resv-party">{r.party}</td>
                    <td className="resv-pref">{r.preference}</td>
                    <td>
                      <span className={`resv-status resv-status--${r.status.toLowerCase()}`}>
                        {r.status}
                      </span>
                    </td>
                    <td>
                      <div className="resv-actions">
                        {r.status === 'Pending' && (
                          <button className="resv-accept-btn">Accept</button>
                        )}
                        <button
                          className="resv-decline-btn"
                          onClick={() => handleDecline(r)}
                        >
                          Decline
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="resv-pagination">
              <span className="resv-pagination__info">
                Showing 1-10 of 48 bookings
              </span>
              <div className="resv-pagination__btns">
                <button className="resv-page-btn">‹</button>
                <button className="resv-page-btn">›</button>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="resv-bottom-row">

            {/* Table Turnover */}
            <div className="resv-card">
              <h3>Table Turnover</h3>
              <p className="resv-card__sub">
                Average dining duration today is 1h 45m.
              </p>
              <div className="resv-progress">
                <div className="resv-progress__bar" style={{ width: '75%' }} />
              </div>
              <p className="resv-progress__label">75% Capacity Reached</p>
            </div>

            {/* Peak Times */}
            <div className="resv-card resv-card--wide">
              <div className="resv-card__header">
                <h3>Peak Times</h3>
                <a href="#" className="resv-view-all">View full report</a>
              </div>
              <div className="resv-peak-chart">
                {peakData.map((d, i) => (
                  <div key={i} className="resv-peak-bar-wrap">
                    <div
                      className="resv-peak-bar"
                      style={{ height: `${d.value}%` }}
                    />
                    <span className="resv-peak-label">{d.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Decline modal */}
      {showDecline && selected && (
        <div className="resv-modal-overlay" onClick={() => setShowDecline(false)}>
          <div className="resv-modal" onClick={e => e.stopPropagation()}>

            {/* Modal restaurant image */}
            <div className="resv-modal__image">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400"
                alt="restaurant"
              />
            </div>

            <div className="resv-modal__body">
              <h2 className="resv-modal__title">Decline Reservation</h2>

              <div className="resv-modal__info">
                <div>
                  <p className="resv-modal__label">Customer</p>
                  <p className="resv-modal__value">{selected.name}</p>
                </div>
              </div>

              <div className="resv-modal__row">
                <div>
                  <p className="resv-modal__label">Reserved Table</p>
                  <p className="resv-modal__value">Table A1</p>
                </div>
                <div>
                  <p className="resv-modal__label">Reservation Time</p>
                  <p className="resv-modal__value">{selected.time}</p>
                </div>
              </div>

              <div className="resv-modal__group">
                <label className="resv-modal__label">Reason</label>
                <textarea
                  className="resv-modal__textarea"
                  placeholder="Table unavailable at selected time..."
                  value={declineReason}
                  onChange={e => setDeclineReason(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="resv-modal__actions">
                <button
                  className="resv-modal__cancel"
                  onClick={() => setShowDecline(false)}
                >
                  Cancel
                </button>
                <button
                  className="resv-modal__confirm"
                  onClick={() => setShowDecline(false)}
                >
                  Confirm Decline
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Floating + button */}
      <button className="resv-fab">+</button>

    </div>
  )
}

export default Reservations