import {
  ArrowRight,
  Car,
  MessageSquare,
  ShieldCheck,
  Users,
} from 'lucide-react'
import PublicCtaBand from '@/components/public/PublicCtaBand'
import PublicImageCarousel from '@/components/public/PublicImageCarousel'
import PublicSection from '@/components/public/PublicSection'
import PublicSectionHeader from '@/components/public/PublicSectionHeader'
import PublicValueList from '@/components/public/PublicValueList'
import { Button } from '@/components/ui/button'
import { usePublicSiteMedia } from '@/features/site-media/hooks/usePublicSiteMedia'
import { useI18n } from '@/i18n/useI18n'

type AboutPageProps = {
  onNavigate: (path: string) => void
}

function AboutPage({ onNavigate }: AboutPageProps) {
  const { messages } = useI18n()
  const aboutMediaQuery = usePublicSiteMedia('about_showroom')
  const principleIcons = [
    <ShieldCheck className="size-4" />,
    <MessageSquare className="size-4" />,
    <Users className="size-4" />,
  ]

  return (
    <div className="grid gap-0">
      <PublicSection>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(340px,0.55fr)] lg:items-start">
        <div className="grid max-w-3xl gap-5">
          <PublicSectionHeader
            eyebrow={messages.about.eyebrow}
            title={messages.about.title}
            description={messages.about.description}
          />

          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            {messages.about.body}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={() => onNavigate('/inventory')}>
              {messages.about.browseVehicles}
              <ArrowRight className="size-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => onNavigate('/contact')}
            >
              {messages.about.contactTeam}
            </Button>
          </div>
        </div>

        <PublicValueList
          title={messages.about.mattersEyebrow}
          items={messages.about.principles.map((principle, index) => ({
            ...principle,
            icon: principleIcons[index],
          }))}
        />
        </div>
      </PublicSection>

      <PublicSection bleed>
        <div className="grid gap-7">
          <PublicSectionHeader
            eyebrow={messages.about.storyEyebrow}
            title={messages.about.storyTitle}
            description={messages.about.body}
          />

          <PublicImageCarousel
            images={aboutMediaQuery.data ?? []}
            label={messages.about.showroomLabel}
            aspect="aspect-[16/6]"
          />
        </div>
      </PublicSection>

      <PublicSection>
        <div className="grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl md:grid-cols-[280px_1fr] md:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              {messages.about.processEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">
              {messages.about.processTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {messages.about.processDescription}
            </p>
          </div>

          <div className="grid gap-4">
            {messages.about.processSteps.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {index + 1}
                </div>

                <div className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PublicSection>

      <PublicSection>
        <PublicCtaBand
          eyebrow={messages.about.ctaEyebrow}
          title={messages.about.ctaTitle}
          description={messages.about.ctaDescription}
          actionLabel={messages.about.viewInventory}
          actionPath="/inventory"
          icon={<Car className="size-4" />}
          onNavigate={onNavigate}
        />
      </PublicSection>
    </div>
  )
}

export default AboutPage
