import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

function getPad(w: number) {
  if (w > 1400) return 120; if (w > 1100) return 80; if (w > 900) return 40; return 16
}

const features = [
  { icon: '🌍', title: 'Customized Tour Packages', subtitle: 'Tailor-made travel plans designed exactly according to your comfort and preferences.' },
  { icon: '🏨', title: 'Trusted Hotel & Transport', subtitle: 'We work with premium hotels and verified transport partners for safe travel.' },
  { icon: '💰', title: 'Affordable Pricing', subtitle: 'Best value tour packages with transparent pricing and no hidden charges.' },
  { icon: '🎧', title: '24/7 Customer Support', subtitle: 'Our team is always available to assist you before, during, and after your journey.' },
  { icon: '👥', title: 'Group Tours & Events', subtitle: 'Expert management for family tours, corporate events, and large group travel.' },
  { icon: '❤️', title: 'Destination Wedding Planning', subtitle: 'Beautiful wedding planning services at dream destinations across India.' },
]

const visionCards = [
  { icon: '👁️', title: 'Our Vision', desc: 'To become India\'s most trusted and loved travel company by making every journey extraordinary.', color: '#12B5FF' },
  { icon: '🚩', title: 'Our Mission', desc: 'To deliver seamless, affordable, and memorable travel experiences with world-class hospitality.', color: '#FF7A00' },
  { icon: '💎', title: 'Our Values', desc: 'Integrity, customer-first approach, innovation, and passion for creating lifelong memories.', color: '#6C63FF' },
]

export default function ContactUs() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1400)
  useEffect(() => {
    const onResize = () => setW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  const pad = getPad(w)
  const isMobile = w < 700

  return (
    <>
      <Helmet><title>Contact Us - The TravelGarh</title></Helmet>
      <div style={{ background: '#F5F5F5', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

        { /* HERO */}
        <div style={{
          background: 'linear-gradient(135deg, #12B5FF, #0077CC)',
          padding: `${isMobile ? 40 : 60}px ${pad}px`,
          textAlign: 'center',
        }}>
          <div style={{
            display: 'inline-flex', padding: '8px 20px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 30, border: '1px solid rgba(255,255,255,0.3)',
            fontSize: 13, fontWeight: 600, color: '#fff', letterSpacing: 0.5,
          }}>🌍 Contact TheThe TravelGarh</div>

          <h1 style={{
            fontSize: isMobile ? 30 : 52, fontWeight: 'bold', color: '#fff',
            lineHeight: 1.2, margin: `${isMobile ? 20 : 24}px 0 ${isMobile ? 14 : 18}px`,
          }}>Creating Memories<br />That Last Forever ✈️</h1>

          <div style={{ maxWidth: isMobile ? '100%' : 620, margin: '0 auto' }}>
            <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: isMobile ? 14 : 16, lineHeight: 1.7 }}>
              TheThe TravelGarh is a dynamic and customer-focused travel company dedicated to creating unforgettable travel experiences across India and beyond.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: isMobile ? 28 : 36 }}>
            {['50000+', '200+', '50+', '24/7'].map((v, i) => (
              <div key={i} style={{
                padding: '16px 22px', background: 'rgba(255,255,255,0.15)',
                borderRadius: 16, border: '1px solid rgba(255,255,255,0.25)',
                textAlign: 'center',
              }}>
                <div style={{ color: '#fff', fontSize: 26, fontWeight: 'bold' }}>{v}</div>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: 500, marginTop: 4 }}>
                  {['Happy Travellers', 'Tour Packages', 'Destinations', 'Customer Support'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        { /* WHO WE ARE */}
        <div style={{ background: '#fff', padding: `${isMobile ? 40 : 70}px ${pad}px` }}>
          <div style={{
            display: 'inline-flex', padding: '7px 14px',
            background: 'rgba(18,181,255,0.1)', borderRadius: 20,
            fontSize: 12, fontWeight: 600, color: '#12B5FF', letterSpacing: 0.5,
          }}>Our Story</div>

          <h2 style={{ fontSize: isMobile ? 28 : 44, fontWeight: 'bold', color: '#1a1a2e', margin: '14px 0 10px' }}>Who We Are</h2>
          <div style={{ width: 70, height: 4, background: '#FF7A00', borderRadius: 20, marginBottom: 32 }} />

          {isMobile ? (
            <AboutTextColumn isMobile />
          ) : (
            <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
              <div style={{ flex: 3 }}><AboutTextColumn isMobile={false} /></div>
              <div style={{ flex: 2 }}>
                <div style={{
                  height: 320, borderRadius: 24,
                  background: 'linear-gradient(135deg, #12B5FF, #0055AA)',
                  boxShadow: '0 12px 24px rgba(18,181,255,0.25)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ fontSize: 70, color: '#fff' }}>✈️</div>
                  <div style={{ color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: 16 }}>TheThe TravelGarh</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 8 }}>Your Travel Partner</div>
                </div>
              </div>
            </div>
          )}
        </div>

        { /* WHY CHOOSE US */}
        <div style={{ background: '#F5F5F5', padding: `${isMobile ? 40 : 70}px ${pad}px` }}>
          <div style={{
            display: 'inline-flex', padding: '7px 14px',
            background: 'rgba(18,181,255,0.1)', borderRadius: 20,
            fontSize: 12, fontWeight: 600, color: '#12B5FF', letterSpacing: 0.5,
          }}>Why Us</div>

          <h2 style={{ fontSize: isMobile ? 26 : 42, fontWeight: 'bold', color: '#1a1a2e', margin: '14px 0 10px' }}>Why Choose TheThe TravelGarh?</h2>
          <div style={{ width: 70, height: 4, background: '#FF7A00', borderRadius: 20, marginBottom: 12 }} />
          <p style={{ fontSize: isMobile ? 14 : 16, color: '#999', lineHeight: 1.6, margin: '0 0 32px' }}>
            We provide premium travel experiences with trusted services and affordable pricing.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} style={{
                width: isMobile ? `calc(100%)` : `calc(50% - 8px)`,
                background: '#fff', borderRadius: 18, padding: 20,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                display: 'flex', gap: 16, alignItems: 'flex-start',
              }}>
                <div style={{
                  padding: 12,
                  background: 'linear-gradient(135deg, #12B5FF, #0077CC)',
                  borderRadius: 14, flexShrink: 0, fontSize: 24,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 48, height: 48,
                }}>{f.icon}</div>
                <div>
                  <div style={{ fontSize: isMobile ? 15 : 16, fontWeight: 'bold', color: '#1a1a2e' }}>{f.title}</div>
                  <div style={{ fontSize: isMobile ? 13 : 14, color: '#999', lineHeight: 1.6, marginTop: 6 }}>{f.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        { /* VISION / MISSION / VALUES */}
        <div style={{ background: '#fff', padding: `${isMobile ? 40 : 70}px ${pad}px`, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', padding: '7px 14px',
            background: 'rgba(18,181,255,0.1)', borderRadius: 20,
            fontSize: 12, fontWeight: 600, color: '#12B5FF', letterSpacing: 0.5,
          }}>Our Vision</div>

          <h2 style={{ fontSize: isMobile ? 26 : 42, fontWeight: 'bold', color: '#1a1a2e', margin: '14px 0 10px', textAlign: 'center' }}>What Drives Us</h2>
          <div style={{ width: 70, height: 4, background: '#FF7A00', borderRadius: 20, margin: '0 auto 36px' }} />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            {visionCards.map((c, i) => (
              <div key={i} style={{
                width: isMobile ? '100%' : `calc(33.33% - 11px)`,
                background: '#fff', borderRadius: 22, padding: 26,
                boxShadow: `0 6px 18px ${c.color}1a`,
                border: `1px solid ${c.color}1a`,
                textAlign: 'center',
              }}>
                <div style={{
                  width: 60, height: 60, borderRadius: '50%',
                  background: `${c.color}1a`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, margin: '0 auto 16px',
                }}>{c.icon}</div>
                <div style={{ fontSize: isMobile ? 18 : 20, fontWeight: 'bold', color: '#1a1a2e' }}>{c.title}</div>
                <div style={{ fontSize: isMobile ? 13 : 14, color: '#999', lineHeight: 1.7, marginTop: 10 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        { /* CTA */}
        <div style={{
          background: 'linear-gradient(135deg, #12B5FF, #FF7A00)',
          padding: `${isMobile ? 40 : 70}px ${pad}px`,
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: isMobile ? 24 : 40, fontWeight: 'bold', color: '#fff', lineHeight: 1.3, margin: 0 }}>
            Start Your Journey With Us ✈️
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: isMobile ? 14 : 17, margin: '12px 0 32px' }}>
            Let's make your dream destination a reality.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            {['📞 7425833258', '🌐 TheThe TravelGarh.com'].map((label, i) => (
              <div key={i} style={{
                padding: '12px 22px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 40, border: '1px solid rgba(255,255,255,0.4)',
                color: '#fff', fontSize: 14, fontWeight: 600,
              }}>{label}</div>
            ))}
          </div>
        </div>

        <div style={{ height: 60 }} />
      </div>
    </>
  )
}

function AboutTextColumn({ isMobile }: { isMobile: boolean }) {
  const style: React.CSSProperties = { fontSize: isMobile ? 14 : 16, lineHeight: 1.9, color: '#666', margin: 0 }
  return (
    <div>
      <p style={style}>TheThe TravelGarh is a dynamic and customer-focused travel company dedicated to creating unforgettable travel experiences across India and beyond.</p>
      <p style={{ ...style, marginTop: 16 }}>With a strong passion for hospitality and a deep understanding of travel needs, we specialize in crafting personalized tour packages that combine comfort, adventure, and affordability.</p>
      <p style={{ ...style, marginTop: 16 }}>Founded with the vision to make travel seamless and enjoyable, TheThe TravelGarh offers a wide range of services including domestic tour packages, hotel bookings, transportation, sightseeing, destination weddings, and event planning.</p>
      <p style={{ ...style, marginTop: 16 }}>Whether it's a relaxing family vacation, a romantic honeymoon, a corporate trip, or a group adventure, we ensure every journey is well-planned and hassle-free.</p>
      <div style={{
        marginTop: 20, padding: 18,
        background: 'rgba(18,181,255,0.08)',
        borderRadius: 14, border: '1px solid rgba(18,181,255,0.2)',
      }}>
        <p style={{ fontSize: isMobile ? 14 : 16, fontWeight: 700, lineHeight: 1.7, color: '#0077CC', fontStyle: 'italic', margin: 0 }}>
          &ldquo;At TheThe TravelGarh, we don't just plan trips — we create memories that last a lifetime.&rdquo;
        </p>
      </div>
    </div>
  )
}
