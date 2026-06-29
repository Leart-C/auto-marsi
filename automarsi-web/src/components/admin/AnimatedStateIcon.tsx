import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type AnimatedStateIconProps = {
  icon: LucideIcon
  className?: string
}

function AnimatedStateIcon({ icon: Icon, className }: AnimatedStateIconProps) {
  return (
    <span
      className={cn(
        'group/icon relative grid size-11 place-items-center rounded-xl border bg-background text-muted-foreground shadow-xs transition-colors duration-200 hover:border-primary/30 hover:text-primary',
        className
      )}
    >
      <span className="absolute inset-1 rounded-lg bg-muted/60 transition-transform duration-200 group-hover:scale-90 group-hover/icon:scale-90" />
      <Icon className="relative size-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110 group-hover/icon:-translate-y-0.5 group-hover/icon:scale-110" />
    </span>
  )
}

export default AnimatedStateIcon
