import { Badge } from '@/components/ui/badge'
import type { InquiryStatus } from '../types'

type InquiryStatusBadgeProps = {
  status: InquiryStatus
}

function InquiryStatusBadge({ status }: InquiryStatusBadgeProps) {
  if (status === 'new') {
    return <Badge>New</Badge>
  }

  if (status === 'read') {
    return <Badge variant="secondary">Read</Badge>
  }

  return <Badge variant="outline">Closed</Badge>
}

export default InquiryStatusBadge
