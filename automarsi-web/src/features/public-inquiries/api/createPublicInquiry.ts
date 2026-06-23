import { publicApi } from '@/lib/publicApi'
import type {
  CreatePublicInquiryPayload,
  CreatePublicInquiryResponse,
} from '../types'

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