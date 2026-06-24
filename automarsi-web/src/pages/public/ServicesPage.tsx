import {
  ArrowRight,
  BadgeCheck,
  Car,
  ClipboardCheck,
  FileCheck2,
  Handshake,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'
import FeatureCard from '@/components/public/FeatureCard'
import SectionHeader from '@/components/public/SectionHeader'
import { Button } from '@/components/ui/button'

type ServicesPageProps = {
  onNavigate: (path: string) => void
}

const serviceItems = [
  {
    icon: <Car className="size-5" />,
    title: 'Vehicle sourcing',
    description:
      'We help customers find suitable vehicles based on budget, usage, and preferred specifications.',
  },
  {
    icon: <ClipboardCheck className="size-5" />,
    title: 'Inspection and preparation',
    description:
      'Every published vehicle is presented with clear details so customers can understand what they are viewing.',
  },
  {
    icon: <Handshake className="size-5" />,
    title: 'Trade-in guidance',
    description:
      'Customers can contact the team to discuss trade-in possibilities and next steps.',
  },
  {
    icon: <BadgeCheck className="size-5" />,
    title: 'Financing guidance',
    description:
      'We explain available financing options in a practical way before the customer visits the showroom.',
  },
  {
    icon: <FileCheck2 className="size-5" />,
    title: 'Paperwork support',
    description:
      'The team supports the customer through documentation, registration, and purchase steps.',
  },
  {
    icon: <Wrench className="size-5" />,
    title: 'After-sale follow-up',
    description:
      'AutoMarsi keeps communication clear after the sale for questions and service direction.',
  },
]

const processSteps = [
  {
    title: 'Browse',
    description: 'Explore real active vehicles published by the AutoMarsi team.',
  },
  {
    title: 'Ask',
    description: 'Send an inquiry from a listing or the contact page.',
  },
  {
    title: 'Visit',
    description: 'The team follows up and schedules a showroom visit when needed.',
  },
  {
    title: 'Decide',
    description: 'Review the vehicle, documents, financing, and final purchase details.',
  },
]

function ServicesPage({ onNavigate }: ServicesPageProps) {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(360px,0.4fr)] lg:items-end">
        <SectionHeader
          eyebrow="Services"
          title="Support built around a clearer car buying process."
          description="From the first vehicle search to showroom follow-up, AutoMarsi helps customers move with confidence and clear information."
        />

        <div className="rounded-lg border bg-card p-5">
          <div className="flex gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-md bg-red-50 text-red-600">
              <ShieldCheck className="size-5" />
            </div>

            <div>
              <h2 className="font-semibold">Real people, clear next steps.</h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Every public inquiry enters the admin workflow so the team can
                answer, follow up, and plan the next step properly.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {serviceItems.map((service) => (
          <FeatureCard
            key={service.title}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>

      <section className="rounded-lg border bg-card p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase text-red-600">
              Process
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              How the service flow works.
            </h2>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => onNavigate('/inventory')}
          >
            Browse inventory
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <div key={step.title} className="rounded-lg border bg-background p-4">
              <div className="grid size-8 place-items-center rounded-full bg-red-600 text-sm font-semibold text-white">
                {index + 1}
              </div>
              <h3 className="mt-4 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-slate-950 p-6 text-white sm:p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-red-300">
              <Sparkles className="size-4" />
              <p className="text-xs font-semibold uppercase">
                Ready when you are
              </p>
            </div>
            <h2 className="mt-3 text-2xl font-semibold">
              Looking for your next car?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Browse available vehicles or contact AutoMarsi and the team will
              help with availability, showroom visits, and financing questions.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={() => onNavigate('/inventory')}>
              Browse cars
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onNavigate('/contact')}
            >
              <MessageSquare className="size-4" />
              Contact us
            </Button>
          </div>
        </div>
      </section>
    </section>
  )
}

export default ServicesPage