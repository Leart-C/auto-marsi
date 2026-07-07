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
    <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] text-card-foreground shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="relative aspect-[4/3] bg-white/[0.04]">
        {listing.primary_image?.image_url ? (
          <img
            src={listing.primary_image.image_url}
            alt={listing.primary_image.alt_text ?? listing.title}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        ) : (
          <div className="grid size-full place-items-center bg-white/[0.04] text-muted-foreground">
            <div className="grid justify-items-center gap-2">
              <div className="grid size-10 place-items-center rounded-full bg-white/10 shadow-xs">
                <Car className="size-5" />
              </div>
              <span className="text-sm">
                {messages.common.photosComingSoon}
              </span>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

        <Badge className="absolute left-4 top-4 rounded-full border border-primary/35 bg-primary/15 text-primary shadow-sm hover:bg-primary/15">
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
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-medium transition hover:bg-white/[0.08]"
        >
          <BadgeCheck className="size-4" />
          {messages.inventory.recentlySold.askSimilar}
        </button>
      </div>

      {recentlySoldQuery.isLoading ? (
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6 text-sm text-muted-foreground">
          {messages.inventory.recentlySold.loading}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6 text-sm text-muted-foreground">
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
