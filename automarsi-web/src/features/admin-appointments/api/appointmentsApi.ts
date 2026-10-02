import { ADMIN_PAGE_SIZE } from '@/shared/api/pagination'
import { adminApi } from '@/shared/api/adminApi'
import type {
  AdminAppointmentResponse,
  AdminAppointmentsResponse,
  AppointmentStatus,
  AppointmentFormPayload,
} from '@/features/admin-appointments/types'

type GetAdminAppointmentsParams = {
  token: string
  search?: string
  status?: AppointmentStatus | ''
  listingId?: string
  page?: number
  perPage?: number
}

export function getAdminAppointments({
  token,
  search,
  status,
  listingId,
  page = 1,
  perPage = ADMIN_PAGE_SIZE,
}: GetAdminAppointmentsParams) {
  return adminApi<AdminAppointmentsResponse>({
    token,
    path: '/admin/appointments',
    query: {
      search,
      status,
      listing_id: listingId,
      page,
      per_page: perPage,
    },
  })
}

export function createAdminAppointment({
  token,
  payload,
}: {
  token: string
  payload: AppointmentFormPayload
}) {
  return adminApi<AdminAppointmentResponse>({
    token,
    path: '/admin/appointments',
    method: 'POST',
    body: payload,
  })
}

export function updateAdminAppointment({
  token,
  appointmentId,
  payload,
}: {
  token: string
  appointmentId: number
  payload: AppointmentFormPayload
}) {
  return adminApi<AdminAppointmentResponse>({
    token,
    path: `/admin/appointments/${appointmentId}`,
    method: 'PATCH',
    body: payload,
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
