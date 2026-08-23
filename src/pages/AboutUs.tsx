import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

const stats = [
  { icon: '📍', value: '10,000+', label: 'Tours Organized' },
  { icon: '👥', value: '50,000+', label: 'Happy Travelers' },
  { icon: '⭐', value: '4.8 / 5', label: 'Google Rating' },
  { icon: '🏢', value: '5+', label: 'Offices Across India' },
]

const whyChoose = [
  { icon: '🏆', title: '10,000+ Successful Tours Organized', desc: 'Delivering unforgettable travel experiences across India and beyond.' },
  { icon: '❤️', title: '50,000+ Happy Customers', desc: 'Trusted by thousands of travelers for quality service and seamless travel planning.' },
  { icon: '⭐', title: '4.8 Google Rating', desc: 'Highly rated for customer satisfaction, reliability, and personalized support.' },
  { icon: '🎧', title: 'Dedicated Travel Experts', desc: 'Our experienced team works tirelessly to ensure every trip is perfectly planned and executed.' },
  { icon: '🏙️', title: '5+ Offices Across India', desc: 'Providing local support and personalized assistance to travelers nationwide.' },
]

const services = [
  'Domestic Tour Packages', 'International Tour Packages', 'Group Tours',
  'Honeymoon Packages', 'Family Vacations', 'Corporate Tours',
  'Hotel Bookings', 'Transportation Services', 'Flight & Train Assistance',
]

const contactItems = [
  { icon: '📞', text: 'Call: 7425833258' },
  { icon: '🌐', text: 'theThe TravelGarh.com' },
  { icon: '⭐', text: 'Google Rating: 4.8/5' },
  { icon: '🏢', text: '5+ Offices Across India' },
]

function getPad(w: number) {
  if (w > 1400) return 120; if (w > 1100) return 80; if (w > 900) return 40; return 16
}

export default function AboutUs() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1400)
  useEffect(() => {
    const onResize = () => setW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  const pad = getPad(w)
  const isMobile = w < 700

  const secPad = { padding: `${isMobile ? 48 : 72}px ${pad}px`, }
  const secPadNormal = { padding: `${isMobile ? 40 : 48}px ${pad}px`, }

  return (
    <>
      <Helmet><title>About Us - The TravelGarh</title></Helmet>
      <div style={{ background: '#F5F5F5', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
        { /* Hero */}
        <div style={{ background: 'linear-gradient(135deg, #12B5FF, #0077CC)', ...secPad }}>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: isMobile ? 32 : 48, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2 }}>About Us</h1>
          <p style={{ fontSize: isMobile ? 15 : 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginTop: 16, marginBottom: 24 }}>TheThe TravelGarh is one of India's trusted travel companies, dedicated to creating memorable travel experiences for individuals, families, groups, and corporate clients across the country.</p>
          <p style={{ fontSize: isMobile ? 15 : 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, margin: 0 }}>With a passion for travel and a commitment to excellence, we have successfully organized 10,000+ tours and helped 50,000+ happy travelers explore incredible destinations with comfort and confidence.</p>
        </div>

        { /* Stats */}
        <div style={{ background: '#fff', ...secPadNormal }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: isMobile ? undefined : 'space-around' }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                background: '#F5F5F5', borderRadius: 16, padding: 20,
                width: isMobile ? `calc(50% - 8px)` : undefined, flex: isMobile ? undefined : 1,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: 800, color: '#1a1a2e' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#888', fontWeight: 500, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        { /* Why Choose Us */}
        <div style={{ background: '#F5F5F5', ...secPadNormal }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: isMobile ? 22 : 30, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>Why Choose TheThe TravelGarh?</h2>
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {whyChoose.map((item, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 16, padding: 20,
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                display: 'flex', gap: 16, alignItems: 'flex-start',
              }}>
                <div style={{
                  background: '#FFEBEE', borderRadius: 12, width: 48, height: 48,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0,
                }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: isMobile ? 14 : 16, fontWeight: 700, color: '#1a1a2e' }}>{item.title}</div>
                  <div style={{ fontSize: isMobile ? 13 : 14, color: '#888', lineHeight: 1.6, marginTop: 4 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        { /* Our Mission */}
        <div style={{ background: '#fff', ...secPadNormal }}>
          <div style={{ display: 'flex', gap: 24 }}>
            {!isMobile && <div style={{ width: 4, height: 120, background: '#FF7A00', borderRadius: 2, flexShrink: 0 }} />}
            <div>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: isMobile ? 22 : 30, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>Our Mission</h2>
              <p style={{ fontSize: isMobile ? 15 : 17, color: '#666', lineHeight: 1.9, marginTop: 16 }}>To make travel easy, affordable, and memorable by offering customized tour packages, exceptional customer service, and hassle-free travel solutions.</p>
            </div>
          </div>
        </div>

        { /* Our Services */}
        <div style={{ background: '#F5F5F5', ...secPadNormal }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: isMobile ? 22 : 30, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>Our Services</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
            {services.map((s, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 30, padding: '10px 18px',
                border: '1px solid #eee', boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{ color: '#2E7D32', fontSize: 14 }}>✓</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1a2e' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        { /* Contact Strip */}
        <div style={{
          background: 'linear-gradient(135deg, #12B5FF, #0077CC)',
          ...secPadNormal,
        }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-around', gap: 8 }}>
            {contactItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: isMobile ? 'flex-start' : 'center' }}>
                <span style={{ color: '#fff', fontSize: 20 }}>{item.icon}</span>
                <span style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>{item.text}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: isMobile ? 16 : 20, fontWeight: 600, color: '#fff', letterSpacing: 0.5 }}>
              TheThe TravelGarh – Turning Your Travel Dreams Into Reality.
            </span>
          </div>
        </div>

        <div style={{ height: 60 }} />
      </div>
    </>
  )
}
