import {
  CalendarDays,
  CarFront,
  Fuel,
  Gauge,
  Palette,
  Settings2,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { AdminListing } from '../../types'
import { formatKilometers, formatValue } from './listingDetailsFormatters'

type ListingSpecsGridProps = {
  listing: AdminListing
}

type SpecItemProps = {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}

function SpecItem({ label, value, icon: Icon }: SpecItemProps) {
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

function ListingSpecsGrid({ listing }: ListingSpecsGridProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-base">Vehicle specifications</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <SpecItem
          label="Kilometers"
          value={formatKilometers(listing.kilometers)}
          icon={Gauge}
        />
        <SpecItem
          label="Fuel"
          value={formatValue(listing.fuel_type)}
          icon={Fuel}
        />
        <SpecItem
          label="Transmission"
          value={formatValue(listing.transmission)}
          icon={Settings2}
        />
        <SpecItem
          label="Body type"
          value={formatValue(listing.body_type)}
          icon={CarFront}
        />
        <SpecItem
          label="Color"
          value={formatValue(listing.color)}
          icon={Palette}
        />
        <SpecItem
          label="Condition"
          value={formatValue(listing.condition)}
          icon={CarFront}
        />
        <SpecItem
          label="Engine"
          value={listing.engine_size ? `${listing.engine_size} L` : 'Not set'}
          icon={Settings2}
        />
        <SpecItem
          label="Horsepower"
          value={
            listing.horsepower === null
              ? 'Not set'
              : `${listing.horsepower} hp`
          }
          icon={Gauge}
        />
        <SpecItem
          label="VIN"
          value={formatValue(listing.vin)}
          icon={Settings2}
        />
        <SpecItem
          label="Registration"
          value={formatValue(listing.registration_until)}
          icon={CalendarDays}
        />
      </CardContent>
    </Card>
  )
}

export default ListingSpecsGrid
