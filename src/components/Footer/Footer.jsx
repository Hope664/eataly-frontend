import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">

      {/* Top section */}
      <div className="footer__top">

        {/* Left — logo + description + socials */}
        <div className="footer__brand">
          <div className="footer__logo">
            <span>🍽️</span>
            <span>Eataly</span>
          </div>
          <p className="footer__desc">
            Experience the heart of Italian culture. We are a place where you can eat, shop, and learn about high-quality food and drink. Bringing artisanal authenticity to global tables since 2007.
          </p>
          <div className="footer__socials">
            <span>🌐</span>
            <span>📘</span>
            <span>✉️</span>
            <span>📍</span>
          </div>
        </div>

        {/* Columns */}
        <div className="footer__col">
          <h4>EAT & DRINK</h4>
          <ul>
            <li>Signature Restaurants</li>
            <li>Artisanal Pizza</li>
            <li>Wine & Cocktail Bars</li>
            <li>Quick Service</li>
            <li>Seasonal Menus</li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>SHOP & LEARN</h4>
          <ul>
            <li>Online Marketplace</li>
            <li>Fresh Pasta Lab</li>
            <li>Cooking Masterclasses</li>
            <li>The Wine Cellar</li>
            <li>Gifting Collection</li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>COMPANY</h4>
          <ul>
            <li>Our Philosophy</li>
            <li>Private Events</li>
            <li>Careers</li>
            <li>Store Locator</li>
            <li>Contact Us</li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p>© 2026 Eataly Ret S.rl. All rights reserved.</p>
        <div className="footer__bottom-links">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Cookie Policy</span>
          <span>Accessibility</span>
        </div>
      </div>

      {/* Floating CTA button */}
      <button className="footer__cta">🗓 Book Your Experience</button>

    </footer>
  )
}

export default Footer