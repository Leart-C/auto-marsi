import { EMPTY_PAGINATION } from '@/shared/api/pagination'
import { queryPolicy } from '@/shared/config/queryPolicy'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAdminToken } from '@/shared/hooks/useAdminToken'
import {
  convertInquiryToAppointment,
  getAdminInquiries,
  updateAdminInquiryStatus,
} from '@/features/admin-inquiries/api/inquiriesApi'
import type { AppointmentFormPayload } from '@/features/admin-appointments/types'
import type { InquiryStatus } from '@/features/admin-inquiries/types'

type UseAdminInquiriesParams = {
  search: string
  status: InquiryStatus | ''
  listingId: string
  page: number
}

export function useAdminInquiries({
  search,
  status,
  listingId,
  page,
}: UseAdminInquiriesParams) {
  const queryClient = useQueryClient()
  const { isAuthReady, getAdminToken } = useAdminToken()

  const queryKey = [
    'admin',
    'inquiries',
    { search, status, listingId, page },
  ]

  const inquiriesQuery = useQuery({
    queryKey,
    enabled: isAuthReady,
    staleTime: queryPolicy.activityStaleTime,
    queryFn: async () => {
      const token = await getAdminToken()

      return getAdminInquiries({
        token,
        search,
        status,
        listingId,
        page,
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

  const scheduleAppointmentMutation = useMutation({
    mutationFn: async ({
      inquiryId,
      payload,
    }: {
      inquiryId: number
      payload: AppointmentFormPayload
    }) => {
      const token = await getAdminToken()

      return convertInquiryToAppointment({
        token,
        inquiryId,
        preferredAt: payload.preferred_at,
        message: payload.message,
        status:
          payload.status === 'confirmed'
            ? 'confirmed'
            : 'pending',
      })
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['admin', 'inquiries'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['admin', 'appointments'],
        }),
      ])
      toast.success('Appointment scheduled from inquiry.')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to schedule appointment.'
      )
    },
  })

  return {
    inquiries: inquiriesQuery.data?.data ?? [],
    meta: inquiriesQuery.data?.meta ?? EMPTY_PAGINATION,
    inquiriesQuery,
    updateStatusMutation,
    scheduleAppointmentMutation,
    errorMessage:
      inquiriesQuery.error instanceof Error ? inquiriesQuery.error.message : null,
  }
}
