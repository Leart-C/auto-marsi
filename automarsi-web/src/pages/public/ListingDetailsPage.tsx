import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PublicListingContactReassurance from '@/features/public-listings/components/PublicListingContactReassurance'
import PublicListingDetailsHeader from '@/features/public-listings/components/PublicListingDetailsHeader'
import PublicListingFeatures from '@/features/public-listings/components/PublicListingFeatures'
import PublicListingGallery from '@/features/public-listings/components/PublicListingGallery'
import PublicListingSpecs from '@/features/public-listings/components/PublicListingSpecs'
import PublicListingInquiryForm from '@/features/public-listings/components/PublicListingInquiryForm'
import { usePublicListing } from '@/features/public-listings/hooks/usePublicListing'

type ListingDetailsPageProps = {
  listingId: number
  onNavigate: (path: string) => void
}

function ListingDetailsPage({
  listingId,
  onNavigate,
}: ListingDetailsPageProps) {
  const { listing, listingQuery, errorMessage } = usePublicListing({
    listingId,
  })

  if (listingQuery.isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-lg border bg-card p-8 text-sm text-muted-foreground">
          Loading vehicle details...
        </div>
      </section>
    )
  }

  if (errorMessage) {
    return (
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 lg:px-8">
        <Button
          type="button"
          variant="ghost"
          className="w-fit"
          onClick={() => onNavigate('/inventory')}
        >
          <ArrowLeft />
          Back to inventory
        </Button>

        <div className="grid gap-3 rounded-lg border bg-card p-8">
          <p className="font-medium">Could not load this vehicle.</p>
          <p className="text-sm text-muted-foreground">{errorMessage}</p>
          <Button
            type="button"
            variant="outline"
            className="w-fit"
            onClick={() => listingQuery.refetch()}
          >
            Try again
          </Button>
        </div>
      </section>
    )
  }

  if (!listing) {
    return (
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 lg:px-8">
        <Button
          type="button"
          variant="ghost"
          className="w-fit"
          onClick={() => onNavigate('/inventory')}
        >
          <ArrowLeft />
          Back to inventory
        </Button>

        <div className="rounded-lg border bg-card p-8 text-sm text-muted-foreground">
          Vehicle not found.
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <Button
        type="button"
        variant="ghost"
        className="w-fit"
        onClick={() => onNavigate('/inventory')}
      >
        <ArrowLeft />
        Back to inventory
      </Button>

      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid min-w-0 gap-5">
          <PublicListingGallery listing={listing} />
          <PublicListingDetailsHeader listing={listing} />
          <PublicListingFeatures features={listing.features} />
        </div>

        <aside className="grid h-fit gap-5">
          <PublicListingSpecs listing={listing} />
          <PublicListingInquiryForm listingId={listing.id} />
          <PublicListingContactReassurance />
        </aside>
      </div>
    </section>
  )
}

export default ListingDetailsPage
