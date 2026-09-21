import { useState, useRef, useEffect } from 'react'
import type { PackageModel } from '../../types'
import PackageCard from './PackageCard'
import './PackageSlider.css'

interface Props {
  packages: PackageModel[]
}

export default function PackageSlider({ packages }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function calcWidth() {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      if (!mobile && trackRef.current) {
        const first = trackRef.current.children[0] as HTMLElement | undefined
        if (first) {
          const style = getComputedStyle(trackRef.current)
          const gap = parseInt(style.gap, 10) || 0
          setItemWidth(first.offsetWidth + gap)
        }
      }
    }
    calcWidth()
    window.addEventListener('resize', calcWidth)
    return () => window.removeEventListener('resize', calcWidth)
  }, [packages])

  const maxIndex = Math.max(0, packages.length - 1)

  function slide(dir: number) {
    setCurrentIndex(i => Math.max(0, Math.min(maxIndex, i + dir)))
  }

  return (
    <div className="package-slider-wrapper">
      <div className="package-slider-viewport">
        <div
          className="package-slider-track"
          ref={trackRef}
          style={isMobile ? {} : { transform: `translateX(-${currentIndex * itemWidth}px)` }}
        >
          {packages.map(pkg => (
            <div key={pkg.id} className="package-slider-item">
              <PackageCard pkg={pkg} linkPath={`/trending/${pkg.slug}`} />
            </div>
          ))}
        </div>
      </div>

      {packages.length > 1 && (
        <>
          {currentIndex > 0 && (
            <button className="package-slider-arrow left" onClick={() => slide(-1)} aria-label="Previous">
              <span className="package-slider-arrow-icon">&#10094;</span>
            </button>
          )}
          {currentIndex < maxIndex && (
            <button className="package-slider-arrow right" onClick={() => slide(1)} aria-label="Next">
              <span className="package-slider-arrow-icon">&#10095;</span>
            </button>
          )}
        </>
      )}
    </div>
  )
}
