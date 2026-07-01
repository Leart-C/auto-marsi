import { AlertTriangle, CheckCircle2, CircleAlert } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ListingQualityCheck } from '../../utils/listingQuality'
import { getListingQuality } from '../../utils/listingQuality'
import type { AdminListing } from '../../types'

type ListingQualityPanelProps = {
  listing: AdminListing
}

type CheckListProps = {
  title: string
  checks: ListingQualityCheck[]
}

function getReadinessLabel(score: number, canPublish: boolean) {
  if (canPublish && score >= 85) {
    return 'Ready to publish'
  }

  if (canPublish) {
    return 'Almost ready'
  }

  return 'Needs attention'
}

function getReadinessDescription(
  missingRequiredCount: number,
  missingRecommendedCount: number
) {
  if (missingRequiredCount > 0) {
    return 'This listing is missing required items before it should be published.'
  }

  if (missingRecommendedCount > 0) {
    return 'Required items are complete. Recommended details can still improve listing quality.'
  }

  return 'Required and recommended listing details look complete.'
}

function CheckList({ title, checks }: CheckListProps) {
  return (
    <div className="grid gap-2">
      <p className="text-xs font-semibold uppercase text-muted-foreground">
        {title}
      </p>

      <div className="grid gap-2 sm:grid-cols-2">
        {checks.map((check) => {
          const Icon = check.passed ? CheckCircle2 : CircleAlert

          return (
            <div
              key={check.key}
              className={cn(
                'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm',
                check.passed
                  ? 'bg-muted/20 text-muted-foreground'
                  : 'border-amber-500/30 bg-amber-500/10 text-foreground'
              )}
            >
              <Icon
                className={cn(
                  'size-4 shrink-0',
                  check.passed ? 'text-emerald-500' : 'text-amber-500'
                )}
              />
              <span>{check.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ListingQualityPanel({ listing }: ListingQualityPanelProps) {
  const quality = getListingQuality(listing)
  const readinessLabel = getReadinessLabel(
    quality.score,
    quality.canPublish
  )
  const readinessDescription = getReadinessDescription(
    quality.missingRequiredCount,
    quality.missingRecommendedCount
  )

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <CardTitle className="text-base">Listing quality</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Quick publishing readiness check for this vehicle.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="grid size-14 place-items-center rounded-full border bg-background">
              <span className="text-lg font-semibold">{quality.score}%</span>
            </div>

            <div>
              <p className="text-sm font-semibold">{readinessLabel}</p>
              <p className="text-xs text-muted-foreground">
                {quality.missingRequiredCount} required missing,{' '}
                {quality.missingRecommendedCount} recommended missing
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-5">
        {!quality.canPublish ? (
          <div className="flex gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />
            <p className="text-sm leading-6">{readinessDescription}</p>
          </div>
        ) : (
          <p className="rounded-lg border bg-muted/20 p-3 text-sm leading-6 text-muted-foreground">
            {readinessDescription}
          </p>
        )}

        <CheckList title="Required checks" checks={quality.requiredChecks} />
        <CheckList
          title="Recommended checks"
          checks={quality.recommendedChecks}
        />
      </CardContent>
    </Card>
  )
}

export default ListingQualityPanel
