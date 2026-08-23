// import { useState } from 'react'
// import { submitEnquiry, type EnquiryPayload } from '../../api/enquiry'
// import './EnquirySection.css'

// interface FormState {
//   name: string
//   phone: string
//   email: string
//   travelDate: string
//   message: string
// }

// const initialForm: FormState = { name: '', phone: '', email: '', travelDate: '', message: '' }

// export default function EnquirySection() {
//   const [form, setForm] = useState<FormState>(initialForm)
//   const [submitting, setSubmitting] = useState(false)
//   const [success, setSuccess] = useState(false)
//   const [error, setError] = useState('')

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setSubmitting(true)
//     setError('')
//     try {
//       const payload: EnquiryPayload = {
//         name: form.name,
//         email: form.email,
//         phone: form.phone,
//         expectedTravelDate: form.travelDate || new Date().toISOString(),
//         message: form.message,
//         pageUrl: window.location.href,
//         packageSlug: '',
//         packageName: '',
//         destination: '',
//         numberOfAdults: 1,
//         numberOfChildren: 0,
//       }
//       const ok = await submitEnquiry(payload)
//       if (ok) {
//         setSuccess(true)
//         setForm(initialForm)
//       } else {
//         setError('Failed to send enquiry. Please try again.')
//       }
//     } catch {
//       setError('Failed to send enquiry. Please try again.')
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   return (
//     <section id="enquiry" className="section enquiry-section">
//       <div className="container">
//         <div className="enquiry-grid">
//           <div className="enquiry-info">
//             <h2 className="section-title">Send Us an Enquiry</h2>
//             <p className="section-subtitle">
//               Have questions about our packages? We'd love to hear from you.
//               Fill out the form and our travel experts will get back to you.
//             </p>
//             <div className="enquiry-contact">
//               <div>
//                 <strong>Phone:</strong> +91 74258 33258
//               </div>
//               <div>
//                 <strong>Email:</strong> info@The TravelGarh.com
//               </div>
//             </div>
//           </div>

//           <form className="enquiry-form card" onSubmit={handleSubmit}>
//             {success && (
//               <div className="enquiry-success">
//                 Thank you! We'll get back to you shortly.
//               </div>
//             )}
//             {error && <div className="enquiry-error">{error}</div>}

//             <div className="form-row">
//               <div className="form-group">
//                 <label htmlFor="name">Name *</label>
//                 <input id="name" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="phone">Phone *</label>
//                 <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="Your phone" />
//               </div>
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">Email *</label>
//               <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Your email" />
//             </div>

//             <div className="form-group">
//               <label htmlFor="travelDate">Travel Date</label>
//               <input id="travelDate" name="travelDate" type="date" value={form.travelDate} onChange={handleChange} />
//             </div>

//             <div className="form-group">
//               <label htmlFor="message">Message *</label>
//               <textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Your message" />
//             </div>

//             <button type="submit" className="btn btn-primary enquiry-submit" disabled={submitting}>
//               {submitting ? 'Sending...' : 'Send Enquiry'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   )
// }


import { useState } from 'react'
import { submitEnquiry, type EnquiryPayload } from '../../api/enquiry'
import './EnquirySection.css'

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

const TOUR_THEMES = ['Honeymoon', 'Family Trip', 'Adventure', 'Pilgrimage', 'Group Trip', 'Solo Trip', 'Wildlife']
const HOTEL_CATEGORIES = ['3 Star', '4 Star', '5 Star', 'Budget/Homestay']
const THIS_WEEK_OPTIONS = ['Get a Callback', 'Chat on WhatsApp', 'Get Best Price', 'Just Browsing']

interface FormState {
  name: string
  phone: string
  email: string
  travelDate: string
  message: string
}

const initialForm: FormState = { name: '', phone: '', email: '', travelDate: '', message: '' }

export default function EnquirySection() {
  const [step, setStep] = useState<1 | 2>(1)

// Step 1 — preferences
  const [region, setRegion] = useState('')
  const [regionSearch, setRegionSearch] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([])
  const [travelType, setTravelType] = useState<'fixed' | 'flexible'>('fixed')
  const [travelDate, setTravelDate] = useState('')
  const [nights, setNights] = useState(5)
  const [tourTheme, setTourTheme] = useState('')
  const [hotelCategory, setHotelCategory] = useState('3 Star')
  const [thisWeek, setThisWeek] = useState('')

  // Step 2 — contact
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

function togglePlace(place: string) {
    setSelectedPlaces(prev =>
      prev.includes(place) ? prev.filter(p => p !== place) : [...prev, place]
    )
  }

  function selectRegion(r: string) {
    setRegion(r)
    setRegionSearch(r)
    setSelectedPlaces([])
    setShowSuggestions(false)
  }

  const filteredRegions = Object.keys(REGIONS).filter(r =>
    r.toLowerCase().includes(regionSearch.toLowerCase())
  )

  function handleContinue() {
    setError('')
    setStep(2)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const summary = [
        region ? `Region: ${region}` : '',
        selectedPlaces.length ? `Places: ${selectedPlaces.join(', ')}` : '',
        `Travel Type: ${travelType}`,
        `Trip Duration: ${nights} Nights`,
        tourTheme ? `Tour Theme: ${tourTheme}` : '',
        `Hotel Category: ${hotelCategory}`,
        thisWeek ? `This week: ${thisWeek}` : '',
        form.message ? `Message: ${form.message}` : '',
      ].filter(Boolean).join(' | ')

      const payload: EnquiryPayload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        expectedTravelDate: travelDate || form.travelDate || new Date().toISOString(),
        message: summary,
        pageUrl: window.location.href,
        packageSlug: '',
        packageName: '',
        destination: region,
        numberOfAdults: 1,
        numberOfChildren: 0,
        isDateFlexible: travelType === 'flexible',
        preferredHotelCategory: hotelCategory,
        wantToExplore: selectedPlaces.join(', '),
        duration: nights,
      }
      const res = await submitEnquiry(payload)
      if (res?.success) {
        setSuccess(true)
        setForm(initialForm)
      } else {
        setError('Failed to send enquiry. Please try again.')
      }
    } catch {
      setError('Failed to send enquiry. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const places = region ? REGIONS[region] : []

  return (
    <section id="enquiry" className="section enquiry-section">
      <div className="container">
        <div className="enquiry-grid">
          <div className="enquiry-info">
            <h2 className="section-title">Send Us an Enquiry</h2>
            <p className="section-subtitle">
              Have questions about our packages? We'd love to hear from you.
              Fill out the form and our travel experts will get back to you.
            </p>
            <div className="enquiry-contact">
              <div><strong>Phone:</strong> +91 74258 33258</div>
              <div><strong>Email:</strong> info@The TravelGarh.com</div>
            </div>
          </div>

          <div className="enquiry-form card">
            {success && <div className="enquiry-success">Thank you! We'll get back to you shortly.</div>}
            {error && <div className="enquiry-error">{error}</div>}

            {step === 1 ? (
              <>
                <div className="form-group region-search-wrap">
                  <label>I will book holiday in</label>
                  <input
                    type="text"
                    placeholder="Type a destination e.g. Kashmir"
                    value={regionSearch}
                    onChange={e => {
                      setRegionSearch(e.target.value)
                      setShowSuggestions(true)
                      if (e.target.value === '') { setRegion(''); setSelectedPlaces([]) }
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  />
                  {showSuggestions && regionSearch.length > 0 && filteredRegions.length > 0 && (
                    <div className="region-suggestions">
                      {filteredRegions.map(r => (
                        <div
                          key={r}
                          className="region-suggestion-item"
                          onMouseDown={() => selectRegion(r)}
                        >
                          {r}
                        </div>
                      ))}
                    </div>
                  )}
                  {showSuggestions && regionSearch.length > 0 && filteredRegions.length === 0 && (
                    <div className="region-suggestions">
                      <div className="region-suggestion-empty">No destination found</div>
                    </div>
                  )}
                </div>

                {places.length > 0 && (
                  <div className="form-group">
                    <label className="explore-label">Want to Explore</label>
                    <div className="explore-checkbox-grid">
                      {places.map(place => (
                        <label key={place} className="explore-checkbox-item">
                          <input
                            type="checkbox"
                            checked={selectedPlaces.includes(place)}
                            onChange={() => togglePlace(place)}
                          />
                          <span>{place}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label>Is your travel date fixed or flexible</label>
                  <div className="toggle-row">
                    <button
                      type="button"
                      className={`toggle-btn ${travelType === 'fixed' ? 'active' : ''}`}
                      onClick={() => setTravelType('fixed')}
                    >
                      {travelType === 'fixed' && <span className="toggle-check">✓</span>} Fixed
                    </button>
                    <button
                      type="button"
                      className={`toggle-btn ${travelType === 'flexible' ? 'active' : ''}`}
                      onClick={() => setTravelType('flexible')}
                    >
                      {travelType === 'flexible' && <span className="toggle-check">✓</span>} Flexible
                    </button>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Travel Date</label>
                    <input type="date" value={travelDate} onChange={e => setTravelDate(e.target.value)} placeholder="DD/MM/YYYY" />
                  </div>
                  <div className="form-group">
                    <label>Trip Duration</label>
                    <div className="stepper">
                      <button type="button" onClick={() => setNights(n => Math.max(1, n - 1))}>−</button>
                      <span>{nights} Nights</span>
                      <button type="button" onClick={() => setNights(n => n + 1)}>+</button>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Tour Theme</label>
                    <select value={tourTheme} onChange={e => setTourTheme(e.target.value)}>
                      <option value="">Please Select</option>
                      {TOUR_THEMES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Hotel Category</label>
                    <select value={hotelCategory} onChange={e => setHotelCategory(e.target.value)}>
                      {HOTEL_CATEGORIES.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>This week I want to</label>
                  <select value={thisWeek} onChange={e => setThisWeek(e.target.value)}>
                    <option value="">Please Select</option>
                    {THIS_WEEK_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <button type="button" className="btn btn-primary enquiry-submit" onClick={handleContinue}>
                  CONTINUE
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input id="name" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone *</label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="Your phone" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Your email" />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message (optional)</label>
                  <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Any additional details" />
                </div>

                <div className="step2-btn-row">
                  <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
                  <button type="submit" className="btn btn-primary enquiry-submit" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send Enquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}