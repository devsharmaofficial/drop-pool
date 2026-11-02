export type Page = 'home' | 'pool' | 'matches' | 'merchant'

export type Preference = 'vegetarian' | 'vegan' | 'bakery' | 'any'

export type Offer = {
  id: string
  merchant: string
  area: string
  item: string
  category: Preference
  price: number
  original: number
  qty: number
  distance: number
  pickup: string
  time: string
  notes: string[]
  allergens: string[]
  image: string
  available: boolean
}

export type Request = {
  preference: Preference
  budget: number
  radius: number
  time: string
}

export type Match = {
  offer: Offer
  score: number
  reasons: string[]
}
