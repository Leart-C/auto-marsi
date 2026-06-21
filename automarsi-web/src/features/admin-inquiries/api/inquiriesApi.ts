import { adminApi } from '@/lib/adminApi'
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
}

export function getAdminInquiries({
  token,
  search,
  status,
  listingId,
}: GetAdminInquiriesParams) {
  return adminApi<AdminInquiriesResponse>({
    token,
    path: '/admin/inquiries',
    query: {
      search,
      status,
      listing_id: listingId,
      per_page: 50,
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
