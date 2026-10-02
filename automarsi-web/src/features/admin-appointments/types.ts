import type { PaginationMeta } from '@/shared/api/types'
export const appointmentStatuses = [
  'pending',
  'confirmed',
  'completed',
  'cancelled',
] as const

export type AppointmentStatus = (typeof appointmentStatuses)[number]

export type AdminAppointmentListing = {
  id: number
  title: string
  make?: { id: number; name: string } | null
  car_model?: { id: number; name: string } | null
}

export type AdminAppointment = {
  id: number
  listing_id: number | null
  inquiry_id: number | null
  listing: AdminAppointmentListing | null
  name: string
  phone: string
  email: string | null
  preferred_at: string
  message: string | null
  status: AppointmentStatus
  created_at: string | null
  updated_at: string | null
}

export type AppointmentFormPayload = {
  listing_id: number | null
  name: string
  phone: string
  email: string | null
  preferred_at: string
  message: string | null
  status: AppointmentStatus
}

export type AdminAppointmentsResponse = {
  data: AdminAppointment[]
  meta: PaginationMeta
}

export type AdminAppointmentResponse = {
  data: AdminAppointment
}
