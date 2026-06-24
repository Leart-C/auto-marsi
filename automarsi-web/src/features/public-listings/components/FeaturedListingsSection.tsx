import { ArrowRight, RefreshCcw } from 'lucide-react'
import SectionHeader from '@/components/public/SectionHeader'
import { Button } from '@/components/ui/button'
import { useFeaturedPublicListings } from '../hooks/useFeaturedPublicListings'
import PublicListingGrid from './PublicListingGrid'

type FeaturedListingsSectionProps = {
  onNavigate: (path: string) => void
}

function FeaturedListingsSection({ onNavigate }: FeaturedListingsSectionProps) {
  const { listings, listingsQuery, errorMessage } = useFeaturedPublicListings()

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <SectionHeader
          eyebrow="Inventory"
          title="Recently added vehicles."
          description="Explore real active listings published from the AutoMarsi admin dashboard."
        />

        <Button
          type="button"
          variant="outline"
          onClick={() => onNavigate('/inventory')}
        >
          View all inventory
          <ArrowRight className="size-4" />
        </Button>
      </div>

      {listingsQuery.isLoading ? (
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          Loading selected vehicles...
        </div>
      ) : null}

      {errorMessage ? (
        <div className="grid gap-3 rounded-lg border bg-card p-6">
          <div className="grid gap-1">
            <p className="font-medium">Could not load vehicles.</p>
            <p className="text-sm text-muted-foreground">{errorMessage}</p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-fit"
            onClick={() => listingsQuery.refetch()}
          >
            <RefreshCcw className="size-4" />
            Try again
          </Button>
        </div>
      ) : null}

      {!listingsQuery.isLoading && !errorMessage && listings.length === 0 ? (
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          New vehicles will appear here soon.
        </div>
      ) : null}

      {!listingsQuery.isLoading && !errorMessage && listings.length > 0 ? (
        <PublicListingGrid listings={listings} onNavigate={onNavigate} />
      ) : null}
    </section>
  )
}

export default FeaturedListingsSection
