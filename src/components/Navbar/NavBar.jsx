import './Navbar.css'
// import useFetch from '../../hooks/useFetch'
// import { getRestaurants } from '../../services/api'

// const SignatureVenues = () => {
//   const { data, loading, error } = useFetch(getRestaurants)

//   if (loading) return <p>Loading...</p>
//   if (error)   return <p>Error: {error}</p>

//   return (
//     <div>
//       {data.map(venue => <VenueCard key={venue.id} {...venue} />)}
//     </div>
//   )
// }

const Navbar = () => {
  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar__logo">
        <span className="navbar__logo-icon">🍽️</span>
        <span className="navbar__logo-text">Eataly</span>
      </div>

      {/* Center links */}
      <ul className="navbar__links">
        <li className="navbar__link navbar__link--active">Explore</li>
        <li className="navbar__link">Restaurants</li>
        <li className="navbar__link">Market</li>
        <li className="navbar__link">Classes</li>
      </ul>

      {/* Right side */}
      <div className="navbar__right">
        {/* Search */}
        <div className="navbar__search">
          <span className="navbar__search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search experiences, ingredients, recipes..."
          />
        </div>

        {/* Notification icon */}
        <button className="navbar__icon-btn">🔔</button>

        {/* Cart icon */}
        <button className="navbar__icon-btn">🛒</button>

        {/* User */}
        <div className="navbar__user">
          <div className="navbar__user-info">
            <span className="navbar__user-name">Marco Rossi</span>
            <span className="navbar__user-badge">Gold Member</span>
          </div>
          <div className="navbar__avatar">MR</div>
        </div>
      </div>

    </nav>
  )
}

export default Navbar;