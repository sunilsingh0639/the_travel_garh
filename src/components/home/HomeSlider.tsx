import { useEffect, useRef, useState } from 'react'
import type { BannerModel } from '../../types'
import { getBanners } from '../../api/banner'
import { getImageUrl, assetUrl } from '../../api/client'
import './HomeSlider.css'

function getSliderHeight(w: number) {
  if (w > 1400) return 430
  if (w > 1000) return 380
  if (w > 700) return 300
  return 220
}

function getFontSize(w: number) {
  if (w > 1400) return 52
  if (w > 1000) return 44
  if (w > 700) return 34
  if (w > 500) return 28
  if (w > 400) return 24
  return 20
}

function getLeftPadding(w: number) {
  if (w > 1400) return 120
  if (w > 1000) return 80
  if (w > 700) return 40
  return 16
}

export default function HomeSlider() {
  const [banners, setBanners] = useState<BannerModel[]>([])
  const [current, setCurrent] = useState(0)
  const [prevIdx, setPrevIdx] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined)
  const [winW, setWinW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1400)

  useEffect(() => {
    getBanners()
      .then(data => { setBanners(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (banners.length < 2) return
    timerRef.current = setInterval(() => {
      setCurrent(prev => {
        setPrevIdx(prev)
        return (prev + 1) % banners.length
      })
    }, 4000)
    return () => clearInterval(timerRef.current)
  }, [banners.length])

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const banner = banners[current]
  const prevBanner = prevIdx !== null ? banners[prevIdx] : null
  const hasBanners = banners.length > 0
  const sliderH = getSliderHeight(winW)
  const titleSize = getFontSize(winW)
  const leftPad = getLeftPadding(winW)

  function renderSlide(imgUrl: string, text: string, animation: string, key: string | number) {
    return (
      <div key={key} className="home-slide" style={{
        height: sliderH, position: 'absolute', inset: 0,
        backgroundImage: `url(${getImageUrl(imgUrl)})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        animation,
      }}>
        <div className="home-slide-overlay" />
        <div className="home-slide-content" style={{ left: leftPad }}>
          <span className="home-slide-title" style={{ fontSize: titleSize }}>Experiences for</span>
       <div className="home-slide-title-row" style={{ marginTop: 4 }}>
  <span className="home-slide-title" style={{ fontSize: titleSize, color: 'white', fontWeight: 800 }}>Tourists&nbsp;</span>
  <span className="home-slide-animated-text" style={{ fontSize: titleSize }} key={text}>{text}</span>
</div>
        </div>
      </div>
    )
  }

  return (
    <section className="home-slider" style={{ height: sliderH }}>
      <div className="home-slider-container" style={{ height: sliderH, position: 'relative', overflow: 'hidden' }}>
        {loading ? (
          <div className="home-slide skeleton" style={{ height: sliderH }} />
        ) : hasBanners && banner ? (
          <>
            {prevBanner && renderSlide(prevBanner.image, prevBanner.buttonText, 'blogFadeOut 0.8s ease forwards', `prev-${current}`)}
            {renderSlide(banner.image, banner.buttonText, 'blogFadeIn 0.8s ease', `cur-${current}`)}
          </>
        ) : (
          <div className="home-slide" style={{ height: sliderH, background: 'linear-gradient(135deg, #12B5FF, #0095E8)' }}>
            <div className="home-slide-overlay" />
            <div className="home-slide-content" style={{ left: leftPad }}>
              <span className="home-slide-title" style={{ fontSize: titleSize }}>Experiences for</span>
              <div className="home-slide-title-row" style={{ marginTop: 4 }}>
                <img src={assetUrl('/images/tourist-text.png')} alt="" className="home-slide-title-img" loading="lazy" style={{ height: titleSize * 0.9 }} />
                <span className="home-slide-animated-text" style={{ fontSize: titleSize }}>Everyone</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {hasBanners && (
        <div className="home-slider-dots">
          {banners.map((_, i) => (
            <div
              key={i}
              className={`home-slider-dot ${i === current ? 'active' : 'inactive'}`}
              onClick={() => { setPrevIdx(current); setCurrent(i) }}
            />
          ))}
        </div>
      )}
    </section>
  )
}
// import { useEffect, useRef, useState } from 'react'
// import type { BannerModel } from '../../types'
// import { getBanners } from '../../api/banner'
// import { getImageUrl, assetUrl } from '../../api/client'
// import './HomeSlider.css'

// function getSliderHeight(w: number) {
//   if (w > 1400) return 430
//   if (w > 1000) return 380
//   if (w > 700) return 300
//   return 220
// }

// function getFontSize(w: number) {
//   if (w > 1400) return 52
//   if (w > 1000) return 44
//   if (w > 700) return 34
//   if (w > 500) return 28
//   if (w > 400) return 24
//   return 20
// }

// function getLeftPadding(w: number) {
//   if (w > 1400) return 120
//   if (w > 1000) return 80
//   if (w > 700) return 40
//   return 16
// }

// const CYCLING_WORDS = ['Tourists', 'Corporate', 'Families', 'Adventure Seekers', 'Honeymooners', 'Solo Travelers']

// export default function HomeSlider() {
//   const [banners, setBanners] = useState<BannerModel[]>([])
//   const [current, setCurrent] = useState(0)
//   const [prevIdx, setPrevIdx] = useState<number | null>(null)
//   const [loading, setLoading] = useState(true)
//   const timerRef = useRef<ReturnType<typeof setInterval>>(undefined)
//   const [winW, setWinW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1400)
//   const [wordIndex, setWordIndex] = useState(0)

//   useEffect(() => {
//     getBanners()
//       .then(data => { setBanners(Array.isArray(data) ? data : []); setLoading(false) })
//       .catch(() => setLoading(false))
//   }, [])

//   useEffect(() => {
//     if (banners.length < 2) return
//     timerRef.current = setInterval(() => {
//       setCurrent(prev => {
//         setPrevIdx(prev)
//         return (prev + 1) % banners.length
//       })
//     }, 4000)
//     return () => clearInterval(timerRef.current)
//   }, [banners.length])

//   useEffect(() => {
//     const onResize = () => setWinW(window.innerWidth)
//     window.addEventListener('resize', onResize)
//     return () => window.removeEventListener('resize', onResize)
//   }, [])

//   useEffect(() => {
//     const wordTimer = setInterval(() => {
//       setWordIndex(prev => (prev + 1) % CYCLING_WORDS.length)
//     }, 2200)
//     return () => clearInterval(wordTimer)
//   }, [])

//   const banner = banners[current]
//   const prevBanner = prevIdx !== null ? banners[prevIdx] : null
//   const hasBanners = banners.length > 0
//   const sliderH = getSliderHeight(winW)
//   const titleSize = getFontSize(winW)
//   const leftPad = getLeftPadding(winW)

//   function renderSlide(imgUrl: string, animation: string, key: string | number) {
//     return (
//       <div key={key} className="home-slide" style={{
//         height: sliderH, position: 'absolute', inset: 0,
//         backgroundImage: `url(${getImageUrl(imgUrl)})`,
//         backgroundSize: 'cover', backgroundPosition: 'center',
//         animation,
//       }}>
//         <div className="home-slide-overlay" />
//         <div className="home-slide-content" style={{ left: leftPad }}>
//           <div className="hero-fly-row">
//             <img src={assetUrl('/images/airplane.png')} alt="" className="hero-airplane" />
//             <div className="hero-fly-text">
//               <span className="home-slide-title" style={{ fontSize: titleSize }}>Experiences for</span>
//               <div className="home-slide-title-row" style={{ marginTop: 4 }}>
//                 <span
//                   className="home-slide-animated-text"
//                   style={{ fontSize: titleSize }}
//                   key={wordIndex}
//                 >
//                   {CYCLING_WORDS[wordIndex]}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <section className="home-slider" style={{ height: sliderH }}>
//       <div className="home-slider-container" style={{ height: sliderH, position: 'relative', overflow: 'hidden' }}>
//         {loading ? (
//           <div className="home-slide skeleton" style={{ height: sliderH }} />
//         ) : hasBanners && banner ? (
//           <>
//             {prevBanner && renderSlide(prevBanner.image, 'blogFadeOut 0.8s ease forwards', `prev-${current}`)}
//             {renderSlide(banner.image, 'blogFadeIn 0.8s ease', `cur-${current}`)}
//           </>
//         ) : (
//           <div className="home-slide" style={{ height: sliderH, background: 'linear-gradient(135deg, #12B5FF, #0095E8)' }}>
//             <div className="home-slide-overlay" />
//             <div className="home-slide-content" style={{ left: leftPad }}>
//               <div className="hero-fly-row">
//                 <img src={assetUrl('/images/airplane.png')} alt="" className="hero-airplane" />
//                 <div className="hero-fly-text">
//                   <span className="home-slide-title" style={{ fontSize: titleSize }}>Experiences for</span>
//                   <div className="home-slide-title-row" style={{ marginTop: 4 }}>
//                     <span
//                       className="home-slide-animated-text"
//                       style={{ fontSize: titleSize }}
//                       key={wordIndex}
//                     >
//                       {CYCLING_WORDS[wordIndex]}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {hasBanners && (
//         <div className="home-slider-dots">
//           {banners.map((_, i) => (
//             <div
//               key={i}
//               className={`home-slider-dot ${i === current ? 'active' : 'inactive'}`}
//               onClick={() => { setPrevIdx(current); setCurrent(i) }}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   )
// }