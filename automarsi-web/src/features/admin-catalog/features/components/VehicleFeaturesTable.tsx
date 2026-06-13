import { Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { AdminVehicleFeature } from '../types'
import VehicleFeatureIcon from './VehicleFeatureIcon'

type VehicleFeaturesTableProps = {
  features: AdminVehicleFeature[]
  isDeleting: boolean
  onEdit: (feature: AdminVehicleFeature) => void
  onDelete: (featureId: number) => Promise<void>
}

function VehicleFeaturesTable({
  features,
  isDeleting,
  onEdit,
  onDelete,
}: VehicleFeaturesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Feature</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Icon</TableHead>
          <TableHead className="w-[120px] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {features.map((feature) => (
          <TableRow key={feature.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-md border bg-muted">
                  <VehicleFeatureIcon icon={feature.icon} className="size-4" />
                </span>

                <span className="font-medium">{feature.name}</span>
              </div>
            </TableCell>

            <TableCell className="text-muted-foreground">
              {feature.slug}
            </TableCell>

            <TableCell className="text-muted-foreground">
              {feature.icon ?? 'No icon'}
            </TableCell>

            <TableCell>
              <div className="flex justify-end gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(feature)}
                  aria-label={`Edit ${feature.name}`}
                >
                  <Edit className="size-4" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={isDeleting}
                  onClick={async () => {
                    const confirmed = window.confirm(
                      `Delete ${feature.name}?`
                    )

                    if (!confirmed) {
                      return
                    }

                    await onDelete(feature.id)
                  }}
                  aria-label={`Delete ${feature.name}`}
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default VehicleFeaturesTable