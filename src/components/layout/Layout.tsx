import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import ErrorBoundary from '../common/ErrorBoundary'

export default function Layout() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh' }}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
