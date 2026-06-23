import { useMutation } from '@tanstack/react-query'
import { createPublicInquiry } from '../api/createPublicInquiry'
import type { CreatePublicInquiryPayload } from '../types'

export function useCreatePublicInquiry() {
  return useMutation({
    mutationFn: (payload: CreatePublicInquiryPayload) => {
      return createPublicInquiry({ payload })
    },
  })
}