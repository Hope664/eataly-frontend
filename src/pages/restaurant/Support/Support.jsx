import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Support.css'

const faqs = [
  { id: 1, question: 'How do I add a new menu item?',                answer: 'Go to Menu → Add New Dish. Fill in the dish name, category, price, description and upload an image. Click Save Dish when done.' },
  { id: 2, question: 'How do I manage reservations?',               answer: 'Navigate to the Reservations page. You can Accept or Decline bookings, view customer preferences, and track table assignments in real time.' },
  { id: 3, question: 'How do I export my orders report?',           answer: 'Go to Orders page and click the Export Orders button at the top right. Your report will be downloaded as a CSV file.' },
  { id: 4, question: 'How do I update my restaurant information?',  answer: 'Go to Settings → Venue Profile. Update your restaurant name, cuisine type, description, opening hours, and contact details. Click Save Changes.' },
  { id: 5, question: 'How do I manage my staff roster?',            answer: 'Navigate to the Staff page. You can add new staff members, assign roles, manage shifts, and track efficiency from the Staff Management dashboard.' },
]

const tickets = [
  { id: 1, subject: 'Payment gateway issue',     status: 'Open',     priority: 'High',   time: '2 hours ago'   },
  { id: 2, subject: 'Menu image not uploading',  status: 'Resolved', priority: 'Medium', time: '1 day ago'     },
  { id: 3, subject: 'Reservation sync error',    status: 'Pending',  priority: 'High',   time: '3 days ago'    },
]

const Support = () => {
  const [openFaq,  setOpenFaq]  = useState(null)
  const [form,     setForm]     = useState({ subject: '', category: 'Technical', message: '' })
  const [sent,     setSent]     = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ subject: '', category: 'Technical', message: '' })
  }

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
          <Link to="/staff"        className="dash-nav-item"><span>👥</span> Staff</Link>
        </nav>
        <div className="dash-sidebar__bottom">
          <button className="dash-manage-btn">Manage Bookings</button>
          <Link to="/settings" className="dash-nav-item"><span>⚙️</span> Settings</Link>
          <Link to="/support"  className="dash-nav-item dash-nav-item--active"><span>💬</span> Support</Link>
        </div>
      </aside>

      {/* Main */}
      <div className="dash-main">

        {/* Navbar */}
        <nav className="dash-nav">
          <div className="dash-nav__search">
            <span>🔍</span>
            <input type="text" placeholder="Search support articles..." />
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
          <div className="sup-header">
            <div>
              <h1 className="sup-title">Support Center</h1>
              <p className="sup-subtitle">
                Get help with your venue management system.
              </p>
            </div>
            <div className="sup-header__badge">
              <span>🟢</span>
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Quick help cards */}
          <div className="sup-quick-grid">
            <div className="sup-quick-card">
              <span className="sup-quick-card__icon">📚</span>
              <h3>Documentation</h3>
              <p>Browse our full guide to using Eataly SaaS</p>
              <button className="sup-quick-btn">View Docs</button>
            </div>
            <div className="sup-quick-card">
              <span className="sup-quick-card__icon">💬</span>
              <h3>Live Chat</h3>
              <p>Chat with our support team in real time</p>
              <button className="sup-quick-btn sup-quick-btn--green">Start Chat</button>
            </div>
            <div className="sup-quick-card">
              <span className="sup-quick-card__icon">📧</span>
              <h3>Email Support</h3>
              <p>Send us an email and we'll respond within 24h</p>
              <button className="sup-quick-btn">Send Email</button>
            </div>
            <div className="sup-quick-card">
              <span className="sup-quick-card__icon">📞</span>
              <h3>Phone Support</h3>
              <p>Call us Mon-Fri 9AM-6PM CET</p>
              <button className="sup-quick-btn">+39 02 1234 567</button>
            </div>
          </div>

          {/* Middle row — FAQ + Ticket form */}
          <div className="sup-middle-row">

            {/* FAQ */}
            <div className="dash-card">
              <div className="dash-card__header">
                <h3>Frequently Asked Questions</h3>
              </div>
              <div className="sup-faqs">
                {faqs.map(faq => (
                  <div key={faq.id} className="sup-faq">
                    <button
                      className={`sup-faq__question ${openFaq === faq.id ? 'sup-faq__question--open' : ''}`}
                      onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    >
                      <span>{faq.question}</span>
                      <span className="sup-faq__arrow">
                        {openFaq === faq.id ? '▲' : '▼'}
                      </span>
                    </button>
                    {openFaq === faq.id && (
                      <div className="sup-faq__answer">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit ticket */}
            <div className="dash-card">
              <div className="dash-card__header">
                <h3>Submit a Ticket</h3>
              </div>

              {sent && (
                <div className="sup-success">
                  ✅ Ticket submitted! We'll get back to you within 24 hours.
                </div>
              )}

              <form onSubmit={handleSubmit} className="sup-form">
                <div className="sup-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="sup-input"
                    placeholder="Brief description of your issue"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="sup-group">
                  <label>Category</label>
                  <select
                    name="category"
                    className="sup-input"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option>Technical</option>
                    <option>Billing</option>
                    <option>Reservations</option>
                    <option>Menu</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="sup-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    className="sup-input sup-textarea"
                    placeholder="Describe your issue in detail..."
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                  />
                </div>

                <button type="submit" className="sup-submit-btn">
                  Submit Ticket →
                </button>
              </form>
            </div>

          </div>

          {/* Recent tickets */}
          <div className="dash-card sup-tickets">
            <div className="dash-card__header">
              <h3>Recent Tickets</h3>
              <a href="#" className="dash-view-all">View All →</a>
            </div>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>TICKET ID</th>
                  <th>SUBJECT</th>
                  <th>STATUS</th>
                  <th>PRIORITY</th>
                  <th>SUBMITTED</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map(t => (
                  <tr key={t.id}>
                    <td className="sup-ticket-id">#TKT-{String(t.id).padStart(4, '0')}</td>
                    <td>{t.subject}</td>
                    <td>
                      <span className={`sup-status sup-status--${t.status.toLowerCase()}`}>
                        {t.status}
                      </span>
                    </td>
                    <td>
                      <span className={`sup-priority sup-priority--${t.priority.toLowerCase()}`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="dash-time">{t.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Support