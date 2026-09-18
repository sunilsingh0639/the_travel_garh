// import { useEffect, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import type { TrendingModel } from '../../types'
// import { getTrendingSections } from '../../api/trending'
// import { getImageUrl } from '../../api/client'
// import './TrendingSection.css'

// const fallback: TrendingModel[] = [{
//   id: 0, title: 'Trending',
//   packages: [
//     { id: 0, name: 'Kashmir Paradise', slug: 'kashmir-paradise', shortDescription: 'Explore the breathtaking valleys of Kashmir', days: 5, nights: 4, price: 15000, cutPrice: 19999, saving: 4999, city: 'Kashmir', images: ['/images/kasmir.jpg'] },
//     { id: 1, name: 'Goa Beach Retreat', slug: 'goa-beach-retreat', shortDescription: 'Relax on the pristine beaches of Goa', days: 4, nights: 3, price: 12000, cutPrice: 15999, saving: 3999, city: 'Goa', images: ['/images/goa.jpg'] },
//     { id: 2, name: 'Kerala Backwaters', slug: 'kerala-backwaters', shortDescription: 'Cruise through the serene backwaters of Kerala', days: 6, nights: 5, price: 18000, cutPrice: 24999, saving: 6999, city: 'Kerala', images: ['/images/kerala.jpg'] },
//     { id: 3, name: 'Rajasthan Heritage', slug: 'rajasthan-heritage', shortDescription: 'Discover the royal heritage of Rajasthan', days: 7, nights: 6, price: 22000, cutPrice: 29999, saving: 7999, city: 'Rajasthan', images: ['/images/rajasthan.jpg'] },
//   ],
// }]

// const EXCLUDED = new Set(['Upcoming', 'Value for Money'])

// export default function TrendingSection() {
//   const [sections, setSections] = useState<TrendingModel[] | null>(null)
//   const [showLeftArrow, setShowLeftArrow] = useState(false)
//   const scrollRef = useRef<HTMLDivElement>(null)
//   const navigate = useNavigate()

//   useEffect(() => {
//     getTrendingSections()
//       .then(data => {
//         const filtered = Array.isArray(data) ? data.filter(s => !EXCLUDED.has(s.title)) : []
//         setSections(filtered.length ? filtered : fallback)
//       })
//       .catch(() => setSections(fallback))
//   }, [])

//   function slide(delta: number) {
//     if (delta > 0) setShowLeftArrow(true)
//     scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
//   }

//   const display = sections ?? fallback

//   return (
//     <>
//       {display.map(section => (
//         <section key={section.id} className="trending-section">
//           <h2 className="trending-title">{section.title}</h2>

//           <div className="trending-slider-wrapper">
//             <div className="trending-scroll" ref={scrollRef}>
//               {section.packages.map(pkg => (
//                 <TrendingCard key={pkg.id} pkg={pkg} onClick={() => navigate(`/trending/${pkg.slug}`, { state: pkg })} />
//               ))}
//             </div>

//             {section.packages.length > 1 && (
//               <>
//                 {showLeftArrow && (
//                   <button className="trending-arrow-btn left" onClick={() => slide(-296)} aria-label="Left">
//                     <span className="trending-arrow-icon">&#10094;</span>
//                   </button>
//                 )}
//                 <button className="trending-arrow-btn right" onClick={() => slide(296)} aria-label="Right">
//                   <span className="trending-arrow-icon">&#10095;</span>
//                 </button>
//               </>
//             )}
//           </div>
//         </section>
//       ))}
//     </>
//   )
// }

// function TrendingCard({ pkg, onClick }: { pkg: TrendingModel['packages'][0]; onClick: () => void }) {
//   const [imgIndex, setImgIndex] = useState(0)
//   const [hover, setHover] = useState(false)
//   const images = pkg.images.length ? pkg.images : ['']
//   const imgSrc = getImageUrl(images[imgIndex] || '')

//   function handleNav(dir: number) {
//     const next = (imgIndex + dir + images.length) % images.length
//     setImgIndex(next)
//   }

//   return (
//     <div
//       className="trending-card"
//       style={{ width: 280 }}
//       onClick={onClick}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//     >
//       <div className="trending-card-image-wrap" style={{ height: 180 }}>
//         <img src={imgSrc} alt={pkg.name} loading="lazy"
//           onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
//         />
//         {hover && images.length > 1 && (
//           <>
//             <button className="trending-card-nav-btn left" onClick={e => { e.stopPropagation(); handleNav(-1) }}>
//               <span className="trending-card-nav-icon">&#10094;</span>
//             </button>
//             <button className="trending-card-nav-btn right" onClick={e => { e.stopPropagation(); handleNav(1) }}>
//               <span className="trending-card-nav-icon">&#10095;</span>
//             </button>
//           </>
//         )}
//         {images.length > 1 && (
//           <div className="trending-card-page-dots">
//             {images.map((_, i) => (
//               <div key={i} className={`trending-card-page-dot ${i === imgIndex ? 'active' : 'inactive'}`} />
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="trending-card-body">
//         <span className="trending-card-duration">{pkg.days} Days {pkg.nights} Nights</span>
//         <h3 className="trending-card-name">{pkg.name}</h3>
//         <p className="trending-card-desc">{pkg.shortDescription}</p>

//         <hr className="trending-card-divider" />

//         {pkg.saving > 0 && (
//           <div className="trending-card-save-badge">
//             <span className="trending-card-save-icon material-icons">check_circle</span>
//             <span className="trending-card-save-text">Save ₹{pkg.saving.toLocaleString()}</span>
//           </div>
//         )}

//         <div className="trending-card-price-row">
//           <span className="trending-card-price">₹ {pkg.price.toLocaleString()}</span>
//           {pkg.cutPrice > 0 && (
//             <span className="trending-card-cut-price">₹ {pkg.cutPrice.toLocaleString()}</span>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { TrendingModel } from '../../types'
import { getTrendingSections } from '../../api/trending'
import { getImageUrl } from '../../api/client'
import './TrendingSection.css'

const fallback: TrendingModel[] = [{
  id: 0, title: 'Trending',
  packages: [
    { id: 0, name: 'Kashmir Paradise', slug: 'kashmir-paradise', shortDescription: 'Explore the breathtaking valleys of Kashmir', days: 5, nights: 4, price: 15000, cutPrice: 19999, saving: 4999, city: 'Kashmir', images: ['/images/kasmir.jpg'] },
    { id: 1, name: 'Goa Beach Retreat', slug: 'goa-beach-retreat', shortDescription: 'Relax on the pristine beaches of Goa', days: 4, nights: 3, price: 12000, cutPrice: 15999, saving: 3999, city: 'Goa', images: ['/images/goa.jpg'] },
    { id: 2, name: 'Kerala Backwaters', slug: 'kerala-backwaters', shortDescription: 'Cruise through the serene backwaters of Kerala', days: 6, nights: 5, price: 18000, cutPrice: 24999, saving: 6999, city: 'Kerala', images: ['/images/kerala.jpg'] },
    { id: 3, name: 'Rajasthan Heritage', slug: 'rajasthan-heritage', shortDescription: 'Discover the royal heritage of Rajasthan', days: 7, nights: 6, price: 22000, cutPrice: 29999, saving: 7999, city: 'Rajasthan', images: ['/images/rajasthan.jpg'] },
  ],
}]

const EXCLUDED = new Set(['Upcoming', 'Value for Money'])

export default function TrendingSection() {
  const [sections, setSections] = useState<TrendingModel[] | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getTrendingSections()
      .then(data => {
        const filtered = Array.isArray(data) ? data.filter(s => !EXCLUDED.has(s.title)) : []
        setSections(filtered.length ? filtered : fallback)
      })
      .catch(() => setSections(fallback))
  }, [])

  const display = sections ?? fallback

  return (
    <>
      {display.map(section => (
        <TrendingRow key={section.id} section={section} navigate={navigate} />
      ))}
    </>
  )
}

function TrendingRow({ section, navigate }: { section: TrendingModel; navigate: ReturnType<typeof useNavigate> }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)

  function slide(delta: number) {
    if (delta > 0) setShowLeftArrow(true)
    scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <section className="trending-section">
      <h2 className="trending-title">{section.title}</h2>

      <div className="trending-slider-wrapper">
        <div className="trending-scroll" ref={scrollRef}>
          {section.packages.map(pkg => (
            <TrendingCard key={pkg.id} pkg={pkg} onClick={() => navigate(`/trending/${pkg.slug}`, { state: pkg })} />
          ))}
        </div>

        {section.packages.length > 1 && (
          <>
            {showLeftArrow && (
              <button className="trending-arrow-btn left" onClick={() => slide(-296)} aria-label="Left">
                <span className="trending-arrow-icon">&#10094;</span>
              </button>
            )}
            <button className="trending-arrow-btn right" onClick={() => slide(296)} aria-label="Right">
              <span className="trending-arrow-icon">&#10095;</span>
            </button>
          </>
        )}
      </div>
    </section>
  )
}

function TrendingCard({ pkg, onClick }: { pkg: TrendingModel['packages'][0]; onClick: () => void }) {
  const [imgIndex, setImgIndex] = useState(0)
  const [hover, setHover] = useState(false)
  const images = pkg.images.length ? pkg.images : ['']
  const imgSrc = getImageUrl(images[imgIndex] || '')

  function handleNav(dir: number) {
    const next = (imgIndex + dir + images.length) % images.length
    setImgIndex(next)
  }

  return (
    <div
      className="trending-card"
      style={{ width: 280 }}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="trending-card-image-wrap" style={{ height: 180 }}>
        <img src={imgSrc} alt={pkg.name} loading="lazy"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        {hover && images.length > 1 && (
          <>
            <button className="trending-card-nav-btn left" onClick={e => { e.stopPropagation(); handleNav(-1) }}>
              <span className="trending-card-nav-icon">&#10094;</span>
            </button>
            <button className="trending-card-nav-btn right" onClick={e => { e.stopPropagation(); handleNav(1) }}>
              <span className="trending-card-nav-icon">&#10095;</span>
            </button>
          </>
        )}
        {images.length > 1 && (
          <div className="trending-card-page-dots">
            {images.map((_, i) => (
              <div key={i} className={`trending-card-page-dot ${i === imgIndex ? 'active' : 'inactive'}`} />
            ))}
          </div>
        )}
      </div>

      <div className="trending-card-body">
        <span className="trending-card-duration">{pkg.days} Days {pkg.nights} Nights</span>
        <h3 className="trending-card-name">{pkg.name}</h3>
        <p className="trending-card-desc">{pkg.shortDescription}</p>

        <hr className="trending-card-divider" />

        {pkg.saving > 0 && (
          <div className="trending-card-save-badge">
            <span className="trending-card-save-icon material-icons">check_circle</span>
            <span className="trending-card-save-text">Save ₹{pkg.saving.toLocaleString()}</span>
          </div>
        )}

        <div className="trending-card-price-row">
          <span className="trending-card-price">₹ {pkg.price.toLocaleString()}</span>
          {pkg.cutPrice > 0 && (
            <span className="trending-card-cut-price">₹ {pkg.cutPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  )
}