import { useMutation } from '@tanstack/react-query'
import { createPublicInquiry } from '@/features/public-inquiries/api/createPublicInquiry'
import type { CreatePublicInquiryPayload } from '@/features/public-inquiries/types'

export function useCreatePublicInquiry() {
  return useMutation({
    mutationFn: (payload: CreatePublicInquiryPayload) => {
      return createPublicInquiry({ payload })
    },
  })
}