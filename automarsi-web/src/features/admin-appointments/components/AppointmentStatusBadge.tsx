import { Badge } from '@/components/ui/badge'
import type { AppointmentStatus } from '../types'

type AppointmentStatusBadgeProps = {
  status: AppointmentStatus
}

function AppointmentStatusBadge({ status }: AppointmentStatusBadgeProps) {
  if (status === 'confirmed') {
    return <Badge>Confirmed</Badge>
  }

  if (status === 'completed') {
    return <Badge variant="secondary">Completed</Badge>
  }

  if (status === 'cancelled') {
    return <Badge variant="destructive">Cancelled</Badge>
  }

  return <Badge variant="outline">Pending</Badge>
}

export default AppointmentStatusBadge
