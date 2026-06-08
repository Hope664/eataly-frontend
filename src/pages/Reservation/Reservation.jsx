import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { bookingAPI, restaurantAPI } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import './Reservation.css'

const TIME_SLOTS = [
  '11:00', '11:30', '12:00', '12:30', '13:00',
  '17:00', '17:30', '18:00', '18:30', '19:00',
  '19:30', '20:00', '20:30', '21:00',
]

const Reservation = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState('')
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedTable, setSelectedTable] = useState(null)
  const [takenTables, setTakenTables] = useState([])
  const [guests, setGuests] = useState(2)
  const [customerPhone, setCustomerPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [resolvedRestaurantId, setResolvedRestaurantId] = useState('')

  const restaurantId = resolvedRestaurantId || localStorage.getItem('selectedRestaurantId') || '1'

  useEffect(() => {
    if (restaurantId !== '1') {
      setResolvedRestaurantId(restaurantId)
      return
    }
    restaurantAPI.getAll()
      .then(res => {
        const list = res.data.restaurants || res.data || []
        if (list.length > 0) {
          const first = list[0]._id || list[0].id
          setResolvedRestaurantId(first)
          localStorage.setItem('selectedRestaurantId', String(first))
        }
      })
      .catch(() => {})
  }, [])

  const calendarDays = (() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startPad = firstDay.getDay()
    const daysInMonth = lastDay.getDate()
    const days = []
    for (let i = 0; i < startPad; i++) days.push(null)
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      const dateObj = new Date(year, month, d)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const isPast = dateObj < today
      days.push({ day: d, dateStr, isPast, isToday: dateStr === today.toISOString().split('T')[0] })
    }
    return days
  })()

  useEffect(() => {
    if (!selectedDate || !selectedTime || !resolvedRestaurantId) {
      setTakenTables([])
      return
    }

    const fetchAvailability = async () => {
      setLoading(true)
      setSelectedTable(null)
      try {
        const res = await bookingAPI.checkAvailability(resolvedRestaurantId, { date: selectedDate, timeSlot: selectedTime })
        setTakenTables(res.data.tables?.filter(t => !t.isAvailable).map(t => t.tableNumber) || [])
      } catch {
        setTakenTables([])
      }
      setLoading(false)
    }

    fetchAvailability()
  }, [selectedDate, selectedTime, resolvedRestaurantId])

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleDayClick = (day) => {
    if (day?.isPast) return
    setSelectedDate(day?.dateStr || '')
    setShowCalendar(false)
  }

  const handleConfirm = async (e) => {
    e.preventDefault()
    setError('')

    if (!selectedDate || !selectedTime) {
      setError('Please select both date and time')
      return
    }
    if (!selectedTable) {
      setError('Please select a table')
      return
    }

    setSubmitting(true)
    try {
      await bookingAPI.create(restaurantId, {
        tableNumber: selectedTable,
        date: selectedDate,
        timeSlot: selectedTime,
        guestCount: guests,
        customerName: user?.name || 'Guest',
        customerEmail: user?.email || '',
        customerPhone: customerPhone,
        specialRequests: specialRequests,
      })
      localStorage.removeItem('selectedRestaurantId')
      navigate('/bookings')
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.')
      setSubmitting(false)
    }
  }

  const formatDate = (val) => {
    if (!val) return 'Select date'
    return new Date(val).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatTime = (val) => {
    if (!val) return ''
    const [h, m] = val.split(':').map(Number)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const hh = h % 12 || 12
    return `${hh}:${String(m).padStart(2, '0')} ${ampm}`
  }

  const monthLabel = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

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

        <h1 className="res-title">Reserve Your<br />Experience</h1>
        {error && <div className="res-error">⚠️ {error}</div>}

        <form onSubmit={handleConfirm}>

          {/* Date - hidden until clicked */}
          <div className="res-input-group res-date-trigger" onClick={() => setShowCalendar(!showCalendar)}>
            <label>DATE</label>
            <div className="res-input-row">
              <span className="res-input-value">{formatDate(selectedDate)}</span>
              <span className="res-input-icon">{showCalendar ? '▾' : '▸'}</span>
            </div>
          </div>

          {showCalendar && (
            <div className="res-calendar-card">
              <div className="res-calendar">
                <div className="res-calendar__header">
                  <button type="button" className="res-calendar__arrow" onClick={handlePrevMonth}>‹</button>
                  <span className="res-calendar__month">{monthLabel}</span>
                  <button type="button" className="res-calendar__arrow" onClick={handleNextMonth}>›</button>
                </div>
                <div className="res-calendar__weekdays">
                  {weekDays.map(d => <span key={d}>{d}</span>)}
                </div>
                <div className="res-calendar__grid">
                  {calendarDays.map((day, idx) => {
                    const isSelected = day?.dateStr === selectedDate
                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={day?.isPast}
                        className={`res-calendar__day ${day?.isPast ? 'res-calendar__day--past' : ''} ${isSelected ? 'res-calendar__day--selected' : ''} ${day?.isToday ? 'res-calendar__day--today' : ''}`}
                        onClick={() => handleDayClick(day)}
                      >
                        {day?.day || ''}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Guests */}
          <div className="res-input-group">
            <label>GUESTS</label>
            <div className="res-input-row">
              <span className="res-input-value">{String(guests).padStart(2, '0')}</span>
              <div className="res-qty-btns">
                <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))}>−</button>
                <button type="button" onClick={() => setGuests(guests + 1)}>+</button>
              </div>
            </div>
          </div>

          {/* Time - flexible native picker so user can enter any time e.g. 5:45 */}
          <div className="res-input-group">
            <label>TIME</label>
            <div className="res-input-row">
              <input
                type="time"
                value={selectedTime}
                onChange={e => setSelectedTime(e.target.value)}
                className="res-time-input"
                required
              />
              {selectedTime && (
                <span className="res-time-display">{formatTime(selectedTime)}</span>
              )}
            </div>
          </div>

          {/* Phone (required by backend) */}
          <div className="res-input-group">
            <label>PHONE NUMBER</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={e => setCustomerPhone(e.target.value)}
              className="res-phone-input"
              placeholder="+39 000 000 0000"
              required
            />
          </div>

          {/* Table selection */}
          <div className="res-map-card">
            <h3 className="res-section__title">Select Table</h3>
            <div className="res-legend">
              <span className="res-legend__item"><span className="res-dot res-dot--available" /> Available</span>
              <span className="res-legend__item"><span className="res-dot res-dot--selected" /> Selected</span>
              <span className="res-legend__item"><span className="res-dot res-dot--reserved" /> Taken</span>
            </div>

            {!selectedDate || !selectedTime ? (
              <p className="res-floor__hint">Select a date and time first to see available tables.</p>
            ) : loading ? (
              <p className="res-floor__loading">Loading tables...</p>
            ) : (
              <div className="res-floor__map">
                {[1, 2, 3, 4, 5, 6].map((num) => {
                  const isTaken = takenTables.includes(num)
                  const isSelected = selectedTable === num
                  const positions = [
                    { x: 18, y: 35 }, { x: 35, y: 28 }, { x: 50, y: 22 },
                    { x: 65, y: 28 }, { x: 80, y: 35 }, { x: 50, y: 55 },
                  ]
                  return (
                    <button
                      key={num}
                      type="button"
                      className={`table-dot ${isSelected ? 'table-dot--selected' : isTaken ? 'table-dot--reserved' : 'table-dot--available'}`}
                      style={{ left: `${positions[num - 1].x}%`, top: `${positions[num - 1].y}%` }}
                      disabled={isTaken}
                      onClick={() => !isTaken && setSelectedTable(num)}
                    >
                      {String(num).padStart(2, '0')}
                    </button>
                  )
                })}
                <div className="res-floor__bar">MAIN DINING AREA</div>
              </div>
            )}
          </div>

          {/* Summary */}
          {(selectedDate || selectedTime || selectedTable) && (
            <div className="res-summary">
              <div className="res-summary__row">
                <span className="res-summary__label">Booking Summary</span>
              </div>
              <div className="res-summary__details">
                <div className="res-summary__item">
                  <span className="res-summary__key">Date</span>
                  <span className="res-summary__val">📅 {formatDate(selectedDate)}</span>
                </div>
                <div className="res-summary__item">
                  <span className="res-summary__key">Time</span>
                  <span className="res-summary__val">🕐 {selectedTime ? formatTime(selectedTime) : '—'}</span>
                </div>
                <div className="res-summary__item">
                  <span className="res-summary__key">Guests</span>
                  <span className="res-summary__val">{guests} Adults</span>
                </div>
                <div className="res-summary__item">
                  <span className="res-summary__key">Table</span>
                  <span className="res-summary__val">{selectedTable ? `Table ${String(selectedTable).padStart(2, '0')}` : '—'}</span>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="res-confirm-btn"
            disabled={submitting || loading || !resolvedRestaurantId || !selectedDate || !selectedTime || !selectedTable}
          >
            {submitting ? 'Confirming...' : 'Confirm Booking →'}
          </button>
          <p className="res-terms">
            By confirming, you agree to our <a href="#">Terms & Cancellation Policy</a>
          </p>

        </form>
      </div>

      {/* Bottom tab bar */}
      <div className="res-tabbar">
        <Link to="/explore"   className="res-tab">🔍<span>Explore</span></Link>
        <Link to="/orders"    className="res-tab">📦<span>Orders</span></Link>
        <Link to="/bookings"  className="res-tab res-tab--active">📅<span>Bookings</span></Link>
        <Link to="/profile"   className="res-tab">👤<span>Profile</span></Link>
      </div>

    </div>
  )
}

export default Reservation
