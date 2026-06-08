import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { bookingAPI } from '../../../services/api'
import { useAuth } from '../../../context/AuthContext'
import '../../../pages/restaurant/Dashboard/Dashboard.css'
import './Reservations.css'

const Reservations = () => {
  const { user } = useAuth()
  const [activeTab,    setActiveTab]    = useState('All')
  const [showDecline,  setShowDecline]  = useState(false)
  const [declineReason, setDeclineReason] = useState('')
  const [selected,     setSelected]     = useState(null)
  const [bookings,     setBookings]     = useState([])
  const [loading,      setLoading]      = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true)
      try {
        const restaurantId = localStorage.getItem('myRestaurantId') || '1'
        const res = await bookingAPI.getRestaurantBookings(restaurantId, { date: new Date().toISOString().split('T')[0] })
        setBookings(res.data.bookings || [])
      } catch {
        setBookings([])
      }
      setLoading(false)
    }
    fetchBookings()
  }, [])

  const tabs = ['All Bookings', 'Pending', 'Confirmed', 'Cancelled']

  const mapTabToStatus = (tab) => {
    if (tab === 'All Bookings') return null
    return tab.toLowerCase()
  }

  const filtered = (() => {
    const statusFilter = mapTabToStatus(activeTab)
    if (!statusFilter) return bookings
    return bookings.filter(b => b.status === statusFilter)
  })()

  const handleAccept = async (booking) => {
    try {
      await bookingAPI.updateStatus(booking._id, 'confirmed')
      setBookings(prev => prev.map(b =>
        b._id === booking._id ? { ...b, status: 'confirmed' } : b
      ))
      if (selected && selected._id === booking._id) setSelected(null)
    } catch {
      alert('Could not update status. Please try again.')
    }
  }

  const handleDecline = (booking) => {
    setSelected(booking)
    setShowDecline(true)
  }

  const confirmDecline = async () => {
    if (!selected) return
    try {
      await bookingAPI.updateStatus(selected._id, 'cancelled')
      setBookings(prev => prev.map(b =>
        b._id === selected._id ? { ...b, status: 'cancelled' } : b
      ))
      setShowDecline(false)
      setDeclineReason('')
      setSelected(null)
    } catch {
      alert('Could not decline booking. Please try again.')
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatTime = (timeSlot) => {
    if (!timeSlot) return ''
    const [h, m] = timeSlot.split(':').map(Number)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const hh = h % 12 || 12
    return `${hh}:${String(m).padStart(2, '0')} ${ampm}`
  }

  const stats = {
    today: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    total: bookings.length,
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
                <p className="dash-nav__user-name">{user?.name || 'Manager'}</p>
                <p className="dash-nav__user-role">General Manager</p>
              </div>
              <div className="dash-nav__avatar">
                {user?.name?.charAt(0)?.toUpperCase() || 'M'}
              </div>
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
                Review and manage your incoming table requests.
              </p>
            </div>
            <div className="resv-today-badge">
              <div>
                <p className="resv-today-label">Pending Today</p>
                <p className="resv-today-count">{stats.today}</p>
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
          </div>

          {/* Table */}
          <div className="resv-table-wrap">
            {loading ? (
              <p className="resv-loading">Loading reservations...</p>
            ) : (
              <table className="resv-table">
                <thead>
                  <tr>
                    <th>CUSTOMER</th>
                    <th>DATE</th>
                    <th>TIME</th>
                    <th>PARTY</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(b => {
                    const customer = b.customer || {}
                    const statusLabel = b.status === 'pending' ? 'Pending' :
                                       b.status === 'confirmed' ? 'Confirmed' :
                                       b.status === 'cancelled' ? 'Cancelled' :
                                       b.status === 'completed' ? 'Completed' :
                                       b.status.charAt(0).toUpperCase() + b.status.slice(1)

                    return (
                      <tr key={b._id}>
                        <td>
                          <div className="resv-customer">
                            <div className="resv-avatar">
                              {customer.name?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                            <div>
                              <p className="resv-customer__name">
                                {customer.name || 'Anonymous'}
                              </p>
                              <p className="resv-customer__type">
                                {customer.email || 'No email'}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="resv-date">{formatDate(b.date)}</td>
                        <td className="resv-time">{formatTime(b.timeSlot)}</td>
                        <td className="resv-party">{b.guestCount}</td>
                        <td>
                          <span className={`resv-status resv-status--${b.status}`}>
                            {statusLabel}
                          </span>
                        </td>
                        <td>
                          <div className="resv-actions">
                            {b.status === 'pending' && (
                              <button
                                className="resv-accept-btn"
                                onClick={() => handleAccept(b)}
                              >
                                Accept
                              </button>
                            )}
                            <button
                              className="resv-decline-btn"
                              onClick={() => handleDecline(b)}
                              disabled={b.status === 'cancelled'}
                            >
                              Decline
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan="6" className="resv-empty">
                        No reservations found for this filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
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
                {[
                  { time: '17:00', value: 45 }, { time: '18:00', value: 75 },
                  { time: '19:00', value: 95 }, { time: '20:00', value: 80 },
                  { time: '21:00', value: 55 }, { time: '22:00', value: 35 },
                ].map((d, i) => (
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
        <div className="resv-modal-overlay" onClick={() => { setShowDecline(false); setDeclineReason(''); setSelected(null); }}>
          <div className="resv-modal" onClick={e => e.stopPropagation()}>

            <div className="resv-modal__body">
              <h2 className="resv-modal__title">Decline Reservation</h2>

              <div className="resv-modal__info">
                <div>
                  <p className="resv-modal__label">Customer</p>
                  <p className="resv-modal__value">
                    {selected.customer?.name || 'Anonymous'}
                  </p>
                </div>
              </div>

              <div className="resv-modal__row">
                <div>
                  <p className="resv-modal__label">Table</p>
                  <p className="resv-modal__value">Table {String(selected.tableNumber).padStart(2, '0')}</p>
                </div>
                <div>
                  <p className="resv-modal__label">Reservation Time</p>
                  <p className="resv-modal__value">
                    {formatDate(selected.date)} at {formatTime(selected.timeSlot)}
                  </p>
                </div>
              </div>

              <div className="resv-modal__group">
                <label className="resv-modal__label">Reason (optional)</label>
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
                  onClick={() => { setShowDecline(false); setDeclineReason(''); setSelected(null); }}
                >
                  Cancel
                </button>
                <button
                  className="resv-modal__confirm"
                  onClick={confirmDecline}
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
