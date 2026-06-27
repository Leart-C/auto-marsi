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
import SectionHeader from '@/components/public/SectionHeader'
import { Button } from '@/components/ui/button'

type ServicesPageProps = {
  onNavigate: (path: string) => void
}

const serviceItems = [
  {
    icon: <Car className="size-5" />,
    title: 'Vehicle guidance',
    description:
      'We help customers compare vehicles by budget, usage, and practical needs.',
  },
  {
    icon: <ClipboardCheck className="size-5" />,
    title: 'Clear listing information',
    description:
      'Published vehicles include the key details customers need before asking more.',
  },
  {
    icon: <Handshake className="size-5" />,
    title: 'Trade-in discussion',
    description:
      'Customers can ask the team about possible trade-in steps before visiting.',
  },
  {
    icon: <BadgeCheck className="size-5" />,
    title: 'Financing guidance',
    description:
      'We help customers prepare the right questions before reviewing real terms.',
  },
  {
    icon: <FileCheck2 className="size-5" />,
    title: 'Purchase support',
    description:
      'The team helps with practical purchase steps, documents, and registration direction.',
  },
  {
    icon: <Wrench className="size-5" />,
    title: 'After-sale follow-up',
    description:
      'Customers can stay in contact for questions and service direction after purchase.',
  },
]

function ServicesPage({ onNavigate }: ServicesPageProps) {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid max-w-3xl gap-4">
        <SectionHeader
          eyebrow="Services"
          title="Practical support before and after you choose a vehicle."
          description="AutoMarsi keeps the process simple: browse, ask, visit, and decide with clear information from the team."
        />

        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={() => onNavigate('/inventory')}>
            Browse cars
            <ArrowRight className="size-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => onNavigate('/contact')}
          >
            Contact us
          </Button>
        </div>
      </div>

      <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
        {serviceItems.map((service) => (
          <article key={service.title} className="flex gap-4">
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-red-50 text-red-600">
              {service.icon}
            </div>

            <div>
              <h2 className="font-semibold">{service.title}</h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {service.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <section className="rounded-xl bg-slate-950 p-6 text-white sm:p-7">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-red-300">
              <MessageSquare className="size-4" />
              <p className="text-xs font-semibold uppercase">Need help?</p>
            </div>

            <h2 className="mt-2 text-2xl font-semibold">
              Ask before you visit.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Send a question about availability, financing, trade-in, or
              showroom follow-up.
            </p>
          </div>

          <Button type="button" onClick={() => onNavigate('/contact')}>
            Send inquiry
          </Button>
        </div>
      </section>
    </section>
  )
}

export default ServicesPage
