import PublicInventoryFilterSheet from '@/features/public-listings/components/PublicInventoryFilterSheet'
import PublicMobileSearch from '@/shared/components/public/PublicMobileSearch'
import { useI18n } from '@/i18n/useI18n'
import { cn } from '@/shared/lib/utils'
import type { PublicListingFilters } from '@/features/public-listings/types'

type PublicInventoryMobileControlsProps = {
  filters: PublicListingFilters
  countLabel: string
  onFiltersChange: (filters: PublicListingFilters) => void
}

function PublicInventoryMobileControls({
  filters,
  countLabel,
  onFiltersChange,
}: PublicInventoryMobileControlsProps) {
  const { messages } = useI18n()
  const bodyTypes = [
    { value: '', label: messages.inventory.filters.all },
    { value: 'coupe', label: messages.inventory.values.coupe },
    { value: 'sedan', label: messages.inventory.values.sedan },
    { value: 'suv', label: messages.inventory.values.suv },
    { value: 'hatchback', label: messages.inventory.values.hatchback },
  ]

  function updateFilter(key: keyof PublicListingFilters, value: string) {
    onFiltersChange({
      ...filters,
      [key]: value,
      page: 1,
    })
  }

  return (
    <div className="grid gap-4 lg:hidden">
      <PublicMobileSearch
        value={filters.search}
        placeholder={messages.home.mobileSearchPlaceholder}
        onChange={(value) => updateFilter('search', value)}
      />

      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {bodyTypes.map((type) => {
          const isActive = filters.body_type === type.value

          return (
            <button
              key={type.label}
              type="button"
              onClick={() => updateFilter('body_type', type.value)}
              aria-pressed={isActive}
              className={cn(
                'min-h-11 shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-sm font-medium text-foreground/80 transition',
                isActive &&
                  'border-primary/40 bg-primary text-primary-foreground',
              )}
            >
              {type.label}
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {countLabel}
        </p>
        <PublicInventoryFilterSheet
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      </div>
    </div>
  )
}

export default PublicInventoryMobileControls
