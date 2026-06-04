import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { restaurantAPI, orderAPI, bookingAPI } from '../../../services/api'
import './Dashboard.css'

// ── Fallback static data (shown while loading or on error) ──
const peakData = [
  { hour: '6PM',  value: 30 },
  { hour: '7PM',  value: 55 },
  { hour: '8PM',  value: 90 },
  { hour: '9PM',  value: 70 },
  { hour: '10PM', value: 40 },
]

const maxRevenue = (data) => Math.max(...data.map(d => d.value), 1)

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('weekly')

  // ── Data state ────────────────────────────────────────
  const [restaurant, setRestaurant]   = useState(null)
  const [revenueData, setRevenueData] = useState(null)
  const [orders, setOrders]           = useState([])
  const [activities, setActivities]   = useState([])
  const [stats, setStats]             = useState({ revenue: 0, reservations: 0, capacity: 0 })
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)

  // ── Fetch all dashboard data ──────────────────────────
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true)
        setError(null)

        // 1. Get the owner's restaurant
        const restaurantRes = await restaurantAPI.getMyRestaurant()
        const rest = restaurantRes.data.restaurant || restaurantRes.data
        setRestaurant(rest)

        // 2. Fetch recent orders for this restaurant
        const ordersRes = await orderAPI.getAll({ restaurantId: rest._id, limit: 5 })
        const fetchedOrders = ordersRes.data.orders || ordersRes.data || []
        setOrders(fetchedOrders)

        // 3. Fetch today's bookings for stats
        const today = new Date().toISOString().split('T')[0]
        const bookingsRes = await bookingAPI.getAll({ restaurantId: rest._id, date: today })
        const bookings = bookingsRes.data.bookings || bookingsRes.data || []

        // 4. Build stats from real data
        const todayRevenue = fetchedOrders
          .filter(o => o.status === 'paid' || o.status === 'completed')
          .reduce((sum, o) => sum + (o.total || 0), 0)

        const totalGuests = bookings.reduce((sum, b) => sum + (b.guests || b.partySize || 0), 0)
        const occupiedTables = bookings.filter(b => b.status === 'seated' || b.status === 'confirmed').length
        const capacity = rest.totalTables
          ? Math.round((occupiedTables / rest.totalTables) * 100)
          : 0

        setStats({
          revenue: todayRevenue,
          reservations: totalGuests,
          capacity,
          occupiedTables,
          totalTables: rest.totalTables || 0,
        })

        // 5. Build activity feed from orders + bookings
        const feed = [
          ...bookings.slice(0, 2).map(b => ({
            id:    b._id,
            icon:  '📅',
            color: '#2A7A4B',
            title: 'New Reservation',
            desc:  `Table for ${b.guests || b.partySize}, ${b.customerName || 'Guest'}`,
            time:  timeAgo(b.createdAt),
          })),
          ...fetchedOrders.slice(0, 2).map(o => ({
            id:    o._id,
            icon:  '🍽️',
            color: '#F59E0B',
            title: 'New Order',
            desc:  `${o.items?.length || 0} items — ${formatCurrency(o.total)}`,
            time:  timeAgo(o.createdAt),
          })),
        ].sort((a, b) => new Date(b.rawTime) - new Date(a.rawTime))

        setActivities(feed.length ? feed : FALLBACK_ACTIVITIES)

        // 6. Build revenue chart data (grouped by day this week)
        setRevenueData(buildRevenueData(fetchedOrders))

      } catch (err) {
        console.error('Dashboard fetch error:', err)
        setError('Failed to load dashboard data')
        // Keep fallback static data visible
        setActivities(FALLBACK_ACTIVITIES)
        setRevenueData(FALLBACK_REVENUE)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const currentData = revenueData?.[activeTab] || FALLBACK_REVENUE[activeTab]
  const maxVal      = maxRevenue(currentData)

  // ── User display helpers ──────────────────────────────
  const userName    = user?.name || 'Chef'
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const restaurantName = restaurant?.name || 'Eataly'

  return (
    <div className="dash-layout">

      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar__brand">
          <p className="dash-sidebar__name">{restaurantName}</p>
          <p className="dash-sidebar__sub">Luxury Venue Management</p>
        </div>

        <nav className="dash-sidebar__nav">
          <Link to="/dashboard"         className="dash-nav-item dash-nav-item--active">
            <span>▦</span> Dashboard
          </Link>
          <Link to="/reservations"      className="dash-nav-item">
            <span>📅</span> Reservations
          </Link>
          <Link to="/menu"              className="dash-nav-item">
            <span>🍽️</span> Menu
          </Link>
          <Link to="/restaurant-orders" className="dash-nav-item">
            <span>📦</span> Orders
          </Link>
          <Link to="/analytics"         className="dash-nav-item">
            <span>📊</span> Analytics
          </Link>
          <Link to="/staff"             className="dash-nav-item">
            <span>👥</span> Staff
          </Link>
        </nav>

        <div className="dash-sidebar__bottom">
          <Link to="/reservations" className="dash-manage-btn" style={{ textDecoration: 'none', textAlign: 'center' }}>
            Manage Bookings
          </Link>
          <Link to="/settings" className="dash-nav-item">
            <span>⚙️</span> Settings
          </Link>
          <Link to="/support" className="dash-nav-item">
            <span>💬</span> Support
          </Link>
          <button onClick={handleLogout} className="dash-nav-item dash-logout-btn">
            <span>🚪</span> Logout
          </button>
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
            <Link to="/notifications" className="dash-nav__icon" title="Notifications">🔔</Link>
            <Link to="/settings"      className="dash-nav__icon" title="Settings">⚙️</Link>
            <div className="dash-nav__user">
              <div>
                <p className="dash-nav__user-name">{userName}</p>
                <p className="dash-nav__user-role">
                  {user?.role === 'restaurant_owner' ? 'Restaurant Owner' : 'Manager'}
                </p>
              </div>
              <div className="dash-nav__avatar">{userInitials}</div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="dash-content">

          {/* Error banner */}
          {error && (
            <div className="dash-error-banner">
              ⚠️ {error} — showing cached data
            </div>
          )}

          {/* Welcome banner */}
          <div className="dash-banner">
            <div className="dash-banner__left">
              <h1 className="dash-banner__title">
                {loading ? 'Loading...' : `Welcome back, ${userName.split(' ')[0]}`}
              </h1>
              <p className="dash-banner__sub">
                {stats.capacity > 0
                  ? `Your venue is at ${stats.capacity}% capacity tonight.`
                  : 'Your venue dashboard is ready.'
                }<br />
                {restaurant?.description || 'Manage orders, reservations and more.'}
              </p>
              <div className="dash-banner__stats">
                <div className="dash-banner__stat">
                  <p className="dash-banner__stat-label">TODAY'S REVENUE</p>
                  <p className="dash-banner__stat-value">
                    {loading ? '...' : formatCurrency(stats.revenue)}
                  </p>
                </div>
                <div className="dash-banner__stat">
                  <p className="dash-banner__stat-label">LIVE RESERVATIONS</p>
                  <p className="dash-banner__stat-value">
                    {loading ? '...' : `${stats.reservations} Guests`}
                  </p>
                </div>
                {stats.totalTables > 0 && (
                  <div className="dash-banner__stat">
                    <p className="dash-banner__stat-label">TABLES</p>
                    <p className="dash-banner__stat-value">
                      {stats.occupiedTables}/{stats.totalTables}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Peak hour chart */}
            <div className="dash-banner__chart">
              <p className="dash-banner__chart-title">Peak Hour<br />Prediction</p>
              <div className="css-chart">
                {peakData.map((d, i) => (
                  <div key={i} className="css-chart__bar-wrap">
                    <div className="css-chart__bar" style={{ height: `${d.value}%` }} />
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
                  <p>Performance analysis</p>
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
                {loading
                  ? <p className="dash-loading-text">Loading activity...</p>
                  : activities.map(a => (
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
                  ))
                }
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="dash-bottom">

            {/* Recent Orders */}
            <div className="dash-card dash-orders">
              <div className="dash-card__header">
                <h3>Recent Orders</h3>
                <Link to="/restaurant-orders" className="dash-view-all">View All →</Link>
              </div>
              {loading ? (
                <p className="dash-loading-text">Loading orders...</p>
              ) : orders.length === 0 ? (
                <p className="dash-empty-text">No orders yet today.</p>
              ) : (
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
                      <tr
                        key={o._id}
                        onClick={() => navigate(`/order-details/${o._id}`)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>
                          <div className="dash-customer">
                            <div className="dash-customer__avatar">
                              {getInitials(o.customerName || o.customer?.name || 'Guest')}
                            </div>
                            <span>{o.customerName || o.customer?.name || 'Guest'}</span>
                          </div>
                        </td>
                        <td>{o.tableNumber ? `Table ${o.tableNumber}` : o.type || 'Dine In'}</td>
                        <td>
                          <span className={`dash-status ${getStatusClass(o.status)}`}>
                            {o.status}
                          </span>
                        </td>
                        <td><strong>{formatCurrency(o.total)}</strong></td>
                        <td className="dash-time">{timeAgo(o.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
              <Link to="/staff" className="dash-roster-btn" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                Manage Rosters
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Helper functions ──────────────────────────────────────
const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '—'
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    maximumFractionDigits: 0,
  }).format(amount)
}

const timeAgo = (dateStr) => {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  if (mins < 1)   return 'Just now'
  if (mins < 60)  return `${mins} mins ago`
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  return new Date(dateStr).toLocaleDateString()
}

const getInitials = (name) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

const getStatusClass = (status) => {
  const map = {
    'in-progress': 'status--progress',
    pending:       'status--pending',
    seated:        'status--seated',
    completed:     'status--seated',
    cancelled:     'status--pending',
    paid:          'status--seated',
  }
  return map[status?.toLowerCase()] || 'status--pending'
}

// Group orders by day/week/month for revenue chart
const buildRevenueData = (orders) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const daily = days.map(day => ({ day, value: 0 }))

  orders.forEach(o => {
    const d = new Date(o.createdAt)
    const dayIdx = d.getDay()
    daily[dayIdx].value += o.total || 0
  })

  return {
    daily,
    weekly: [
      { day: 'Wk1', value: 0 },
      { day: 'Wk2', value: 0 },
      { day: 'Wk3', value: 0 },
      { day: 'Wk4', value: 0 },
    ],
    monthly: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      .map(day => ({ day, value: 0 })),
  }
}

// ── Fallback static data ──────────────────────────────────
const FALLBACK_ACTIVITIES = [
  { id: 1, icon: '📅', color: '#2A7A4B', title: 'New Reservation',  desc: 'Table for 6 at 8:30 PM',          time: '2 mins ago'  },
  { id: 2, icon: '🍳', color: '#F59E0B', title: 'Kitchen Update',   desc: 'Item is now out of stock',         time: '15 mins ago' },
  { id: 3, icon: '⭐', color: '#3B82F6', title: 'New Review',       desc: 'Incredible service — 5 Stars',     time: '1 hour ago'  },
  { id: 4, icon: '💰', color: '#8B5CF6', title: 'Payout Processed', desc: 'Transferred to bank account',      time: '2 hours ago' },
]

const FALLBACK_REVENUE = {
  daily:   ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day => ({ day, value: 0 })),
  weekly:  ['Wk1','Wk2','Wk3','Wk4'].map(day => ({ day, value: 0 })),
  monthly: ['Jan','Feb','Mar','Apr','May','Jun'].map(day => ({ day, value: 0 })),
}

export default Dashboard