import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { user, logout } = useAuth()

  const initials  = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || ''
  const isActive  = (path) => location.pathname === path ? 'navbar__link navbar__link--active' : 'navbar__link'

  const handleLogout = async () => { await logout(); navigate('/home') }

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar__logo" onClick={() => navigate('/home')}>
        <span className="navbar__logo-icon">🍽️</span>
        <span className="navbar__logo-text">Eataly</span>
      </div>

      {/* Center links */}
      <ul className="navbar__links">
        <li className={isActive('/explore')}   onClick={() => navigate('/explore')}>Explore</li>
        <li className={isActive('/explore')}   onClick={() => navigate('/explore')}>Restaurants</li>
        <li className={isActive('/explore')}   onClick={() => navigate('/explore')}>Market</li>
        <li className={isActive('/explore')}   onClick={() => navigate('/explore')}>Classes</li>
      </ul>

      {/* Right side */}
      <div className="navbar__right">

        {/* Search */}
        <div className="navbar__search">
          <span className="navbar__search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search experiences, ingredients, recipes..."
            onKeyDown={e => e.key === 'Enter' && navigate('/explore')}
          />
        </div>

        {user ? (
          <>
            {/* Notifications */}
            <button
              className="navbar__icon-btn"
              onClick={() => navigate(user.role === 'customer' ? '/bookings' : '/notifications')}
              title="Notifications"
            >🔔</button>

            {/* Cart / Orders */}
            <button
              className="navbar__icon-btn"
              onClick={() => navigate(user.role === 'customer' ? '/customer-menu' : '/restaurant-orders')}
              title="Orders"
            >🛒</button>

            {/* User avatar → dashboard */}
            <div
              className="navbar__user"
              onClick={() => navigate(user.role === 'restaurant_owner' ? '/dashboard' : '/customer-dashboard')}
            >
              <div className="navbar__user-info">
                <span className="navbar__user-name">{user.name}</span>
                <span className="navbar__user-badge">
                  {user.role === 'restaurant_owner' ? 'Restaurant Owner' : 'Gold Member'}
                </span>
              </div>
              <div className="navbar__avatar">{initials}</div>
            </div>

            <button className="navbar__logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="navbar__icon-btn" onClick={() => navigate('/login')}  title="Login">🔔</button>
            <button className="navbar__icon-btn" onClick={() => navigate('/customer-menu')} title="Menu">🛒</button>
            <Link to="/login"    className="navbar__link" style={{ fontWeight: 600 }}>Login</Link>
            <Link to="/register" className="navbar__register-btn">Sign Up</Link>
          </>
        )}

      </div>
    </nav>
  )
}

export default Navbar
