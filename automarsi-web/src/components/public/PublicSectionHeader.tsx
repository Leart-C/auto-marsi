import { cn } from '@/lib/utils'

type PublicSectionHeaderProps = {
  as?: 'h1' | 'h2'
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

function PublicSectionHeader({
  as: Heading = 'h2',
  eyebrow,
  title,
  description,
  className,
}: PublicSectionHeaderProps) {
  return (
    <div className={cn('grid max-w-3xl gap-3', className)}>
      {eyebrow ? (
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-primary">
          {eyebrow}
        </p>
      ) : null}

      <Heading className="text-3xl font-medium tracking-[-0.045em] leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </Heading>

      {description ? (
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export default PublicSectionHeader
