import { useState } from 'react'
import { Expand, ImageIcon } from 'lucide-react'
import PublicImageLightbox from '@/shared/components/public/PublicImageLightbox'
import { useI18n } from '@/i18n/useI18n'
import { cn } from '@/shared/lib/utils'
import type { PublicListing, PublicListingImage } from '@/features/public-listings/types'

type PublicListingGalleryProps = { listing: PublicListing }

function PublicListingGallery({ listing }: PublicListingGalleryProps) {
  const { messages } = useI18n()
  // Keep every photo available, with the selected cover first and no duplicates.
  const availableImages = [listing.primary_image, ...(listing.images ?? [])].filter(
    (image): image is PublicListingImage & { image_url: string } => Boolean(image?.image_url),
  )
  const images = availableImages.filter(
    (image, index, all) => all.findIndex((item) => item.id === image.id) === index,
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const activeImage = images[activeIndex] ?? images[0]

  if (!activeImage) {
    return (
      <div className="grid aspect-[4/3] place-content-center gap-3 rounded-2xl border border-white/10 bg-card p-8 text-center text-muted-foreground">
        <ImageIcon className="mx-auto size-10" />
        <p className="font-medium text-foreground">
          {messages.listingDetails.galleryFallbackTitle}
        </p>
        <p className="text-sm">
          {messages.listingDetails.galleryFallbackDescription}
        </p>
      </div>
    )
  }

  return (
    <div className="grid min-w-0 gap-3">
      <button
        type="button"
        onClick={() => setIsLightboxOpen(true)}
        aria-label={`${messages.listingDetails.viewImage} ${activeIndex + 1} — ${listing.title}`}
        className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-card sm:aspect-[16/10]"
      >
        <img
          src={activeImage.image_url}
          alt={activeImage.alt_text || listing.title}
          decoding="async"
          className="size-full object-cover"
        />
        <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/65 px-3 py-1.5 font-mono text-xs text-white backdrop-blur-md">
          {activeIndex + 1} / {images.length}
        </span>
        <span className="absolute bottom-3 right-3 grid size-11 place-items-center rounded-full bg-black/65 text-white backdrop-blur-md">
          <Expand className="size-4" />
        </span>
      </button>
      {images.length > 1 && (
        <div
          className="flex gap-2 overflow-x-auto py-1"
          aria-label={messages.listingDetails.viewImage}
        >
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              aria-label={`${messages.listingDetails.viewImage} ${index + 1}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 p-0.5 transition',
                index === activeIndex
                  ? 'border-primary'
                  : 'border-transparent opacity-60 hover:opacity-100',
              )}
            >
              <img
                src={image.image_url}
                alt={image.alt_text || listing.title}
                loading="lazy"
                className="size-full rounded-lg object-cover"
              />
            </button>
          ))}
        </div>
      )}
      <PublicImageLightbox
        images={images}
        activeIndex={activeIndex}
        label={listing.title}
        open={isLightboxOpen}
        onActiveIndexChange={setActiveIndex}
        onClose={() => setIsLightboxOpen(false)}
      />
    </div>
  )
}

export default PublicListingGallery
