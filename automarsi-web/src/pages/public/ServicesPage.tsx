import {
  ArrowRight,
  BadgeCheck,
  Car,
  ClipboardCheck,
  FileCheck2,
  Handshake,
  MessageSquare,
  Wrench,
} from 'lucide-react'
import PublicCtaBand from '@/components/public/PublicCtaBand'
import PublicInfoCard from '@/components/public/PublicInfoCard'
import PublicSection from '@/components/public/PublicSection'
import PublicSectionHeader from '@/components/public/PublicSectionHeader'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/useI18n'

type ServicesPageProps = {
  onNavigate: (path: string) => void
}

function ServicesPage({ onNavigate }: ServicesPageProps) {
  const { messages } = useI18n()
  const serviceIcons = [
    <Car className="size-5" />,
    <ClipboardCheck className="size-5" />,
    <Handshake className="size-5" />,
    <BadgeCheck className="size-5" />,
    <FileCheck2 className="size-5" />,
    <Wrench className="size-5" />,
  ]

  return (
    <div className="grid gap-0">
    <PublicSection>
      <div className="grid gap-10">
      <div className="grid max-w-3xl gap-4">
        <PublicSectionHeader
          eyebrow={messages.services.eyebrow}
          title={messages.services.title}
          description={messages.services.description}
        />

        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={() => onNavigate('/inventory')}>
            {messages.services.browseCars}
            <ArrowRight className="size-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => onNavigate('/contact')}
          >
            {messages.services.contactUs}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {messages.services.items.map((service, index) => (
          <PublicInfoCard
            key={service.title}
            icon={serviceIcons[index]}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
      </div>
    </PublicSection>

    <PublicSection>
      <PublicCtaBand
        eyebrow={messages.services.needHelp}
        title={messages.services.askBeforeVisit}
        description={messages.services.helpDescription}
        actionLabel={messages.services.sendInquiry}
        actionPath="/contact"
        icon={<MessageSquare className="size-4" />}
        onNavigate={onNavigate}
      />
    </PublicSection>
    </div>
  )
}

export default ServicesPage
