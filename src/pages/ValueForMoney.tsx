import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import type { PackageModel } from '../types'
import { getTrendingSections } from '../api/trending'
import PackageCard from '../components/tour/PackageCard'
import './TourPackages.css'

export default function ValueForMoney() {
  const [packages, setPackages] = useState<PackageModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTrendingSections('Value for Money')
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
        <title>Value for Money Packages - The TravelGarh</title>
      </Helmet>
      <section className="section">
        <div className="container">
          <h1 className="section-title">Value for Money</h1>
          <p className="section-subtitle">Best deals, best experiences</p>

          {loading ? (
            <div className="tour-packages-grid">
              {[1,2,3,4].map(i => (
                <div key={i} className="skeleton" style={{ width: '100%', height: 360 }} />
              ))}
            </div>
          ) : packages.length === 0 ? (
            <p className="section-subtitle">Koi value for money package nahi mila</p>
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
