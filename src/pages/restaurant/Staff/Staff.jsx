import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Staff.css'

const staffMembers = [
  { id: 1, name: 'Marco Rossi',      role: 'Executive Chef',    shift: 'Morning', status: 'On Duty',  efficiency: 94, avatar: 'MR', phone: '+39 02 1234 001', email: 'marco@eataly.it'    },
  { id: 2, name: 'Sofia Bianchi',    role: 'Sous Chef',         shift: 'Morning', status: 'On Duty',  efficiency: 88, avatar: 'SB', phone: '+39 02 1234 002', email: 'sofia@eataly.it'    },
  { id: 3, name: 'Luca Ferrari',     role: 'Head Waiter',       shift: 'Evening', status: 'Off Duty', efficiency: 91, avatar: 'LF', phone: '+39 02 1234 003', email: 'luca@eataly.it'     },
  { id: 4, name: 'Elena Moretti',    role: 'Sommelier',         shift: 'Evening', status: 'On Duty',  efficiency: 96, avatar: 'EM', phone: '+39 02 1234 004', email: 'elena@eataly.it'    },
  { id: 5, name: 'Alessandro Ricci', role: 'Pastry Chef',       shift: 'Morning', status: 'On Leave', efficiency: 85, avatar: 'AR', phone: '+39 02 1234 005', email: 'alex@eataly.it'     },
  { id: 6, name: 'Giulia Romano',    role: 'Floor Manager',     shift: 'Evening', status: 'On Duty',  efficiency: 92, avatar: 'GR', phone: '+39 02 1234 006', email: 'giulia@eataly.it'   },
  { id: 7, name: 'Pietro Conti',     role: 'Bartender',         shift: 'Evening', status: 'On Duty',  efficiency: 89, avatar: 'PC', phone: '+39 02 1234 007', email: 'pietro@eataly.it'   },
  { id: 8, name: 'Francesca Gallo',  role: 'Host/Receptionist', shift: 'Morning', status: 'Off Duty', efficiency: 87, avatar: 'FG', phone: '+39 02 1234 008', email: 'fran@eataly.it'     },
]

const shifts = [
  { name: 'Morning Shift', time: '08:00 — 16:00', staff: 4, efficiency: 94 },
  { name: 'Evening Shift', time: '16:00 — 00:00', staff: 4, efficiency: 88 },
]

const stats = [
  { label: 'Total Staff',    value: 12,    icon: '👥', color: '#2A7A4B' },
  { label: 'On Duty',        value: 5,     icon: '✅', color: '#3B82F6' },
  { label: 'On Leave',       value: 1,     icon: '🏖️', color: '#F59E0B' },
  { label: 'Avg Efficiency', value: '91%', icon: '📊', color: '#8B5CF6' },
]

const Staff = () => {
  const [activeShift, setActiveShift] = useState('All')
  const [search,      setSearch]      = useState('')
  const [showAdd,     setShowAdd]     = useState(false)
  const [newStaff,    setNewStaff]    = useState({ name: '', role: '', shift: 'Morning', phone: '', email: '' })

  const filtered = staffMembers.filter(s => {
    const matchShift  = activeShift === 'All' || s.shift === activeShift
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                        s.role.toLowerCase().includes(search.toLowerCase())
    return matchShift && matchSearch
  })

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
          <Link to="/restaurant-orders"       className="dash-nav-item"><span>📦</span> Orders</Link>
          <Link to="/analytics"    className="dash-nav-item"><span>📊</span> Analytics</Link>
          <Link to="/staff"        className="dash-nav-item dash-nav-item--active"><span>👥</span> Staff</Link>
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
            <input
              type="text"
              placeholder="Search staff..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
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
          <div className="staff-header">
            <div>
              <h1 className="staff-title">Staff Management</h1>
              <p className="staff-subtitle">
                Manage your team, shifts, and performance across all roles.
              </p>
            </div>
            <button
              className="staff-add-btn"
              onClick={() => setShowAdd(true)}
            >
              + Add Staff Member
            </button>
          </div>

          {/* Stats */}
          <div className="staff-stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="staff-stat-card">
                <div
                  className="staff-stat-card__icon"
                  style={{ background: s.color + '20', color: s.color }}
                >
                  {s.icon}
                </div>
                <div>
                  <p className="staff-stat-card__value">{s.value}</p>
                  <p className="staff-stat-card__label">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Shift overview */}
          <div className="staff-shifts-row">
            {shifts.map((shift, i) => (
              <div key={i} className="staff-shift-card">
                <div className="staff-shift-card__header">
                  <div>
                    <h3>{shift.name}</h3>
                    <p>{shift.time}</p>
                  </div>
                  <span className="staff-shift-card__count">
                    {shift.staff} staff
                  </span>
                </div>
                <div className="staff-shift-progress">
                  <div className="staff-shift-progress__bar"
                    style={{ width: `${shift.efficiency}%` }}
                  />
                </div>
                <p className="staff-shift-progress__label">
                  {shift.efficiency}% Efficiency
                </p>
              </div>
            ))}
          </div>

          {/* Filter tabs + table */}
          <div className="dash-card">
            <div className="staff-table-header">
              <div className="staff-tabs">
                {['All', 'Morning', 'Evening'].map(tab => (
                  <button
                    key={tab}
                    className={`staff-tab ${activeShift === tab ? 'staff-tab--active' : ''}`}
                    onClick={() => setActiveShift(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button className="staff-export-btn">↓ Export Roster</button>
            </div>

            <table className="dash-table">
              <thead>
                <tr>
                  <th>STAFF MEMBER</th>
                  <th>ROLE</th>
                  <th>SHIFT</th>
                  <th>STATUS</th>
                  <th>EFFICIENCY</th>
                  <th>CONTACT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id}>
                    <td>
                      <div className="staff-member">
                        <div className="staff-member__avatar">{s.avatar}</div>
                        <div>
                          <p className="staff-member__name">{s.name}</p>
                          <p className="staff-member__email">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="staff-role">{s.role}</span>
                    </td>
                    <td>
                      <span className={`staff-shift staff-shift--${s.shift.toLowerCase()}`}>
                        {s.shift}
                      </span>
                    </td>
                    <td>
                      <span className={`staff-status staff-status--${s.status.toLowerCase().replace(' ', '-')}`}>
                        {s.status}
                      </span>
                    </td>
                    <td>
                      <div className="staff-efficiency">
                        <div className="staff-efficiency__bar">
                          <div
                            className="staff-efficiency__fill"
                            style={{ width: `${s.efficiency}%` }}
                          />
                        </div>
                        <span>{s.efficiency}%</span>
                      </div>
                    </td>
                    <td className="staff-phone">{s.phone}</td>
                    <td>
                      <div className="menu-icons">
                        <button className="menu-icon-btn">✏️</button>
                        <button className="menu-icon-btn">🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* Add Staff Modal */}
      {showAdd && (
        <div className="staff-modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="staff-modal" onClick={e => e.stopPropagation()}>
            <div className="staff-modal__header">
              <h2>Add Staff Member</h2>
              <button
                className="staff-modal__close"
                onClick={() => setShowAdd(false)}
              >
                ✕
              </button>
            </div>

            <div className="staff-modal__body">
              <div className="sup-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="sup-input"
                  placeholder="e.g. Marco Rossi"
                  value={newStaff.name}
                  onChange={e => setNewStaff({ ...newStaff, name: e.target.value })}
                />
              </div>
              <div className="sup-group">
                <label>Role</label>
                <input
                  type="text"
                  className="sup-input"
                  placeholder="e.g. Head Waiter"
                  value={newStaff.role}
                  onChange={e => setNewStaff({ ...newStaff, role: e.target.value })}
                />
              </div>
              <div className="adish-row">
                <div className="sup-group">
                  <label>Shift</label>
                  <select
                    className="sup-input"
                    value={newStaff.shift}
                    onChange={e => setNewStaff({ ...newStaff, shift: e.target.value })}
                  >
                    <option>Morning</option>
                    <option>Evening</option>
                  </select>
                </div>
                <div className="sup-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    className="sup-input"
                    placeholder="+39 02 ..."
                    value={newStaff.phone}
                    onChange={e => setNewStaff({ ...newStaff, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="sup-group">
                <label>Email</label>
                <input
                  type="email"
                  className="sup-input"
                  placeholder="name@eataly.it"
                  value={newStaff.email}
                  onChange={e => setNewStaff({ ...newStaff, email: e.target.value })}
                />
              </div>
            </div>

            <div className="staff-modal__footer">
              <button
                className="adish-btn-cancel"
                onClick={() => setShowAdd(false)}
              >
                Cancel
              </button>
              <button
                className="adish-btn-save"
                onClick={() => setShowAdd(false)}
              >
                Add Staff Member
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Staff