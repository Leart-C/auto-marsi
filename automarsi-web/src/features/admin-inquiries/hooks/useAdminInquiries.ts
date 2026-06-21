import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAdminToken } from '@/hooks/useAdminToken'
import {
  getAdminInquiries,
  updateAdminInquiryStatus,
} from '../api/inquiriesApi'
import type { InquiryStatus } from '../types'

type UseAdminInquiriesParams = {
  search: string
  status: InquiryStatus | ''
  listingId: string
}

export function useAdminInquiries({
  search,
  status,
  listingId,
}: UseAdminInquiriesParams) {
  const queryClient = useQueryClient()
  const { isAuthReady, getAdminToken } = useAdminToken()

  const queryKey = ['admin', 'inquiries', { search, status, listingId }]

  const inquiriesQuery = useQuery({
    queryKey,
    enabled: isAuthReady,
    queryFn: async () => {
      const token = await getAdminToken()

      return getAdminInquiries({
        token,
        search,
        status,
        listingId,
      })
    },
  })

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      inquiryId,
      nextStatus,
    }: {
      inquiryId: number
      nextStatus: InquiryStatus
    }) => {
      const token = await getAdminToken()

      return updateAdminInquiryStatus({
        token,
        inquiryId,
        status: nextStatus,
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin', 'inquiries'] })
      toast.success('Inquiry status updated.')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update inquiry.'
      )
    },
  })

  return {
    inquiries: inquiriesQuery.data?.data ?? [],
    total: inquiriesQuery.data?.meta?.total ?? 0,
    inquiriesQuery,
    updateStatusMutation,
    errorMessage:
      inquiriesQuery.error instanceof Error ? inquiriesQuery.error.message : null,
  }
}
