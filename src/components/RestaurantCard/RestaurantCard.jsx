import './RestaurantCard.css'

const RestaurantCard = ({ name, cuisine, rating, distance, description, tags, image, featured, onClick }) => {
  return (
    <div className={`restaurant-card${featured ? ' restaurant-card--featured' : ''}`} onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onClick && onClick()}>
      <div className="restaurant-card__image" style={{ backgroundImage: `url(${image})` }} />
      <div className="restaurant-card__content">
        <div className="restaurant-card__top">
          <h3 className="restaurant-card__name">{name}</h3>
          <span className="restaurant-card__rating">⭐ {rating}</span>
        </div>
        <p className="restaurant-card__cuisine">{cuisine}</p>
        {description && <p className="restaurant-card__description">{description}</p>}
        <div className="restaurant-card__footer">
          <span className="restaurant-card__distance">{distance}</span>
          {tags?.length > 0 && <span className="restaurant-card__tag">{tags[0]}</span>}
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard
