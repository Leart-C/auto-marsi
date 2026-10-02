import { formatVehiclePrice } from '@/shared/lib/formatters'
import { BadgeCheck } from 'lucide-react'
import { useI18n } from '@/i18n/useI18n'
import type { PublicListing } from '@/features/public-listings/types'

type PublicListingDetailsHeaderProps = {
  listing: PublicListing
}

function PublicListingDetailsHeader({
  listing,
}: PublicListingDetailsHeaderProps) {
  const { messages } = useI18n()

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          {listing.make?.name ?? '-'} {listing.car_model?.name ?? ''}
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
          <BadgeCheck className="size-3" />
          {messages.listingDetails.activeListing}
        </span>
      </div>
      <h1 className="mt-3 max-w-3xl text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
        {listing.title}
      </h1>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-primary lg:hidden">
        {formatVehiclePrice(listing.price, listing.currency)}
      </p>
      <details className="mt-5 border-t border-white/10 pt-3">
        <summary className="min-h-11 cursor-pointer content-center text-sm font-medium">
          {messages.listingDetails.aboutVehicle}
        </summary>
        <p className="mt-2 max-w-3xl whitespace-pre-line text-sm leading-7 text-muted-foreground">
          {listing.description || messages.listingDetails.fallbackDescription}
        </p>
      </details>
    </section>
  )
}

export default PublicListingDetailsHeader
