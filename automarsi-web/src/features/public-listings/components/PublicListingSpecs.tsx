import { Gauge, MapPin } from 'lucide-react'
import type { PublicListing } from '../types'

type PublicListingSpecsProps = {
  listing: PublicListing
}

function formatPrice(price: string, currency: string): string {
  const amount = Number(price)

  if (Number.isNaN(amount)) {
    return `${price} ${currency}`
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatKilometers(kilometers: number | null): string {
  if (kilometers === null) {
    return 'Mileage unavailable'
  }

  return `${new Intl.NumberFormat('en-US').format(kilometers)} km`
}

function PublicListingSpecs({ listing }: PublicListingSpecsProps) {
  return (
    <aside className="h-fit rounded-lg border bg-card p-6">
      <p className="text-xs font-semibold uppercase text-muted-foreground">
        Vehicle price
      </p>
      <p className="mt-1 text-3xl font-semibold text-red-600">
        {formatPrice(listing.price, listing.currency)}
      </p>

      <div className="mt-5 grid gap-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Gauge className="size-4" />
          {formatKilometers(listing.kilometers)}
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="size-4" />
          {listing.location ?? 'Location unavailable'}
        </div>
      </div>

      <dl className="mt-6 grid gap-3 text-sm">
        <SpecItem label="Year" value={listing.year} />
        <SpecItem label="Fuel" value={listing.fuel_type} capitalize />
        <SpecItem label="Transmission" value={listing.transmission} capitalize />
        <SpecItem label="Body" value={listing.body_type ?? '-'} capitalize />
        <SpecItem label="Color" value={listing.color ?? '-'} />
        <SpecItem label="Condition" value={listing.condition} capitalize />
        <SpecItem label="Engine" value={listing.engine_size ?? '-'} />
        <SpecItem
          label="Power"
          value={listing.horsepower ? `${listing.horsepower} hp` : '-'}
        />
      </dl>

      <p className="mt-5 rounded-md bg-muted px-3 py-2 text-xs leading-5 text-muted-foreground">
        Availability and final details are confirmed by AutoMarsi.
      </p>
    </aside>
  )
}

type SpecItemProps = {
  label: string
  value: string | number
  capitalize?: boolean
}

function SpecItem({ label, value, capitalize = false }: SpecItemProps) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={capitalize ? 'font-medium capitalize' : 'font-medium'}>
        {value}
      </dd>
    </div>
  )
}

export default PublicListingSpecs
