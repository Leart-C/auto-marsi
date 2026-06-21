import { adminApi } from '@/lib/adminApi'
import type {
  AdminAppointmentResponse,
  AdminAppointmentsResponse,
  AppointmentStatus,
} from '../types'

type GetAdminAppointmentsParams = {
  token: string
  search?: string
  status?: AppointmentStatus | ''
  listingId?: string
}

export function getAdminAppointments({
  token,
  search,
  status,
  listingId,
}: GetAdminAppointmentsParams) {
  return adminApi<AdminAppointmentsResponse>({
    token,
    path: '/admin/appointments',
    query: {
      search,
      status,
      listing_id: listingId,
      per_page: 50,
    },
  })
}

export function updateAdminAppointmentStatus({
  token,
  appointmentId,
  status,
}: {
  token: string
  appointmentId: number
  status: AppointmentStatus
}) {
  return adminApi<AdminAppointmentResponse>({
    token,
    path: `/admin/appointments/${appointmentId}`,
    method: 'PATCH',
    body: { status },
  })
}
