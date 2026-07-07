import PublicMobileSearch from '@/components/public/PublicMobileSearch'
import { useI18n } from '@/i18n/useI18n'
import { cn } from '@/lib/utils'
import type { PublicListingFilters } from '../types'

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
              className={cn(
                'shrink-0 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-base font-bold text-foreground/80 transition',
                isActive &&
                  'border-primary/40 bg-primary text-primary-foreground shadow-[0_14px_35px_rgba(213,162,56,0.22)]'
              )}
            >
              {type.label}
            </button>
          )
        })}
      </div>

      <p className="px-1 text-base font-semibold text-muted-foreground">
        {countLabel}
      </p>
    </div>
  )
}

export default PublicInventoryMobileControls
