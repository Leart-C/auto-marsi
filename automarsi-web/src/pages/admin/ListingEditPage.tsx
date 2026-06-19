import { ArrowLeft, Images } from 'lucide-react'
import EmptyState from '@/components/admin/EmptyState'
import LoadingState from '@/components/admin/LoadingState'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import ListingEditPanel from '@/features/admin-listings/components/ListingEditPanel'
import { useAdminListing } from '@/features/admin-listings/hooks/useAdminListing'

type ListingEditPageProps = {
  listingId: string
  onNavigate: (path: string) => void
}

function ListingEditPage({
  listingId,
  onNavigate,
}: ListingEditPageProps) {
  const { listing, listingQuery, errorMessage } =
    useAdminListing({ listingId })

  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Inventory"
        title={listing ? `Edit ${listing.title}` : `Edit listing #${listingId}`}
        description="Update vehicle details, pricing, publication status, and features."
        action={
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onNavigate(`/admin/listings/${listingId}`)
              }
            >
              <ArrowLeft />
              Back to listing
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                onNavigate(`/admin/listings/${listingId}/images`)
              }
            >
              <Images />
              Manage images
            </Button>
          </div>
        }
      />

      {listingQuery.isLoading ? (
        <LoadingState label="Loading listing" />
      ) : null}

      {!listingQuery.isLoading && errorMessage ? (
        <EmptyState
          title="Could not load listing"
          description={errorMessage}
        />
      ) : null}

      {!listingQuery.isLoading && !errorMessage && listing ? (
        <ListingEditPanel
          key={listing.id}
          listing={listing}
          onCancel={() =>
            onNavigate(`/admin/listings/${listingId}`)
          }
          onUpdated={() =>
            onNavigate(`/admin/listings/${listingId}`)
          }
        />
      ) : null}
    </section>
  )
}

export default ListingEditPage