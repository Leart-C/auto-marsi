export const inquiryStatuses = ['new', 'read', 'closed'] as const

export type InquiryStatus = (typeof inquiryStatuses)[number]

export type AdminInquiryListing = {
  id: number
  title: string
  make?: { id: number; name: string } | null
  car_model?: { id: number; name: string } | null
}

export type AdminInquiry = {
  id: number
  listing_id: number | null
  listing: AdminInquiryListing | null
  name: string
  email: string | null
  phone: string
  message: string | null
  source: string | null
  status: InquiryStatus
  has_appointment: boolean
  created_at: string | null
  updated_at: string | null
}

export type AdminInquiriesResponse = {
  data: AdminInquiry[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export type AdminInquiryResponse = {
  data: AdminInquiry
}
