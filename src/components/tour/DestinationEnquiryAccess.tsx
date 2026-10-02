import { useLocation } from 'react-router-dom'
import { useEnquiry } from './EnquiryContext'

function formatDestination(rawDestination: string) {
  return rawDestination
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function DestinationEnquiryAccess() {
  const location = useLocation()
  const { openEnquiry } = useEnquiry()
  const pathParts = location.pathname.split('/').filter(Boolean)
  const [category, rawDestination] = pathParts
  const isDestinationPage = category === 'domestic' || category === 'international'
  const isPackageCategoryPage = ['/tour-packages', '/upcoming-trips', '/value-for-money'].includes(location.pathname)

  if (!isDestinationPage && !isPackageCategoryPage) return null

  const destination = isDestinationPage && rawDestination ? formatDestination(rawDestination) : ''

  return (
    <>
      <section style={{ padding: '28px 16px', background: '#f5f5f5', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 22, color: '#222' }}>
          {destination ? `Planning a trip to ${destination}?` : 'Planning your next trip?'}
        </h2>
        <p style={{ margin: '0 0 16px', color: '#666' }}>
          Share your travel plans with our experts and get a free quote.
        </p>
        <button
          type="button"
          onClick={() => openEnquiry(null, destination)}
          style={{
            padding: '13px 24px',
            border: 0,
            borderRadius: 12,
            background: '#FF1E1E',
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Send Enquiry
        </button>
      </section>
    </>
  )
}
