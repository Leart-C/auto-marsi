import { adminApi } from '@/lib/adminApi'
import type {
  AdminAppointmentResponse,
  AppointmentStatus,
} from '@/features/admin-appointments/types'
import type {
  AdminInquiryResponse,
  AdminInquiriesResponse,
  InquiryStatus,
} from '../types'

type GetAdminInquiriesParams = {
  token: string
  search?: string
  status?: InquiryStatus | ''
  listingId?: string
  page?: number
  perPage?: number
}

export function getAdminInquiries({
  token,
  search,
  status,
  listingId,
  page = 1,
  perPage = 15,
}: GetAdminInquiriesParams) {
  return adminApi<AdminInquiriesResponse>({
    token,
    path: '/admin/inquiries',
    query: {
      search,
      status,
      listing_id: listingId,
      page,
      per_page: perPage,
    },
  })
}

export function convertInquiryToAppointment({
  token,
  inquiryId,
  preferredAt,
  message,
  status,
}: {
  token: string
  inquiryId: number
  preferredAt: string
  message: string | null
  status: Extract<AppointmentStatus, 'pending' | 'confirmed'>
}) {
  return adminApi<AdminAppointmentResponse>({
    token,
    path: `/admin/inquiries/${inquiryId}/appointment`,
    method: 'POST',
    body: {
      preferred_at: preferredAt,
      message,
      status,
    },
  })
}

export function updateAdminInquiryStatus({
  token,
  inquiryId,
  status,
}: {
  token: string
  inquiryId: number
  status: InquiryStatus
}) {
  return adminApi<AdminInquiryResponse>({
    token,
    path: `/admin/inquiries/${inquiryId}`,
    method: 'PATCH',
    body: { status },
  })
}
