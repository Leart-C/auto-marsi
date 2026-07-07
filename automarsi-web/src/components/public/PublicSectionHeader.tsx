import { cn } from '@/lib/utils'

type PublicSectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

function PublicSectionHeader({
  eyebrow,
  title,
  description,
  className,
}: PublicSectionHeaderProps) {
  return (
    <div className={cn('grid max-w-3xl gap-3', className)}>
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-3xl font-black tracking-[-0.045em] text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description ? (
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export default PublicSectionHeader
