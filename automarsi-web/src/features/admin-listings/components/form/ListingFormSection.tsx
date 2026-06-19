import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type ListingFormSectionProps = {
  title: string
  description: string
  icon: LucideIcon
  children: ReactNode
}

function ListingFormSection({
  title,
  description,
  icon: Icon,
  children,
}: ListingFormSectionProps) {
  return (
    <section className="grid gap-4 border-t pt-5 first:border-t-0 first:pt-0">
      <div className="flex items-start gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-md border bg-muted/40 text-muted-foreground">
          <Icon className="size-4" />
        </span>
        <div>
          <h4 className="text-sm font-semibold">{title}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>

      {children}
    </section>
  )
}

export default ListingFormSection
