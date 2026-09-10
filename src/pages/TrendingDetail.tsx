
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import type { PackageDetailModel, ItineraryItem, HotelModel, PackageModel } from '../types'
import { getPackageDetail, getSimilarPackages } from '../api/package'
import { getImageUrl, assetUrl } from '../api/client'
import { submitEnquiry, type EnquiryPayload } from '../api/enquiry'
import PackageCard from '../components/tour/PackageCard'
import StayCategory from '../components/tour/StayCategory'
import ReviewSection from '../components/home/ReviewSection'
import './TrendingDetail.css'
import { useNavigate } from 'react-router-dom';
function getPad(w: number) {
  if (w >= 1400) return 120; if (w >= 1100) return 80; if (w >= 900) return 40; return 16
}

const REGIONS: Record<string, string[]> = {
  'Himachal Pradesh': ['Manali', 'Shimla', 'Kasol', 'Dharamshala', 'McLeod Ganj', 'Dalhousie', 'Khajjiar', 'Kullu'],
  'Kashmir': ['Srinagar', 'Gulmarg', 'Pahalgam', 'Sonamarg', 'Yusmarg', 'Doodhpathri'],
  'Ladakh': ['Leh', 'Nubra Valley', 'Pangong Lake', 'Tso Moriri', 'Kargil', 'Sham Valley'],
  'Uttarakhand': ['Nainital', 'Mussoorie', 'Rishikesh', 'Haridwar', 'Auli', 'Jim Corbett', 'Chopta'],
  'Rajasthan': ['Jaipur', 'Udaipur', 'Jaisalmer', 'Jodhpur', 'Mount Abu', 'Pushkar', 'Bikaner', 'Ranthambore (Sawai Madhopur)', 'Chittorgarh', 'Ajmer'],
  'Uttar Pradesh': ['Agra', 'Varanasi', 'Ayodhya', 'Prayagraj', 'Mathura', 'Vrindavan', 'Lucknow'],
  'Arunachal Pradesh': ['Tawang', 'Ziro', 'Bomdila', 'Dirang', 'Itanagar', 'Mechuka', 'Pasighat'],
  'Goa': ['Panaji', 'Calangute', 'Baga', 'Candolim', 'Vagator', 'Palolem', 'Colva'],
  'Kerala': ['Munnar', 'Alleppey', 'Kochi', 'Thekkady', 'Wayanad', 'Kovalam', 'Varkala'],
  'Lakshadweep': ['Agatti', 'Bangaram', 'Kavaratti', 'Kadmat', 'Kalpeni', 'Minicoy'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Coorg', 'Chikmagalur', 'Hampi', 'Gokarna', 'Udupi'],
  'Andaman & Nicobar': ['Port Blair', 'Havelock Island (Swaraj Dweep)', 'Neil Island (Shaheed Dweep)', 'Baratang', 'Ross Island', 'Diglipur'],
  'Spiti Valley': ['Kaza', 'Tabo', 'Dhankar', 'Langza', 'Hikkim', 'Komic', 'Kibber'],
}

export default function TrendingDetail() {
  const { name: slug } = useParams()
  const [pkg, setPkg] = useState<PackageDetailModel | null>(null)
  const [similar, setSimilar] = useState<PackageModel[]>([])
  const [loading, setLoading] = useState(true)
  // const [expandedDay, setExpandedDay] = useState<number | null>(0)
  // const [showEnquiry, setShowEnquiry] = useState(false)
  const [expandedDay, setExpandedDay] = useState<number | null>(0)
  const [showEnquiry, setShowEnquiry] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [w, setW] = useState(1200)
  const similarScrollRef = useRef<HTMLDivElement>(null)
  const [showSimilarLeftArrow, setShowSimilarLeftArrow] = useState(false)

  function slideSimilar(delta: number) {
    if (delta > 0) setShowSimilarLeftArrow(true)
    similarScrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  useEffect(() => {
    const onResize = () => setW(window.innerWidth)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const pad = getPad(w)
  const mobile = w < 900

useEffect(() => {``
    if (!slug) return
    setLoading(true)
    getPackageDetail(slug).then(detail => {
      setPkg(detail)
      if (detail) {
        setImages(detail.images.map(i => i.imagePath).filter(Boolean))
        sessionStorage.setItem('currentPkg', JSON.stringify({
          name: detail.name,
          city: detail.city,
          image: detail.images[0]?.imagePath || ''
        }))
      }
    }).catch(() => {})
    getSimilarPackages(slug).then(setSimilar).catch(() => {}).finally(() => setLoading(false))

    return () => sessionStorage.removeItem('currentPkg')
  }, [slug])

  if (loading) return (
    <section className="section" style={{ paddingTop: 20, background: '#f5f5f5', minHeight: '100vh' }}>
      <div className="container"><div className="skeleton" style={{ height: 400, borderRadius: 12, marginBottom: 24 }} /></div>
    </section>
  )
  if (!pkg) return <section className="section" style={{ padding: 20, background: '#f5f5f5' }}><div className="container"><h1>Package not found</h1></div></section>

  // const images = pkg.images.map(i => i.imagePath).filter(Boolean)
  const saveStr = pkg.saving > 0 ? `Save ₹${pkg.saving.toLocaleString()}` : ''

  return (
    <>
      <Helmet><title>{pkg.name} - The TravelGarh</title></Helmet>

      {/* ===== GALLERY SECTION ===== */}
      <div style={{ background: '#f5f5f5', padding: `24px ${pad}px` }}>
        {/* {images.length > 0 && (
          mobile ? (
            <div>
              <img src={getImageUrl(images[mainImage])} alt={pkg.name} loading="lazy" style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 24 }} />
              {images.length > 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
                  {images.slice(1).map((img, i) => (
                    <img key={i} src={getImageUrl(img)} alt="" loading="lazy" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 18, cursor: 'pointer' }} onClick={() => setMainImage(i + 1)} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{ height: 520, display: 'flex', gap: 12 }}>
              <div style={{ flex: 2 }}>
                <img src={getImageUrl(images[mainImage])} alt={pkg.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 24 }} />
              </div>
              {images.length > 1 && (
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {images.slice(1).map((img, i) => (
                    <img key={i} src={getImageUrl(img)} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 18, cursor: 'pointer' }} onClick={() => setMainImage(i + 1)} />
                  ))}
                </div>
              )}
            </div>
          )
        )} */}

        {images.length > 0 && (
          mobile ? (
            <div>
              <img src={getImageUrl(images[0])} alt={pkg.name} loading="lazy" style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 24 }} />
              {images.length > 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
                  {images.slice(1).map((img, i) => (
                    <img
                      key={img + i}
                      src={getImageUrl(img)}
                      alt=""
                      loading="lazy"
                      style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 18, cursor: 'pointer' }}
                      onClick={() => {
                        const newImages = [...images]
                        const clickedIdx = i + 1
                        ;[newImages[0], newImages[clickedIdx]] = [newImages[clickedIdx], newImages[0]]
                        setImages(newImages)
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            // <div style={{ height: 520, display: 'flex', gap: 12 }}>
            //   <div style={{ flex: 2 }}>
            //     <img src={getImageUrl(images[0])} alt={pkg.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 24 }} />
            //   </div>
            //   {images.length > 1 && (
            //     <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            //       {images.slice(1).map((img, i) => (
            //         <img
            //           key={img + i}
            //           src={getImageUrl(img)}
            //           alt=""
            //           loading="lazy"
            //           style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 18, cursor: 'pointer' }}
            //           onClick={() => {
            //             const newImages = [...images]
            //             const clickedIdx = i + 1
            //             ;[newImages[0], newImages[clickedIdx]] = [newImages[clickedIdx], newImages[0]]
            //             setImages(newImages)
            //           }}
            //         />
            //       ))}
            //     </div>
            //   )}
            // </div>

            <div style={{ height: 520, display: 'flex', gap: 12, overflow: 'hidden' }}>
              <div style={{ flex: 2, minWidth: 0, minHeight: 0, overflow: 'hidden', borderRadius: 24 }}>
                <img src={getImageUrl(images[0])} alt={pkg.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              {images.length > 1 && (
                <div style={{ flex: 1, minWidth: 0, minHeight: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {images.slice(1).map((img, i) => (
                    <div key={img + i} style={{ overflow: 'hidden', borderRadius: 18, minWidth: 0, minHeight: 0 }}>
                      <img
                        src={getImageUrl(img)}
                        alt=""
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', display: 'block' }}
                        onClick={() => {
                          const newImages = [...images]
                          const clickedIdx = i + 1
                          ;[newImages[0], newImages[clickedIdx]] = [newImages[clickedIdx], newImages[0]]
                          setImages(newImages)
                        }}
                      />n
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        )}
        <div style={{ marginTop: 20 }} />

        {mobile ? (
          <div>
            <TopInfoCard pkg={pkg} small={w < 600} />
            <div style={{ height: 20 }} />
            <PrivateTrips mobile />
            <div style={{ height: 20 }} />
            <PriceCard pkg={pkg} saveStr={saveStr} small={w < 600} onEnquiry={() => setShowEnquiry(true)} />
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div style={{ flex: w >= 900 && w < 1200 ? 2 : 3 }}>
              <TopInfoCard pkg={pkg} small={w < 600} />
              <div style={{ height: 20 }} />
              <PrivateTrips mobile={false} />
            </div>
            <div style={{ flex: 1 }}>
              <PriceCard pkg={pkg} saveStr={saveStr} small={w < 600} onEnquiry={() => setShowEnquiry(true)} />
            </div>
          </div>
        )}
      </div>

      {/* ===== ITINERARY ===== */}
      {pkg.itineraries.length > 0 && (
        <div style={{ background: '#f5f5f5', padding: `20px ${pad}px` }}>
          <div style={{ maxWidth: 950, margin: '0 auto' }}>
            <div style={{ background: '#fff', borderRadius: 28, padding: mobile ? 16 : 28 }}>
              <h2 style={{ fontSize: mobile ? 28 : 40, fontWeight: 'bold', margin: 0 }}>Itinerary</h2>
              <div style={{ height: 24 }} />
              {pkg.itineraries.map((item, i) => (
                <ItineraryDay key={i} item={item} expanded={expandedDay === i} onToggle={() => setExpandedDay(expandedDay === i ? null : i)} mobile={mobile} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== INCLUSIONS / EXCLUSIONS ===== */}
      {(pkg.inclusions.length > 0 || pkg.exclusions.length > 0) && (
        <div style={{ background: '#f5f5f5', padding: `20px ${pad}px` }}>
          {mobile ? (
            <div>
              {pkg.inclusions.length > 0 && <IncExcBox title="Inclusions" items={pkg.inclusions} check />}
              {pkg.inclusions.length > 0 && pkg.exclusions.length > 0 && <div style={{ height: 16 }} />}
              {pkg.exclusions.length > 0 && <IncExcBox title="Exclusions" items={pkg.exclusions} check={false} />}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 20, alignItems: 'stretch' }}>
              {pkg.inclusions.length > 0 && <div style={{ flex: 1 }}><IncExcBox title="Inclusions" items={pkg.inclusions} check /></div>}
              {pkg.inclusions.length > 0 && pkg.exclusions.length > 0 && <div style={{ width: 20 }} />}
              {pkg.exclusions.length > 0 && <div style={{ flex: 1 }}><IncExcBox title="Exclusions" items={pkg.exclusions} check={false} /></div>}
            </div>
          )}
        </div>
      )}

      {/* ===== HOTELS ===== */}
      {pkg.hotels.length > 0 && (
        <div style={{ background: '#f5f5f5', padding: `20px ${pad}px` }}>
          <HotelSection hotels={pkg.hotels} mobile={mobile} days={pkg.days} />
        </div>
      )}

      {/* ===== REVIEWS ===== */}
      <ReviewSection />

      {/* ===== ENQUIRY MODAL ===== */}
      {showEnquiry && (
        <div className="modal-overlay" onClick={() => setShowEnquiry(false)}>
          <EnquiryDialog pkg={pkg} mobile={mobile} onClose={() => setShowEnquiry(false)} showDestinationField />
        </div>
      )}
    </>
  )
}

/* ── Enquiry Dialog ── */
function getPkgImage(pkg: PackageDetailModel | { name: string; city: string; image: string } | null): string {
  if (!pkg) return ''
  if ('images' in pkg && pkg.images?.[0]?.imagePath) return pkg.images[0].imagePath
  if ('image' in pkg && pkg.image) return (pkg as any).image
  return ''
}

function EnquiryDialog({ pkg, mobile, onClose, showDestinationField }: { pkg: PackageDetailModel | { name: string; city: string; image: string } | null; mobile: boolean; onClose: () => void; showDestinationField?: boolean }) {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [message, setMessage] = useState('')
  const [travellers, setTravellers] = useState(0)
  const [destination, setDestination] = useState('')
  const [regionSearch, setRegionSearch] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  // const [selectedPlaces, setSelectedPlaces] = useState<string[]>([])
  // const [err, setErr] = useState('')
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([])
  const [dialogStep, setDialogStep] = useState<1 | 2>(1)
  const [flightTicket, setFlightTicket] = useState<'yes' | 'no' | ''>('')
  const [hotelCategoryChoice, setHotelCategoryChoice] = useState('')
  const [budget, setBudget] = useState('')
  const [travellingFromCity, setTravellingFromCity] = useState('')
  const [err, setErr] = useState('')
  const [ok, setOk] = useState('')
  const [loading, setLoading] = useState(false)
  const firstImg = getPkgImage(pkg)
  const pkgName = pkg?.name || ''
  const pkgCity = pkg?.city || ''
  const pkgSlug = 'slug' in (pkg || {}) ? (pkg as any).slug || '' : ''
  const pkgNights = 'nights' in (pkg || {}) ? (pkg as any).nights || 0 : 0
  const staticImg = assetUrl('/images/goa.jpg')

  function selectRegion(r: string, place?: string) {
    setDestination(r)
    setRegionSearch(r)
    setSelectedPlaces(place ? [place] : [])
    setShowSuggestions(false)
  }

  function togglePlace(place: string) {
    setSelectedPlaces(prev =>
      prev.includes(place) ? prev.filter(p => p !== place) : [...prev, place]
    )
  }

  type SuggestionItem = { kind: 'region'; region: string } | { kind: 'place'; region: string; place: string }

  const searchSuggestions: SuggestionItem[] = (() => {
    const q = regionSearch.trim().toLowerCase()
    if (!q) return []
    const regionMatches: SuggestionItem[] = Object.keys(REGIONS)
      .filter(r => r.toLowerCase().includes(q))
      .map(r => ({ kind: 'region', region: r }))
    const placeMatches: SuggestionItem[] = Object.entries(REGIONS)
      .flatMap(([region, places]) =>
        places
          .filter(p => p.toLowerCase().includes(q))
          .map(place => ({ kind: 'place' as const, region, place }))
      )
    return [...regionMatches, ...placeMatches]
  })()

  const dialogPlaces = destination ? (REGIONS[destination] || []) : []

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault()
  //   if (!name.trim() || !phone.trim()) { setErr('Name and Mobile are required.'); return }
  //   if (phone.trim().length < 10) { setErr('Please enter a valid 10-digit mobile number.'); return }
  //   setLoading(true); setErr(''); setOk('')
  //   const placesText = selectedPlaces.length ? ` (Places: ${selectedPlaces.join(', ')})` : ''
  //   const payload: EnquiryPayload = {
  //     name: name.trim(), email: email.trim(), phone: phone.trim(),
  //     expectedTravelDate: travelDate || new Date().toISOString(),
  //     message: (message.trim() + placesText).trim(), pageUrl: window.location.href,
  //     packageSlug: pkgSlug, packageName: pkgName, destination: destination || pkgCity,
  //     numberOfAdults: travellers,
  //     numberOfChildren: 0,
  //   }
  //   const ok2 = await submitEnquiry(payload)
  //   if (ok2) { setOk('Enquiry sent! Our expert will contact you soon.') }
  //   else { setErr('Something went wrong. Please try again.') }
  //   setLoading(false)
  // }
function handleContinue(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) { setErr('Name and Mobile are required.'); return }
    if (phone.trim().length < 10) { setErr('Please enter a valid 10-digit mobile number.'); return }
    setErr('')
    setDialogStep(2)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setErr(''); setOk('')
    const placesText = selectedPlaces.length ? ` (Places: ${selectedPlaces.join(', ')})` : ''
    const extraText = [
      flightTicket ? `Flight/Train Ticket Booked: ${flightTicket === 'yes' ? 'Yes' : 'No'}` : '',
      hotelCategoryChoice ? `Hotel Category: ${hotelCategoryChoice}` : '',
      budget ? `Budget: ₹${budget}` : '',
    ].filter(Boolean).join(' | ')
    const payload: EnquiryPayload = {
      name: name.trim(), email: email.trim(), phone: phone.trim(),
      expectedTravelDate: travelDate || new Date().toISOString(),
      message: [message.trim() + placesText, extraText].filter(Boolean).join(' | ').trim(), pageUrl: window.location.href,
      packageSlug: pkgSlug, packageName: pkgName, destination: destination || pkgCity,
      numberOfAdults: travellers,
      numberOfChildren: 0,
      isBookedFlightOrTrain: flightTicket === 'yes',
      preferredHotelCategory: hotelCategoryChoice,
      budgetRange: budget,
      wantToExplore: selectedPlaces.join(', '),
      city: travellingFromCity,
      duration: pkgNights,
    }
    const res2 = await submitEnquiry(payload)
    if (res2?.success) {
       setOk('Enquiry sent! Our expert will contact you soon.') 
      onClose(); // Modal close karein
      navigate('/thank-you'); // Thank You page pe navigate karein
      }
    else { setErr('Something went wrong. Please try again.') }
    setLoading(false)
  }
  const inp = (hint: string, val: string, set: (v: string) => void, extra?: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
      placeholder={hint} value={val} onChange={e => set(e.target.value)} {...extra}
      style={{ width: '100%', padding: '14px 14px', border: '1px solid #e0e0e0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
    />
  )

  // const formContent = (
  //   <div style={{ padding: mobile ? '0 0 20px' : '16px 0 0' }}>
  //     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
  //       <h3 style={{ fontSize: 22, fontWeight: 'bold', margin: 0 }}>Plan Your Next Trip</h3>
  //     </div>

  //     {ok && (
  //       <div style={{ width: '100%', padding: 12, marginBottom: 12, background: '#E8F5E9', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
  //         <span style={{ color: '#2E7D32', fontSize: 18 }}>✓</span>
  //         <span style={{ color: '#2E7D32', fontWeight: 600, fontSize: 14 }}>{ok}</span>
  //       </div>
  //     )}
  //     {err && (
  //       <div style={{ width: '100%', padding: 12, marginBottom: 12, background: '#FFEBEE', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
  //         <span style={{ color: '#E53935', fontSize: 18 }}>✕</span>
  //         <span style={{ color: '#E53935', fontWeight: 600, fontSize: 14 }}>{err}</span>
  //       </div>
  //     )}

  //     <div style={{ marginBottom: 12 }}>{inp('Your Name *', name, setName, { required: true })}</div>

  //     <div style={{ display: 'flex', marginBottom: 12 }}>
  //       <div style={{ padding: '14px 12px', border: '1px solid #e0e0e0', borderRadius: '12px 0 0 12px', borderRight: 'none', fontSize: 14, color: '#333' }}>+91</div>
  //       <input required type="tel" placeholder="Mobile No. *" value={phone} onChange={e => setPhone(e.target.value)} maxLength={10}
  //         style={{ width: '100%', padding: '14px 14px', border: '1px solid #e0e0e0', borderRadius: '0 12px 12px 0', fontSize: 14, outline: 'none' }} />
  //     </div>

  //     <div style={{ marginBottom: 12 }}>{inp('Email (optional)', email, setEmail, { type: 'email' })}</div>

  //     {showDestinationField && (
  //       <div style={{ marginBottom: 12, position: 'relative' }}>
  //         <input
  //           placeholder="Desired Destination"
  //           value={regionSearch}
  //           onChange={e => {
  //             setRegionSearch(e.target.value)
  //             setShowSuggestions(true)
  //             if (e.target.value === '') { setDestination(''); setSelectedPlaces([]) }
  //           }}
  //           onFocus={() => setShowSuggestions(true)}
  //           onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
  //           style={{ width: '100%', padding: '14px 14px', border: '1px solid #e0e0e0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
  //         />
  //         {showSuggestions && regionSearch.length > 0 && searchSuggestions.length > 0 && (
  //           <div style={{
  //             position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
  //             background: '#fff', border: '1px solid #e0e0e0', borderRadius: 12,
  //             boxShadow: '0 6px 16px rgba(0,0,0,0.1)', maxHeight: 240, overflowY: 'auto', zIndex: 10,
  //           }}>
  //             {searchSuggestions.map((s, i) =>
  //               s.kind === 'region' ? (
  //                 <div
  //                   key={`region-${s.region}-${i}`}
  //                   onMouseDown={() => selectRegion(s.region)}
  //                   style={{ padding: '10px 14px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}
  //                   onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
  //                   onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
  //                 >
  //                   {s.region}
  //                 </div>
  //               ) : (
  //                 <div
  //                   key={`place-${s.region}-${s.place}-${i}`}
  //                   onMouseDown={() => selectRegion(s.region, s.place)}
  //                   style={{ padding: '10px 14px', cursor: 'pointer', fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
  //                   onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
  //                   onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
  //                 >
  //                   <span>{s.place}</span>
  //                   <span style={{ fontSize: 12, color: '#999' }}>{s.region}</span>
  //                 </div>
  //               )
  //             )}
  //           </div>
  //         )}

  //         {dialogPlaces.length > 0 && (
  //           <div style={{ marginTop: 12, padding: 12, background: '#fafafa', borderRadius: 12 }}>
  //             <div style={{ fontSize: 12, fontWeight: 700, color: '#666', marginBottom: 8, textTransform: 'uppercase' }}>Want to Explore</div>
  //             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
  //               {dialogPlaces.map(place => (
  //                 <label key={place} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13 }}>
  //                   <input
  //                     type="checkbox"
  //                     checked={selectedPlaces.includes(place)}
  //                     onChange={() => togglePlace(place)}
  //                     style={{ width: 16, height: 16, accentColor: '#FF1E1E', cursor: 'pointer' }}
  //                   />
  //                   <span>{place}</span>
  //                 </label>
  //               ))}
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     )}

  //     <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
  //       <div style={{ flex: 1 }}><input type="date" placeholder="Date of Travel" value={travelDate} onChange={e => setTravelDate(e.target.value)} style={{ width: '100%', padding: '14px 14px', border: '1px solid #e0e0e0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} /></div>

  //       <div style={{ flex: 1 }}>
  //         <input
  //           type="number"
  //           min={1}
  //           placeholder="Traveller Count"
  //           value={travellers || ''}
  //           onChange={e => setTravellers(Number(e.target.value))}
  //           style={{ width: '100%', padding: '14px', border: '1px solid #e0e0e0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' as const }}
  //         />
  //       </div>
  //     </div>

  //     <div style={{ marginBottom: 16 }}>
  //       <textarea rows={4} placeholder="speacific requairment" value={message} onChange={e => setMessage(e.target.value)} style={{ width: '100%', padding: '14px 14px', border: '1px solid #e0e0e0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
  //     </div>

  //     <button type="submit" disabled={loading} style={{
  //       width: '100%', height: 52, background: loading ? '#ff6b6b' : '#FF1E1E', color: '#fff',
  //       border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer',
  //       display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  //     }}>
  //       {loading && (
  //         <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  //       )}
  //       {loading ? <span style={{ width: 20, height: 20, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} /> : null}
  //       Connect with Expert
  //     </button>

  //     <p style={{ textAlign: 'center', fontSize: 12, color: '#999', marginTop: 8 }}>We'll get back to you within 24 hours</p>
  //   </div>
  // )

const formContent = (
    <div style={{ padding: mobile ? '0 0 20px' : '16px 0 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 22, fontWeight: 'bold', margin: 0 }}>
          {dialogStep === 1 ? 'Plan Your Next Trip' : 'A Few More Details'}
        </h3>
      </div>

      {ok && (
        <div style={{ width: '100%', padding: 12, marginBottom: 12, background: '#E8F5E9', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#2E7D32', fontSize: 18 }}>✓</span>
          <span style={{ color: '#2E7D32', fontWeight: 600, fontSize: 14 }}>{ok}</span>
        </div>
      )}
      {err && (
        <div style={{ width: '100%', padding: 12, marginBottom: 12, background: '#FFEBEE', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#E53935', fontSize: 18 }}>✕</span>
          <span style={{ color: '#E53935', fontWeight: 600, fontSize: 14 }}>{err}</span>
        </div>
      )}

      {dialogStep === 1 ? (
        <>
          <div style={{ marginBottom: 12 }}>{inp('Your Name *', name, setName, { required: true })}</div>

          <div style={{ display: 'flex', marginBottom: 12 }}>
            <div style={{ padding: '14px 12px', border: '1px solid #e0e0e0', borderRadius: '12px 0 0 12px', borderRight: 'none', fontSize: 14, color: '#333' }}>+91</div>
            <input required type="tel" placeholder="Mobile No. *" value={phone} onChange={e => setPhone(e.target.value)} maxLength={10}
              style={{ width: '100%', padding: '14px 14px', border: '1px solid #e0e0e0', borderRadius: '0 12px 12px 0', fontSize: 14, outline: 'none' }} />
          </div>

          <div style={{ marginBottom: 12 }}>{inp('Email (optional)', email, setEmail, { type: 'email' })}</div>

          {showDestinationField && (
            <div style={{ marginBottom: 12, position: 'relative' }}>
              <input
                placeholder="Desired Destination (e.g. Kashmir)"
                value={regionSearch}
                onChange={e => {
                  setRegionSearch(e.target.value)
                  setShowSuggestions(true)
                  if (e.target.value === '') { setDestination(''); setSelectedPlaces([]) }
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                style={{ width: '100%', padding: '14px 14px', border: '1px solid #e0e0e0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
              />
              {showSuggestions && regionSearch.length > 0 && searchSuggestions.length > 0 && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
                  background: '#fff', border: '1px solid #e0e0e0', borderRadius: 12,
                  boxShadow: '0 6px 16px rgba(0,0,0,0.1)', maxHeight: 240, overflowY: 'auto', zIndex: 10,
                }}>
                  {searchSuggestions.map((s, i) =>
                    s.kind === 'region' ? (
                      <div
                        key={`region-${s.region}-${i}`}
                        onMouseDown={() => selectRegion(s.region)}
                        style={{ padding: '10px 14px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        {s.region}
                      </div>
                    ) : (
                      <div
                        key={`place-${s.region}-${s.place}-${i}`}
                        onMouseDown={() => selectRegion(s.region, s.place)}
                        style={{ padding: '10px 14px', cursor: 'pointer', fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span>{s.place}</span>
                        <span style={{ fontSize: 12, color: '#999' }}>{s.region}</span>
                      </div>
                    )
                  )}
                </div>
              )}

              {dialogPlaces.length > 0 && (
                <div style={{ marginTop: 12, padding: 12, background: '#fafafa', borderRadius: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#666', marginBottom: 8, textTransform: 'uppercase' }}>Want to Explore</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
                    {dialogPlaces.map(place => (
                      <label key={place} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13 }}>
                        <input
                          type="checkbox"
                          checked={selectedPlaces.includes(place)}
                          onChange={() => togglePlace(place)}
                          style={{ width: 16, height: 16, accentColor: '#FF1E1E', cursor: 'pointer' }}
                        />
                        <span>{place}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div style={{ marginBottom: 12 }}>
            <input
              placeholder="Which city are you travelling from?"
              value={travellingFromCity}
              onChange={e => setTravellingFromCity(e.target.value)}
              style={{ width: '100%', padding: '14px 14px', border: '1px solid #e0e0e0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' as any }}
            />
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <div style={{ flex: 1 }}><input type="date" placeholder="Date of Travel" value={travelDate} onChange={e => setTravelDate(e.target.value)} style={{ width: '100%', padding: '14px 14px', border: '1px solid #e0e0e0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} /></div>

            <div style={{ flex: 1 }}>
              <input
                type="number"
                min={1}
                placeholder="Traveller Count"
                value={travellers || ''}
                onChange={e => setTravellers(Number(e.target.value))}
                style={{ width: '100%', padding: '14px', border: '1px solid #e0e0e0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' as const }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <textarea rows={4} placeholder="Message (optional)" value={message} onChange={e => setMessage(e.target.value)} style={{ width: '100%', padding: '14px 14px', border: '1px solid #e0e0e0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
          </div>

          <button type="submit" style={{
            width: '100%', height: 52, background: '#FF1E1E', color: '#fff',
            border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 'bold', cursor: 'pointer',
          }}>
            Get Free Quote
          </button>

          <p style={{ textAlign: 'center', fontSize: 12, color: '#999', marginTop: 8 }}>We'll get back to you within 24 hours</p>
        </>
      ) : (
        <>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#333', marginBottom: 8, display: 'block' }}>
              Have you already booked your Flight/Train tickets?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button
                type="button"
                onClick={() => setFlightTicket('yes')}
                style={{
                  padding: 12, borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  border: flightTicket === 'yes' ? '2px solid #FF1E1E' : '1.5px solid #e0e0e0',
                  background: flightTicket === 'yes' ? '#FFF5F5' : '#fff',
                  color: flightTicket === 'yes' ? '#FF1E1E' : '#333',
                }}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setFlightTicket('no')}
                style={{
                  padding: 12, borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  border: flightTicket === 'no' ? '2px solid #FF1E1E' : '1.5px solid #e0e0e0',
                  background: flightTicket === 'no' ? '#FFF5F5' : '#fff',
                  color: flightTicket === 'no' ? '#FF1E1E' : '#333',
                }}
              >
                No
              </button>
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#333', marginBottom: 8, display: 'block' }}>
              Preferred Hotel Category
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {['3 Star', '4 Star', '5 Star'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setHotelCategoryChoice(cat)}
                  style={{
                    padding: 12, borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600,
                    border: hotelCategoryChoice === cat ? '2px solid #FF1E1E' : '1.5px solid #e0e0e0',
                    background: hotelCategoryChoice === cat ? '#FFF5F5' : '#fff',
                    color: hotelCategoryChoice === cat ? '#FF1E1E' : '#333',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#333', marginBottom: 8, display: 'block' }}>
              Your Budget (per person)
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['5k to 10k', '10k to 20k', '20k to 35k+'].map(b => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBudget(b)}
                  style={{
                    padding: 12, borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600, textAlign: 'left',
                    border: budget === b ? '2px solid #FF1E1E' : '1.5px solid #e0e0e0',
                    background: budget === b ? '#FFF5F5' : '#fff',
                    color: budget === b ? '#FF1E1E' : '#333',
                  }}
                >
                  ₹ {b}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              type="button"
              onClick={() => setDialogStep(1)}
              style={{
                flex: 1, height: 52, background: '#fff', color: '#333',
                border: '1.5px solid #e0e0e0', borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer',
              }}
            >
              Back
            </button>
            <button type="submit" disabled={loading} style={{
              flex: 2, height: 52, background: loading ? '#ff6b6b' : '#FF1E1E', color: '#fff',
              border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              {loading && (
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              )}
              {loading ? <span style={{ width: 20, height: 20, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} /> : null}
              Submit
            </button>
          </div>

          <p style={{ textAlign: 'center', fontSize: 12, color: '#999', marginTop: 8 }}>We'll get back to you within 24 hours</p>
        </>
      )}
    </div>
  )

  if (mobile) {
    return (
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 500, background: '#fff', borderRadius: 20, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {pkg ? (
          <>
            <div style={{ padding: '16px 16px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={firstImg ? getImageUrl(firstImg) : staticImg} alt={pkgName} loading="lazy" style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover', flexShrink: 0, display: 'none' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 'bold', color: '#000', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pkgName}</div>
                <div style={{ fontSize: 13, color: '#999', marginTop: 4 }}>{pkgCity}</div>
              </div>
              <button onClick={onClose} type="button" style={{ width: 32, height: 32, borderRadius: '50%', background: '#f0f0f0', border: 'none', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>
            <hr style={{ margin: 0, border: 'none', borderTop: '1px solid #eee' }} />
          </>
        ) : (
          <div style={{ padding: '16px 16px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={staticImg} alt="Travel" loading="lazy" style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover', flexShrink: 0, display: 'none' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 'bold', color: '#000', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>The TravelGarh</div>
            </div>
            <button onClick={onClose} type="button" style={{ width: 32, height: 32, borderRadius: '50%', background: '#f0f0f0', border: 'none', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          </div>
        )}
        {/* <form onSubmit={handleSubmit} style={{ padding: '16px', overflowY: 'auto' }}>{formContent}</form> */}
        <form onSubmit={dialogStep === 1 ? handleContinue : handleSubmit} style={{ padding: '16px', overflowY: 'auto' }}>{formContent}</form>
      </div>
    )
  }

  return (
    <div onClick={e => e.stopPropagation()} style={{ width: 1000, maxWidth: '95vw', maxHeight: '90vh', background: '#fff', borderRadius: 24, display: 'flex', overflow: 'hidden' }}>
      <div style={{ flex: 1, padding: 16 }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden', position: 'relative' }}>
          <img src={pkg && firstImg ? getImageUrl(firstImg) : staticImg} alt={pkgName || 'Travel'} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
          {pkg && (
            <>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>📍</span>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{pkgCity}</span>
                </div>
                <div style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 6 }}>{pkgName}</div>
              </div>
            </>
          )}
        </div>
      </div>
      <div style={{ flex: 1, padding: '16px 20px', overflowY: 'auto', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 16, right: 20, zIndex: 1 }}>
          <button onClick={onClose} type="button" style={{ width: 32, height: 32, borderRadius: '50%', background: '#f0f0f0', border: 'none', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>
        {/* <form onSubmit={handleSubmit}>{formContent}</form> */}
        <form onSubmit={dialogStep === 1 ? handleContinue : handleSubmit}>{formContent}</form>
      </div>
    </div>
  )
}

/* ── Top Info Card ── */
const TAG_ICONS: Record<string, string> = {
  'Beach': 'bi-water',
  'Adventure': 'bi-compass',
  'Group Trip': 'bi-people',
  'Honeymoon': 'bi-heart',
  'Family': 'bi-house-heart',
  'Solo': 'bi-person',
  'Wildlife': 'bi-tree',
  'Pilgrimage': 'bi-brightness-high',
  'Hill Station': 'bi-triangle',
  'Heritage': 'bi-bank',
  'Cruise': 'bi-water',
  'Trekking': 'bi-signpost-split',
  'Wellness': 'bi-heart-pulse',
  'Budget': 'bi-piggy-bank',
}

function TopInfoCard({ pkg, small }: { pkg: PackageDetailModel; small: boolean }) {
  const tags = pkg.packageTypes && pkg.packageTypes.length > 0 ? pkg.packageTypes : ['Group Trip', 'Adventure']
  const topInclusionIcons = (pkg.inclusions || [])
    .filter(item => item.iconClass)
    .slice(0, 5)

  return (
    <div style={{ width: '100%', padding: small ? 20 : 35, background: '#fff', borderRadius: 28 }}>
      <div style={{ fontSize: small ? 15 : 18, color: '#999', marginBottom: 14 }}>{pkg.days} Days {pkg.nights} Nights</div>
      <h1 style={{ fontSize: small ? 24 : 34, fontWeight: 'bold', lineHeight: 1.2, margin: 0 }}>{pkg.name}</h1>
      <div style={{ fontSize: small ? 16 : 20, color: 'rgba(0,0,0,0.87)', marginTop: 12 }}>{pkg.shortDescription}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginTop: 30 }}>
        {tags.map(tag => (
          <span
            key={tag}
            style={{
              padding: '10px 14px', border: '1px solid #bdbdbd', borderRadius: 40, fontSize: 14,
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            <i className={`bi ${TAG_ICONS[tag] || 'bi-tag'}`} style={{ fontSize: 15, color: '#FF1E1E' }}></i>
            {tag}
          </span>
        ))}

        {topInclusionIcons.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 8, borderLeft: '1px solid #e0e0e0' }}>
            {topInclusionIcons.map((item, i) => (
              <span
                key={i}
                title={item.details}
                style={{
                  width: 34, height: 34, borderRadius: '50%', background: '#f5f5f5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <i className={`bi ${item.iconClass}`} style={{ fontSize: 15, color: '#22B35C' }}></i>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Private Trips ── */
function PrivateTrips({ mobile }: { mobile: boolean }) {
  const PHONE = '+917425833258'
  return (
    <div style={{ width: '100%', padding: 24, background: '#fff', borderRadius: 28 }}>
      {mobile ? (
        <div>
          <a href={`tel:${PHONE}`} style={{ display: 'block', width: '100%', height: 48, border: '1px solid #bdbdbd', borderRadius: 8, background: '#fff', color: '#999', fontSize: 14, cursor: 'pointer', textDecoration: 'none', lineHeight: '48px', textAlign: 'center' }}>📞 Request a Callback</a>
          <div style={{ height: 12 }} />
          <button style={{ width: '100%', height: 48, border: '1px solid #bdbdbd', borderRadius: 8, background: '#fff', color: '#999', fontSize: 14, cursor: 'pointer' }}>⬇ Get PDF</button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href={`tel:${PHONE}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 220, height: 48, border: '1px solid #bdbdbd', borderRadius: 8, background: '#fff', color: '#999', fontSize: 14, cursor: 'pointer', textDecoration: 'none' }}>📞 Request a Callback</a>
          <button style={{ width: 150, height: 48, border: '1px solid #bdbdbd', borderRadius: 8, background: '#fff', color: '#999', fontSize: 14, cursor: 'pointer' }}>⬇ Get PDF</button>
        </div>
      )}
    </div>
  )
}

/* ── Price Side Card ── */
// function PriceCard({ pkg, saveStr, small, onEnquiry }: { pkg: PackageDetailModel; saveStr: string; small: boolean; onEnquiry: () => void }) {
//   return (
//     <div style={{ width: '100%', background: '#fff', borderRadius: 28, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
//       {saveStr && (
//         <div style={{
//           width: '100%', padding: '14px 20px',
//           background: 'linear-gradient(90deg, #D8ECFF, #C9F7B8)',
//           borderRadius: '28px 28px 0 0',
//           textAlign: 'right',
//           color: '#2e7d32', fontSize: 15, fontWeight: 'bold',
//         }}>
//           {saveStr}
//         </div>
//       )}
//       <div style={{ padding: small ? 16 : 24 }}>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <span style={{ fontSize: small ? 12 : 14, color: 'rgba(0,0,0,0.87)' }}>Starting from</span>
//           <div style={{ flex: 1 }} />
//           <div style={{ textAlign: 'right' }}>
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
//               <span style={{ fontSize: small ? 16 : 20, fontWeight: 'bold' }}>₹</span>
//               <span style={{ fontSize: small ? 24 : 32, fontWeight: 'bold', marginLeft: 2 }}>{pkg.price.toLocaleString()}</span>
//             </div>
//             {pkg.cutPrice > 0 && <div style={{ fontSize: small ? 12 : 14, color: '#999', textDecoration: 'line-through' }}>₹ {pkg.cutPrice.toLocaleString()}</div>}
//             <div style={{ fontSize: small ? 11 : 13, color: 'rgba(0,0,0,0.87)' }}>per person</div>
//             <div style={{ fontSize: small ? 10 : 12, color: '#999' }}>+ taxes</div>
//           </div>
//         </div>
//         <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #eee' }} />
//         <div style={{ textAlign: 'center', fontSize: small ? 12 : 14, color: '#999' }}>{pkg.city} Package with Double Sharing</div>
//         <div style={{ textAlign: 'center', fontSize: small ? 13 : 15, fontWeight: 'bold', marginTop: 6 }}>{pkg.days} Days {pkg.nights} Nights</div>
//         <button
//           onClick={onEnquiry}
//           style={{
//             width: '100%', height: small ? 48 : 56, marginTop: 20,
//             background: '#FF1E1E', color: '#fff', border: 'none',
//             borderRadius: 16, fontSize: small ? 16 : 20, fontWeight: 'bold', cursor: 'pointer',
//           }}
//         >
//           Send Enquiry
//         </button>
//       </div>
//     </div>
//   )
// }
function PriceCard({ pkg, saveStr, small, onEnquiry }: { pkg: PackageDetailModel; saveStr: string; small: boolean; onEnquiry: () => void }) {
  return (
    <div style={{ width: '100%', background: '#fff', borderRadius: 28, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      {saveStr && (
        <div style={{
          width: '100%', padding: '14px 20px',
          background: 'linear-gradient(90deg, #D8ECFF, #C9F7B8)',
          borderRadius: '28px 28px 0 0',
          textAlign: 'right',
          color: '#2e7d32', fontSize: 15, fontWeight: 'bold',
        }}>
          {saveStr}
        </div>
      )}
      <div style={{ padding: small ? 16 : 24 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {pkg.price > 0 ? (
            <>
              <span style={{ fontSize: small ? 12 : 14, color: 'rgba(0,0,0,0.87)' }}>Starting from</span>
              <div style={{ flex: 1 }} />
              <div style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: small ? 16 : 20, fontWeight: 'bold' }}>₹</span>
                  <span style={{ fontSize: small ? 24 : 32, fontWeight: 'bold', marginLeft: 2 }}>{pkg.price.toLocaleString()}</span>
                </div>
                {pkg.cutPrice > 0 && <div style={{ fontSize: small ? 12 : 14, color: '#999', textDecoration: 'line-through' }}>₹ {pkg.cutPrice.toLocaleString()}</div>}
                <div style={{ fontSize: small ? 11 : 13, color: 'rgba(0,0,0,0.87)' }}>per person</div>
                <div style={{ fontSize: small ? 10 : 12, color: '#999' }}>+ taxes</div>
              </div>
            </>
          ) : (
            <div style={{ width: '100%', textAlign: 'center' }}>
              <div style={{ fontSize: small ? 20 : 26, fontWeight: 'bold', color: '#111' }}>Request for Price</div>
              <div style={{ fontSize: small ? 12 : 13, color: '#999', marginTop: 6 }}>Contact us for the best deal</div>
            </div>
          )}
        </div>
        <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #eee' }} />
        <div style={{ textAlign: 'center', fontSize: small ? 12 : 14, color: '#999' }}>{pkg.city} Package with Double Sharing</div>
        <div style={{ textAlign: 'center', fontSize: small ? 13 : 15, fontWeight: 'bold', marginTop: 6 }}>{pkg.days} Days {pkg.nights} Nights</div>
        <button
          onClick={onEnquiry}
          style={{
            width: '100%', height: small ? 48 : 56, marginTop: 20,
            background: '#FF1E1E', color: '#fff', border: 'none',
            borderRadius: 16, fontSize: small ? 16 : 20, fontWeight: 'bold', cursor: 'pointer',
          }}
        >
          Send Enquiry
        </button>
      </div>
    </div>
  )
}
/* ── Itinerary Day ── */
function ItineraryDay({ item, expanded, onToggle, mobile }: { item: ItineraryItem; expanded: boolean; onToggle: () => void; mobile: boolean }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ background: '#f7f7f7', borderRadius: 24, overflow: 'hidden' }}>
        <button onClick={onToggle} style={{
          width: '100%', display: 'flex', alignItems: mobile ? 'flex-start' : 'center',
          flexDirection: mobile ? 'column' : 'row',
          gap: mobile ? 10 : 14, padding: `${mobile ? 12 : 8}px ${mobile ? 12 : 18}px`,
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}>
          <span style={{
            padding: '8px 16px', background: '#555', color: '#fff', fontWeight: 'bold',
            borderRadius: 12, fontSize: 13,
          }}>{item.dayLabel.toUpperCase()}</span>
          <span style={{ flex: 1, fontSize: mobile ? 16 : 20, fontWeight: 700, marginTop: mobile ? 0 : 0 }}>{item.title}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }}>
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </button>
        {expanded && (
          <div style={{ padding: `0 ${mobile ? 12 : 18}px ${mobile ? 12 : 18}px` }}>
            {item.description && <p style={{ lineHeight: 1.6, margin: '0 0 12px', color: '#555' }}>{item.description}</p>}
            {item.imagePath && (
              <img src={getImageUrl(item.imagePath)} alt={item.title} loading="lazy" style={{ width: '100%', height: mobile ? 220 : 320, objectFit: 'cover', borderRadius: 18 }} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Inclusions / Exclusions Box ── */
interface IncExcItem {
  details: string
  iconClass?: string | null
}

function IncExcBox({ title, items, check }: { title: string; items: IncExcItem[]; check: boolean }) {
  return (
    <div style={{ width: '100%', padding: 24, background: '#fff', borderRadius: 20 }}>
      <h3 style={{ fontSize: 28, fontWeight: 'bold', margin: 0 }}>{title}</h3>
      <div style={{ height: 20 }} />
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'flex-start' }}>
          <span style={{ color: check ? '#22B35C' : '#E53935', fontSize: 22, lineHeight: 1.2 }}>
            {check ? '✓' : '✕'}
          </span>
          <span style={{ fontSize: 15, lineHeight: 1.5, fontWeight: 500, whiteSpace: 'pre-line' }}>{item.details}</span>
        </div>
      ))}
    </div>
  )
}

// /* ── Inclusions / Exclusions Box ── */
// function IncExcBox({ title, items, check }: { title: string; items: string[]; check: boolean }) {
//   return (
//     <div style={{ width: '100%', padding: 24, background: '#fff', borderRadius: 20 }}>
//       <h3 style={{ fontSize: 28, fontWeight: 'bold', margin: 0 }}>{title}</h3>
//       <div style={{ height: 20 }} />
//       {items.map((item, i) => (
//         <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'flex-start' }}>
//           <span style={{ color: check ? '#22B35C' : '#E53935', fontSize: 22, lineHeight: 1.2 }}>
//             {check ? '✓' : '✕'}
//           </span>
//           <span style={{ fontSize: 15, lineHeight: 1.5, fontWeight: 500 }}>{item}</span>
//         </div>
//       ))}
//     </div>
//   )
// }
/* ── Inclusions / Exclusions Box ── */
// interface IncExcItem {
//   details: string
//   iconClass?: string | null
// }

// function IncExcBox({ title, items, check }: { title: string; items: IncExcItem[]; check: boolean }) {
//   return (
//     <div style={{ width: '100%', padding: 24, background: '#fff', borderRadius: 20 }}>
//       <h3 style={{ fontSize: 28, fontWeight: 'bold', margin: 0 }}>{title}</h3>
//       <div style={{ height: 20 }} />
//       {items.map((item, i) => (
//         <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'flex-start' }}>
//           {item.iconClass ? (
//             <i className={`bi ${item.iconClass}`} style={{ color: check ? '#22B35C' : '#E53935', fontSize: 20, lineHeight: 1.3, flexShrink: 0 }}></i>
//           ) : (
//             <span style={{ color: check ? '#22B35C' : '#E53935', fontSize: 22, lineHeight: 1.2, flexShrink: 0 }}>
//               {check ? '✓' : '✕'}
//             </span>
//           )}
//           <span style={{ fontSize: 15, lineHeight: 1.5, fontWeight: 500, whiteSpace: 'pre-line' }}>{item.details}</span>
//         </div>
//       ))}
//     </div>
//   )
// }
/* ── Hotel Section ── */
function HotelSection({ hotels, mobile, days }: { hotels: HotelModel[]; mobile: boolean; days: number }) {
  const allTypes = [...new Set(hotels.flatMap(h => (h.stayTypes || []).map(s => s.type)))]
 const stayOpts = allTypes.map(type => {
    const first = hotels.flatMap(h => h.stayTypes || []).find(s => s.type === type)
    return {
      id: type.toLowerCase(),
      label: type,
      image: first?.images?.[0]?.imagePath ? getImageUrl(first.images[0].imagePath) : '',
      days,
      cutPrice: first ? Math.round((first.price ?? 0) * 1.15) : 0,
      price: first?.price ?? 0,
    }
  })
  const [stayType, setStayType] = useState(stayOpts[0]?.id ?? '')
  const filtered = hotels.filter(h => (h.stayTypes || []).some(s => s.type.toLowerCase() === stayType))

  return (
    <div style={{ background: '#fff', borderRadius: 28, padding: mobile ? 16 : 28 }}>
      <h2 style={{ fontSize: mobile ? 22 : 28, fontWeight: 'bold', margin: 0 }}>Stay Details</h2>
      <div style={{ height: 16 }} />
      {stayOpts.length > 0 && (
        <>
          <StayCategory stayOptions={stayOpts} onStayChange={setStayType} />
          <div style={{ height: 24 }} />
        </>
      )}
      {filtered.map((hotel, i) => {
        const st = (hotel.stayTypes || []).find(s => s.type.toLowerCase() === stayType)
        return (
          <div key={hotel.id}>
            {i > 0 && <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #eee' }} />}
            <h3 style={{ fontSize: mobile ? 17 : 20, fontWeight: 'bold', margin: '0 0 4px' }}>{hotel.name}</h3>
            <div style={{ fontSize: 14, color: '#999', marginBottom: 12 }}>{hotel.location}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 16 }}>
              {Array.from({ length: Math.min(hotel.starRating, 5) }).map((_, si) => (
                <span key={si} style={{ color: '#FFB300', fontSize: 14 }}>★</span>
              ))}
              <span style={{ color: '#999', fontSize: 13, marginLeft: 4 }}>{hotel.starRating} ★ Hotel</span>
            </div>
            {st && (
              <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
                {st.images?.[0]?.imagePath && (
                  <img src={getImageUrl(st.images[0].imagePath)} alt={st.type} loading="lazy" style={{ width: 70, height: 70, borderRadius: 12, objectFit: 'cover' }} />
                )}
              <div>
                  <div style={{ fontSize: 13, color: '#999' }}>{st.type}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#111' }}>₹ {(st.price ?? 0).toLocaleString()}</div>
                </div>
              </div>
            )}
            <HotelCard hotel={hotel} mobile={mobile} />
          </div>
        )
      })}
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: '#999', fontSize: 15 }}>No hotels available for the selected stay type.</div>
      )}
    </div>
  )
}

/* ── Hotel Card ── */
function HotelCard({ hotel, mobile }: { hotel: HotelModel; mobile: boolean }) {
  const img = hotel.images[0]
  const [showGallery, setShowGallery] = useState(false)
  return (
    <>
      <div style={{ background: '#f7f7f7', borderRadius: 16, display: 'flex', flexDirection: mobile ? 'column' : 'row' }}>
        {img && (
          <div style={{
            width: mobile ? '100%' : 360, height: mobile ? 220 : 280,
            borderRadius: mobile ? '16px 16px 0 0' : '16px 0 0 16px', overflow: 'hidden', flexShrink: 0, position: 'relative',
          }}>
            <img src={getImageUrl(img.imagePath)} alt={hotel.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button onClick={() => setShowGallery(true)} style={{
              position: 'absolute', bottom: 12, right: 12,
              padding: '6px 12px', borderRadius: 20, background: '#fff', border: 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              📷 Gallery
            </button>
          </div>
        )}
        <div style={{ padding: mobile ? 16 : 20 }}>
          <h3 style={{ fontSize: mobile ? 18 : 22, fontWeight: 'bold', margin: 0 }}>{hotel.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
            {Array.from({ length: Math.min(hotel.starRating, 5) }).map((_, i) => (
              <span key={i} style={{ color: '#FFB300', fontSize: 16 }}>★</span>
            ))}
            <span style={{ color: '#999', fontSize: 14, marginLeft: 4 }}>{hotel.starRating} ★ Hotel</span>
          </div>
          <div style={{ height: 16 }} />
          {hotel.includes.map((inc, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#666', fontSize: 20 }}>○</span>
              <span style={{ fontSize: 15 }}>{inc}</span>
            </div>
          ))}
        </div>
      </div>
      {showGallery && <HotelGalleryDialog hotel={hotel} onClose={() => setShowGallery(false)} />}
    </>
  )
}

/* ── Hotel Gallery Dialog ── */
function HotelGalleryDialog({ hotel, onClose }: { hotel: HotelModel; onClose: () => void }) {
  const [selectedFilter, setSelectedFilter] = useState('All')
  const imgTypes = ['All', ...new Set(hotel.images.map(i => i.imageType).filter(Boolean))]
  const filtered = selectedFilter === 'All' ? hotel.images : hotel.images.filter(i => i.imageType === selectedFilter)
  const gw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const isMobile = gw < 700

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 24,
        width: isMobile ? 'calc(100vw - 24px)' : 900,
        maxHeight: '85vh', margin: isMobile ? 12 : 40,
        display: 'flex', flexDirection: 'column', padding: isMobile ? 16 : 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: isMobile ? 18 : 24, fontWeight: 'bold', margin: 0 }}>{hotel.name}</h2>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', background: '#f0f0f0', border: 'none', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
          {imgTypes.map(type => {
            const sel = type === selectedFilter
            return (
              <button key={type} onClick={() => setSelectedFilter(type)} style={{
                padding: '8px 16px', borderRadius: 30, border: `1.5px solid ${sel ? '#E53935' : '#e0e0e0'}`,
                background: sel ? '#FFEBEE' : '#fff', color: sel ? '#E53935' : '#000',
                fontWeight: 600, fontSize: 14, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                {type}
                {sel && <span style={{ fontSize: 12, color: '#E53935' }}>✓</span>}
              </button>
            )
          })}
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#999', padding: 40 }}>No images found</div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 12,
            }}>
              {filtered.map((img, i) => (
                <div key={i} style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '1.6' }}>
                  <img src={getImageUrl(img.imagePath)} alt={img.altText || hotel.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export { EnquiryDialog }