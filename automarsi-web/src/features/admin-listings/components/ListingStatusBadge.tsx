import { Badge } from '@/components/ui/badge'

type ListingStatusBadgeProps = {
  status: string
}

function getStatusVariant(status: string): 'default' | 'secondary' | 'outline' | 'destructive' {
  if (status === 'active') {
    return 'default'
  }

  if (status === 'sold') {
    return 'secondary'
  }

  if (status === 'draft') {
    return 'outline'
  }

  if (status === 'archived') {
    return 'destructive'
  }

  return 'outline'
}

function formatStatus(status: string): string {
  return status
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function ListingStatusBadge({ status }: ListingStatusBadgeProps) {
  return (
    <Badge variant={getStatusVariant(status)}>
      {formatStatus(status)}
    </Badge>
  )
}

export default ListingStatusBadge
