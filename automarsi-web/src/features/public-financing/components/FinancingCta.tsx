import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/useI18n'

type FinancingCtaProps = {
  onNavigate: (path: string) => void
}

function FinancingCta({ onNavigate }: FinancingCtaProps) {
  const { messages } = useI18n()

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="grid gap-5 rounded-[1.75rem] border border-primary/25 bg-primary/12 p-6 text-foreground shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl md:grid-cols-[1fr_auto] md:items-center">
        <div className="grid gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            {messages.financing.cta.eyebrow}
          </p>
          <h2 className="text-2xl font-semibold">
            {messages.financing.cta.title}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            {messages.financing.cta.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={() => onNavigate('/inventory')}>
            {messages.financing.cta.viewInventory}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-white/20 bg-transparent hover:bg-white/10"
            onClick={() => onNavigate('/contact')}
          >
            {messages.financing.cta.contactTeam}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FinancingCta
