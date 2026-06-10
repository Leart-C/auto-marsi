import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { AdminListing } from '../types'
import ListingActionsMenu from './ListingActionsMenu'
import ListingStatusBadge from './ListingStatusBadge'

type ListingsTableProps = {
  listings: AdminListing[]
}

function formatPrice(listing: AdminListing): string {
  const numericPrice = Number(listing.price)

  if (Number.isNaN(numericPrice)) {
    return `${listing.price} ${listing.currency}`
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: listing.currency,
    maximumFractionDigits: 0,
  }).format(numericPrice)
}

function formatKilometers(kilometers: number | null): string {
  if (kilometers === null) {
    return '-'
  }

  return `${new Intl.NumberFormat('en-US').format(kilometers)} km`
}

function ListingsTable({ listings }: ListingsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Listing</TableHead>
          <TableHead>Vehicle</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Kilometers</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-12 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {listings.map((listing) => (
          <TableRow key={listing.id}>
            <TableCell>
              <div className="grid gap-1">
                <span className="font-medium">{listing.title}</span>
                <span className="text-xs text-muted-foreground">
                  {listing.location ?? 'No location'}
                </span>
              </div>
            </TableCell>

            <TableCell>
              <div className="grid gap-1">
                <span>{listing.make?.name ?? '-'}</span>
                <span className="text-xs text-muted-foreground">
                  {listing.car_model?.name ?? '-'}
                </span>
              </div>
            </TableCell>

            <TableCell>{listing.year}</TableCell>
            <TableCell>{formatPrice(listing)}</TableCell>
            <TableCell>{formatKilometers(listing.kilometers)}</TableCell>

            <TableCell>
              <ListingStatusBadge status={listing.status} />
            </TableCell>

            <TableCell className="text-right">
              <ListingActionsMenu listing={listing} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ListingsTable
