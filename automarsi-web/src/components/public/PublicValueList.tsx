import type { ReactNode } from 'react'

type PublicValueListProps = {
  title?: string
  items: Array<{
    title: string
    description: string
    icon?: ReactNode
  }>
}

function PublicValueList({ title, items }: PublicValueListProps) {
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-[0_18px_45px_rgba(31,25,76,0.06)]">
      {title ? <h3 className="mb-2 text-xl font-black">{title}</h3> : null}

      <div className="grid">
        {items.map((item) => (
          <div
            key={item.title}
            className="grid gap-3 border-b py-5 last:border-b-0 sm:grid-cols-[2.5rem_1fr]"
          >
            <div className="h-0.5 w-8 self-start rounded-full bg-primary sm:mt-3">
              <span className="sr-only">{item.title}</span>
            </div>
            <div>
              <h4 className="font-bold tracking-[-0.02em]">{item.title}</h4>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PublicValueList
