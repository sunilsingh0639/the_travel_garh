import { useState } from 'react'

interface StayOption {
  id: string
  label: string
  image: string
  days: number
  cutPrice: number
  price: number
}

interface PackageOption {
  id: string
  label: string
}

interface Props {
  stayOptions?: StayOption[]
  packageOptions?: PackageOption[]
  onStayChange?: (id: string) => void
}

const defaultStays: StayOption[] = [  
  { id: 'standard', label: 'Standard', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80', days: 7, cutPrice: 53300, price: 48800 },
  { id: 'premium', label: 'Premium', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80', days: 7, cutPrice: 59300, price: 53800 },
  { id: 'luxury', label: 'Luxury', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80', days: 7, cutPrice: 76800, price: 70800 },
]

const defaultPackages: PackageOption[] = [
  { id: '6', label: '6 Person' },
  { id: '4', label: '4 Person' },
  { id: '2', label: '2 Person' },
]

export default function StayCategory({
  stayOptions = defaultStays,
  packageOptions = defaultPackages,
  onStayChange,
}: Props) {
  const [selectedStay, setSelectedStay] = useState(stayOptions[0]?.id ?? '')
  const [_selectedPkg, _setSelectedPkg] = useState(packageOptions[0]?.id ?? '')

  function handleStay(id: string) {
    setSelectedStay(id)
    onStayChange?.(id)
  }

  return (
    <div style={{
      background: '#fff',
      borderRadius: 20,
      padding: '28px 28px 24px',
      boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
      maxWidth: 680,
      width: '100%',
      boxSizing: 'border-box',
    }}>

      {/* Stay Category */}
      <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 18px', color: '#111' }}>
        Stay Category
      </h3>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {stayOptions.map(opt => {
          const active = selectedStay === opt.id
          return (
            <div
              key={opt.id}
              onClick={() => handleStay(opt.id)}
              style={{ cursor: 'pointer', flex: '1 1 140px', maxWidth: 200, minWidth: 0 }}
            >
              {/* Image card */}
              <div style={{
                position: 'relative',
                borderRadius: 14,
                overflow: 'hidden',
                border: active ? '2.5px solid #FF1E1E' : '2.5px solid transparent',
                height: 140,
                transition: 'border-color 0.2s',
              }}>
                <img
                  src={opt.image}
                  alt={opt.label}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {/* Days badge */}
                <div style={{
                  position: 'absolute', bottom: 10, left: 10,
                  background: 'rgba(0,0,0,0.55)',
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: 8,
                  backdropFilter: 'blur(2px)',
                }}>
                  {opt.days} Days
                </div>
              </div>

              {/* Label + Price */}
              <div style={{ marginTop: 10, paddingLeft: 2 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#111', marginBottom: 4 }}>
                  {opt.label}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#111' }}>
                  ₹ {opt.price.toLocaleString()}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Divider */}
      <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #eee' }} />

      {/* Package Options */}
      {/* <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 16px', color: '#111' }}>
        Package Options
      </h3> */}

      {/* <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {packageOptions.map(opt => {
          const active = _selectedPkg === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => _setSelectedPkg(opt.id)}
              style={{
                padding: '10px 22px',
                borderRadius: 50,
                border: active ? '2px solid #FF1E1E' : '2px solid #ddd',
                background: active ? '#fff5f5' : '#fff',
                color: active ? '#FF1E1E' : '#333',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.15s',
              }}
            >
              {opt.label}
              {active && (
                <span style={{
                  width: 20, height: 20,
                  background: '#FF1E1E',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, color: '#fff', fontWeight: 700,
                }}>✓</span>
              )}
            </button>
          )
        })}
      </div> */}

    </div>
  )
}
