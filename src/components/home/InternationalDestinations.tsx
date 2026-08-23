import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCities, getCityImageUrl, type City } from '../../api/cities'
import './InternationalDestinations.css'

export default function InternationalDestinations() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [items, setItems] = useState<City[]>([])

  useEffect(() => {
    getCities().then(({ international }) => {
      setItems(international.sort((a, b) => a.displayOrder - b.displayOrder))
    })
  }, [])

  function slide(delta: number) {
    scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  function openDetails(item: City) {
    navigate(`/international/${item.slug}`, { state: item })
  }

  return (
    <section className="intl-section">
      <div className="intl-bg-block" />

      <div className="intl-inner">
        <div className="intl-video-wrap">
          <video
            className="intl-video"
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVideoLoaded(true)}
            style={{ display: videoLoaded ? 'block' : 'none' }}
          >
            <source
              src="https://res.cloudinary.com/ddelytmrn/video/upload/v1780666334/Travel_cz8g8w.mp4"
              type="video/mp4"
            />
          </video>
          {!videoLoaded && (
            <div className="intl-video-placeholder">
              <span>Loading video...</span>
            </div>
          )}
        </div>

        <h2 className="intl-title">International Destinations</h2>

        <div className="intl-cards-wrapper">
          <div className="intl-scroll" ref={scrollRef}>
            {items.map(item => (
              <IntlCard
                key={item.id}
                title={item.name}
                image={getCityImageUrl(item)}
                onClick={() => openDetails(item)}
              />
            ))}
          </div>

          <button className="intl-arrow-btn left" onClick={() => slide(-320)} aria-label="Left">
            <span className="intl-arrow-icon">&#10094;</span>
          </button>
          <button className="intl-arrow-btn right" onClick={() => slide(320)} aria-label="Right">
            <span className="intl-arrow-icon">&#10095;</span>
          </button>
        </div>
      </div>
    </section>
  )
}

function IntlCard({ title, image, onClick }: { title: string; image: string; onClick: () => void }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      className="intl-card"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        transform: hover ? 'scale(1.04) perspective(900px) rotateX(-0.06deg) rotateY(0.03deg)' : 'scale(1)',
        transition: 'transform 0.28s cubic-bezier(0.215, 0.61, 0.355, 1)',
      }}
    >
      <img src={image} alt={title} className="intl-card-img" loading="lazy"
        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
      />
      <div className="intl-card-gradient-top" />
      <div className="intl-card-gradient-bottom" />

      <span className="intl-card-title">{title}</span>

      <div className={`intl-card-explore ${hover ? 'visible' : ''}`}>
        <span className="intl-card-explore-text">Explore</span>
      </div>
    </div>
  )
}
