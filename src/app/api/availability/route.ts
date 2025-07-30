import { google} from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'
import { JWT } from 'google-auth-library'

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

// Type definitions
interface BusySlot {
  start?: string | null
  end?: string | null
}

interface AvailableSlot {
  start: string
  end: string
  displayTime: string
}

interface NextAvailableDay {
  day: string
  date: string
  available: boolean
}

interface CalendarResponse {
  date: string
  availableSlots: AvailableSlot[]
  nextAvailableDays: NextAvailableDay[]
  available: boolean
}

// Properly type the auth client
let authClient: JWT | null = null

function initializeAuthClient(): JWT | null {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.error('Missing Google auth env vars')
    return null
  }
  
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: SCOPES
  })
}

if (!authClient) {
  authClient = initializeAuthClient()
}

export async function GET(req: NextRequest): Promise<NextResponse<CalendarResponse | { error: string }>> {
  if (!authClient) {
    return NextResponse.json(
      { error: 'Calendar service unavailable' }, 
      { status: 503 }
    )
  }

  const { searchParams } = new URL(req.url)
  const day = searchParams.get('day')
  
  if (!day || !isValidDate(day)) {
    return NextResponse.json(
      { error: 'Invalid or missing date parameter (YYYY-MM-DD required)' },
      { status: 400 }
    )
  }

  try {
    await authClient.authorize()
    const calendar = google.calendar({ version: 'v3', auth: authClient })
    const timeMin = `${day}T00:00:00Z`
    const timeMax = `${day}T23:59:59Z`

    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 250
    })

    const busySlots: BusySlot[] = (response.data.items || []).map(event => ({
      start: event.start?.dateTime || event.start?.date || null,
      end: event.end?.dateTime || event.end?.date || null
    }))

    const availableSlots = calculateAvailableSlots(day, busySlots)
    const nextAvailableDays = getNextAvailableDays(day)

    return NextResponse.json({
      date: day,
      availableSlots,
      nextAvailableDays,
      available: availableSlots.length > 0
    })

  } catch (error) {
    console.error('Calendar API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}

function isValidDate(dateString: string): boolean {
  return !isNaN(Date.parse(dateString))
}

function calculateAvailableSlots(date: string, busySlots: BusySlot[]): AvailableSlot[] {
  const slots: AvailableSlot[] = []
  const startHour = 9
  const endHour = 17
  const interval = 30

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const slotStart = new Date(`${date}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00Z`)
      const slotEnd = new Date(slotStart.getTime() + interval * 60000)

      const isAvailable = !busySlots.some(busy => {
        if (!busy.start || !busy.end) return false
        const busyStart = new Date(busy.start)
        const busyEnd = new Date(busy.end)

        return (
          (slotStart >= busyStart && slotStart < busyEnd) ||
          (slotEnd > busyStart && slotEnd <= busyEnd) ||
          (slotStart <= busyStart && slotEnd >= busyEnd)
        )
      })

      if (isAvailable) {
        slots.push({
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
          displayTime: slotStart.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true,
            timeZone: 'UTC'
          })
        })
      }
    }
  }

  return slots
}

function getNextAvailableDays(currentDay: string): NextAvailableDay[] {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const suggestions: NextAvailableDay[] = []
  const currentDate = new Date(currentDay)

  for (let i = 1; i <= 7; i++) {
    const nextDate = new Date(currentDate)
    nextDate.setDate(currentDate.getDate() + i)
    const dateStr = nextDate.toISOString().split('T')[0]
    const dayName = daysOfWeek[nextDate.getDay()]
    
    suggestions.push({ 
      day: dayName, 
      date: dateStr, 
      available: true // In production, you'd check real availability here
    })

    if (suggestions.length >= 3) break
  }

  return suggestions
}