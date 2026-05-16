// src/components/TrendingNow/DishCard.jsx

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