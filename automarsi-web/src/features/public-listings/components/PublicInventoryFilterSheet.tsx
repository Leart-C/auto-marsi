import { SlidersHorizontal, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import PublicListingFilters from '@/features/public-listings/components/PublicListingFilters'
import type { PublicListingFilters as FilterValues } from '@/features/public-listings/types'
import { useI18n } from '@/i18n/useI18n'

type PublicInventoryFilterSheetProps = {
  filters: FilterValues
  onFiltersChange: (filters: FilterValues) => void
}

export default function PublicInventoryFilterSheet({
  filters,
  onFiltersChange,
}: PublicInventoryFilterSheetProps) {
  const { messages } = useI18n()
  const [open, setOpen] = useState(false)
  const activeCount = Object.entries(filters).filter(
    ([key, value]) =>
      key !== 'page' && key !== 'per_page' && value !== '' && value != null,
  ).length

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="h-11 rounded-full border-white/15 px-4"
          />
        }
      >
        <SlidersHorizontal className="size-4" />
        {messages.inventory.filters.title}
        {activeCount > 0 && (
          <span className="grid size-5 place-items-center rounded-full bg-primary text-[11px] text-primary-foreground">
            {activeCount}
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="inventory-filter-sheet" showCloseButton={false}>
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
          <div className="grid gap-2">
            <DialogTitle className="text-xl">
              {messages.inventory.filters.title}
            </DialogTitle>
            <DialogDescription>
              {messages.inventory.filters.description}
            </DialogDescription>
          </div>
          <DialogClose
            render={
              <Button
                variant="ghost"
                size="icon"
                className="size-11 shrink-0 rounded-full"
              />
            }
            aria-label={messages.common.close}
          >
            <X className="size-5" />
          </DialogClose>
        </div>
        <div className="min-h-0 overflow-y-auto overscroll-contain px-1">
          <PublicListingFilters
            filters={filters}
            onFiltersChange={onFiltersChange}
          />
        </div>
        <div className="filter-sheet-footer border-t border-white/10 p-4">
          <DialogClose render={<Button className="h-12 w-full rounded-full" />}>
            {messages.inventory.filters.showVehicles}
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
