import type { EnquiryPayload } from './enquiry'

const BOT_TOKEN = '8956825571:AAFvsndPVInKSYwHZDM8KowBtW07OVirqR4'
const CHAT_ID = '7368043047'

function buildMessage(payload: EnquiryPayload): string {
  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

  const lines: string[] = [
    '🔔 New Enquiry — TheTravelGarh',
    '',
  ]

  if (payload.name)                   lines.push(`👤 Name: ${payload.name}`)
  if (payload.phone)                  lines.push(`📱 Mobile: ${payload.phone}`)
  if (payload.email)                  lines.push(`📧 Email: ${payload.email}`)
  if (payload.destination || payload.packageName)
                                      lines.push(`📍 Destination: ${payload.destination || payload.packageName}`)
  if (payload.city)                   lines.push(`🏙️ Travelling From: ${payload.city}`)
  if (payload.packageName)            lines.push(`📦 Package: ${payload.packageName}`)
  if (payload.expectedTravelDate)     lines.push(`📅 Travel Date: ${new Date(payload.expectedTravelDate).toLocaleDateString('en-IN')}`)
  if (payload.duration)               lines.push(`🌙 Duration: ${payload.duration} Nights`)
  if (payload.numberOfAdults)         lines.push(`👥 Travellers: ${payload.numberOfAdults}`)
  if (payload.preferredHotelCategory) lines.push(`🏨 Hotel Category: ${payload.preferredHotelCategory}`)
  if (payload.isBookedFlightOrTrain !== undefined)
                                      lines.push(`✈️ Flight Booked: ${payload.isBookedFlightOrTrain ? 'Yes' : 'No'}`)
  if (payload.isDateFlexible !== undefined)
                                      lines.push(`📅 Date Flexible: ${payload.isDateFlexible ? 'Yes' : 'No'}`)
  if (payload.wantToExplore)          lines.push(`🗺️ Places: ${payload.wantToExplore}`)
  if (payload.message)                lines.push(`💬 Message: ${payload.message}`)
  if (payload.pageUrl)                lines.push(`🌐 Page: ${payload.pageUrl}`)

  lines.push('')
  lines.push(`🕐 Time: ${now}`)

  return lines.join('\n')
}

export async function notifyTelegram(payload: EnquiryPayload): Promise<void> {
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: buildMessage(payload),
      }),
    })
  } catch (err) {
    console.warn('[Telegram] Notification failed (non-critical):', err)
  }
}
