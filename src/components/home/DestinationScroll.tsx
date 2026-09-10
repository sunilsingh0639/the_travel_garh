// import { useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import './DestinationScroll.css'

// const domesticList = new Set([
//   'Ladakh', 'Spiti Valley', 'North East', 'Kashmir', 'Manali', 'Goa',
//   'Rajasthan', 'Kerala', 'Andaman', 'Darjeeling', 'Jaisalmer', 'Sikkim',
//   'Uttarakhand', 'Uttar Pradesh',
// ])



// const items: { title: string; icon: string }[] = [
//   { title: 'Ladakh', icon: 'account_balance' },
//   { title: 'Vietnam', icon: 'forest' },
//   { title: 'Bali', icon: 'temple_buddhist' },
//   { title: 'Spiti Valley', icon: 'landscape' },
//   { title: 'Thailand', icon: 'temple_hindu' },
//   { title: 'North East', icon: 'holiday_village' },
//   { title: 'Kashmir', icon: 'ac_unit' },
//   { title: 'Manali', icon: 'terrain' },
//   { title: 'Goa', icon: 'beach_access' },
//   { title: 'Maldives', icon: 'water' },
//   { title: 'Dubai', icon: 'location_city' },
//   { title: 'Singapore', icon: 'apartment' },
//   { title: 'Malaysia', icon: 'park' },
//   { title: 'Georgia', icon: 'landscape' },
//   { title: 'Rajasthan', icon: 'fort' },
//   { title: 'Kerala', icon: 'nature' },
//   { title: 'Andaman', icon: 'waves' },
//   { title: 'Uttarakhand', icon: 'filter_hdr' },
// ]

// function slugify(text: string) {
//   return text.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')
// }

// const materialIcons: Record<string, string> = {
//   account_balance: '\uE84F', forest: '\uEA97', temple_buddhist: '\uE86B',
//   landscape: '\uE3F8', temple_hindu: '\uEA9D', holiday_village: '\uF23A',
//   ac_unit: '\uEB3F', terrain: '\uE3F4', beach_access: '\uEB3E',
//   water: '\uE54B', location_city: '\uE620', apartment: '\uEA40',
//   park: '\uEB48', fort: '\uE9AD', nature: '\uE3DA', waves: '\uE7D4',
//   filter_hdr: '\uE54C',
// }

// export default function DestinationScroll() {
//   const scrollRef = useRef<HTMLDivElement>(null)
//   const [selected, setSelected] = useState(-1)
//   const navigate = useNavigate()

//   function slide(delta: number) {
//     const el = scrollRef.current
//     if (!el) return
//     el.scrollBy({ left: delta, behavior: 'smooth' })
//   }

//   function handleClick(title: string, index: number) {
//     setSelected(index)
//     const slug = slugify(title)
//     if (domesticList.has(title)) {
//       navigate(`/domestic/${slug}`)
//     } else {
//       navigate(`/international/${slug}`)
//     }
//   }

//   return (
//     <section className="destination-section">
//       <div className="destination-wrapper">
//         <button className="destination-arrow-btn" onClick={() => slide(-220)} aria-label="Left">
//           <span className="destination-arrow-icon material-icons">chevron_left</span>
//         </button>

//         <div className="destination-scroll" ref={scrollRef}>
//           {items.map((item, i) => (
//             <div
//               key={item.title}
//               className={`destination-chip ${selected === i ? 'active' : ''}`}
//               onClick={() => handleClick(item.title, i)}
//             >
//               <span className="destination-chip-icon material-icons">
//                 {materialIcons[item.icon] || '\uE8B6'}
//               </span>
//               <span className="destination-chip-label">{item.title}</span>
//             </div>
//           ))}
//         </div>

//         <button className="destination-arrow-btn" onClick={() => slide(220)} aria-label="Right">
//           <span className="destination-arrow-icon material-icons">chevron_right</span>
//         </button>
//       </div>
//     </section>
//   )
// }
// import { useRef, useState,useEffect, type JSX } from 'react'
// import { useNavigate } from 'react-router-dom'
// import './DestinationScroll.css'

// const domesticList = new Set([
//   'Ladakh', 'Spiti Valley', 'North East', 'Kashmir', 'Manali', 'Goa',
//   'Rajasthan', 'Kerala', 'Andaman', 'Darjeeling', 'Jaisalmer', 'Sikkim',
//   'Uttarakhand', 'Uttar Pradesh',
// ])

// const items: { title: string }[] = [
//   { title: 'Ladakh' },
//   { title: 'Vietnam' },
//   { title: 'Bali' },
//   { title: 'Spiti Valley' },
//   { title: 'Thailand' },
//   { title: 'North East' },
//   { title: 'Kashmir' },
//   { title: 'Manali' },
//   { title: 'Goa' },
//   { title: 'Maldives' },
//   { title: 'Dubai' },
//   { title: 'Singapore' },
//   { title: 'Malaysia' },
//   { title: 'Georgia' },
//   { title: 'Rajasthan' },
//   { title: 'Kerala' },
//   { title: 'Andaman' },
//   { title: 'Uttarakhand' },
// ]

// const destinationIcons: Record<string, JSX.Element> = {
//   Ladakh: (
//     <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
//       <polygon points="20,4 36,30 4,30" />
//       <line x1="20" y1="30" x2="20" y2="36" />
//       <line x1="14" y1="36" x2="26" y2="36" />
//       <line x1="9" y1="22" x2="31" y2="22" />
//     </svg>
//   ),
//   Vietnam: (
//     <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M20 6 Q14 10 12 18 Q10 26 20 34 Q30 26 28 18 Q26 10 20 6Z" />
//       <path d="M15 14 Q20 11 25 14" />
//       <path d="M13 19 Q20 16 27 19" />
//       <line x1="20" y1="34" x2="20" y2="38" />
//       <line x1="14" y1="38" x2="26" y2="38" />
//     </svg>
//   ),
//   Bali: (
//     <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
//       <rect x="8" y="22" width="24" height="10" rx="1" />
//       <rect x="11" y="15" width="18" height="8" rx="1" />
//       <rect x="14" y="9" width="12" height="7" rx="1" />
//       <rect x="17" y="4" width="6" height="6" rx="1" />
//       <line x1="20" y1="4" x2="20" y2="2" />
//     </svg>
//   ),
//   'Spiti Valley': (
//     <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
//       <polyline points="3,32 10,18 15,24 20,10 25,20 30,15 37,32" />
//       <line x1="3" y1="32" x2="37" y2="32" />
//     </svg>
//   ),
//   Thailand: (
//     <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
//       <rect x="8" y="24" width="24" height="10" rx="1" />
//       <rect x="10" y="17" width="20" height="8" rx="1" />
//       <path d="M20 4 Q28 10 28 17 H12 Q12 10 20 4Z" />
//       <line x1="20" y1="4" x2="20" y2="2" />
//       <circle cx="20" cy="2" r="1.5" fill="currentColor" stroke="none" />
//     </svg>
//   ),
//   'North East': (
//     <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
//       <rect x="6" y="20" width="28" height="14" rx="2" />
//       <path d="M6 20 Q20 6 34 20" />
//       <circle cx="13" cy="26" r="2" />
//       <circle cx="20" cy="26" r="2" />
//       <circle cx="27" cy="26" r="2" />
//       <line x1="16" y1="34" x2="16" y2="38" />
//       <line x1="24" y1="34" x2="24" y2="38" />
//     </svg>
//   ),
//   Kashmir: (
//     <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M8 28 Q10 16 20 10 Q30 16 32 28" />
//       <path d="M6 28 Q13 22 20 18 Q27 22 34 28" />
//       <line x1="6" y1="28" x2="34" y2="28" />
//       <path d="M20 10 L20 6 M16 7 L20 4 L24 7" />
//       <path d="M10 32 Q20 36 30 32" />
//     </svg>
//   ),
//   Manali: (
//     <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M20 4 L34 32 H6 Z" />
//       <line x1="14" y1="32" x2="14" y2="36" />
//       <line x1="26" y1="32" x2="26" y2="36" />
//       <path d="M10 24 Q20 20 30 24" />
//       <circle cx="30" cy="10" r="3" />
//       <path d="M30 7 Q34 5 36 8" />
//     </svg>
//   ),
//   Goa: (
//     <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
//       <line x1="20" y1="8" x2="20" y2="28" />
//       <path d="M20 8 Q28 12 30 18 Q24 18 20 16" />
//       <path d="M20 12 Q14 14 12 20 Q16 20 20 18" />
//       <line x1="8" y1="32" x2="34" y2="32" />
//       <path d="M8 36 Q21 30 34 36" />
//     </svg>
//   ),
//   Maldives: (
//     <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
//       <line x1="20" y1="6" x2="20" y2="22" />
//       <path d="M20 10 Q26 8 30 12 Q26 14 20 12" />
//       <ellipse cx="20" cy="26" rx="10" ry="3" />
//       <line x1="10" y1="30" x2="30" y2="30" />
//       <path d="M10 34 Q20 30 30 34" />
//     </svg>
//   ),
//   Dubai: (
//     <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
//       <rect x="14" y="8" width="6" height="26" />
//       <rect x="9" y="18" width="5" height="16" />
//       <rect x="20" y="14" width="5" height="20" />
//       <rect x="25" y="22" width="5" height="12" />
//       <line x1="6" y1="34" x2="34" y2="34" />
//       <rect x="16" y="22" width="2" height="3" />
//       <rect x="21" y="22" width="2" height="3" />
//     </svg>
//   ),
//   Singapore: (
//     <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
//       <rect x="8" y="20" width="24" height="14" />
//       <rect x="12" y="24" width="4" height="4" />
//       <rect x="18" y="24" width="4" height="4" />
//       <rect x="24" y="24" width="4" height="4" />
//       <line x1="14" y1="34" x2="14" y2="38" />
//       <line x1="26" y1="34" x2="26" y2="38" />
//       <path d="M8 20 Q20 8 32 20" />
//     </svg>
//   ),
//   Malaysia: (
//     <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
//       <circle cx="20" cy="20" r="14" />
//       <line x1="20" y1="6" x2="20" y2="34" />
//       <line x1="6" y1="20" x2="34" y2="20" />
//       <path d="M8 12 Q14 16 20 14 Q26 12 32 16" />
//       <path d="M8 28 Q14 24 20 26 Q26 28 32 24" />
//     </svg>
//   ),
//   Georgia: (
//     <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M20 6 Q28 10 30 20 Q28 30 20 34 Q12 30 10 20 Q12 10 20 6Z" />
//       <line x1="20" y1="6" x2="20" y2="34" />
//       <line x1="10" y1="20" x2="30" y2="20" />
//       <path d="M14 13 Q17 11 20 13" />
//       <path d="M20 13 Q23 11 26 13" />
//     </svg>
//   ),
//   Rajasthan: (
//     <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M6 34 L6 18 L14 10 L14 18 L20 12 L26 18 L26 10 L34 18 L34 34Z" />
//       <rect x="15" y="24" width="10" height="10" />
//       <path d="M14 10 Q20 6 26 10" />
//       <circle cx="20" cy="9" r="1.5" fill="currentColor" stroke="none" />
//     </svg>
//   ),
//   Kerala: (
//     <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M20 4 C16 4 10 8 10 16 C10 22 14 26 18 28 L18 38" />
//       <path d="M20 4 C24 4 30 8 30 16 C30 22 26 26 22 28 L22 38" />
//       <path d="M14 14 Q20 10 26 14" />
//       <path d="M12 20 Q20 16 28 20" />
//       <line x1="16" y1="38" x2="24" y2="38" />
//     </svg>
//   ),
//   Andaman: (
//     <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
//       <ellipse cx="16" cy="18" rx="5" ry="9" />
//       <ellipse cx="25" cy="20" rx="4" ry="8" />
//       <path d="M10 30 Q20 26 30 30" />
//       <line x1="6" y1="34" x2="34" y2="34" />
//       <path d="M6 38 Q20 32 34 38" />
//     </svg>
//   ),
//   Uttarakhand: (
//     <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
//       <polyline points="4,32 12,16 18,22 24,12 30,20 36,8 40,32" />
//       <line x1="4" y1="32" x2="40" y2="32" />
//       <path d="M20 12 Q24 8 28 12" />
//     </svg>
//   ),
// }

// function slugify(text: string) {
//   return text.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')
// }

// // export default function DestinationScroll() {
// //   const scrollRef = useRef<HTMLDivElement>(null)
// //   const [selected, setSelected] = useState(-1)
// //   const navigate = useNavigate()

// //   function slide(delta: number) {
// //     const el = scrollRef.current
// //     if (!el) return
// //     el.scrollBy({ left: delta, behavior: 'smooth' })
// //   }

// //   function handleClick(title: string, index: number) {
// //     setSelected(index)
// //     const slug = slugify(title)
// //     if (domesticList.has(title)) {
// //       navigate(`/domestic/${slug}`)
// //     } else {
// //       navigate(`/international/${slug}`)
// //     }
// //   }

// //   return (
// //     <section className="destination-section">
// //       <div className="destination-wrapper">
// //         <button className="destination-arrow-btn" onClick={() => slide(-220)} aria-label="Left">
// //           <span className="destination-arrow-icon material-icons">chevron_left</span>
// //         </button>

// //         <div className="destination-scroll" ref={scrollRef}>
// //           {items.map((item, i) => (
// //             <div
// //               key={item.title}
// //               className={`destination-chip ${selected === i ? 'active' : ''}`}
// //               onClick={() => handleClick(item.title, i)}
// //             >
// //               <span className="destination-chip-icon">
// //                 {destinationIcons[item.title] ?? (
// //                   <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
// //                     <circle cx="20" cy="20" r="14" />
// //                     <line x1="20" y1="6" x2="20" y2="34" />
// //                     <line x1="6" y1="20" x2="34" y2="20" />
// //                   </svg>
// //                 )}
// //               </span>
// //               <span className="destination-chip-label">{item.title}</span>
// //             </div>
// //           ))}
// //         </div>

// //         <button className="destination-arrow-btn" onClick={() => slide(220)} aria-label="Right">
// //           <span className="destination-arrow-icon material-icons">chevron_right</span>
// //         </button>
// //       </div>
// //     </section>
// //   )
// // }
// export default function DestinationScroll() {
//   const scrollRef = useRef<HTMLDivElement>(null)
//   const intervalRef = useRef<number | null>(null)

//   const [selected, setSelected] = useState(-1)
//   const navigate = useNavigate()

//   const infiniteItems = [...items, ...items]

//   const startAutoSlide = () => {
//     if (intervalRef.current) return

//     intervalRef.current = window.setInterval(() => {
//       const el = scrollRef.current
//       if (!el) return

//       el.scrollLeft += 2

//       if (el.scrollLeft >= el.scrollWidth / 2) {
//         el.scrollLeft = 0
//       }
//     }, 20)
//   }

//   const stopAutoSlide = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current)
//       intervalRef.current = null
//     }
//   }

//   useEffect(() => {
//     startAutoSlide()

//     return () => {
//       stopAutoSlide()
//     }
//   }, [])

//   function slide(delta: number) {
//     const el = scrollRef.current
//     if (!el) return

//     // Pause auto slide
//     stopAutoSlide()

//     el.scrollBy({
//       left: delta,
//       behavior: 'smooth',
//     })

//     // Resume auto slide after 2 sec
//     setTimeout(() => {
//       startAutoSlide()
//     }, 2000)
//   }

//   function handleClick(title: string, index: number) {
//     setSelected(index)

//     const slug = slugify(title)

//     if (domesticList.has(title)) {
//       navigate(`/domestic/${slug}`)
//     } else {
//       navigate(`/international/${slug}`)
//     }
//   }

//   return (
//     <section className="destination-section">
//       <div className="destination-wrapper">

//         <button
//           className="destination-arrow-btn"
//           onClick={() => slide(-500)}
//           aria-label="Left"
//         >
//           <span className="destination-arrow-icon material-icons">
//             chevron_left
//           </span>
//         </button>

//         <div
//           className="destination-scroll"
//           ref={scrollRef}
//           onMouseEnter={stopAutoSlide}
//           onMouseLeave={startAutoSlide}
//         >
//           {infiniteItems.map((item, i) => (
//             <div
//               key={`${item.title}-${i}`}
//               className={`destination-chip ${
//                 selected === i ? 'active' : ''
//               }`}
//               onClick={() => handleClick(item.title, i)}
//             >
//               <span className="destination-chip-icon">
//                 {destinationIcons[item.title]}
//               </span>

//               <span className="destination-chip-label">
//                 {item.title}
//               </span>
//             </div>
//           ))}
//         </div>

//         <button
//           className="destination-arrow-btn"
//           onClick={() => slide(500)}
//           aria-label="Right"
//         >
//           <span className="destination-arrow-icon material-icons">
//             chevron_right
//           </span>
//         </button>

//       </div>
//     </section>
//   )
// }

import { useRef, useState, useEffect, type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCities } from '../../api/cities'
import './DestinationScroll.css'

interface DestItem {
  title: string
  slug: string
  isDomestic: boolean
}

const destinationIcons: Record<string, ReactElement> = {
  Ladakh: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="20,4 36,30 4,30" />
      <line x1="20" y1="30" x2="20" y2="36" />
      <line x1="14" y1="36" x2="26" y2="36" />
      <line x1="9" y1="22" x2="31" y2="22" />
    </svg>
  ),
  Vietnam: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 Q14 10 12 18 Q10 26 20 34 Q30 26 28 18 Q26 10 20 6Z" />
      <path d="M15 14 Q20 11 25 14" />
      <path d="M13 19 Q20 16 27 19" />
      <line x1="20" y1="34" x2="20" y2="38" />
      <line x1="14" y1="38" x2="26" y2="38" />
    </svg>
  ),
  Bali: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="22" width="24" height="10" rx="1" />
      <rect x="11" y="15" width="18" height="8" rx="1" />
      <rect x="14" y="9" width="12" height="7" rx="1" />
      <rect x="17" y="4" width="6" height="6" rx="1" />
      <line x1="20" y1="4" x2="20" y2="2" />
    </svg>
  ),
  'Spiti Valley': (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3,32 10,18 15,24 20,10 25,20 30,15 37,32" />
      <line x1="3" y1="32" x2="37" y2="32" />
    </svg>
  ),
  Thailand: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="24" width="24" height="10" rx="1" />
      <rect x="10" y="17" width="20" height="8" rx="1" />
      <path d="M20 4 Q28 10 28 17 H12 Q12 10 20 4Z" />
      <line x1="20" y1="4" x2="20" y2="2" />
      <path d="M18 1 L20 -1 L22 1" transform="translate(0,3)" />
    </svg>
  ),
  'North East': (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="20" width="28" height="14" rx="2" />
      <path d="M6 20 Q20 6 34 20" />
      <line x1="11" y1="24" x2="11" y2="28" />
      <line x1="20" y1="24" x2="20" y2="28" />
      <line x1="29" y1="24" x2="29" y2="28" />
      <line x1="16" y1="34" x2="16" y2="38" />
      <line x1="24" y1="34" x2="24" y2="38" />
    </svg>
  ),
  Kashmir: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 28 Q10 16 20 10 Q30 16 32 28" />
      <path d="M6 28 Q13 22 20 18 Q27 22 34 28" />
      <line x1="6" y1="28" x2="34" y2="28" />
      <path d="M20 10 L20 6 M16 7 L20 4 L24 7" />
      <path d="M10 32 Q20 36 30 32" />
    </svg>
  ),
  Manali: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4 L34 32 H6 Z" />
      <line x1="14" y1="32" x2="14" y2="36" />
      <line x1="26" y1="32" x2="26" y2="36" />
      <path d="M10 24 Q20 20 30 24" />
      <path d="M30 6 L32 10 L30 14 L28 10Z" />
      <path d="M30 7 Q34 5 36 8" />
    </svg>
  ),
  Goa: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="20" y1="8" x2="20" y2="28" />
      <path d="M20 8 Q28 12 30 18 Q24 18 20 16" />
      <path d="M20 12 Q14 14 12 20 Q16 20 20 18" />
      <line x1="8" y1="32" x2="34" y2="32" />
      <path d="M8 36 Q21 30 34 36" />
    </svg>
  ),
  Maldives: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="20" y1="6" x2="20" y2="22" />
      <path d="M20 10 Q26 8 30 12 Q26 14 20 12" />
      <ellipse cx="20" cy="26" rx="10" ry="3" />
      <line x1="10" y1="30" x2="30" y2="30" />
      <path d="M10 34 Q20 30 30 34" />
    </svg>
  ),
  Dubai: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="8" width="6" height="26" />
      <rect x="9" y="18" width="5" height="16" />
      <rect x="20" y="14" width="5" height="20" />
      <rect x="25" y="22" width="5" height="12" />
      <line x1="6" y1="34" x2="34" y2="34" />
      <rect x="16" y="22" width="2" height="3" />
      <rect x="21" y="22" width="2" height="3" />
    </svg>
  ),
  Singapore: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="20" width="24" height="14" />
      <rect x="12" y="24" width="4" height="4" />
      <rect x="18" y="24" width="4" height="4" />
      <rect x="24" y="24" width="4" height="4" />
      <line x1="14" y1="34" x2="14" y2="38" />
      <line x1="26" y1="34" x2="26" y2="38" />
      <path d="M8 20 Q20 8 32 20" />
    </svg>
  ),
  Malaysia: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4 L34 12 L34 28 L20 36 L6 28 L6 12Z" />
      <line x1="20" y1="4" x2="20" y2="36" />
      <line x1="6" y1="20" x2="34" y2="20" />
      <path d="M8 12 Q14 16 20 14 Q26 12 32 16" />
      <path d="M8 28 Q14 24 20 26 Q26 28 32 24" />
    </svg>
  ),
  Georgia: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 Q28 10 30 20 Q28 30 20 34 Q12 30 10 20 Q12 10 20 6Z" />
      <line x1="20" y1="6" x2="20" y2="34" />
      <line x1="10" y1="20" x2="30" y2="20" />
      <path d="M14 13 Q17 11 20 13" />
      <path d="M20 13 Q23 11 26 13" />
    </svg>
  ),
  Rajasthan: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 34 L6 18 L14 10 L14 18 L20 12 L26 18 L26 10 L34 18 L34 34Z" />
      <rect x="15" y="24" width="10" height="10" />
      <path d="M14 10 Q20 6 26 10" />
      <path d="M18 8 L20 5 L22 8Z" />
    </svg>
  ),
  Kerala: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4 C16 4 10 8 10 16 C10 22 14 26 18 28 L18 38" />
      <path d="M20 4 C24 4 30 8 30 16 C30 22 26 26 22 28 L22 38" />
      <path d="M14 14 Q20 10 26 14" />
      <path d="M12 20 Q20 16 28 20" />
      <line x1="16" y1="38" x2="24" y2="38" />
    </svg>
  ),
  Andaman: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="16" cy="18" rx="5" ry="9" />
      <ellipse cx="25" cy="20" rx="4" ry="8" />
      <path d="M10 30 Q20 26 30 30" />
      <line x1="6" y1="34" x2="34" y2="34" />
      <path d="M6 38 Q20 32 34 38" />
    </svg>
  ),
  Uttarakhand: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4,32 12,16 18,22 24,12 30,20 36,8 40,32" />
      <line x1="4" y1="32" x2="40" y2="32" />
      <path d="M20 12 Q24 8 28 12" />
    </svg>
  ),
  Nepal: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 32 L14 12 L20 22 L26 6 L36 32Z" />
      <line x1="4" y1="32" x2="36" y2="32" />
      <path d="M26 6 L23 11 L26 11 L24 15" />
    </svg>
  ),
  Europe: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="18" width="8" height="16" />
      <rect x="22" y="12" width="8" height="22" />
      <path d="M10 18 L14 10 L18 18" />
      <path d="M22 12 L26 6 L30 12" />
      <line x1="4" y1="34" x2="36" y2="34" />
    </svg>
  ),
Seychelles: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="20" y1="6" x2="20" y2="24" />
      <path d="M20 10 Q28 8 32 14 Q26 16 20 14" />
      <path d="M20 14 Q12 12 8 18 Q14 20 20 16" />
      <path d="M6 28 L14 26 L20 29 L26 26 L34 28 L28 31 L20 33 L12 31Z" />
      <path d="M8 32 Q20 28 32 32" />
    </svg>
  ),
  Lakshadweep: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="20" cy="18" rx="14" ry="6" />
      <ellipse cx="20" cy="18" rx="7" ry="3" />
      <line x1="10" y1="28" x2="30" y2="28" />
      <path d="M8 32 Q20 27 32 32" />
    </svg>
  ),
  Himachal: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 32 L12 10 L18 20 L24 6 L38 32Z" />
      <path d="M24 6 L21 12 L24.5 12 L22 17" />
      <line x1="2" y1="32" x2="38" y2="32" />
    </svg>
  ),
  'Himachal Pradesh': (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 32 L12 10 L18 20 L24 6 L38 32Z" />
      <path d="M24 6 L21 12 L24.5 12 L22 17" />
      <line x1="2" y1="32" x2="38" y2="32" />
    </svg>
  ),
}

// function slugify(text: string) {
//   return text.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')
// }

export default function DestinationScroll() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number | null>(null)
  const pausedRef = useRef(false)
  const [selected, setSelected] = useState(-1)
  const [items, setItems] = useState<DestItem[]>([])
  const navigate = useNavigate()

  const EXCLUDED_CITIES = new Set(['Lakshadweep', 'Rajasthan', 'Domestic Tour Packages', 'International Tour Packages'])

  useEffect(() => {
    getCities().then(({ domestic, international }) => {
      const all: DestItem[] = [
        ...domestic.sort((a, b) => a.displayOrder - b.displayOrder)
          .filter(c => !EXCLUDED_CITIES.has(c.name))
          .map(c => ({ title: c.name, slug: c.slug, isDomestic: true })),
        ...international.sort((a, b) => a.displayOrder - b.displayOrder)
          .filter(c => !EXCLUDED_CITIES.has(c.name))
          .map(c => ({ title: c.name, slug: c.slug, isDomestic: false })),
      ]
      setItems(all)
    })
  }, [])

  const infiniteItems = [...items, ...items, ...items]

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const singleWidth = el.scrollWidth / 3
    el.scrollLeft = singleWidth

    let lastTime = 0
    const speed = 0.01

    function animate(time: number) {
      if (!pausedRef.current && el) {
        const delta = lastTime ? (time - lastTime) * speed * 16 : 0
        el.scrollLeft += delta

        const singleW = el.scrollWidth / 3
        if (el.scrollLeft >= singleW * 2) {
          el.scrollLeft -= singleW
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += singleW
        }
      }
      lastTime = time
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [items])

  function pause() { pausedRef.current = true }
  function resume() { pausedRef.current = false }

  function slide(delta: number) {
    const el = scrollRef.current
    if (!el) return
    pause()
    el.scrollBy({ left: delta, behavior: 'smooth' })
    setTimeout(resume, 2000)
  }

  function handleClick(item: DestItem, index: number) {
    setSelected(index % items.length)
    if (item.isDomestic) {
      navigate(`/domestic/${item.slug}`)
    } else {
      navigate(`/international/${item.slug}`)
    }
  }

  return (
    <section className="destination-section">
      <div className="destination-wrapper">
        <button className="destination-arrow-btn" onClick={() => slide(-500)} aria-label="Left">
          <span className="destination-arrow-icon">&#10094;</span>
        </button>

        <div
          className="destination-scroll"
          ref={scrollRef}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={() => setTimeout(resume, 2000)}
        >
              {infiniteItems.map((item, i) => (
                <div
                  key={`${item.slug}-${i}`}
                  className={`destination-chip ${selected === i % items.length ? 'active' : ''}`}
                  onClick={() => handleClick(item, i)}
                >
                  <span className="destination-chip-icon">
                    {destinationIcons[item.title] ?? (
                      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="20" cy="20" r="14" />
                      </svg>
                    )}
                  </span>
                  <span className="destination-chip-label">{item.title}</span>
                </div>
              ))}
        </div>

        <button className="destination-arrow-btn" onClick={() => slide(500)} aria-label="Right">
          <span className="destination-arrow-icon">&#10095;</span>
        </button>
      </div>
    </section>
  )
}