// src/pages/Home/Home.jsx
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import SignatureVenues from '../../components/SignatureVenues/SignatureVenues'
import OurStory from '../../components/OurStory/OurStory'
import TrendingNow from '../../components/TrendingNow/TrendingNow'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <SignatureVenues />
      <OurStory />
      <TrendingNow />
      <Footer />
    </>
  )
}

export default Home