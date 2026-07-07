import { CheckCircle2 } from 'lucide-react'
import { useI18n } from '@/i18n/useI18n'
import type { PublicListingFeature } from '../types'

type PublicListingFeaturesProps = {
  features: PublicListingFeature[]
}

function PublicListingFeatures({ features }: PublicListingFeaturesProps) {
  const { messages } = useI18n()

  if (features.length === 0) {
    return null
  }

  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <h2 className="text-lg font-semibold">
        {messages.listingDetails.features}
      </h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <CheckCircle2 className="size-4 text-primary" />
            {feature.name}
          </div>
        ))}
      </div>
    </section>
  )
}

export default PublicListingFeatures
