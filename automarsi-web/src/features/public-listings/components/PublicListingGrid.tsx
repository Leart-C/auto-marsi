import type { PublicListing } from '../types'
import PublicListingCard from './PublicListingCard'

type PublicListingGridProps = {
  listings: PublicListing[]
  onNavigate: (path: string) => void
}

function PublicListingGrid({ listings, onNavigate }: PublicListingGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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