// src/components/TrendingNow/DishCard.jsx
import './DishCard.css'
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
const DishCard = ({ image, name, price, description }) => {
  return (
    <div className="dish-card">

      {/* Image area */}
      <div className="dish-card__image">
        <img src={image} alt={name} />

        {/* Heart icon */}
        <button className="dish-card__heart">♡</button>

        {/* Name + price overlay at bottom of image */}
        <div className="dish-card__overlay">
          <span className="dish-card__name">{name}</span>
          <span className="dish-card__price">${price}</span>
        </div>
      </div>

      {/* Description below image */}
      <p className="dish-card__desc">{description}</p>

    </div>
  )
}

export default DishCard