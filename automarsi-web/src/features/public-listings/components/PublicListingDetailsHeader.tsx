import type { PublicListing } from '../types'

type PublicListingDetailsHeaderProps = {
  listing: PublicListing
}

function PublicListingDetailsHeader({
  listing,
}: PublicListingDetailsHeaderProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        {listing.title}
      </h1>

      <p className="mt-2 text-muted-foreground">
        {listing.make?.name ?? '-'} {listing.car_model?.name ?? ''}
      </p>

      {listing.description ? (
        <p className="mt-5 leading-7 text-muted-foreground">
          {listing.description}
        </p>
      ) : null}
    </div>
  )
}

export default PublicListingDetailsHeader