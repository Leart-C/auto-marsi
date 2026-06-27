import { useState } from 'react'
import SectionHeader from '@/components/public/SectionHeader'
import { Button } from '@/components/ui/button'
import PublicListingFilters from '@/features/public-listings/components/PublicListingFilters'
import PublicListingGrid from '@/features/public-listings/components/PublicListingGrid'
import PublicListingPagination from '@/features/public-listings/components/PublicListingPagination'
import { usePublicListings } from '@/features/public-listings/hooks/usePublicListings'
import type { PublicListingFilters as PublicListingFiltersType } from '@/features/public-listings/types'

type InventoryPageProps = {
  onNavigate: (path: string) => void
}

const initialFilters: PublicListingFiltersType = {
  page: 1,
  make_id: '',
  car_model_id: '',
  search: '',
  year: '',
  min_price: '',
  max_price: '',
  fuel_type: '',
  transmission: '',
  body_type: '',
}

function InventoryPage({ onNavigate }: InventoryPageProps) {
  const [filters, setFilters] =
    useState<PublicListingFiltersType>(initialFilters)

  const { listings, meta, listingsQuery, errorMessage } = usePublicListings({
    filters,
  })

  const vehiclesFoundLabel = meta
    ? `${meta.total} ${meta.total === 1 ? 'vehicle' : 'vehicles'} found`
    : 'Loading vehicles'

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 border-b pb-6 md:flex-row md:items-end">
        <SectionHeader
          eyebrow="Inventory"
          title="Find the right vehicle."
          description="Use filters to browse active vehicles published by the AutoMarsi team."
        />

        <div className="rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground shadow-xs">
          {vehiclesFoundLabel}
        </div>
      </div>

      <div className="grid min-w-0 gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <PublicListingFilters
          filters={filters}
          onFiltersChange={setFilters}
        />

        <div className="grid min-w-0 gap-5">
          {listingsQuery.isLoading ? (
            <div className="rounded-xl border bg-card p-8 text-sm text-muted-foreground">
              Loading available vehicles...
            </div>
          ) : null}

          {errorMessage ? (
            <div className="grid gap-3 rounded-xl border bg-card p-8">
              <div className="grid gap-1">
                <p className="font-medium">Could not load inventory.</p>
                <p className="text-sm text-muted-foreground">{errorMessage}</p>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-fit"
                onClick={() => listingsQuery.refetch()}
              >
                Try again
              </Button>
            </div>
          ) : null}

          {!listingsQuery.isLoading && !errorMessage && listings.length === 0 ? (
            <div className="rounded-xl border bg-card p-8">
              <p className="font-medium">No vehicles found.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try changing the make, model, price, or keyword filters.
              </p>
            </div>
          ) : null}

          {!listingsQuery.isLoading && !errorMessage && listings.length > 0 ? (
            <>
              <PublicListingGrid
                listings={listings}
                onNavigate={onNavigate}
              />

              {meta ? (
                <PublicListingPagination
                  meta={meta}
                  onPageChange={(page) =>
                    setFilters((currentFilters) => ({
                      ...currentFilters,
                      page,
                    }))
                  }
                />
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default InventoryPage
