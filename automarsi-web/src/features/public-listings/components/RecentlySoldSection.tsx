import { BadgeCheck, Car, Clock3 } from 'lucide-react'
import PublicSection from '@/components/public/PublicSection'
import PublicSectionHeader from '@/components/public/PublicSectionHeader'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n/useI18n'
import type { PublicListing } from '../types'
import { useRecentlySoldListings } from '../hooks/useRecentlySoldListings'

type RecentlySoldSectionProps = {
  onNavigate: (path: string) => void
}

function formatSoldDate(
  soldAt: string | null,
  locale: string,
  fallback: string
) {
  if (!soldAt) {
    return fallback
  }

  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(soldAt))
}

function SoldListingCard({ listing }: { listing: PublicListing }) {
  const { language, messages } = useI18n()
  const locale = language === 'sq' ? 'sq-AL' : 'en-GB'

  return (
    <article className="overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-[0_18px_45px_rgba(31,25,76,0.06)]">
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
              <span className="text-sm">
                {messages.common.photosComingSoon}
              </span>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-slate-950/10" />

        <Badge className="absolute left-4 top-4 rounded-full bg-white text-foreground shadow-sm hover:bg-white">
          {messages.inventory.recentlySold.soldBadge}
        </Badge>
      </div>

      <div className="grid gap-3 p-5">
        <div className="grid gap-1">
          <h3 className="text-xl font-black leading-tight tracking-[-0.035em]">
            {listing.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {listing.make?.name ?? '-'} {listing.car_model?.name ?? ''} ·{' '}
            {listing.year}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock3 className="size-3.5" />
          <span>
            {formatSoldDate(
              listing.sold_at,
              locale,
              messages.inventory.recentlySold.recentlySoldFallback
            )}
          </span>
        </div>
      </div>
    </article>
  )
}

function RecentlySoldSection({ onNavigate }: RecentlySoldSectionProps) {
  const { messages } = useI18n()
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
    <PublicSection>
      <div className="grid gap-7">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <PublicSectionHeader
          eyebrow={messages.inventory.recentlySold.eyebrow}
          title={messages.inventory.recentlySold.title}
          description={messages.inventory.recentlySold.description}
        />

        <button
          type="button"
          onClick={() => onNavigate('/contact')}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium transition hover:bg-muted"
        >
          <BadgeCheck className="size-4" />
          {messages.inventory.recentlySold.askSimilar}
        </button>
      </div>

      {recentlySoldQuery.isLoading ? (
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          {messages.inventory.recentlySold.loading}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          {messages.inventory.recentlySold.couldNotLoad}
        </div>
      ) : null}

      {!recentlySoldQuery.isLoading && !errorMessage && listings.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {listings.map((listing) => (
            <SoldListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : null}
      </div>
    </PublicSection>
  )
}

export default RecentlySoldSection
