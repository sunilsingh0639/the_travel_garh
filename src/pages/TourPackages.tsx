import { useEffect, useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import type { PackageModel } from '../types'
import { getPackages } from '../api/package'
import PackageSlider from '../components/tour/PackageSlider'
import './TourPackages.css'

export default function TourPackages() {
  const [packages, setPackages] = useState<PackageModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getPackages()
      .then(setPackages)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const groupedPackages = useMemo(() => {
    const groups: Record<string, PackageModel[]> = {}
    for (const pkg of packages) {
      const key = pkg.city || 'Other'
      if (!groups[key]) groups[key] = []
      groups[key].push(pkg)
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
  }, [packages])

  return (
    <>
      <Helmet>
        <title>Tour Packages - The TravelGarh</title>
      </Helmet>
      <section className="section tour-packages-page">
        <div className="container">
          <h1 className="section-title">Tour Packages</h1>

          <div className="tour-packages-row">
            {loading ? (
              <div className="tour-packages-grid">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="skeleton" style={{ width: '100%', height: 360 }} />
                ))}
              </div>
            ) : packages.length === 0 ? (
              <p className="section-subtitle">No packages found.</p>
            ) : (
              groupedPackages.map(([city, pkgs]) => (
                <div key={city} className="tour-package-group">
                  <h2 className="tour-package-group-title">{city} Tour Packages</h2>
                  <PackageSlider packages={pkgs} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  )
}
