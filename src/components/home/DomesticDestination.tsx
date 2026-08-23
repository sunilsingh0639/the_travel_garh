import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCities, getCityImageUrl, type City } from '../../api/cities'
import './DomesticDestination.css'

export default function DomesticDestination() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [items, setItems] = useState<City[]>([])

  useEffect(() => {
    getCities().then(({ domestic }) => {
      setItems(domestic.sort((a, b) => a.displayOrder - b.displayOrder))
    })
  }, [])

  function slide(delta: number) {
    scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <section className="domestic-section">
      <h2 className="domestic-title">Domestic Destinations</h2>

      <div className="domestic-slider-wrapper">
        <div className="domestic-scroll" ref={scrollRef}>
          {items.map(item => (
            <DomesticCard
              key={item.id}
              title={item.name}
              image={getCityImageUrl(item)}
              onClick={() => navigate(`/domestic/${item.slug}`, { state: item })}
            />
          ))}
        </div>

        <button className="domestic-arrow-btn left" onClick={() => slide(-320)} aria-label="Left">
          <span className="domestic-arrow-icon">&#10094;</span>
        </button>
        <button className="domestic-arrow-btn right" onClick={() => slide(320)} aria-label="Right">
          <span className="domestic-arrow-icon">&#10095;</span>
        </button>
      </div>
    </section>
  )
}

function DomesticCard({ title, image, onClick }: { title: string; image: string; onClick: () => void }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      className="domestic-card"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        transform: hover ? 'scale(1.03) perspective(900px) rotateX(-0.04deg) rotateY(0.02deg)' : 'scale(1)',
        boxShadow: hover
          ? '0 8px 18px rgba(0,0,0,0.12)'
          : '0 3px 8px rgba(0,0,0,0.06)',
        transition: 'transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1), box-shadow 0.22s ease',
      }}
    >
      <img src={image} alt={title} className="domestic-card-img" loading="lazy"
        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
      />
      <div className="domestic-card-gradient-top" />
      <div className="domestic-card-gradient-bottom" />

      <span className="domestic-card-title">{title}</span>

      <div className={`domestic-card-explore ${hover ? 'visible' : ''}`}>
        <span className="domestic-card-explore-text">Explore</span>
      </div>
    </div>
  )
}
