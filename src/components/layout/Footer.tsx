
import { useNavigate } from 'react-router-dom'
import './Footer.css'
import { FaWhatsapp } from "react-icons/fa";
import { assetUrl } from '../../api/client'

const exploreLinks = [
  { title: 'Home', route: '/' },
  { title: 'About Us', route: '/about' },
  { title: 'Tour Packages', route: '/tour-packages' },
  { title: 'Contact Us', route: '/contact' },
  { title: 'Terms & Conditions', route: '/terms' },
  { title: 'Privacy Policy', route: '/privacy' },
]

const socialLinks = [
  { icon: '\uF16D', color: '#E4405F', url: 'https://instagram.com', label: 'Instagram' },
  { icon: '\uF167', color: '#FF0000', url: 'https://youtube.com', label: 'YouTube' },
  { icon: '\uF09A', color: '#1877F2', url: 'https://facebook.com', label: 'Facebook' },
  { icon: '\uF099', color: '#000000', url: 'https://x.com', label: 'X' },
]

function openUrl(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="footer">

      <div className="footer-cta">
        <div className="footer-cta-content">

<div>
  <p className="footer-cta-small">
    <FaWhatsapp
      style={{ color: "#25D366", marginRight: "8px",fontSize:45 }}
    />
    7425833258
  </p>

  <h2 className="footer-cta-title">
    Let's Plan Your Dream Trip
  </h2>
</div>

          <button
            className="footer-cta-btn"
            onClick={() => navigate('/contact')}
          >
            Contact Us
          </button>
        </div>
      </div>

      <div className="footer-container">

        <div className="footer-grid">

          <div className="footer-brand">
            <img
              src={assetUrl('/images/main_applogo.png')}
              alt="The TravelGarh"
              className="footer-logo"
              loading="lazy"
              onClick={() => navigate('/')}
            />

            <p className="footer-description">
              The TravelGarh helps you discover amazing destinations,
              memorable experiences, and carefully planned tours
              across India and beyond.
            </p>

            <div className="footer-socials">
              {socialLinks.map((social) => (
                <div
                  key={social.label}
                  className="footer-social"
                  style={{ backgroundColor: social.color }}
                  onClick={() => openUrl(social.url)}
                >
                  <span
                    style={{
                      fontFamily: 'FontAwesome',
                      fontSize: 18,
                    }}
                  >
                    {social.icon}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="footer-heading">Quick Links</h3>

            {exploreLinks.map((link) => (
              <div
                key={link.route}
                className="footer-link"
                onClick={() => navigate(link.route)}
              >
                {link.title}
              </div>
            ))}
          </div>

         <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  }}
>
  <a
    href="tel:7425833258"
    className="footer-contact-item"
    style={{
      fontSize: '22px',
      fontWeight: '600',
      textDecoration: 'none',
      color: 'inherit'
    }}
  >
    📞 7425833258
  </a>

  <a
    href="mailto:info@The TravelGarh.com"
    className="footer-contact-item"
    style={{
      textDecoration: 'none',
      color: 'inherit'
    }}
  >
    ✉️ info@The TravelGarh.com
  </a>

  <div
    className="footer-contact-item footer-map-link"
    onClick={() =>
      window.open(
        'https://www.google.com/maps/search/?api=1&query=Unnati+Tower+S-234+Central+Spine+Road+Sector+02+Jaipur+Rajasthan',
        '_blank'
      )
    }
  >
    📍 Unnati Tower, S-234, Central Spine Road, Sector 02, Jaipur, Rajasthan
  </div>
</div>

        </div>

        <div className="footer-payments">
          <p className="footer-payments-text">We Accept All Major Credit &amp; Debit Cards</p>

          <div className="footer-payments-row">
            <img
              src={assetUrl('/images/mastercard.png')}
              alt="Mastercard"
              className="footer-payment-img"
              loading="lazy"
            />

            <img
              src={assetUrl('/images/gpay_img1.png')}
              alt="Google Pay"
              className="footer-payment-img"
              loading="lazy"
            />

            <img
              src={assetUrl('/images/apple_pay_img1.png')}
              alt="Apple Pay"
              className="footer-payment-img"
              loading="lazy"
            />

            <img
              src={assetUrl('/images/paypal_img.png')}
              alt="PayPal"
              className="footer-payment-img"
              loading="lazy"
            />

            <img
              src={assetUrl('/images/maestro_img1.png')}
              alt="Maestro"
              className="footer-payment-img"
              loading="lazy"
            />

            <img
              src={assetUrl('/images/amrican exp.png')}
              alt="American Express"
              className="footer-payment-img"
              loading="lazy"
            />

            <img
              src={assetUrl('/images/Bank_transfer_img.png')}
              alt="Bank Transfer"
              className="footer-payment-img"
              loading="lazy"
            />
            <img
              src={assetUrl('/images/bajaj_finserv.png')}
              alt="Bajaj Finserv"
              className="footer-payment-img"
              loading="lazy"
            />
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 The TravelGarh Private Limited
          </p>

          <p>
            Made with ❤️ in India 🇮🇳
          </p>
        </div>

      </div>

    </footer>
  )
}

