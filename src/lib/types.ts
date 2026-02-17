export type SearchDisplayType = {
  googleId: string
  name: string
  address: string
  type: string
}

export type GoogleSearchResponse = {
  place_id: string
  name: string
  formatted_address: string
  types: string[]
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
}

export type Claim = {
  sub: string
  name: string
  picture: string
  email: string
}

export type SearchDisplayProps = {
  displayType: string
  id?: string
  googleId: string
  name: string
  address: string
  type: string
  aiScore?: number
}

export interface Review {
  id: string
  userId: string
  entityId: string
  rating: number
  comment: string
  createdAt: Date | string
}

export interface Indicator {
  id: string
  reviewId: string
  indicator: string
  exists: boolean | null
}

export interface Image {
  id: string
  reviewId: string
  image: string
}

export type PointOfInterest = {
  key: string
  name: string
  address: string
  location: {
    lat: number
    lng: number
  }
}
