import { Helmet } from 'react-helmet-async'
import ErrorBoundary from '../components/common/ErrorBoundary'
import HomeSlider from '../components/home/HomeSlider'
import TrendingSection from '../components/home/TrendingSection'
import DestinationScroll from '../components/home/DestinationScroll'
import ReviewSection from '../components/home/ReviewSection'
import BlogSection from '../components/home/BlogSection'
import TourismLogos from '../components/home/TourismLogos'
import DomesticDestination from '../components/home/DomesticDestination'
import InternationalDestinations from '../components/home/InternationalDestinations'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>The TravelGarh - Explore the World</title>
        <meta name="description" content="Discover amazing travel packages and destinations with The TravelGarh." />
      </Helmet>

      {/* <div style={{ height: 10 }} /> */}

      <ErrorBoundary><DestinationScroll /></ErrorBoundary>

      <ErrorBoundary><HomeSlider /></ErrorBoundary>

      <div style={{ height: 40 }} />

      <ErrorBoundary><TrendingSection /></ErrorBoundary>

      <div style={{ height: 40 }} />

      <ErrorBoundary><InternationalDestinations /></ErrorBoundary>

      <div style={{ height: 40 }} />

      <ErrorBoundary><DomesticDestination /></ErrorBoundary>

      <div style={{ height: 40 }} />

      <ErrorBoundary><BlogSection /></ErrorBoundary>

      <div style={{ height: 40 }} />

      <ErrorBoundary><ReviewSection /></ErrorBoundary>

      <div style={{ height: 40 }} />

      <ErrorBoundary><TourismLogos /></ErrorBoundary>

      {/* <div style={{ height: 80 }} /> */}
    </>
  )
}
