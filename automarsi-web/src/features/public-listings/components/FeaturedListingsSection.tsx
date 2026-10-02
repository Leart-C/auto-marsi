import { routes } from '@/shared/config/routes'
import { ArrowRight, RefreshCcw } from 'lucide-react'
import PublicSection from '@/shared/components/public/PublicSection'
import PublicSectionHeader from '@/shared/components/public/PublicSectionHeader'
import { Button } from '@/shared/ui/button'
import { useI18n } from '@/i18n/useI18n'
import { useFeaturedPublicListings } from '@/features/public-listings/hooks/useFeaturedPublicListings'
import PublicListingGrid from '@/features/public-listings/components/PublicListingGrid'

type FeaturedListingsSectionProps = {
  onNavigate: (path: string) => void
}

function FeaturedListingsSection({ onNavigate }: FeaturedListingsSectionProps) {
  const { messages } = useI18n()
  const { listings, listingsQuery, errorMessage } = useFeaturedPublicListings()
  const categories = [
    { label: messages.inventory.filters.all, value: '' },
    { label: messages.inventory.values.sedan, value: 'sedan' },
    { label: messages.inventory.values.suv, value: 'suv' },
    { label: messages.inventory.values.hatchback, value: 'hatchback' },
    { label: messages.inventory.values.coupe, value: 'coupe' },
  ]

  return (
    <PublicSection>
      <div className="grid min-w-0 grid-cols-1 gap-7">
        <div className="flex min-w-0 flex-col justify-between gap-5 md:flex-row md:items-end">
          <PublicSectionHeader
            eyebrow={messages.inventory.featured.eyebrow}
            title={messages.inventory.featured.title}
            description={messages.inventory.featured.description}
          />

          <div className="showroom-categories flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:justify-end">
            {categories.map((category, index) => (
              <button
                key={category.value}
                type="button"
                onClick={() =>
                  onNavigate(
                    routes.inventorySearch({ body_type: category.value }),
                  )
                }
                className={
                  index === 0
                    ? 'min-h-11 shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground'
                    : 'min-h-11 shrink-0 rounded-full bg-white/7 px-4 py-2 text-xs font-bold text-muted-foreground transition hover:bg-white/12 hover:text-foreground'
                }
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {listingsQuery.isLoading ? (
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6 text-sm text-muted-foreground">
            {messages.inventory.featured.loading}
          </div>
        ) : null}

        {errorMessage ? (
          <div className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6">
            <div className="grid gap-1">
              <p className="font-medium">
                {messages.inventory.featured.couldNotLoad}
              </p>
              <p className="text-sm text-muted-foreground">{errorMessage}</p>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-fit"
              onClick={() => listingsQuery.refetch()}
            >
              <RefreshCcw className="size-4" />
              {messages.common.tryAgain}
            </Button>
          </div>
        ) : null}

        {!listingsQuery.isLoading && !errorMessage && listings.length === 0 ? (
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6 text-sm text-muted-foreground">
            {messages.inventory.featured.empty}
          </div>
        ) : null}

        {!listingsQuery.isLoading && !errorMessage && listings.length > 0 ? (
          <>
            <PublicListingGrid listings={listings} onNavigate={onNavigate} />
            <Button
              type="button"
              variant="outline"
              className="mx-auto mt-1 h-10 rounded-md border-white/12 bg-white/[0.03] px-4 hover:bg-white/8"
              onClick={() => onNavigate(routes.inventory)}
            >
              {messages.inventory.featured.viewAll}
              <ArrowRight className="size-4" />
            </Button>
          </>
        ) : null}
      </div>
    </PublicSection>
  )
}

export default FeaturedListingsSection
