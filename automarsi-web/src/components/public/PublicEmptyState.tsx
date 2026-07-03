import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type PublicEmptyStateProps = {
  icon: LucideIcon
  eyebrow?: string
  title: string
  description: string
  primaryActionLabel: string
  primaryActionPath: string
  secondaryActionLabel?: string
  secondaryActionPath?: string
  onNavigate: (path: string) => void
}

function PublicEmptyState({
  icon: Icon,
  eyebrow,
  title,
  description,
  primaryActionLabel,
  primaryActionPath,
  secondaryActionLabel,
  secondaryActionPath,
  onNavigate,
}: PublicEmptyStateProps) {
  return (
    <section className="mx-auto grid min-h-[58vh] max-w-3xl place-items-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="grid justify-items-center gap-5">
        <div className="grid size-14 place-items-center rounded-2xl border bg-card shadow-sm">
          <Icon className="size-6 text-red-600" />
        </div>

        <div className="grid gap-2">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>

          <p className="mx-auto max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button type="button" onClick={() => onNavigate(primaryActionPath)}>
            {primaryActionLabel}
            <ArrowRight className="size-4" />
          </Button>

          {secondaryActionLabel && secondaryActionPath ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => onNavigate(secondaryActionPath)}
            >
              {secondaryActionLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default PublicEmptyState
