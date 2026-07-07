import { ArrowRight, RefreshCcw } from 'lucide-react'
import PublicSection from '@/components/public/PublicSection'
import PublicSectionHeader from '@/components/public/PublicSectionHeader'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/useI18n'
import { useFeaturedPublicListings } from '../hooks/useFeaturedPublicListings'
import PublicListingGrid from './PublicListingGrid'

type FeaturedListingsSectionProps = {
  onNavigate: (path: string) => void
}

function FeaturedListingsSection({ onNavigate }: FeaturedListingsSectionProps) {
  const { messages } = useI18n()
  const { listings, listingsQuery, errorMessage } = useFeaturedPublicListings()

  return (
    <PublicSection bleed>
      <div className="grid gap-7">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <PublicSectionHeader
          eyebrow={messages.inventory.featured.eyebrow}
          title={messages.inventory.featured.title}
          description={messages.inventory.featured.description}
        />

        <Button
          type="button"
          variant="outline"
          onClick={() => onNavigate('/inventory')}
        >
          {messages.inventory.featured.viewAll}
          <ArrowRight className="size-4" />
        </Button>
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
        <PublicListingGrid listings={listings} onNavigate={onNavigate} />
      ) : null}
      </div>
    </PublicSection>
  )
}

export default FeaturedListingsSection
