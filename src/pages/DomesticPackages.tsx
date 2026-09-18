import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import type { PackageModel } from '../types'
import { getPackages } from '../api/package'
import PackageCard from '../components/tour/PackageCard'
import ReviewSection from '../components/home/ReviewSection'
import './TrendingDetail.css'

export default function DomesticPackages() {
  const { name, city } = useParams()
  const [packages, setPackages] = useState<PackageModel[]>([])
  const [loading, setLoading] = useState(true)
  const [w, setW] = useState(1200)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)

  function slidePackages(delta: number) {
    if (delta > 0) setShowLeftArrow(true)
    scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  useEffect(() => {
    const onResize = () => setW(window.innerWidth)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const pad = w > 1400 ? 120 : w > 1100 ? 80 : w > 900 ? 60 : w > 600 ? 40 : 16
  const titleSize = w > 1100 ? 32 : w > 900 ? 26 : w > 600 ? 22 : 20
  const descSize = w > 900 ? 15 : 14

  const rawTitle = name || 'Goa'
  const title = rawTitle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  const selectedCity = city
    ? city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : ''

  const headingTitle = selectedCity
    ? `${title} Tour Packages From ${selectedCity}`
    : `${title} Tour Packages`

  const description = selectedCity
    ? `Explore ${title} tour packages from ${selectedCity} with The TravelGarh. Whether you are planning a group trip, a honeymoon, or a solo adventure, we offer curated ${title} holidays from ${selectedCity} with the best itineraries, accommodation, and 24/7 travel support.`
    : `Explore ${title} tour packages with The TravelGarh. Whether you are planning a group trip, a honeymoon, or a solo adventure, we offer curated ${title} holidays with the best itineraries, accommodation, and 24/7 travel support.`

  const fetchPackages = (cityName: string) => {
    setLoading(true)
    getPackages({ city: cityName.toLowerCase(), pageSize: 100000 })
      .then(setPackages)
      .catch(() => setPackages([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchPackages(selectedCity || title)
  }, [title, selectedCity])

  const listHeight = w > 900 ? 400 : 360

  return (
    <>
      <Helmet><title>{headingTitle} - The TravelGarh</title></Helmet>

      <div style={{ background: '#fff', padding: `28px ${pad}px 20px` }}>
        <h1 style={{ fontSize: titleSize, fontWeight: 'bold', color: '#000', lineHeight: 1.3, margin: 0 }}>
          {headingTitle}
        </h1>
        <p style={{ fontSize: descSize, lineHeight: 1.8, color: '#555', marginTop: 12, maxWidth: 800 }}>
          {description}
        </p>
      </div>

      <div style={{ padding: `0 ${pad}px 20px` }}>
        <h2 style={{ fontSize: w > 900 ? 24 : 20, fontWeight: 'bold', color: '#111', marginBottom: 16 }}>
          {selectedCity ? `Tour Packages From ${selectedCity}` : 'Tour Packages'}
        </h2>
        <div style={{ minHeight: listHeight, position: 'relative' }}>
          {loading ? (
            <div style={{ display: 'flex', gap: 16 }}>
              {[1, 2, 3].map(i => (
                <div key={i} className="skeleton image-card-slide" style={{ height: listHeight - 40, borderRadius: 16 }} />
              ))}
            </div>
          ) : packages.length === 0 ? (
            <p style={{ fontSize: 16, color: '#999' }}>No packages found for this destination.</p>
          ) : (
            <>
              <div ref={scrollRef} style={{ display: w < 768 ? 'grid' : 'flex', gridTemplateColumns: w < 768 ? '1fr' : undefined, gap: 16, overflowX: w < 768 ? 'visible' : 'auto', paddingBottom: 8, scrollSnapType: w < 768 ? 'none' : 'x mandatory' }}>
                {packages.map(pkg => (
                  <div key={pkg.id} className="image-card-slide">
                    <PackageCard pkg={pkg} linkPath={`/trending/${pkg.slug}`} />
                  </div>
                ))}
              </div>

              {packages.length > 1 && (
                <>
                  {showLeftArrow && (
                    <button
                      onClick={() => slidePackages(-296)}
                      aria-label="Left"
                      style={{
                        display: w < 768 ? 'none' : 'flex', position: 'absolute', top: '40%', left: 10, transform: 'translateY(-50%)', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                        width: 40, height: 40, borderRadius: '50%', background: 'white', border: 'none',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.10)', zIndex: 2,
                      }}
                    >
                      <span style={{ fontSize: 22, color: 'rgba(0,0,0,0.87)' }}>&#10094;</span>
                    </button>
                  )}
                  <button
                    onClick={() => slidePackages(296)}
                    aria-label="Right"
                    style={{
                      display: w < 768 ? 'none' : 'flex', position: 'absolute', top: '40%', right: 10, transform: 'translateY(-50%)', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                      width: 40, height: 40, borderRadius: '50%', background: 'white', border: 'none',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.10)', zIndex: 2,
                    }}
                  >
                    <span style={{ fontSize: 22, color: 'rgba(0,0,0,0.87)' }}>&#10095;</span>
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <ReviewSection />

      <div style={{ height: 32 }} />
    </>
  )
}
