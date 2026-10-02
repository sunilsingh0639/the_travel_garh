import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import ErrorBoundary from '../common/ErrorBoundary'
import DestinationEnquiryAccess from '../tour/DestinationEnquiryAccess'

export default function Layout() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh' }}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
        <DestinationEnquiryAccess />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
