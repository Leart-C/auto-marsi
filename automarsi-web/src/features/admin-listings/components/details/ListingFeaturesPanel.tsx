import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import VehicleFeatureIcon from '@/features/admin-catalog/features/components/VehicleFeatureIcon'
import type { AdminListingFeature } from '../../types'

type ListingFeaturesPanelProps = {
  features: AdminListingFeature[]
}

function ListingFeaturesPanel({ features }: ListingFeaturesPanelProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-base">Features</CardTitle>
      </CardHeader>

      <CardContent>
        {features.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No features selected for this listing.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {features.map((feature) => (
              <Badge
                key={feature.id}
                variant="outline"
                className="h-8 gap-2 px-3"
              >
                <VehicleFeatureIcon
                  icon={feature.icon ?? null}
                  className="size-4"
                />
                {feature.name}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ListingFeaturesPanel
