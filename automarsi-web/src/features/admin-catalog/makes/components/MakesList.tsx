import { CarFront } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { AdminMake } from '../types'

type MakesListProps = {
  makes: AdminMake[]
  selectedMakeId: number | null
  modelCounts: Record<number, number>
  onSelectMake: (makeId: number) => void
}

function MakesList({
  makes,
  selectedMakeId,
  modelCounts,
  onSelectMake,
}: MakesListProps) {
  return (
    <div className="grid gap-1">
      {makes.map((make) => {
        const isSelected = selectedMakeId === make.id

        return (
          <Button
            key={make.id}
            type="button"
            variant={isSelected ? 'secondary' : 'ghost'}
            className="h-auto justify-start gap-3 px-3 py-2"
            onClick={() => onSelectMake(make.id)}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-md border bg-background text-muted-foreground">
              <CarFront className="size-4" />
            </span>

            <span className="grid min-w-0 flex-1 gap-0.5 text-left">
              <span className="truncate text-sm font-medium">{make.name}</span>
              <span className="text-xs text-muted-foreground">
                {modelCounts[make.id] ?? 0} models
              </span>
            </span>
          </Button>
        )
      })}
    </div>
  )
}

export default MakesList