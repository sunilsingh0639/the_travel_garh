import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ThankYou.css';

export default function ThankYou() {
  const navigate = useNavigate();

  useEffect(() => {
    // 10 second baad automatically home page pe redirect
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="thankyou-page">
      <div className="thankyou-container">
        {/* Success Icon */}
        <div className="success-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke="#22B35C" strokeWidth="2" fill="#E8F5E9"/>
            <path d="M7 12.5L10.5 16L17 9" stroke="#22B35C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="thankyou-title">Thank You!</h1>
        <p className="thankyou-subtitle">
          Your enquiry has been submitted <strong>successfully</strong>.
        </p>
        <p className="thankyou-description">
          Our travel expert will get in touch with you shortly with the best offers and travel options.
        </p>

        {/* What Happens Next */}
        <div className="steps-container">
          <h2 className="steps-title">What Happens Next?</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">📞</div>
              <h3>We'll Call You</h3>
              <p>Our expert will contact you shortly.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">🏷️</div>
              <h3>Best Offer</h3>
              <p>We'll share the best packages & offers with you.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">✈️</div>
              <h3>Happy Journey</h3>
              <p>Get ready for your amazing travel experience!</p>
            </div>
          </div>
        </div>

        {/* Need Immediate Assistance */}
        <div className="assistance-box">
          <h3>Need Immediate Assistance?</h3>
          <p>Call us now, we are happy to help you!</p>
          <a href="tel:+917425833258" className="call-button">
            📞 +91 7425833258
          </a>
        </div>

        {/* Features */}
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">💰</span>
            <span>Best Price Guarantee</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🕐</span>
            <span>24x7 Travel Support</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">👥</span>
            <span>Trusted by 10,000+ Travelers</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🛡️</span>
            <span>Safe & Comfortable Journey</span>
          </div>
        </div>

        {/* Home Button */}
        <button 
          onClick={() => navigate('/')} 
          className="home-button"
        >
          🏠 Back to Home
        </button>

        <p className="redirect-text">Redirecting to home in 10 seconds...</p>
      </div>
    </div>
  );
}