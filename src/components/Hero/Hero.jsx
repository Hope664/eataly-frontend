import { Link } from 'react-router-dom'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__overlay" />
      <div className="hero__content">
        <span className="hero__label">ESTABLISHED 2007</span>

        <h1 className="hero__title">
          Ethical Dining<br />
          At Your Fingertips
        </h1>

        <p className="hero__subtitle">
          Experience the essence of Italy through curated culinary<br />
          journeys, artisanal ingredients, and timeless traditions<br />
          reimagined for the modern palate.
        </p>

        <div className="hero__buttons">
          <Link to="/onboarding" className="hero__btn hero__btn--filled">
            Register restaurant
          </Link>
          <Link to="/explore" className="hero__btn hero__btn--dark">
            Explore Restaurants
          </Link>
          <Link to="/reservation" className="hero__btn hero__btn--outline">
            Book a Table
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero