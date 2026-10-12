import type { Handler, HandlerEvent } from '@netlify/functions'

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  let body: Record<string, unknown>
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' }
  }

  const text = body.text as string
  if (!text) return { statusCode: 400, body: 'Missing text field' }

  try {
    const res = await fetch(`https://api.telegram.org/8956825571:AAFvsndPVInKSYwHZDM8KowBtW07OVirqR4/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: 7368043047,
        text,
        parse_mode: 'HTML',
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[Telegram] API error:', err)
      return { statusCode: 502, body: 'Telegram API error' }
    }

    return { statusCode: 200, body: 'OK' }
  } catch (err) {
    console.error('[Telegram] Fetch failed:', err)
    return { statusCode: 502, body: 'Telegram delivery failed' }
  }
}
