import { MessageSquare, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/useI18n'

type PublicListingMobileCtaProps = {
  onContactClick: () => void
}

function PublicListingMobileCta({ onContactClick }: PublicListingMobileCtaProps) {
  const { messages } = useI18n()

  return (
    <div className="fixed inset-x-0 bottom-[4.8rem] z-40 border-t border-white/10 bg-background/88 px-4 py-3 shadow-[0_-18px_45px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-[64px_1fr] gap-3">
        <a
          href={`tel:${messages.contact.phone.replaceAll(' ', '')}`}
          className="grid h-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-primary shadow-sm"
          aria-label={messages.contact.phone}
        >
          <Phone className="size-5" />
        </a>

        <Button
          type="button"
          size="lg"
          className="h-14 rounded-2xl text-base font-black"
          onClick={onContactClick}
        >
          <MessageSquare className="size-5" />
          {messages.listingDetails.inquiry.send}
        </Button>
      </div>
    </div>
  )
}

export default PublicListingMobileCta
