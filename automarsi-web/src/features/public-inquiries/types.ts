export type CreatePublicInquiryPayload = {
  listing_id: number
  name: string
  phone: string
  email: string | null
  message: string | null
  source: 'listing_details'
}

export type CreatePublicInquiryResponse = {
  message: string
  data: {
    id: number
    listing_id: number | null
    name: string
    email: string | null
    phone: string
    message: string | null
    source: string | null
  }
}