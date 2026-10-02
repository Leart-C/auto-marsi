import type { ReactNode } from 'react'

type FeatureCardProps = {
  icon: ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <article className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5 text-card-foreground shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="grid size-10 place-items-center rounded-2xl bg-primary/15 text-primary">
        {icon}
      </div>
      <div className="grid gap-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </article>
  )
}

export default FeatureCard
