import { useMemo, useState } from 'react'
import { ImageIcon } from 'lucide-react'
import type { PublicListing, PublicListingImage } from '../types'

type PublicListingGalleryProps = {
  listing: PublicListing
}

function getGalleryImages(listing: PublicListing): PublicListingImage[] {
  const images = listing.images ?? []

  if (images.length > 0) {
    return images
  }

  return listing.primary_image ? [listing.primary_image] : []
}

function PublicListingGallery({ listing }: PublicListingGalleryProps) {
  const images = useMemo(() => getGalleryImages(listing), [listing])
  const [selectedImageId, setSelectedImageId] = useState<number | null>(
    listing.primary_image?.id ?? images[0]?.id ?? null,
  )

  const selectedImage =
    images.find((image) => image.id === selectedImageId) ?? images[0] ?? null

  return (
    <div className="grid gap-3">
      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="relative aspect-[16/10] bg-muted">
          {selectedImage?.image_url ? (
            <img
              src={selectedImage.image_url}
              alt={selectedImage.alt_text ?? listing.title}
              className="size-full object-cover"
            />
          ) : (
            <div className="grid size-full place-items-center gap-2 text-sm text-muted-foreground">
              <ImageIcon className="size-6" />
              No image available
            </div>
          )}

          {images.length > 0 ? (
            <div className="absolute bottom-3 right-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow-sm">
              {images.length} {images.length === 1 ? 'image' : 'images'}
            </div>
          ) : null}
        </div>
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 lg:grid-cols-6">
          {images.map((image) => {
            const isSelected = image.id === selectedImage?.id

            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedImageId(image.id)}
                className={
                  isSelected
                    ? 'overflow-hidden rounded-md border-2 border-red-600 bg-muted'
                    : 'overflow-hidden rounded-md border bg-muted transition hover:border-foreground/40'
                }
              >
                <span className="block aspect-square">
                  {image.image_url ? (
                    <img
                      src={image.image_url}
                      alt={image.alt_text ?? listing.title}
                      className="size-full object-cover"
                    />
                  ) : (
                    <span className="grid size-full place-items-center text-xs text-muted-foreground">
                      No image
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default PublicListingGallery