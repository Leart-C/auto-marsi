import type { PublicListing } from '@/features/public-listings/types'
import PublicListingCard from '@/features/public-listings/components/PublicListingCard'

type PublicListingGridProps = {
  listings: PublicListing[]
  onNavigate: (path: string) => void
}

function PublicListingGrid({ listings, onNavigate }: PublicListingGridProps) {
  return (
    <div className="grid auto-rows-max items-start gap-5 sm:grid-cols-2">
      {listings.map((listing) => (
        <PublicListingCard
          key={listing.id}
          listing={listing}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  )
}

export default PublicListingGrid
