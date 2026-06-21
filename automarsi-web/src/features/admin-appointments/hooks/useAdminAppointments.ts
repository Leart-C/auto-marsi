import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAdminToken } from '@/hooks/useAdminToken'
import {
  getAdminAppointments,
  updateAdminAppointmentStatus,
} from '../api/appointmentsApi'
import type { AppointmentStatus } from '../types'

type UseAdminAppointmentsParams = {
  search: string
  status: AppointmentStatus | ''
  listingId: string
}

export function useAdminAppointments({
  search,
  status,
  listingId,
}: UseAdminAppointmentsParams) {
  const queryClient = useQueryClient()
  const { isAuthReady, getAdminToken } = useAdminToken()

  const queryKey = ['admin', 'appointments', { search, status, listingId }]

  const appointmentsQuery = useQuery({
    queryKey,
    enabled: isAuthReady,
    queryFn: async () => {
      const token = await getAdminToken()

      return getAdminAppointments({
        token,
        search,
        status,
        listingId,
      })
    },
  })

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      appointmentId,
      nextStatus,
    }: {
      appointmentId: number
      nextStatus: AppointmentStatus
    }) => {
      const token = await getAdminToken()

      return updateAdminAppointmentStatus({
        token,
        appointmentId,
        status: nextStatus,
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin', 'appointments'] })
      toast.success('Appointment status updated.')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to update appointment.'
      )
    },
  })

  return {
    appointments: appointmentsQuery.data?.data ?? [],
    total: appointmentsQuery.data?.meta?.total ?? 0,
    appointmentsQuery,
    updateStatusMutation,
    errorMessage:
      appointmentsQuery.error instanceof Error
        ? appointmentsQuery.error.message
        : null,
  }
}
