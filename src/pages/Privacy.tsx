import { Helmet } from 'react-helmet-async'
import './StaticPages.css'

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - The TravelGarh</title>
      </Helmet>
      <section className="static-page section">
        <div className="container">
          <h1 className="section-title">Privacy Policy</h1>
          <div className="static-content">
            <p>
              At The TravelGarh, we take your privacy seriously. This policy describes how we collect,
              use, and protect your personal information.
            </p>
            <h3>Information We Collect</h3>
            <p>
              We collect information you provide directly, such as your name, email address, phone
              number, and travel preferences when you make a booking or submit an enquiry.
            </p>
            <h3>How We Use Your Information</h3>
            <p>
              We use your information to process bookings, communicate with you about your travel
              arrangements, and improve our services. We do not sell your personal information to
              third parties.
            </p>
            <h3>Data Security</h3>
            <p>
              We implement appropriate security measures to protect your personal information from
              unauthorized access, alteration, or disclosure.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
