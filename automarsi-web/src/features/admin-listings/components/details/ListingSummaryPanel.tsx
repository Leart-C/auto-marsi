import { CalendarDays, CarFront, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { AdminListing } from '../../types'
import ListingStatusBadge from '../ListingStatusBadge'
import { formatPrice, formatValue } from './listingDetailsFormatters'
import { getListingVisibilityDetails } from './listingVisibility'

type ListingSummaryPanelProps = {
  listing: AdminListing
}

type SummaryItemProps = {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}

function SummaryItem({ label, value, icon: Icon }: SummaryItemProps) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-md border bg-muted/40 text-muted-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}

function ListingSummaryPanel({ listing }: ListingSummaryPanelProps) {
  const visibility = getListingVisibilityDetails(listing.status)
  const VisibilityIcon = visibility.icon

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <ListingStatusBadge status={listing.status} />
            {listing.is_featured ? (
              <Badge variant="secondary">Featured</Badge>
            ) : null}
          </div>

          <span className="text-xs text-muted-foreground">#{listing.id}</span>
        </div>

        <CardTitle className="mt-2 text-xl">{listing.title}</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-5">
        <div>
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="text-2xl font-semibold">
            {formatPrice(listing.price, listing.currency)}
          </p>
        </div>

        <div className="flex gap-3 rounded-lg border bg-muted/25 p-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-background text-muted-foreground">
            <VisibilityIcon className="size-4" />
          </span>

          <div>
            <p className="text-sm font-medium">{visibility.label}</p>
            <p className="mt-0.5 text-sm leading-5 text-muted-foreground">
              {visibility.description}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SummaryItem
            label="Make"
            value={listing.make?.name ?? 'Not set'}
            icon={CarFront}
          />
          <SummaryItem
            label="Model"
            value={listing.car_model?.name ?? 'Not set'}
            icon={CarFront}
          />
          <SummaryItem
            label="Year"
            value={String(listing.year)}
            icon={CalendarDays}
          />
          <SummaryItem
            label="Location"
            value={formatValue(listing.location)}
            icon={MapPin}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default ListingSummaryPanel
