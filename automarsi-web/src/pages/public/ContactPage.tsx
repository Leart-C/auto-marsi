import type { ReactNode } from 'react'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import SectionHeader from '@/components/public/SectionHeader'
import PublicContactInquiryForm from '@/features/public-inquiries/components/PublicContactInquiryForm'

const contactDetails = [
  {
    icon: <Phone className="size-4" />,
    label: 'Phone',
    value: '+383 44 123 456',
  },
  {
    icon: <Mail className="size-4" />,
    label: 'Email',
    value: 'info@automarsi.com',
  },
  {
    icon: <MapPin className="size-4" />,
    label: 'Location',
    value: 'Prishtina, Kosovo',
  },
  {
    icon: <Clock className="size-4" />,
    label: 'Response',
    value: 'Usually within business hours',
  },
]

function ContactPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(420px,0.6fr)] lg:items-start">
        <div className="grid gap-6">
          <SectionHeader
            eyebrow="Contact"
            title="Ask before you visit."
            description="Send a question about availability, financing, trade-in, or a showroom visit. The AutoMarsi team will follow up clearly."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {contactDetails.map((detail) => (
              <ContactDetailItem
                key={detail.label}
                icon={detail.icon}
                label={detail.label}
                value={detail.value}
              />
            ))}
          </div>

          <div className="rounded-xl bg-slate-950 p-5 text-white">
            <p className="text-xs font-semibold uppercase text-red-300">
              What happens next
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Your message becomes an inquiry in the admin dashboard. The team
              reviews it, responds, and schedules a showroom visit if needed.
            </p>
          </div>
        </div>

        <PublicContactInquiryForm />
      </div>
    </section>
  )
}

type ContactDetailItemProps = {
  icon: ReactNode
  label: string
  value: string
}

function ContactDetailItem({ icon, label, value }: ContactDetailItemProps) {
  return (
    <div className="flex gap-3">
      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-red-50 text-red-600">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="mt-1 text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}

export default ContactPage
