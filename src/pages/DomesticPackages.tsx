import { useEffect, useState } from 'react'
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

  useEffect(() => {
    const onResize = () => setW(window.innerWidth)

    onResize()
    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  const pad =
    w > 1400
      ? 120
      : w > 1100
        ? 80
        : w > 900
          ? 60
          : w > 600
            ? 40
            : 16

  const titleSize =
    w > 1100
      ? 36
      : w > 900
        ? 30
        : w > 600
          ? 26
          : 22

  const descSize = w > 900 ? 15 : 14

  const rawTitle = name || 'Goa'

  const title = rawTitle
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const selectedCity = city
    ? city
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : ''

  const headingTitle = selectedCity
    ? `${title} Tour Packages From ${selectedCity}`
    : `${title} Tour Packages`

  const description = selectedCity
    ? `Explore ${title} tour packages from ${selectedCity} with The TravelGarh. Whether you are planning a group trip, a honeymoon, or a solo adventure, we offer curated ${title} holidays from ${selectedCity} with the best itineraries, accommodation, and 24/7 travel support.`
    : `Explore ${title} tour packages with The TravelGarh. Whether you are planning a group trip, a honeymoon, or a solo adventure, we offer curated ${title} holidays with the best itineraries, accommodation, and 24/7 travel support.`

  const fetchPackages = (cityName: string) => {
    setLoading(true)

    getPackages({
      city: cityName.toLowerCase(),
      pageSize: 100000,
    })
      .then(setPackages)
      .catch(() => setPackages([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchPackages(selectedCity || title)
  }, [title, selectedCity])

  const listHeight = w > 900 ? 400 : 360

  const cardWidth =
    w > 1400
      ? 280
      : w > 1100
        ? 260
        : w > 700
          ? 240
          : 200

  return (
    <>
      <Helmet>
        <title>{headingTitle} - The TravelGarh</title>
      </Helmet>

      <div
        style={{
          background: '#fff',
          padding: `45px ${pad}px`,
        }}
      >
        <h1
          style={{
            fontSize: titleSize,
            fontWeight: 'bold',
            color: '#000',
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {headingTitle}
        </h1>

        <p
          style={{
            fontSize: descSize,
            lineHeight: 1.9,
            color: '#555',
            marginTop: 18,
            maxWidth: 800,
          }}
        >
          {description}
        </p>
      </div>

      <div
        style={{
          padding: `20px ${pad}px`,
        }}
      >
        <h2
          style={{
            fontSize: w > 900 ? 28 : 22,
            fontWeight: 'bold',
            color: '#111',
          }}
        >
          {selectedCity
            ? `Tour Packages From ${selectedCity}`
            : 'Tour Packages'}
        </h2>

        <div
          style={{
            marginTop: 20,
            minHeight: listHeight,
          }}
        >
          {loading ? (
            <div
              style={{
                display: 'flex',
                gap: 16,
              }}
            >
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="skeleton"
                  style={{
                    width: cardWidth,
                    height: listHeight - 40,
                    borderRadius: 16,
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          ) : packages.length === 0 ? (
            <p
              style={{
                fontSize: 16,
                color: '#999',
              }}
            >
              No packages found for this destination.
            </p>
          ) : (
            <div
              style={{
                display: w < 768 ? 'flex' : 'flex',
                flexDirection: w < 768 ? 'column' : 'row',
                gap: 16,
                overflowX: w < 768 ? 'visible' : 'auto',
                paddingBottom: 8,
                scrollSnapType: w < 768 ? 'none' : 'x mandatory',
              }}
            >
              {packages.map(pkg => (
                w < 768 ? (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    linkPath={`/trending/${pkg.slug}`}
                  />
                ) : (
                  <div
                    key={pkg.id}
                    style={{ flexShrink: 0, width: cardWidth }}
                  >
                    <PackageCard
                      pkg={pkg}
                      linkPath={`/trending/${pkg.slug}`}
                    />
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ height: 20 }} />

      <ReviewSection />

      <div style={{ height: 60 }} />
    </>
  )
}
