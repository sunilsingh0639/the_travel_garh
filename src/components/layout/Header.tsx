import { useLocation, useNavigate } from 'react-router-dom'
import './Header.css'
import { assetUrl } from '../../api/client'

const navLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Tour Packages', path: '/tour-packages' },
  { label: 'Upcoming Trips', path: '/upcoming-trips' },
  { label: 'Value for Money', path: '/value-for-money' },
  { label: 'Contact Us', path: '/contact' },
]

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-row">
          <img
            src={assetUrl('/images/main_applogo.png')}
            alt="The TravelGarh"
            className="header-logo-img"
            loading="lazy"
            onClick={() => navigate('/')}
          />

          <nav className="header-nav desktop-nav">
            {navLinks.map(link => (
              <span
                key={link.path}
                className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </span>
            ))}
          </nav>

          <div className="mobile-header-row mobile-only">
            <button className="mobile-menu-btn" onClick={() => {
              const drawer = document.querySelector('.mobile-drawer-overlay') as HTMLElement
              if (drawer) drawer.style.display = 'block'
              const panel = document.querySelector('.mobile-drawer-panel') as HTMLElement
              if (panel) panel.style.transform = 'translateX(0)'
            }} aria-label="Menu">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="quick-links-pill mobile-only">
        {navLinks
          .filter(l => ['Tour Packages', 'Upcoming Trips', 'Value for Money'].includes(l.label))
          .map(link => (
            <span
              key={link.path}
              className={`quick-link-item ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </span>
          ))
        }
      </div>

      <div className="mobile-drawer-overlay" onClick={() => {
        const el = document.querySelector('.mobile-drawer-overlay') as HTMLElement
        if (el) el.style.display = 'none'
        const panel = document.querySelector('.mobile-drawer-panel') as HTMLElement
        if (panel) panel.style.transform = 'translateX(100%)'
      }} style={{ display: 'none' }} />

      <div className="mobile-drawer-panel" style={{ transform: 'translateX(100%)' }}>
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-title">Menu</span>
          <button className="mobile-menu-btn" onClick={() => {
            const el = document.querySelector('.mobile-drawer-overlay') as HTMLElement
            if (el) el.style.display = 'none'
            const panel = document.querySelector('.mobile-drawer-panel') as HTMLElement
            if (panel) panel.style.transform = 'translateX(100%)'
          }} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        <div className="mobile-drawer-body">
          {navLinks.map(link => (
            <div
              key={link.path}
              className={`mobile-drawer-item ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => {
                const el = document.querySelector('.mobile-drawer-overlay') as HTMLElement
                if (el) el.style.display = 'none'
                const panel = document.querySelector('.mobile-drawer-panel') as HTMLElement
                if (panel) panel.style.transform = 'translateX(100%)'
                navigate(link.path)
              }}
            >
              {link.label}
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
