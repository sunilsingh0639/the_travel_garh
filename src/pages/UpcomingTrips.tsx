import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import type { PackageModel } from '../types'
import { getTrendingSections } from '../api/trending'
import PackageCard from '../components/tour/PackageCard'
import './TourPackages.css'

export default function UpcomingTrips() {
  const [packages, setPackages] = useState<PackageModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTrendingSections('Upcoming')
      .then(sections => {
        const all = sections.flatMap(s => s.packages)
        setPackages(all)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Helmet>
        <title>Upcoming Trips - The TravelGarh</title>
      </Helmet>
      <section className="section">
        <div className="container">
          <h1 className="section-title">Upcoming Trips</h1>
          <p className="section-subtitle">Aane wale trips ke saath plan karein</p>

          {loading ? (
            <div className="tour-packages-grid">
              {[1,2,3,4].map(i => (
                <div key={i} className="skeleton" style={{ width: '100%', height: 360 }} />
              ))}
            </div>
          ) : packages.length === 0 ? (
            <p className="section-subtitle">Koi upcoming trip nahi mila</p>
          ) : (
            <div className="tour-packages-grid">
              {packages.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
