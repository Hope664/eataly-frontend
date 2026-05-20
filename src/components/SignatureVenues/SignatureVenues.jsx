// src/components/SignatureVenues/SignatureVenues.jsx

import VenueCard from './VenueCard'
import './SignatureVenues.css'
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

// ✅ Data lives HERE — outside the component, at the top of the file
const venues = [
  { id: 1, name: 'La Piazza',     rating: 4.9, cuisine: 'Pizzeria',    time: '15-20 min', description: 'Traditional Neapolitan pizzas and seasonal antipasti in an airy courtyard setting inspired by Rome\'s historic squares.' },
  { id: 2, name: 'Il Vino',       rating: 4.8, cuisine: 'Wine Bar',    time: '10-15 min', description: 'A sophisticated enoteca featuring over 500 regional Italian wines and artisanal pairing boards curated by our sommeliers.' },
  { id: 3, name: 'Pasta Fresca',  rating: 5.0, cuisine: 'Pasta House', time: '20-25 min', description: 'Live pasta making station showcasing generations-old techniques, fresh bronze-die cuts, and vibrant seasonal sauces.' },
]

const SignatureVenues = () => {
  return (
    <section className="venues">

      {/* Section header */}
      <div className="venues__header">
        <div>
          <h2>Signature Venues</h2>
          <p>Discover the finest curated dining spaces from across Italy</p>
        </div>
        <a href="#">View All Destinations →</a>
      </div>

      {/* ✅ .map() lives HERE — inside JSX, renders one VenueCard per item */}
      <div className="venues__grid">
        {venues.map(venue => (
          <VenueCard key={venue.id} {...venue} />
        ))}
      </div>

    </section>
  )
}

export default SignatureVenues