import './Profile.css'
import { Link } from 'react-router-dom'

const savedRestaurants = [
  { id: 1, name: "Eataly Trastevere", cuisine: "Italian", rating: 4.8, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400" },
  { id: 2, name: "La Pizza & La Pasta", cuisine: "Pizzeria", rating: 4.6, image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400" },
  { id: 3, name: "Serra Rooftop", cuisine: "Rooftop", rating: 4.9, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400" },
]

const reservations = [
  { id: 1, restaurant: "Eataly", datetime: "Oct 17, 2023 · 7:30 PM", guests: "2 People", status: "Completed", rating: "★★★★★" },
  { id: 2, restaurant: "Bar Atlantico", datetime: "Sep 28, 2023 · 7:30 PM", guests: "4 People", status: "Completed", rating: "★★★★" },
]

const orders = [
  { id: 1, item: "Chicken · Chorizo Brie", orderId: "multi", date: "Oct 20, 2023", total: "$34.00", type: "Dine-in", action: "Re-order" },
  { id: 2, item: "Pappardelle all'Funghi", orderId: "multi", date: "Sep 25, 2023", total: "$22.00", type: "Pickup", action: "Re-order" },
]

const favoriteMeals = [
  { id: 1, name: "Tagliatelle alla Bolognese", tag: "PASTA FRESCA", description: "Fresh-rolled egg pasta with hearty ragu plus the la su buche a portie tab", image: "https://images.unsplash.com/photo-1551183053-bf91798b4ded?w=600", big: true },
  { id: 2, name: "Burrata e Pomodoro", tag: "", description: "", image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400", big: false },
  { id: 3, name: "Classic Tiramisu", tag: "", description: "", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400", big: false },
]

const Profile = () => {
  return (
    <div className="profile-layout">

      {/* Sidebar */}
      <aside className="profile-sidebar">
        <div className="sidebar__logo">
          <span>🍽️</span>
          <span>Eataly</span>
        </div>

        <nav className="sidebar__nav">
          <Link to="/explore" className="sidebar__item">
            <span>🔍</span> Explore
          </Link>
          <Link to="/orders" className="sidebar__item">
            <span>📦</span> Orders
          </Link>
          <Link to="/bookings" className="sidebar__item">
            <span>📅</span> Bookings
          </Link>
          <Link to="/profile" className="sidebar__item sidebar__item--active">
            <span>👤</span> Profile
          </Link>
          <Link to="/cooking" className="sidebar__item">
            <span>👨‍🍳</span> Cooking Classes
          </Link>
        </nav>

        <div className="sidebar__bottom">
          <Link to="/settings" className="sidebar__item">
            <span>⚙️</span> Settings
          </Link>
          <Link to="/pages" className="sidebar__item">
            <span>📄</span> Pages
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="profile-main">

        {/* Profile header */}
        <div className="profile-header">
          <div className="profile-header__left">
            <div className="profile-header__avatar">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" alt="avatar" />
            </div>
            <div className="profile-header__info">
              <h2>John Doe</h2>
              <p>Member Since 2021 · johndoe@eataly.com</p>
              <div className="profile-header__tags">
                <span className="profile-tag profile-tag--green">✅ Loyalty Gold 2021</span>
                <span className="profile-tag profile-tag--gray">📍 Downtown Available</span>
              </div>
            </div>
          </div>
          <button className="profile-edit-btn">Edit Profile</button>
        </div>

        {/* Saved Restaurants */}
        <div className="profile-section">
          <div className="profile-section__header">
            <h3>Saved Restaurants</h3>
            <a href="#">View All</a>
          </div>
          <div className="saved-restaurants">
            {savedRestaurants.map(r => (
              <div key={r.id} className="saved-card">
                <div className="saved-card__image">
                  <img src={r.image} alt={r.name} />
                  <button className="saved-card__heart">❤️</button>
                </div>
                <p className="saved-card__name">{r.name}</p>
                <p className="saved-card__cuisine">⭐ {r.rating} · {r.cuisine}</p>
              </div>
            ))}
            <div className="saved-card saved-card--add">
              <span>➕</span>
              <p>Find More Favorites</p>
            </div>
          </div>
        </div>

        {/* Reservation History */}
        <div className="profile-section">
          <div className="profile-section__header">
            <h3>Reservation History</h3>
            <button className="filter-btn">▼ Filter</button>
          </div>
          <table className="profile-table">
            <thead>
              <tr>
                <th>Venue</th>
                <th>Date & Time</th>
                <th>Guests</th>
                <th>Status</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(r => (
                <tr key={r.id}>
                  <td><strong>{r.restaurant}</strong></td>
                  <td>{r.datetime}</td>
                  <td>{r.guests}</td>
                  <td><span className="status-badge status-badge--green">{r.status}</span></td>
                  <td>{r.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order History */}
        <div className="profile-section">
          <div className="profile-section__header">
            <h3>Order History</h3>
          </div>
          <table className="profile-table">
            <thead>
              <tr>
                <th>Order Item</th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td>{o.item}</td>
                  <td>{o.orderId}</td>
                  <td>{o.date}</td>
                  <td><strong>{o.total}</strong></td>
                  <td>{o.type}</td>
                  <td><button className="reorder-btn">{o.action}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick settings */}
        <div className="profile-quick-settings">
          <div className="quick-card">
            <span>📍</span>
            <div>
              <p className="quick-card__title">Saved Addresses</p>
              <p className="quick-card__sub">Manage saved addresses</p>
            </div>
          </div>
          <div className="quick-card">
            <span>💳</span>
            <div>
              <p className="quick-card__title">Payment Methods</p>
              <p className="quick-card__sub">Visa ending in 4411</p>
            </div>
          </div>
          <div className="quick-card">
            <span>⚙️</span>
            <div>
              <p className="quick-card__title">Account Settings</p>
              <p className="quick-card__sub">Security & Notifications</p>
            </div>
          </div>
        </div>

        {/* Favorite Meals */}
        <div className="profile-section">
          <h3>Favorite Meals</h3>
          <div className="favorite-meals">
            {favoriteMeals.map(m => (
              <div key={m.id} className={`fmeal ${m.big ? 'fmeal--big' : ''}`}>
                <img src={m.image} alt={m.name} />
                <div className="fmeal__overlay">
                  {m.tag && <span className="fmeal__tag">{m.tag}</span>}
                  <p className="fmeal__name">{m.name}</p>
                  {m.description && <p className="fmeal__desc">{m.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="profile-footer">
          <span>🍽️ Eataly © 2026</span>
          <div className="profile-footer__links">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Policy</span>
            <span>Contact Us</span>
          </div>
        </footer>

      </main>
    </div>
  )
}

export default Profile