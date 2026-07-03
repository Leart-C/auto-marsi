import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type PublicInfoCardProps = {
  icon?: ReactNode
  label?: string
  title: string
  description?: string
  className?: string
}

function PublicInfoCard({
  icon,
  label,
  title,
  description,
  className,
}: PublicInfoCardProps) {
  return (
    <article
      className={cn(
        'rounded-2xl border bg-card p-5 shadow-[0_18px_45px_rgba(31,25,76,0.06)]',
        className
      )}
    >
      {icon ? (
        <div className="mb-4 grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
      ) : null}

      {label ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
      ) : null}

      <h3 className="text-lg font-bold tracking-[-0.02em]">{title}</h3>

      {description ? (
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </article>
  )
}

export default PublicInfoCard
