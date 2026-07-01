import { BadgeCheck, Car, Clock3 } from 'lucide-react'
import SectionHeader from '@/components/public/SectionHeader'
import { Badge } from '@/components/ui/badge'
import type { PublicListing } from '../types'
import { useRecentlySoldListings } from '../hooks/useRecentlySoldListings'

type RecentlySoldSectionProps = {
  onNavigate: (path: string) => void
}

function formatSoldDate(soldAt: string | null) {
  if (!soldAt) {
    return 'Recently sold'
  }

  return new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(soldAt))
}

function SoldListingCard({ listing }: { listing: PublicListing }) {
  return (
    <article className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-xs">
      <div className="relative aspect-[4/3] bg-muted">
        {listing.primary_image?.image_url ? (
          <img
            src={listing.primary_image.image_url}
            alt={listing.primary_image.alt_text ?? listing.title}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        ) : (
          <div className="grid size-full place-items-center bg-slate-100 text-muted-foreground">
            <div className="grid justify-items-center gap-2">
              <div className="grid size-10 place-items-center rounded-full bg-white shadow-xs">
                <Car className="size-5" />
              </div>
              <span className="text-sm">Photos coming soon</span>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-slate-950/10" />

        <Badge className="absolute left-3 top-3 bg-slate-950 text-white hover:bg-slate-950">
          Sold
        </Badge>
      </div>

      <div className="grid gap-3 p-4">
        <div className="grid gap-1">
          <h3 className="font-semibold leading-tight">{listing.title}</h3>
          <p className="text-sm text-muted-foreground">
            {listing.make?.name ?? '-'} {listing.car_model?.name ?? ''} ·{' '}
            {listing.year}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock3 className="size-3.5" />
          <span>{formatSoldDate(listing.sold_at)}</span>
        </div>
      </div>
    </article>
  )
}

function RecentlySoldSection({ onNavigate }: RecentlySoldSectionProps) {
  const { listings, recentlySoldQuery, errorMessage } =
    useRecentlySoldListings(6)

  if (
    !recentlySoldQuery.isLoading &&
    !errorMessage &&
    listings.length === 0
  ) {
    return null
  }

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <SectionHeader
          eyebrow="Recently sold"
          title="Vehicles customers already chose."
          description="Sold vehicles stay separate from available inventory, while showing the showroom history customers can trust."
        />

        <button
          type="button"
          onClick={() => onNavigate('/contact')}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium transition hover:bg-muted"
        >
          <BadgeCheck className="size-4" />
          Ask for similar vehicles
        </button>
      </div>

      {recentlySoldQuery.isLoading ? (
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          Loading recently sold vehicles...
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          Recently sold vehicles could not be loaded right now.
        </div>
      ) : null}

      {!recentlySoldQuery.isLoading && !errorMessage && listings.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {listings.map((listing) => (
            <SoldListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default RecentlySoldSection
