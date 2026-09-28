import { ArrowUpRight, Car, Fuel, Gauge, Settings2 } from 'lucide-react'
import { useI18n } from '@/i18n/useI18n'
import type { PublicListing } from '../types'

type PublicListingCardProps = {
  listing: PublicListing
  onNavigate: (path: string) => void
}
function PublicListingCard({ listing, onNavigate }: PublicListingCardProps) {
  const { messages } = useI18n()
  const label = (value: string) =>
    messages.inventory.values[
      value.toLowerCase() as keyof typeof messages.inventory.values
    ] ?? value
  const price = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: listing.currency,
    maximumFractionDigits: 0,
  }).format(Number(listing.price))
  return (
    <article className="vehicle-card group">
      <a
        href={`/inventory/${listing.id}`}
        onClick={(event) => {
          if (
            event.button === 0 &&
            !event.metaKey &&
            !event.ctrlKey &&
            !event.shiftKey &&
            !event.altKey
          ) {
            event.preventDefault()
            onNavigate(`/inventory/${listing.id}`)
          }
        }}
        className="block"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {listing.primary_image?.image_url ? (
            <img
              src={listing.primary_image.image_url}
              alt={listing.primary_image.alt_text ?? listing.title}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="grid size-full place-content-center gap-2 text-center text-muted-foreground">
              <Car className="mx-auto size-10" />
              <span className="text-xs">
                {messages.common.photosComingSoon}
              </span>
            </div>
          )}
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-[10px] font-semibold tracking-wider text-white backdrop-blur-md">
            {listing.year}
          </span>
          <span className="absolute bottom-4 right-4 grid size-9 place-items-center rounded-full bg-white text-black transition group-hover:bg-primary">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
        <div className="p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {listing.make?.name ?? 'AutoMarsi'}
            {listing.body_type ? ` / ${label(listing.body_type)}` : ''}
          </p>
          <h3 className="mt-2 text-xl font-medium leading-snug tracking-tight">
            {listing.title}
          </h3>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Gauge className="size-3.5" />
              {listing.kilometers === null
                ? messages.common.mileageUnavailable
                : `${new Intl.NumberFormat('de-DE').format(listing.kilometers)} km`}
            </span>
            <span className="flex items-center gap-1.5">
              <Fuel className="size-3.5" />
              {label(listing.fuel_type)}
            </span>
            <span className="flex items-center gap-1.5">
              <Settings2 className="size-3.5" />
              {label(listing.transmission)}
            </span>
          </div>
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
            <p className="text-xl font-semibold tracking-tight text-primary">
              {price}
            </p>
            <span className="text-xs text-muted-foreground group-hover:text-foreground">
              {messages.inventory.card.viewDetails}
            </span>
          </div>
        </div>
      </a>
    </article>
  )
}
export default PublicListingCard
