// src/components/SignatureVenues/VenueCard.jsx
import './VenueCard.css'

import useFetch from '../../hooks/useFetch'
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
const VenueCard = ({ image, rating, name, description, time, cuisine }) => {
  return (
    <div className="venue-card">
      <div className="venue-card__image">
        <img src={image} alt={name} />
        <span className="venue-card__rating">⭐ {rating}</span>
      </div>
      <div className="venue-card__body">
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="venue-card__footer">
          <span>🕐 {time}</span>
          <span>🍽 {cuisine}</span>
          <span className="venue-card__arrow">→</span>
        </div>
      </div>
    </div>
  )
}

export default VenueCard;
