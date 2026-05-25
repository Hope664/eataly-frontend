// src/components/RestaurantCard/RestaurantCard.jsx
import './RestaurantCard.css'

const RestaurantCard = ({ image, name, cuisine, rating, distance, description, tags, featured }) => {
  return (
    <div className={`rcard ${featured ? 'rcard--featured' : ''}`}>
      <div className="rcard__image">
        <img src={image} alt={name} />
        {featured && <span className="rcard__badge">⭐ Featured</span>}
        <span className="rcard__rating">⭐ {rating}</span>
        <button className="rcard__heart">♡</button>
      </div>
      <div className="rcard__body">
        <p className="rcard__cuisine">{cuisine}</p>
        <h3 className="rcard__name">{name}</h3>
        {description && <p className="rcard__desc">{description}</p>}
        <div className="rcard__footer">
          {tags.map((tag, i) => (
            <span key={i} className="rcard__tag">{tag}</span>
          ))}
          <span className="rcard__distance">📍 {distance}</span>
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard