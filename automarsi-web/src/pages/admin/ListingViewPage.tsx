import { ArrowLeft, Images, Pencil } from 'lucide-react'
import EmptyState from '@/components/admin/EmptyState'
import LoadingState from '@/components/admin/LoadingState'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import ListingDetails from '@/features/admin-listings/components/ListingDetails'
import { useAdminListing } from '@/features/admin-listings/hooks/useAdminListing'

type ListingViewPageProps = {
  listingId: string
  onNavigate: (path: string) => void
}

function ListingViewPage({ listingId, onNavigate }: ListingViewPageProps) {
  const { listing, listingQuery, errorMessage } = useAdminListing({ listingId })

  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Inventory"
        title={listing?.title ?? `Listing #${listingId}`}
        description="Review listing details before editing or managing images."
        action={
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onNavigate('/admin/listings')}
            >
              <ArrowLeft />
              Back to listings
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onNavigate(`/admin/listings/${listingId}/images`)}
            >
              <Images />
              Images
            </Button>
            <Button
              type="button"
              onClick={() => onNavigate(`/admin/listings/${listingId}/edit`)}
            >
              <Pencil />
              Edit
            </Button>
          </div>
        }
      />

      {listingQuery.isLoading ? (
        <LoadingState label="Loading listing details" />
      ) : null}

      {!listingQuery.isLoading && errorMessage ? (
        <EmptyState
          title="Could not load listing"
          description={errorMessage}
        />
      ) : null}

      {!listingQuery.isLoading && !errorMessage && listing ? (
        <ListingDetails listing={listing} />
      ) : null}
    </section>
  )
}

export default ListingViewPage
