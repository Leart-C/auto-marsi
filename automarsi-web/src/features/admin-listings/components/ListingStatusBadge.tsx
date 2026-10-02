import AdminStatusPill from '@/shared/components/admin/AdminStatusPill'

type ListingStatusBadgeProps = {
  status: string
}

function ListingStatusBadge({ status }: ListingStatusBadgeProps) {
  return <AdminStatusPill status={status} />
}

export default ListingStatusBadge
