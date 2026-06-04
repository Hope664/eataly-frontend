import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Bookings.css'

const bookings = [
  {
    id: 1,
    restaurant: 'Eataly Milano Smeralda',
    address: 'Piazza XXV Aprile, 10, Milano',
    date: 'Oct 24, 2023',
    time: '19:30 PM',
    guests: 4,
    table: 'Table A1 — VIP Lounge',
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
    confirmationCode: 'EAT-2024-001',
  },
  {
    id: 2,
    restaurant: 'La Terrazza d\'Eataly',
    address: 'Via Torino, 5, Milano',
    date: 'Nov 02, 2023',
    time: '20:00 PM',
    guests: 2,
    table: 'Table B2 — Terrace',
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400',
    confirmationCode: 'EAT-2024-002',
  },
  {
    id: 3,
    restaurant: 'Il Vino',
    address: 'Via Brera, 28, Milano',
    date: 'Sep 15, 2023',
    time: '19:00 PM',
    guests: 3,
    table: 'Table C1 — Wine Bar',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400',
    confirmationCode: 'EAT-2024-003',
  },
  {
    id: 4,
    restaurant: 'Pasta Fresca',
    address: 'Corso Como, 15, Milano',
    date: 'Aug 28, 2023',
    time: '18:30 PM',
    guests: 6,
    table: 'Table D4 — Main Dining',
    status: 'Cancelled',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400',
    confirmationCode: 'EAT-2024-004',
  },
]

const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled']

const Bookings = () => {
  const [activeTab,   setActiveTab]   = useState('All')
  const [showCancel,  setShowCancel]  = useState(false)
  const [selected,    setSelected]    = useState(null)

  const filtered = activeTab === 'All'
    ? bookings
    : bookings.filter(b => b.status === activeTab)

  const handleCancel = (booking) => {
    setSelected(booking)
    setShowCancel(true)
  }

  return (
    <div className="bookings-page">

      {/* Navbar */}
      <nav className="ot-nav">
        <div className="ot-nav__logo">Eataly</div>
        <div className="ot-nav__right">
          <span className="ot-nav__icon">🔍</span>
          <div className="ot-nav__avatar">JD</div>
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
            <span className="bookings-stat__value">2</span>
            <span className="bookings-stat__label">Upcoming</span>
          </div>
          <div className="bookings-stat">
            <span className="bookings-stat__value">1</span>
            <span className="bookings-stat__label">Completed</span>
          </div>
          <div className="bookings-stat">
            <span className="bookings-stat__value">1</span>
            <span className="bookings-stat__label">Cancelled</span>
          </div>
          <div className="bookings-stat">
            <span className="bookings-stat__value">4</span>
            <span className="bookings-stat__label">Total Visits</span>
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

        {/* Booking cards */}
        <div className="bookings-list">
          {filtered.map(booking => (
            <div key={booking.id} className="booking-card">

              {/* Restaurant image */}
              <div className="booking-card__image">
                <img src={booking.image} alt={booking.restaurant} />
                <span className={`booking-card__status booking-card__status--${booking.status.toLowerCase()}`}>
                  {booking.status}
                </span>
              </div>

              {/* Content */}
              <div className="booking-card__body">
                <div className="booking-card__top">
                  <div>
                    <h3 className="booking-card__name">{booking.restaurant}</h3>
                    <p className="booking-card__address">📍 {booking.address}</p>
                  </div>
                  <span className="booking-card__code">{booking.confirmationCode}</span>
                </div>

                {/* Details grid */}
                <div className="booking-card__details">
                  <div className="booking-detail">
                    <span className="booking-detail__label">Date</span>
                    <span className="booking-detail__value">📅 {booking.date}</span>
                  </div>
                  <div className="booking-detail">
                    <span className="booking-detail__label">Time</span>
                    <span className="booking-detail__value">🕐 {booking.time}</span>
                  </div>
                  <div className="booking-detail">
                    <span className="booking-detail__label">Guests</span>
                    <span className="booking-detail__value">👥 {booking.guests} Adults</span>
                  </div>
                  <div className="booking-detail">
                    <span className="booking-detail__label">Table</span>
                    <span className="booking-detail__value">🪑 {booking.table}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="booking-card__actions">
                  {booking.status === 'Upcoming' && (
                    <>
                      <Link
                        to="/reservation"
                        className="booking-btn booking-btn--modify"
                      >
                        ✏️ Modify
                      </Link>
                      <button
                        className="booking-btn booking-btn--cancel"
                        onClick={() => handleCancel(booking)}
                      >
                        ✕ Cancel
                      </button>
                      <button className="booking-btn booking-btn--directions">
                        🗺 Get Directions
                      </button>
                    </>
                  )}
                  {booking.status === 'Completed' && (
                    <>
                      <button className="booking-btn booking-btn--review">
                        ⭐ Leave Review
                      </button>
                      <Link
                        to="/reservation"
                        className="booking-btn booking-btn--rebook"
                      >
                        🔄 Rebook
                      </Link>
                    </>
                  )}
                  {booking.status === 'Cancelled' && (
                    <Link
                      to="/reservation"
                      className="booking-btn booking-btn--rebook"
                    >
                      🔄 Book Again
                    </Link>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Cancel modal */}
      {showCancel && selected && (
        <div className="bookings-modal-overlay" onClick={() => setShowCancel(false)}>
          <div className="bookings-modal" onClick={e => e.stopPropagation()}>
            <div className="bookings-modal__icon">⚠️</div>
            <h2>Cancel Booking?</h2>
            <p>
              Are you sure you want to cancel your reservation at{' '}
              <strong>{selected.restaurant}</strong> on {selected.date} at {selected.time}?
            </p>
            <p className="bookings-modal__note">
              Note: Cancellations made less than 24 hours before the reservation may incur a fee.
            </p>
            <div className="bookings-modal__actions">
              <button
                className="booking-btn booking-btn--modify"
                onClick={() => setShowCancel(false)}
              >
                Keep Booking
              </button>
              <button
                className="booking-btn booking-btn--cancel"
                onClick={() => setShowCancel(false)}
              >
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