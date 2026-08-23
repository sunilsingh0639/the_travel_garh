import { useEffect, useRef, useState } from 'react'
import './TourismLogos.css'
import { assetUrl } from '../../api/client'

const logos = [
  assetUrl('/images/taj_hotel.png'),
  assetUrl('/images/hilton_hotel.png'),
  assetUrl('/images/accor_hotel.png'),
  assetUrl('/images/ihcl_hotel.png'),
  assetUrl('/images/stregts_hotel.png'),
  assetUrl('/images/the_astor-hotel.png'),
  assetUrl('/images/westion-hotel.png'),
  assetUrl('/images/welcome-hotel.png'),
  assetUrl('/images/ginger_hotel.png'),
  assetUrl('/images/zana_hotel.png'),
]

function getItemWidth(screenWidth: number) {
  if (screenWidth >= 1440) return screenWidth / 4.8
  if (screenWidth >= 1200) return screenWidth / 4.2
  if (screenWidth >= 900) return screenWidth / 3.2
  if (screenWidth >= 600) return screenWidth / 2.5
  return screenWidth / 2.1
}

export default function TourismLogos() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(1440)

  useEffect(() => {
    setWidth(window.innerWidth)
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    const el = scrollRef.current
    if (!el) return
    const timer = setInterval(() => {
      if (!el) return
      const maxScroll = el.scrollWidth / 2
      const next = el.scrollLeft + 1
      if (next >= maxScroll) {
        el.scrollLeft = 0
      } else {
        el.scrollLeft = next
      }
    }, 20)
    return () => { clearInterval(timer); window.removeEventListener('resize', handleResize) }
  }, [])

  const itemWidth = getItemWidth(width)
  const sectionHeight = width < 600 ? 120 : 170

  return (
    <section className="tourism-logos-section" style={{ height: sectionHeight }}>
      <div className="tourism-logos-scroll" ref={scrollRef} style={{ height: sectionHeight }}>
        {Array.from({ length: 20 }).flatMap((_, group) =>
          logos.map((src, i) => (
            <div
              key={`${group}-${i}`}
              className="tourism-logo-item"
              style={{ width: itemWidth - 20, minWidth: itemWidth - 20, height: sectionHeight - 24 }}
            >
              <img src={src} alt="Tourism logo" loading="lazy" />
            </div>
          ))
        )}
      </div>
    </section>
  )
}
