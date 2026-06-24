import { Clock, Phone, ShieldCheck } from 'lucide-react'

const reassuranceItems = [
  {
    icon: <ShieldCheck className="size-4" />,
    title: 'Availability confirmed',
    description: 'We confirm vehicle availability before your visit.',
  },
  {
    icon: <Phone className="size-4" />,
    title: 'Clear follow-up',
    description: 'Our team contacts you with practical next steps.',
  },
  {
    icon: <Clock className="size-4" />,
    title: 'Business-hours response',
    description: 'Most inquiries are handled during showroom hours.',
  },
]

function PublicListingContactReassurance() {
  return (
    <section className="grid gap-3 rounded-lg border bg-card p-5 text-card-foreground">
      <div>
        <h2 className="font-semibold">What happens next?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A short, transparent follow-up from the AutoMarsi team.
        </p>
      </div>

      <div className="grid gap-3">
        {reassuranceItems.map((item) => (
          <div key={item.title} className="flex gap-3">
            <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-red-600">
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs leading-5 text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PublicListingContactReassurance
