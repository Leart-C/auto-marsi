import { cn } from '@/lib/utils'
import VehicleFeatureIcon, {
  vehicleFeatureIconOptions,
} from './VehicleFeatureIcon'

type VehicleFeatureIconPickerProps = {
  value: string
  onChange: (icon: string) => void
  className?: string
}

function VehicleFeatureIconPicker({
  value,
  onChange,
  className,
}: VehicleFeatureIconPickerProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-6 gap-2 sm:grid-cols-10 lg:grid-cols-12',
        className
      )}
    >
      {vehicleFeatureIconOptions.map((option) => {
        const isSelected = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            title={option.label}
            aria-label={option.label}
            aria-pressed={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              'grid size-9 place-items-center rounded-md border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
              isSelected &&
                'border-primary bg-primary/10 text-primary ring-1 ring-primary'
            )}
          >
            <VehicleFeatureIcon icon={option.value} className="size-4" />
          </button>
        )
      })}
    </div>
  )
}

export default VehicleFeatureIconPicker
