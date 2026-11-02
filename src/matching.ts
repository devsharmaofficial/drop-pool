import type { Match, Offer, Preference, Request } from './types'

export const formatMoney = (paise: number) => `₹${Math.round(paise / 100).toLocaleString('en-IN')}`

export const discount = (offer: Offer) => Math.round((1 - offer.price / offer.original) * 100)

const toMinutes = (value: string) => {
  const [hours, minutes] = value.split(':').map(Number)
  return hours * 60 + minutes
}

const span = (time: string) => {
  const [start, end] = time.split(/[–-]/)
  return [toMinutes(start), toMinutes(end)] as const
}

export const timeOverlap = (a: string, b: string) => {
  const [aStart, aEnd] = span(a)
  const [bStart, bEnd] = span(b)
  return aStart < bEnd && bStart < aEnd
}

export const prettyTime = (time: string) => {
  const [start, end] = time.split(/[–-]/)
  const label = (value: string) => {
    const [h, m] = value.split(':').map(Number)
    const suffix = h >= 12 ? 'PM' : 'AM'
    const hour = h % 12 || 12
    return `${hour}${m ? `:${String(m).padStart(2, '0')}` : ''} ${suffix}` // taste-skill-ignore clock minutes, not an index
  }
  return `${label(start).replace(' PM', '')}–${label(end)}`
}

const preferenceFits = (category: Preference, request: Request) => {
  if (request.preference === 'any') return true
  if (request.preference === 'vegetarian') return category === 'vegetarian' || category === 'vegan'
  return category === request.preference
}

export const eligibility = (offer: Offer, request: Request) => {
  if (!offer.available || offer.qty < 1) return 'Not available tonight'
  if (!preferenceFits(offer.category, request)) return 'Does not match the food you asked for'
  if (offer.price > request.budget) return `Above your ${formatMoney(request.budget)} cap`
  if (offer.distance > request.radius) return `Outside your ${request.radius} km radius`
  if (!timeOverlap(offer.time, request.time)) return 'Pickup does not overlap your window'
  return null
}

export function matches(request: Request, offers: Offer[]): Match[] {
  return offers
    .filter((offer) => eligibility(offer, request) === null)
    .map((offer) => {
      const preferenceFit = offer.category === request.preference ? 1 : request.preference === 'vegetarian' && offer.category === 'vegan' ? 0.85 : 0.7
      const valueFit = 1 - offer.price / request.budget
      const distanceFit = 1 - offer.distance / request.radius
      const pickupFit = timeOverlap(offer.time, request.time) ? 1 : 0
      const score = preferenceFit * 35 + valueFit * 25 + distanceFit * 20 + pickupFit * 20
      return {
        offer,
        score,
        reasons: [
          `${formatMoney(offer.price)} is inside your ${formatMoney(request.budget)} cap`,
          `${offer.distance.toFixed(1)} km from your area`,
          `Pickup ${prettyTime(offer.time)} overlaps your window`,
        ],
      }
    })
    .sort((a, b) => b.score - a.score)
}

export type PoolSignal = {
  total: number
  sameCrowd: number
  medianCap: number
  peak: string
  highlighted: number
}

/**
 * A deterministic, clearly simulated pool. The numbers move with the
 * customer's choices so the preview feels alive without inventing live data.
 */
export const poolSignal = (request: Request): PoolSignal => {
  const timeExtra = request.time === '20:00–21:00' ? 4 : request.time === '20:30–21:30' ? 2 : 0
  const total = 8 + Math.round(request.radius * 3) + timeExtra
  const share = request.preference === 'any' ? 0.55 : 0.45
  return {
    total,
    sameCrowd: Math.max(3, Math.round(total * share)),
    medianCap: request.budget,
    peak: prettyTime(request.time),
    highlighted: request.preference === 'any' ? Math.round(total * 0.55) : Math.round(total * 0.45),
  }
}

export const draftFitsSignal = (draft: Pick<Offer, 'price' | 'time' | 'category' | 'distance'>, request: Request) => {
  if (!preferenceFits(draft.category, request)) return false
  if (draft.price > request.budget) return false
  if (draft.distance > request.radius) return false
  return timeOverlap(draft.time, request.time)
}
