import { Helmet } from 'react-helmet-async'
import './StaticPages.css'

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - The TravelGarh</title>
      </Helmet>
      <section className="static-page section">
        <div className="container">
          <h1 className="section-title">Terms & Conditions</h1>
          <div className="static-content">
            <p>
              Welcome to The TravelGarh. By using our website and services, you agree to comply with
              and be bound by the following terms and conditions.
            </p>
            <h3>Booking & Payment</h3>
            <p>
              All bookings are subject to availability and confirmation. A deposit may be required
              at the time of booking, with the remaining balance due before departure as specified
              in your booking confirmation.
            </p>
            <h3>Cancellation Policy</h3>
            <p>
              Cancellation charges apply based on the time remaining before departure. Please refer
              to your booking confirmation for specific cancellation terms.
            </p>
            <h3>Liability</h3>
            <p>
              The TravelGarh acts as an intermediary between customers and service providers. We are not
              liable for any losses, damages, or injuries arising from the services provided by
              third-party vendors.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
