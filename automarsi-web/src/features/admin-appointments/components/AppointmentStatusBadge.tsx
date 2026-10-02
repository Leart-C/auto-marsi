import AdminStatusPill from '@/shared/components/admin/AdminStatusPill'
import type { AppointmentStatus } from '@/features/admin-appointments/types'

type AppointmentStatusBadgeProps = {
  status: AppointmentStatus
}

function AppointmentStatusBadge({ status }: AppointmentStatusBadgeProps) {
  return <AdminStatusPill status={status} />
}

export default AppointmentStatusBadge
