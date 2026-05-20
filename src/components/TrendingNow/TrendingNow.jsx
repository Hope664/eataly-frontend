import './TrendingNow.css'
import DishCard from './DishCard'

import useFetch from '../../hooks/useFetch'
import { getRestaurants } from '../../services/api'

const SignatureVenues = () => {
  const { data, loading, error } = useFetch(getRestaurants)

  if (loading) return <p>Loading...</p>
  if (error)   return <p>Error: {error}</p>

  return (
    <div>
      {data.map(venue => <VenueCard key={venue.id} {...venue} />)}
    </div>
  )
}
const dishes = [
  { id: 1, name: 'Ricci di Mare',       price: 32, description: 'Sea urchin, Sorrento lemon, artisanal linguine' },
  { id: 2, name: 'Tiramisù Classico',   price: 14, description: 'Mascarpone, Venetian espresso, premium cocoa' },
  { id: 3, name: 'Bresaola Valtellina', price: 22, description: 'Air-cured beef with arugula, 24-month Parmigiano' },
  { id: 4, name: 'Risotto ai Funghi',   price: 28, description: 'Wild porcini, white truffle oil, superfine Arborio' },
]

const TrendingNow = () => {
  return (
    <section className="trending">

      {/* Header row */}
      <div className="trending__header">
        <div>
          <h2>Trending Now</h2>
          <p>Seasonal favorites loved by our patrons this week</p>
        </div>
        <div className="trending__arrows">
          <button className="arrow-btn">‹</button>
          <button className="arrow-btn">›</button>
        </div>
      </div>

      {/* Cards row */}
      <div className="trending__grid">
        {dishes.map(dish => (
          <DishCard key={dish.id} {...dish} />
        ))}
      </div>

    </section>
  )
}

export default TrendingNow;