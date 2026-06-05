import './OurStory.css'
// import useFetch from '../../hooks/useFetch'
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

const stats = [
  { value: '15+', label: 'Years of Tradition' },
  { value: '500+', label: 'Local Producers' },
  { value: '40+', label: 'Global Venues' },
]

const OurStory = () => {
  return (
    <section className="story">

      {/* Dark green overlay on top of background image */}
      <div className="story__overlay" />

      <div className="story__content">

        {/* Label */}
        <span className="story__label">OUR STORY</span>

        {/* Heading */}
        <h2 className="story__title">
          Sweetness in<br />every bite!
        </h2>

        {/* Description */}
        <p className="story__desc">
          At Eataly, we believe that food is the ultimate expression
          of culture. Our journey began with a simple mission: to
          celebrate the farmers, producers, and artisans who
          preserve Italy's culinary soul. From sun-ripened olives to
          hand-rolled pasta, every ingredient tells a story of
          tradition, nature, and uncompromising quality.
        </p>

        {/* Stats row */}
        <div className="story__stats">
          {stats.map((stat, index) => (
            <div key={index} className="story__stat">
              <span className="story__stat-value">{stat.value}</span>
              <span className="story__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>

    </section>
  )
}

export default OurStory;