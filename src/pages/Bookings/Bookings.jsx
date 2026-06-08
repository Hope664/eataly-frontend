import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { bookingAPI } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import './Bookings.css'

const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled']

const Bookings = () => {
  const { user } = useAuth()
  const [activeTab,   setActiveTab]   = useState('All')
  const [showCancel,  setShowCancel]  = useState(false)
  const [selected,    setSelected]    = useState(null)
  const [bookings,    setBookings]    = useState([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState('')
  const [debug,       setDebug]       = useState('')

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true)
      setError('')
      setDebug('Fetching...')
      try {
        const token = localStorage.getItem('accessToken')
        setDebug('Token present: ' + !!token + ' | Role: ' + (user?.role || 'unknown'))
        const res = await bookingAPI.getMyBookings()
        setDebug('Response received. Count: ' + (res.data?.bookings?.length || 0))
        setBookings(res.data.bookings || [])
      } catch (err) {
        const msg = err.response?.data?.message || err.message
        setError(msg)
        setDebug('Error: ' + msg + ' | Status: ' + (err.response?.status || 'no response'))
        setBookings([])
      }
      setLoading(false)
    }
    fetchBookings()
  }, [user])

  const filtered = activeTab === 'All'
    ? bookings
    : bookings.filter(b => b.status === activeTab.toLowerCase())

  const handleCancel = (booking) => {
    setSelected(booking)
    setShowCancel(true)
  }

  const confirmCancel = async () => {
    if (!selected) return
    try {
      await bookingAPI.cancel(selected._id)
      setBookings(prev => prev.map(b =>
        b._id === selected._id ? { ...b, status: 'cancelled' } : b
      ))
      setShowCancel(false)
      setSelected(null)
    } catch {
      alert('Could not cancel booking. Please try again.')
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
    upcoming: bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    total: bookings.length,
  }

  return (
    <div className="bookings-page">

      {/* Navbar */}
      <nav className="ot-nav">
        <div className="ot-nav__logo">Eataly</div>
        <div className="ot-nav__right">
          <span className="ot-nav__icon">🔍</span>
          <div className="ot-nav__avatar">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</div>
        </div>
      </nav>

      <div className="bookings-container">

        {/* Header */}
        <div className="bookings-header">
          <div>
            <h1 className="bookings-title">My Bookings</h1>
            <p className="bookings-subtitle">
              Manage your upcoming and past restaurant reservations.
            </p>
          </div>
          <Link to="/reservation" className="bookings-new-btn">
            + New Booking
          </Link>
        </div>

        {/* Stats row */}
        <div className="bookings-stats">
          <div className="bookings-stat">
            <span className="bookings-stat__value">{stats.upcoming}</span>
            <span className="bookings-stat__label">Upcoming</span>
          </div>
          <div className="bookings-stat">
            <span className="bookings-stat__value">{stats.completed}</span>
            <span className="bookings-stat__label">Completed</span>
          </div>
          <div className="bookings-stat">
            <span className="bookings-stat__value">{stats.cancelled}</span>
            <span className="bookings-stat__label">Cancelled</span>
          </div>
          <div className="bookings-stat">
            <span className="bookings-stat__value">{stats.total}</span>
            <span className="bookings-stat__label">Total</span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="bookings-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`bookings-tab ${activeTab === tab ? 'bookings-tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Debug info */}
        {debug && <p className="bookings-debug">{debug} | User: {user?.email || 'none'} | Role: {user?.role || 'none'}</p>}
        {error && <div className="bookings-error">⚠️ {error}</div>}

        {/* Content */}
        {loading ? (
          <p className="bookings-loading">Loading your bookings...</p>
        ) : filtered.length === 0 ? (
          <div className="bookings-empty">
            <span className="bookings-empty__icon">📅</span>
            <p>No bookings found{error ? `: ${error}` : ''}</p>
            <Link to="/reservation" className="bookings-empty__link">Make your first booking</Link>
          </div>
        ) : (
          <div className="bookings-list">
            {filtered.map(booking => {
              const restaurant = booking.restaurant || {}
              const displayStatus = booking.status === 'pending' ? 'Upcoming' :
                                    booking.status === 'confirmed' ? 'Confirmed' :
                                    booking.status.charAt(0).toUpperCase() + booking.status.slice(1)

              return (
                <div key={booking._id} className="booking-card">

                  <div className="booking-card__image">
                    <img
                      src={restaurant.coverImage || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400'}
                      alt={restaurant.name}
                    />
                    <span className={`booking-card__status booking-card__status--${booking.status}`}>
                      {displayStatus}
                    </span>
                  </div>

                  <div className="booking-card__body">
                    <div className="booking-card__top">
                      <div>
                        <h3 className="booking-card__name">{restaurant.name || 'Restaurant'}</h3>
                        <p className="booking-card__address">
                          📍 {restaurant.address?.street || restaurant.address || 'Address not available'}
                        </p>
                      </div>
                      <span className="booking-card__code">#{booking._id?.slice(-6).toUpperCase()}</span>
                    </div>

                    <div className="booking-card__details">
                      <div className="booking-detail">
                        <span className="booking-detail__label">Date</span>
                        <span className="booking-detail__value">📅 {formatDate(booking.date)}</span>
                      </div>
                      <div className="booking-detail">
                        <span className="booking-detail__label">Time</span>
                        <span className="booking-detail__value">🕐 {formatTime(booking.timeSlot)}</span>
                      </div>
                      <div className="booking-detail">
                        <span className="booking-detail__label">Guests</span>
                        <span className="booking-detail__value">👥 {booking.guestCount} Adults</span>
                      </div>
                      <div className="booking-detail">
                        <span className="booking-detail__label">Table</span>
                        <span className="booking-detail__value">🪑 Table {String(booking.tableNumber).padStart(2, '0')}</span>
                      </div>
                    </div>

                    {(booking.status === 'pending' || booking.status === 'confirmed') && (
                      <div className="booking-card__actions">
                        <Link to="/reservation" className="booking-btn booking-btn--modify">
                          ✏️ Modify
                        </Link>
                        <button className="booking-btn booking-btn--cancel" onClick={() => handleCancel(booking)}>
                          ✕ Cancel
                        </button>
                      </div>
                    )}
                    {booking.status === 'completed' && (
                      <div className="booking-card__actions">
                        <button className="booking-btn booking-btn--review">⭐ Leave Review</button>
                        <Link to="/reservation" className="booking-btn booking-btn--rebook">🔄 Rebook</Link>
                      </div>
                    )}
                    {booking.status === 'cancelled' && (
                      <div className="booking-card__actions">
                        <Link to="/reservation" className="booking-btn booking-btn--rebook">🔄 Book Again</Link>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Cancel modal */}
      {showCancel && selected && (
        <div className="bookings-modal-overlay" onClick={() => setShowCancel(false)}>
          <div className="bookings-modal" onClick={e => e.stopPropagation()}>
            <div className="bookings-modal__icon">⚠️</div>
            <h2>Cancel Booking?</h2>
            <p>
              Are you sure you want to cancel your reservation at{' '}
              <strong>{selected.restaurant?.name || 'this restaurant'}</strong> on{' '}
              {formatDate(selected.date)} at {formatTime(selected.timeSlot)}?
            </p>
            <p className="bookings-modal__note">
              Note: Cancellations made less than 24 hours before the reservation may incur a fee.
            </p>
            <div className="bookings-modal__actions">
              <button className="booking-btn booking-btn--modify" onClick={() => setShowCancel(false)}>
                Keep Booking
              </button>
              <button className="booking-btn booking-btn--cancel" onClick={confirmCancel}>
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom tab bar */}
      <div className="ot-tabbar">
        <Link to="/explore"  className="ot-tab">🔍<span>Explore</span></Link>
        <Link to="/orders"   className="ot-tab">📦<span>Orders</span></Link>
        <Link to="/bookings" className="ot-tab ot-tab--active">📅<span>Bookings</span></Link>
        <Link to="/profile"  className="ot-tab">👤<span>Profile</span></Link>
      </div>
    </div>
  )
}

export default Bookings
