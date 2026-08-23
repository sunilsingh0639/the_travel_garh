// import { BrowserRouter } from 'react-router-dom'
// import { HelmetProvider } from 'react-helmet-async'
// import AppRouter from './AppRouter'

// export default function App() {
//   return (
//     <HelmetProvider>
//       <BrowserRouter>
//         <AppRouter />
//       </BrowserRouter>
//     </HelmetProvider>
//   )
// }

// import { BrowserRouter } from 'react-router-dom'
// import { HelmetProvider } from 'react-helmet-async'
// import { useState, useEffect } from 'react'
// import AppRouter from './AppRouter'
// import { EnquiryDialog } from './pages/TrendingDetail'

// export default function App() {
//   const [showEnquiry, setShowEnquiry] = useState(false)

//   useEffect(() => {
//     const shown = sessionStorage.getItem('enquiryShown')
//     if (shown) return

//     const timer = setTimeout(() => {
//       setShowEnquiry(true)
//       sessionStorage.setItem('enquiryShown', 'true')
//     }, 10000)

//     return () => clearTimeout(timer)
//   }, [])

//   return (
//     <HelmetProvider>
//       <BrowserRouter>
//         <AppRouter />
//         {showEnquiry && (
//           <div className="modal-overlay" onClick={() => setShowEnquiry(false)}>
//             <EnquiryDialog
//               pkg={null}
//               mobile={window.innerWidth < 900}
//               onClose={() => setShowEnquiry(false)}
//             />
//           </div>
//         )}
//       </BrowserRouter>
//     </HelmetProvider>
//   )
// }
// import { BrowserRouter, useLocation } from 'react-router-dom'
// import { HelmetProvider } from 'react-helmet-async'
// import { useState, useEffect } from 'react'
// import AppRouter from './AppRouter'
// import { EnquiryDialog } from './pages/TrendingDetail'

// function EnquiryWrapper() {
//   const [showEnquiry, setShowEnquiry] = useState(false)
//   const [currentPkg, setCurrentPkg] = useState<{ name: string; city: string; image: string } | null>(null)
//   const location = useLocation()

//   useEffect(() => {
//     setShowEnquiry(false)
//     setCurrentPkg(null)

//     const timer = setTimeout(() => {
//       const pkgData = sessionStorage.getItem('currentPkg')
//       if (pkgData) setCurrentPkg(JSON.parse(pkgData))
//       setShowEnquiry(true)
//     }, 10000)

//     return () => clearTimeout(timer)
//   }, [location.pathname])

//   if (!showEnquiry) return null

//   return (
//     <div className="modal-overlay" onClick={() => setShowEnquiry(false)}>
//       <EnquiryDialog
//         pkg={currentPkg as any}
//         mobile={window.innerWidth < 900}
//         onClose={() => setShowEnquiry(false)}
//         showDestinationField={location.pathname === '/'}
//       />
//     </div>
//   )
// }

// export default function App() {
//   return (
//     <HelmetProvider>
//       <BrowserRouter>
//         <AppRouter />
//         <EnquiryWrapper />
//       </BrowserRouter>
//     </HelmetProvider>
//   )
// }

import { BrowserRouter, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import AppRouter from './AppRouter'
import { EnquiryDialog } from './pages/TrendingDetail'
import ScrollToTop from './components/common/ScrollToTop'

function EnquiryWrapper() {
  const [showEnquiry, setShowEnquiry] = useState(false)
  const [currentPkg, setCurrentPkg] = useState<{ name: string; city: string; image: string } | null>(null)
  const location = useLocation()

  useEffect(() => {
    setShowEnquiry(false)
    setCurrentPkg(null)

    const timer = setTimeout(() => {
      const pkgData = sessionStorage.getItem('currentPkg')
      if (pkgData) setCurrentPkg(JSON.parse(pkgData))
      setShowEnquiry(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [location.pathname])

  if (!showEnquiry) return null

  return (
    <div className="modal-overlay" onClick={() => setShowEnquiry(false)}>
      <EnquiryDialog
        pkg={currentPkg as any}
        mobile={window.innerWidth < 900}
        onClose={() => setShowEnquiry(false)}
        showDestinationField={location.pathname === '/'}
      />
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRouter />
        <EnquiryWrapper />
      </BrowserRouter>
    </HelmetProvider>
  )
}