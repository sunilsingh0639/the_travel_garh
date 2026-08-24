import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import TourPackages from './pages/TourPackages'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import DomesticPackages from './pages/DomesticPackages'
import InternationalDetails from './pages/InternationalDetails'
import TrendingDetail from './pages/TrendingDetail'
import BlogDetail from './pages/BlogDetail'
import UpcomingTrips from './pages/UpcomingTrips'
import ValueForMoney from './pages/ValueForMoney'
import ThankYou from './pages/ThankYou'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/tour-packages" element={<TourPackages />} />
        <Route path="/upcoming-trips" element={<UpcomingTrips />} />
        <Route path="/value-for-money" element={<ValueForMoney />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/domestic/:name" element={<DomesticPackages />} />
        <Route path="/domestic/:name/:city" element={<DomesticPackages />} />
        <Route path="/international/:name" element={<InternationalDetails />} />
        <Route path="/international/:name/:city" element={<InternationalDetails />} />
        <Route path="/trending/:name" element={<TrendingDetail />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/thank-you" element={<ThankYou />} />

      </Route>
    </Routes>
  )
}
