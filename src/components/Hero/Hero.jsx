import './Hero.css'
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

const Hero = () => {
  return (
    <section className="hero">

      {/* Dark gradient overlay so left side text is readable */}
      <div className="hero__overlay" />

      {/* Left content */}
      <div className="hero__content">
        <span className="hero__label">ESTABLISHED 2007</span>

        <h1 className="hero__title">
          Ethical Dining<br />
          At you fingertips
        </h1>

        <p className="hero__subtitle">
          Experience the essence of Italy through curated culinary<br />
          journeys, artisanal ingredients, and timeless traditions<br />
          reimagined for the modern palate.
        </p>

        {/* 3 buttons */}
        <div className="hero__buttons">
          <button className="hero__btn hero__btn--filled">
            Register restaurant
          </button>
          <button className="hero__btn hero__btn--dark">
            Explore Restaurants
          </button>
          <button className="hero__btn hero__btn--outline">
            Book a Table
          </button>
        </div>
      </div>

    </section>
  )
}

export default Hero