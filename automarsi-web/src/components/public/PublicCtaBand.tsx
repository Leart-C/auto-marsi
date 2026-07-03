import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type PublicCtaBandProps = {
  eyebrow?: string
  title: string
  description: string
  actionLabel: string
  actionPath: string
  onNavigate: (path: string) => void
  icon?: ReactNode
}

function PublicCtaBand({
  eyebrow,
  title,
  description,
  actionLabel,
  actionPath,
  onNavigate,
  icon,
}: PublicCtaBandProps) {
  return (
    <div className="grid gap-5 rounded-3xl border border-primary/25 bg-white/70 p-7 shadow-[0_18px_45px_rgba(31,25,76,0.05)] md:grid-cols-[1fr_auto] md:items-center">
      <div className="grid gap-2">
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-black tracking-[-0.03em]">{title}</h2>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>

      <Button type="button" size="lg" onClick={() => onNavigate(actionPath)}>
        {icon}
        {actionLabel}
        <ArrowRight className="size-4" />
      </Button>
    </div>
  )
}

export default PublicCtaBand
