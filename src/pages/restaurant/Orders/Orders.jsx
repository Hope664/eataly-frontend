import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Orders.css'


const orders = [
  { id: 1, invoice: 'INV-5012', customer: 'Olivia Rhye',    avatar: 'OR', order: 'Berry Smoothie x2',  table: 'A1', tableColor: 'green',  payment: 'Card',         status: 'Paid'      },
  { id: 2, invoice: 'INV-5013', customer: 'Phoenix Baker',  avatar: 'PB', order: 'Chocolate Cake',     table: 'B2', tableColor: 'pink',   payment: 'Cash',         status: 'Pending'   },
  { id: 3, invoice: 'INV-5014', customer: 'Lana Steiner',   avatar: 'LS', order: 'Mango Passion',      table: 'C1', tableColor: 'green',  payment: 'Mobile Money', status: 'Paid'      },
  { id: 4, invoice: 'INV-5015', customer: 'Candice Wu',     avatar: 'CW', order: 'Chicken Wings',      table: 'D4', tableColor: 'pink',   payment: 'Card',         status: 'Canceled'  },
  { id: 5, invoice: 'INV-5012', customer: 'Olivia Rhye',    avatar: 'OR', order: 'Berry Smoothie x2',  table: 'A1', tableColor: 'green',  payment: 'Card',         status: 'Paid'      },
  { id: 6, invoice: 'INV-5012', customer: 'Olivia Rhye',    avatar: 'OR', order: 'Berry Smoothie x2',  table: 'A1', tableColor: 'green',  payment: 'Card',         status: 'Paid'      },
]

const Orders = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = orders.filter(o =>
    o.customer.toLowerCase().includes(search.toLowerCase()) ||
    o.invoice.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="ro-layout">

      {/* Dark green sidebar */}
      <aside className="ro-sidebar">
        <div className="ro-sidebar__logo">
          <h1>Eataly</h1>
        </div>

        <nav className="ro-sidebar__nav">
          <Link to="/dashboard"          className="ro-nav-item">
            <span>▦</span> Overview
          </Link>
          <Link to="/reservations"            className="ro-nav-item">
            <span>👤</span> Reservation
          </Link>
          <Link to="/menu"              className="ro-nav-item">
            <span>👥</span> Menu
          </Link>
          <Link to="/restaurant-orders"               className="ro-nav-item">
            <span>🍽️</span> Orders
          </Link>
          <Link to="/analytics"  className="ro-nav-item ro-nav-item--active">
            <span>📋</span> Analytics
          </Link>
          <Link to="/staff"  className="ro-nav-item ro-nav-item--active">
            <span>📋</span> Staff
          </Link>
        </nav>

        <div className="ro-sidebar__bottom">
          <Link to="/settings"   className="ro-nav-item"><span>⚙️</span> Settings</Link>
          <Link to="/support" className="ro-nav-item"><span>💬</span>Support</Link>
          <div className="ro-sidebar__user">
            <div className="ro-sidebar__avatar">JD</div>
            <div>
              <p className="ro-sidebar__name">John Doe</p>
              <p className="ro-sidebar__email">owner@eataly.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="ro-main">

        {/* Header */}
        <div className="ro-header">
          <div>
            <h1 className="ro-title">Restaurant Orders</h1>
            <p className="ro-subtitle">Track customer purchases, reservations and payment activity</p>
          </div>
          <button className="ro-export-btn">Export Orders</button>
        </div>

        {/* Filters */}
        <div className="ro-filters">
          <div className="ro-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search by invoice or customer"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="ro-filter-group">
            <span className="ro-filter-label">Payment Status</span>
            <button className="ro-filter-pill ro-filter-pill--active">
              <span className="ro-filter-dot" /> Paid
            </button>
          </div>
          <div className="ro-filter-group">
            <span className="ro-filter-label">Order Type</span>
            <button className="ro-filter-pill ro-filter-pill--active">Dine In</button>
          </div>
          <div className="ro-filter-group">
            <span className="ro-filter-label">Date</span>
            <button className="ro-filter-pill ro-filter-pill--active">Today</button>
          </div>
        </div>

        {/* Table */}
        <div className="ro-table-wrap">
          <table className="ro-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Order</th>
                <th>Table</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} onClick={() => navigate(`/order-detail/${o.id}`)} className="ro-table-row">
                  <td className="ro-invoice">{o.invoice}</td>
                  <td>
                    <div className="ro-customer">
                      <div className="ro-customer__avatar">{o.avatar}</div>
                      <span>{o.customer}</span>
                    </div>
                  </td>
                  <td className="ro-order">{o.order}</td>
                  <td>
                    <span className={`ro-table-pill ro-table-pill--${o.tableColor}`}>
                      {o.table}
                    </span>
                  </td>
                  <td className="ro-payment">{o.payment}</td>
                  <td>
                    <span className={`ro-status ro-status--${o.status.toLowerCase()}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom stats bar */}
        <div className="ro-stats-bar">
          <div className="ro-stat ro-stat--light">
            <span>Tables Occupied</span>
            <span className="ro-stat__value ro-stat__value--green">18/32</span>
          </div>
          <div className="ro-stat ro-stat--light">
            <span>Today's Revenue</span>
            <span className="ro-stat__value ro-stat__value--green">850K</span>
          </div>
          <div className="ro-stat ro-stat--dark">
            <span>Reservations Today</span>
            <span className="ro-stat__value ro-stat__value--white">12</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Orders