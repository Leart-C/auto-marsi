import { useState } from 'react'
import PublicSection from '@/components/public/PublicSection'
import PublicSectionHeader from '@/components/public/PublicSectionHeader'
import { Button } from '@/components/ui/button'
import PublicListingFilters from '@/features/public-listings/components/PublicListingFilters'
import PublicListingGrid from '@/features/public-listings/components/PublicListingGrid'
import PublicListingPagination from '@/features/public-listings/components/PublicListingPagination'
import { usePublicListings } from '@/features/public-listings/hooks/usePublicListings'
import type { PublicListingFilters as PublicListingFiltersType } from '@/features/public-listings/types'
import { useI18n } from '@/i18n/useI18n'

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

function formatCount(value: number) {
  return String(Math.trunc(Number(String(value).replace(',', '.'))))
}

function InventoryPage({ onNavigate }: InventoryPageProps) {
  const { messages } = useI18n()
  const [filters, setFilters] =
    useState<PublicListingFiltersType>(initialFilters)

  const { listings, meta, listingsQuery, errorMessage } = usePublicListings({
    filters,
  })

  const vehiclesFoundLabel = meta
    ? `${formatCount(listings.length)}/${formatCount(meta.total)}`
    : messages.inventory.loadingVehicles

  return (
    <PublicSection>
      <div className="grid gap-7">
      <div className="flex flex-col justify-between gap-4 border-b pb-6 md:flex-row md:items-end">
        <PublicSectionHeader
          eyebrow={messages.inventory.eyebrow}
          title={messages.inventory.title}
          description={messages.inventory.description}
        />

        <div className="w-fit rounded-full border bg-white/80 px-4 py-2 text-sm font-semibold text-muted-foreground shadow-xs">
          {vehiclesFoundLabel}
        </div>
      </div>

      <div className="grid min-w-0 gap-7 lg:grid-cols-[300px_minmax(0,1fr)]">
        <PublicListingFilters
          filters={filters}
          onFiltersChange={setFilters}
        />

        <div className="grid min-w-0 gap-5">
          {listingsQuery.isLoading ? (
            <div className="rounded-xl border bg-card p-8 text-sm text-muted-foreground">
              {messages.inventory.loadingAvailable}
            </div>
          ) : null}

          {errorMessage ? (
            <div className="grid gap-3 rounded-xl border bg-card p-8">
              <div className="grid gap-1">
                <p className="font-medium">{messages.inventory.couldNotLoad}</p>
                <p className="text-sm text-muted-foreground">{errorMessage}</p>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-fit"
                onClick={() => listingsQuery.refetch()}
              >
                {messages.common.tryAgain}
              </Button>
            </div>
          ) : null}

          {!listingsQuery.isLoading && !errorMessage && listings.length === 0 ? (
            <div className="rounded-xl border bg-card p-8">
              <p className="font-medium">{messages.inventory.noVehicles}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {messages.inventory.noVehiclesDescription}
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
      </div>
    </PublicSection>
  )
}

export default InventoryPage
