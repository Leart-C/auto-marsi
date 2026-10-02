import AdminStatusPill from '@/shared/components/admin/AdminStatusPill'
import type { InquiryStatus } from '@/features/admin-inquiries/types'

type InquiryStatusBadgeProps = {
  status: InquiryStatus
}

function InquiryStatusBadge({ status }: InquiryStatusBadgeProps) {
  return <AdminStatusPill status={status} />
}

export default InquiryStatusBadge
