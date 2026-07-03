import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import PublicInfoCard from '@/components/public/PublicInfoCard'
import PublicSection from '@/components/public/PublicSection'
import PublicSectionHeader from '@/components/public/PublicSectionHeader'
import PublicContactInquiryForm from '@/features/public-inquiries/components/PublicContactInquiryForm'
import { useI18n } from '@/i18n/useI18n'

function ContactPage() {
  const { messages } = useI18n()
  const contactDetails = [
    {
      icon: <Phone className="size-4" />,
      label: messages.common.phone,
      value: messages.contact.phone,
    },
    {
      icon: <Mail className="size-4" />,
      label: messages.common.email,
      value: messages.contact.email,
    },
    {
      icon: <MapPin className="size-4" />,
      label: messages.contact.locationLabel,
      value: messages.contact.location,
    },
    {
      icon: <Clock className="size-4" />,
      label: messages.contact.response,
      value: messages.contact.responseValue,
    },
  ]

  return (
    <PublicSection>
      <div className="grid gap-8">
        <PublicSectionHeader
          eyebrow={messages.contact.eyebrow}
          title={messages.contact.title}
          description={messages.contact.description}
        />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(420px,0.6fr)] lg:items-start">
        <div className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {contactDetails.map((detail) => (
              <PublicInfoCard
                key={detail.label}
                icon={detail.icon}
                label={detail.label}
                title={detail.value}
              />
            ))}
          </div>

          <div className="rounded-3xl border border-primary/25 bg-primary/10 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              {messages.contact.nextEyebrow}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {messages.contact.nextDescription}
            </p>
          </div>
        </div>

        <PublicContactInquiryForm />
      </div>
      </div>
    </PublicSection>
  )
}

export default ContactPage
