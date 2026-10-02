import { publicApi } from '@/shared/api/publicApi'
import type {
  CreatePublicInquiryPayload,
  CreatePublicInquiryResponse,
} from '@/features/public-inquiries/types'

type CreatePublicInquiryParams = {
  payload: CreatePublicInquiryPayload
}

export function createPublicInquiry({ payload }: CreatePublicInquiryParams) {
  return publicApi<CreatePublicInquiryResponse>({
    path: '/inquiries',
    method: 'POST',
    body: payload,
  })
}
