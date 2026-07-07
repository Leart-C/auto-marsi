import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  ShieldCheck,
} from 'lucide-react'

import PublicInfoCard from '@/components/public/PublicInfoCard'
import PublicSection from '@/components/public/PublicSection'
import PublicSectionHeader from '@/components/public/PublicSectionHeader'
import { Button } from '@/components/ui/button'
import FinancingCalculator from '@/features/public-financing/components/FinancingCalculator'
import { useI18n } from '@/i18n/useI18n'

type FinancingPageProps = {
  onNavigate: (path: string) => void
}

function FinancingPage({ onNavigate }: FinancingPageProps) {
  const { messages } = useI18n()
  const highlightIcons = [
    <ShieldCheck className="size-4" />,
    <Clock3 className="size-4" />,
    <FileText className="size-4" />,
  ]

  return (
    <div className="grid gap-0">
      <PublicSection>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <div className="grid gap-6">
            <PublicSectionHeader
              eyebrow={messages.financing.eyebrow}
              title={messages.financing.title}
              description={messages.financing.description}
            />

            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={() => onNavigate('/inventory')}>
                {messages.financing.browseVehicles}
                <ArrowRight className="size-4" />
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => onNavigate('/contact')}
              >
                {messages.financing.askAboutFinancing}
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {messages.financing.highlights.map((item, index) => (
                <PublicInfoCard
                  key={item.title}
                  icon={highlightIcons[index]}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>

            <div className="grid gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
              <div className="grid gap-1">
                <h2 className="text-base font-semibold">
                  {messages.financing.prepareTitle}
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  {messages.financing.body}
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {messages.financing.prepareItems.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <FinancingCalculator onAskAboutEstimate={() => onNavigate('/contact')} />
        </div>
      </PublicSection>
    </div>
  )
}

export default FinancingPage
