import { useEffect, useState } from 'react'
import { MessageSquare, Phone } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { useI18n } from '@/i18n/useI18n'

type PublicListingMobileCtaProps = {
  onContactClick: () => void
}

function PublicListingMobileCta({
  onContactClick,
}: PublicListingMobileCtaProps) {
  const { messages } = useI18n()
  const [isInquiryVisible, setIsInquiryVisible] = useState(false)

  useEffect(() => {
    const form = document.getElementById('listing-inquiry')
    if (!form) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsInquiryVisible(entry.isIntersecting),
      { rootMargin: '-80px 0px -160px 0px' },
    )
    observer.observe(form)
    return () => observer.disconnect()
  }, [])

  if (isInquiryVisible) return null

  return (
    <div className="mobile-listing-actions fixed inset-x-0 z-40 px-4 py-2 md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-[52px_1fr] gap-2 rounded-2xl border border-white/10 bg-background/95 p-2 shadow-xl backdrop-blur-2xl">
        <a
          href={`tel:${messages.contact.phone.replaceAll(' ', '')}`}
          className="grid h-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-primary shadow-sm"
          aria-label={messages.contact.phone}
        >
          <Phone className="size-5" />
        </a>

        <Button
          type="button"
          size="lg"
          className="h-12 rounded-2xl text-sm font-semibold"
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
