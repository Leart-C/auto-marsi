import {
  ArrowRight,
  BadgeCheck,
  Car,
  ClipboardCheck,
  Handshake,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import FeatureCard from '@/components/public/FeatureCard'
import SectionHeader from '@/components/public/SectionHeader'
import { Button } from '@/components/ui/button'

type AboutPageProps = {
  onNavigate: (path: string) => void
}

const values = [
  {
    icon: <ShieldCheck className="size-5" />,
    title: 'Selected vehicles',
    description:
      'We keep the public inventory focused on active vehicles that are ready for real customer interest.',
  },
  {
    icon: <Handshake className="size-5" />,
    title: 'Clear communication',
    description:
      'Customers can ask questions, check availability, and understand the next step before visiting.',
  },
  {
    icon: <Users className="size-5" />,
    title: 'Human follow-up',
    description:
      'Every inquiry goes to the AutoMarsi team, where it can be reviewed and scheduled properly.',
  },
]

const processSteps = [
  {
    icon: <Car className="size-5" />,
    title: 'Browse active vehicles',
    description: 'Customers see only vehicles published from the admin dashboard.',
  },
  {
    icon: <MessageSquare className="size-5" />,
    title: 'Send an inquiry',
    description: 'Questions and visit requests go directly into the admin lead flow.',
  },
  {
    icon: <BadgeCheck className="size-5" />,
    title: 'Confirm the next step',
    description: 'The team follows up and schedules appointments when needed.',
  },
]

function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="grid gap-12">
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid max-w-3xl gap-5">
          <SectionHeader
            eyebrow="About AutoMarsi"
            title="A trusted autosallon built around clear choices."
            description="AutoMarsi helps customers find quality vehicles through a simple public website, transparent communication, and a professional showroom follow-up process."
          />

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

        <div className="grid gap-3 rounded-lg border bg-card p-4 text-sm text-muted-foreground md:grid-cols-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-red-600" />
            Inspected vehicle information
          </div>
          <div className="flex items-center gap-2">
            <ClipboardCheck className="size-4 text-red-600" />
            Admin-managed inventory
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-red-600" />
            Clear customer follow-up
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="What we value"
          title="A practical and honest buying experience."
          description="The website is designed to connect customers with real active vehicles and help the team respond with the right next step."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <FeatureCard
              key={value.title}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our process"
          title="From online interest to showroom visit."
          description="Customers do not book appointments blindly. The AutoMarsi team reviews each inquiry and schedules the next step properly."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {processSteps.map((step) => (
            <article
              key={step.title}
              className="grid gap-3 rounded-lg border bg-card p-5 shadow-xs"
            >
              <div className="grid size-10 place-items-center rounded-lg bg-muted text-foreground">
                {step.icon}
              </div>
              <div className="grid gap-1">
                <h3 className="font-medium">{step.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 rounded-lg bg-slate-950 p-6 text-white md:grid-cols-[1fr_auto] md:items-center">
          <div className="grid gap-2">
            <p className="text-xs font-semibold uppercase text-red-400">
              Visit AutoMarsi
            </p>
            <h2 className="text-2xl font-semibold">
              Ready to find your next vehicle?
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-300">
              Browse active inventory or contact the team about availability,
              financing, or showroom visits.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={() => onNavigate('/inventory')}>
              View inventory
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              onClick={() => onNavigate('/contact')}
            >
              Send inquiry
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
