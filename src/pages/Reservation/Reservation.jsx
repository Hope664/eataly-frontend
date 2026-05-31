import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Reservation.css'

const tables = [
  { id: 1, label: '01', x: 18, y: 35, status: 'available' },
  { id: 2, label: '02', x: 35, y: 28, status: 'available' },
  { id: 3, label: '03', x: 50, y: 22, status: 'reserved'  },
  { id: 4, label: '04', x: 65, y: 28, status: 'available' },
  { id: 5, label: '05', x: 80, y: 35, status: 'available' },
  { id: 6, label: '06', x: 50, y: 55, status: 'available' },
  { id: 7, label: '🌟 VIP', x: 50, y: 38, status: 'vip'   },
]

const Reservation = () => {
  const [guests,       setGuests]       = useState(4)
  const [date,         setDate]         = useState('2023-10-24')
  const [timeSlot,     setTimeSlot]     = useState('19:30')
  const [selectedTable, setSelectedTable] = useState(7)

  const selectedTableData = tables.find(t => t.id === selectedTable)

  const getStatusClass = (table) => {
    if (table.id === selectedTable) return 'table-dot table-dot--selected'
    if (table.status === 'reserved')  return 'table-dot table-dot--reserved'
    if (table.status === 'vip')       return 'table-dot table-dot--vip'
    return 'table-dot table-dot--available'
  }

  return (
    <div className="res-page">

      {/* Navbar */}
      <nav className="res-nav">
        <span className="res-nav__logo">Eataly</span>
        <div className="res-nav__right">
          <span>🔔</span>
          <div className="res-nav__avatar">JD</div>
        </div>
      </nav>

      <div className="res-container">

        {/* Heading */}
        <h1 className="res-title">Reserve Your<br />Experience</h1>
        <p className="res-subtitle">
          Select your preferred table at Eataly Milano Smeralda.
          Each setting is crafted for an intimate and authentic Italian journey.
        </p>

        {/* Inputs */}
        <div className="res-inputs">

          {/* Guests */}
          <div className="res-input-group">
            <label>GUESTS</label>
            <div className="res-input-row">
              <span className="res-input-value">{String(guests).padStart(2, '0')}</span>
              <div className="res-qty-btns">
                <button onClick={() => setGuests(Math.max(1, guests - 1))}>−</button>
                <button onClick={() => setGuests(guests + 1)}>+</button>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="res-input-group">
            <label>DATE</label>
            <div className="res-input-row">
              <span className="res-input-value">
                {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="res-date-input"
              />
              <span className="res-input-icon">📅</span>
            </div>
          </div>

          {/* Time Slot */}
          <div className="res-input-group">
            <label>TIME SLOT</label>
            <div className="res-input-row">
              <span className="res-input-value">{timeSlot} PM</span>
              <input
                type="time"
                value={timeSlot}
                onChange={e => setTimeSlot(e.target.value)}
                className="res-date-input"
              />
              <span className="res-input-icon">🕐</span>
            </div>
          </div>

        </div>

        {/* Table Map */}
        <div className="res-map-card">

          {/* Legend */}
          <div className="res-legend">
            <span className="res-legend__item">
              <span className="res-dot res-dot--available" /> Available
            </span>
            <span className="res-legend__item">
              <span className="res-dot res-dot--reserved" /> Reserved
            </span>
            <span className="res-legend__item">
              <span className="res-dot res-dot--selected" /> Selected
            </span>
          </div>

          {/* Floor map */}
          <div className="res-floor">
            <p className="res-floor__label">FILTER SESSIONS</p>
            <div className="res-floor__map">
              {tables.map(table => (
                <button
                  key={table.id}
                  className={getStatusClass(table)}
                  style={{ left: `${table.x}%`, top: `${table.y}%` }}
                  onClick={() => table.status !== 'reserved' && setSelectedTable(table.id)}
                >
                  {table.label}
                </button>
              ))}
              <div className="res-floor__bar">MAIN PASTA BAR</div>
            </div>
          </div>

        </div>

        {/* Restaurant image */}
        <div className="res-restaurant-image">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
            alt="Eataly Milano Smeralda"
          />
          <span className="res-restaurant-badge">Premium Dining</span>
        </div>

        {/* Booking Summary */}
        <div className="res-summary">
          <div className="res-summary__row">
            <span className="res-summary__label">Eataly Milano Smeralda</span>
            <span className="res-summary__sub">📍 Piazza XXV Aprile, 10, Milano</span>
          </div>
          <div className="res-summary__details">
            <div className="res-summary__item">
              <span className="res-summary__key">Selected Table</span>
              <span className="res-summary__val">
                Table {selectedTableData?.label} — VIP Lounge
              </span>
            </div>
            <div className="res-summary__item">
              <span className="res-summary__key">Date & Time</span>
              <span className="res-summary__val">Oct 24, {timeSlot}</span>
            </div>
            <div className="res-summary__item">
              <span className="res-summary__key">Guests</span>
              <span className="res-summary__val">{guests} Adults</span>
            </div>
          </div>
        </div>

        {/* Deposit notice */}
        <div className="res-notice">
          <span>ℹ️</span>
          <p>A €25 deposit per guest is required for weekend reservations. This will be deducted from your final bill.</p>
        </div>

        {/* Confirm button */}
        <button className="res-confirm-btn">
          Confirm Booking →
        </button>
        <p className="res-terms">
          By confirming, you agree to our <a href="#">Terms & Cancellation Policy</a>
        </p>

        {/* Wine pairing suggestion */}
        <div className="res-wine-card">
          <div className="res-wine-card__left">
            <p className="res-wine-card__title">Add Wine Pairing?</p>
            <p className="res-wine-card__sub">
              Explore our sommelier's curated selections for your evening.
            </p>
          </div>
          <span className="res-wine-card__icon">🍷</span>
        </div>

      </div>

      {/* Bottom tab bar */}
      <div className="res-tabbar">
        <Link to="/explore"     className="res-tab">🔍<span>Explore</span></Link>
        <Link to="/orders"      className="res-tab">📦<span>Orders</span></Link>
        <Link to="/reservation" className="res-tab res-tab--active">📅<span>Bookings</span></Link>
        <Link to="/profile"     className="res-tab">👤<span>Profile</span></Link>
      </div>

    </div>
  )
}

export default Reservation