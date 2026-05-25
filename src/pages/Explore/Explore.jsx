import './Explore.css'
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard'

const restaurants = [
  { id: 1, name: "La Terrazza d'Eataly", cuisine: "Open now · Italian", rating: 4.9, distance: "0.8 miles", description: "Expansive rooftop restaurant with panoramic city views and curated truffle menus. Signature artisanal pasta menus crafted daily.", tags: ["Modern Italian", "BYO"], image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600", featured: true },
  { id: 2, name: "Osteria dal Porto", cuisine: "Open now · Seafood", rating: 4.6, distance: "1.2 miles", description: "", tags: [], image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600", featured: false },
  { id: 3, name: "Verde Botanica", cuisine: "Open now · Vegan", rating: 4.8, distance: "0.5 miles", description: "", tags: [], image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600", featured: false },
  { id: 4, name: "Aperitivo Bar", cuisine: "Happy Hour · Bar", rating: 4.9, distance: "1.5 miles", description: "", tags: [], image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600", featured: false },
  { id: 5, name: "The Granary", cuisine: "Open now · Modern", rating: 4.6, distance: "2.1 miles", description: "", tags: [], image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600", featured: false },
]

const cuisines = ["All Cuisines", "Fine Dining", "Quick Bites", "Rooftops", "More Items"]

const Explore = () => {
  return (
    <div className="explore">

      {/* Navbar */}
      <nav className="explore-nav">
        <div className="explore-nav__logo">Eataly</div>
        <div className="explore-nav__links">
          <span className="explore-nav__link explore-nav__link--active">Explore</span>
          <span className="explore-nav__link">Orders</span>
          <span className="explore-nav__link">Bookings</span>
        </div>
        <div className="explore-nav__right">
          <span>🔔</span>
          <div className="explore-nav__avatar">MR</div>
        </div>
      </nav>

      {/* Cuisine filter bar */}
      <div className="explore-filters">
        {cuisines.map((c, i) => (
          <button key={i} className={`cuisine-btn ${i === 0 ? 'cuisine-btn--active' : ''}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="explore-content">

        {/* Header row */}
        <div className="explore-header">
          <div>
            <h1>Discover Artisanal Dining</h1>
            <p>24 hand-picked premium venues near you.</p>
          </div>
          <div className="explore-header__toggle">
            <button className="toggle-btn toggle-btn--active">🗂 List</button>
            <button className="toggle-btn">🗺 Map</button>
          </div>
        </div>

        {/* Filter dropdowns */}
        <div className="explore-dropdowns">
          <select className="explore-select"><option>Price: All</option></select>
          <select className="explore-select"><option>Rating: 4.0+</option></select>
          <select className="explore-select"><option>Distance</option></select>
          <select className="explore-select"><option>Dietary</option></select>
        </div>

        {/* Restaurant grid */}
        <div className="explore-grid">
          {restaurants.map(r => (
            <RestaurantCard key={r.id} {...r} />
          ))}
        </div>

        {/* Map CTA */}
        <div className="explore-map-cta">
          <div className="explore-map-cta__text">
            <span>📍</span>
            <div>
              <p className="explore-map-cta__title">Explore Interactive Map</p>
              <p className="explore-map-cta__sub">View all 24 venues on the map near location</p>
            </div>
          </div>
          <button className="explore-map-btn">Open Map View</button>
        </div>

      </div>
    </div>
  )
}

export default Explore