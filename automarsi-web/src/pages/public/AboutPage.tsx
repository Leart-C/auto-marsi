import {
  ArrowRight,
  BadgeCheck,
  Car,
  MessageSquare,
  ShieldCheck,
  Users,
} from 'lucide-react'
import SectionHeader from '@/components/public/SectionHeader'
import { Button } from '@/components/ui/button'

type AboutPageProps = {
  onNavigate: (path: string) => void
}

const principles = [
  {
    icon: <ShieldCheck className="size-4" />,
    title: 'Selected inventory',
    description: 'Customers see active vehicles prepared for real interest.',
  },
  {
    icon: <MessageSquare className="size-4" />,
    title: 'Clear communication',
    description: 'Questions and visit requests enter the admin lead flow.',
  },
  {
    icon: <Users className="size-4" />,
    title: 'Human follow-up',
    description: 'The team reviews every inquiry before the next step.',
  },
]

const processSteps = [
  {
    title: 'Vehicle published',
    description: 'The AutoMarsi team creates and activates the listing.',
  },
  {
    title: 'Customer asks',
    description: 'The customer sends a question, viewing request, or financing interest.',
  },
  {
    title: 'Team follows up',
    description: 'The team confirms availability and schedules the next step.',
  },
]

function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="grid gap-10">
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(340px,0.5fr)] lg:items-center lg:px-8">
        <div className="grid max-w-3xl gap-5">
          <SectionHeader
            eyebrow="About AutoMarsi"
            title="A practical autosallon with a clear customer flow."
            description="AutoMarsi connects real active vehicles with customers who want clear information before visiting the showroom."
          />

          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            The public website is connected to the admin workflow, so listings,
            inquiries, and showroom follow-up stay organized from the first
            customer message.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={() => onNavigate('/inventory')}>
              Browse vehicles
              <ArrowRight className="size-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => onNavigate('/contact')}
            >
              Contact the team
            </Button>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-red-600">
            What matters
          </p>

          <div className="mt-4 grid gap-4">
            {principles.map((principle) => (
              <div key={principle.title} className="flex gap-3">
                <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-red-50 text-red-600">
                  {principle.icon}
                </div>

                <div>
                  <h3 className="text-sm font-semibold">{principle.title}</h3>
                  <p className="mt-1 text-sm leading-5 text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 rounded-xl border bg-card p-6 md:grid-cols-[280px_1fr] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase text-red-600">
              Our process
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              From online interest to showroom visit.
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              A simple flow keeps the customer and team aligned.
            </p>
          </div>

          <div className="grid gap-4">
            {processSteps.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-950 text-xs font-semibold text-white">
                  {index + 1}
                </div>

                <div className="border-b pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 rounded-xl bg-slate-950 p-6 text-white md:grid-cols-[1fr_auto] md:items-center">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 text-red-300">
              <BadgeCheck className="size-4" />
              <p className="text-xs font-semibold uppercase">Visit AutoMarsi</p>
            </div>

            <h2 className="text-2xl font-semibold">
              Start with a vehicle you like.
            </h2>

            <p className="max-w-2xl text-sm leading-6 text-slate-300">
              Browse active inventory and send an inquiry when you want more
              details, availability, or showroom guidance.
            </p>
          </div>

          <Button type="button" onClick={() => onNavigate('/inventory')}>
            View inventory
            <Car className="size-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
