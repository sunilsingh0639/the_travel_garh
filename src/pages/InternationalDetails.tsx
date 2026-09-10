import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import type { PackageModel } from '../types'
import { getPackages } from '../api/package'
import { getCities } from '../api/cities'
import PackageCard from '../components/tour/PackageCard'
import ReviewSection from '../components/home/ReviewSection'
import './TrendingDetail.css'

const cities = [
  'Ahmedabad', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad',
  'Chennai', 'Kolkata', 'Pune', 'Surat', 'Jaipur',
  'Lucknow', 'Kochi', 'Chandigarh', 'Indore', 'Nagpur',
  'Bhopal', 'Goa', 'Rajkot', 'Vadodara', 'Coimbatore',
]

export default function InternationalDetails() {
  const { name, city } = useParams()
  const navigate = useNavigate()
  const [packages, setPackages] = useState<PackageModel[]>([])
  const [loading, setLoading] = useState(true)
  const [w, setW] = useState(1200)
  const [domesticList, setDomesticList] = useState<string[]>([])
  const [internationalList, setInternationalList] = useState<string[]>([])
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

  const pad = w > 1400 ? 120 : w > 1100 ? 80 : w > 900 ? 60 : w > 600 ? 40 : 20
  const titleSize = w > 1100 ? 36 : w > 900 ? 30 : w > 600 ? 26 : 22
  const descSize = w > 900 ? 15 : 14

  // const rawTitle = name || 'Maldives'
  // const destination = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1)
  const rawTitle = name || 'Maldives'
  const destination = rawTitle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  const selectedCity = city
    ? city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : ''

  const headingTitle = selectedCity
    ? `${destination} Tour Packages From ${selectedCity}`
    : `${destination} Tour Packages`

  const description = selectedCity
    ? `Explore ${destination} tour packages from ${selectedCity} with The TravelGarh. Whether you are planning a group trip, a honeymoon, or a solo adventure, we offer curated ${destination} holidays from ${selectedCity} with the best itineraries, accommodation, and 24/7 travel support.`
    : `Explore ${destination} tour packages with The TravelGarh. Whether you are planning a group trip, a honeymoon, or a solo adventure, we offer curated ${destination} holidays with the best itineraries, accommodation, and 24/7 travel support.`

  // const fetchPackages = (cityName: string) => {
  //   setLoading(true)
  //   getPackages({ city: cityName.toLowerCase() })
  //     .then(setPackages)
  //     .catch(() => setPackages([]))
  //     .finally(() => setLoading(false))
  // }
const fetchPackages = (cityName: string) => {
  setLoading(true)
  getPackages({ city: cityName.toLowerCase(), pageSize: 100000 })
    .then(setPackages)
    .catch(() => setPackages([]))
    .finally(() => setLoading(false))
}
  useEffect(() => {
    fetchPackages(selectedCity || destination)
  }, [destination, selectedCity])

  useEffect(() => {
    getCities().then(({ domestic, international }) => {
      setDomesticList(domestic.sort((a, b) => a.displayOrder - b.displayOrder).map(c => c.name))
      setInternationalList(international.sort((a, b) => a.displayOrder - b.displayOrder).map(c => c.name))
    })
  }, [])

  function goTo(path: string) {
    window.scrollTo(0, 0)
    navigate(path)
  }

  const listHeight = w > 900 ? 400 : 360

  return (
    <>
      <Helmet><title>{headingTitle} - The TravelGarh</title></Helmet>

      <div style={{ background: '#fff', padding: `${40}px ${pad}px` }}>
        <h1 style={{ fontSize: titleSize, fontWeight: 'bold', color: '#000', lineHeight: 1.2, margin: 0 }}>
          {headingTitle}
        </h1>
        <div style={{ marginTop: 20, maxWidth: w >= 1400 ? 900 : w >= 1100 ? 750 : w >= 900 ? 620 : w >= 600 ? 500 : '100%' }}>
          <p style={{ fontSize: descSize, lineHeight: 1.85, color: 'rgba(0,0,0,0.87)', margin: 0 }}>
            {description}
          </p>
        </div>
      </div>

      <div style={{ padding: `20px ${pad}px` }}>
        <h2 style={{ fontSize: w > 900 ? 28 : 22, fontWeight: 'bold', color: '#111' }}>
          {selectedCity ? `Tour Packages From ${selectedCity}` : 'Tour Packages'}
        </h2>
        <div style={{ marginTop: 20, minHeight: listHeight, position: 'relative' }}>
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
                        display: w < 768 ? 'none' : 'flex', position: 'absolute', top: '40%', left: 10, transform: 'translateY(-50%)',
                        width: 40, height: 40, borderRadius: '50%', background: 'white', border: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
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
                      display: w < 768 ? 'none' : 'flex', position: 'absolute', top: '40%', right: 10, transform: 'translateY(-50%)',
                      width: 40, height: 40, borderRadius: '50%', background: 'white', border: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
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

      <div style={{ background: '#f5f5f5', padding: `35px ${pad}px` }}>
        <CityChips
          title={`${destination} Tour Packages From Popular Cities`}
          items={cities.map(c => `${destination} Tour Packages from ${c}`)}
          labels={cities}
          active={selectedCity}
          onSelect={c => goTo(`/international/${name}/${c.toLowerCase().replace(/\s+/g, '-')}`)}
        />
        <div style={{ height: 50 }} />
        <CityChips
          title="Popular Domestic Destinations"
          items={domesticList}
          labels={domesticList}
          active=""
          onSelect={c => goTo(`/domestic/${c.toLowerCase().replace(/\s+/g, '-')}`)}
        />
        <div style={{ height: 50 }} />
        <CityChips
          title="Popular International Destinations"
          items={internationalList}
          labels={internationalList}
          active=""
          onSelect={c => goTo(`/international/${c.toLowerCase().replace(/\s+/g, '-')}`)}
        />
      </div>

      <div style={{ height: 60 }} />
    </>
  )
}

interface CityChipsProps {
  title: string
  items: string[]
  labels: string[]
  active: string
  onSelect: (label: string) => void
}

function CityChips({ title, items, labels, active, onSelect }: CityChipsProps) {
  return (
    <div>
      <h3 style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 18, color: '#111' }}>
        {title}
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {items.map((item, i) => {
          const sel = labels[i].toLowerCase() === active.toLowerCase()
          return (
            <button
              key={i}
              onClick={() => onSelect(labels[i])}
              style={{
                padding: '9px 16px',
                borderRadius: 14,
                background: '#fff',
                border: `1px solid ${sel ? '#e53935' : '#bdbdbd'}`,
                color: sel ? '#e53935' : '#000',
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              {item}
            </button>
          )
        })}
      </div>
    </div>
  )
}
