import { createContext, useContext } from 'react'

export interface EnquiryPackageContext {
  name: string
  city: string
  image?: string
  slug?: string
  nights?: number
}

interface EnquiryContextValue {
  openEnquiry: (pkg?: EnquiryPackageContext | null, destination?: string) => void
}

export const EnquiryContext = createContext<EnquiryContextValue | null>(null)

export function useEnquiry() {
  const context = useContext(EnquiryContext)
  if (!context) throw new Error('useEnquiry must be used within the enquiry provider')
  return context
}
