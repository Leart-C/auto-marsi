import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { AdminListing, AdminListingImage } from '../../types'

type ListingGalleryPanelProps = {
  listing: AdminListing
  images: AdminListingImage[]
  onOpenImage: (index: number) => void
}

function ListingGalleryPanel({
  listing,
  images,
  onOpenImage,
}: ListingGalleryPanelProps) {
  if (images.length <= 1) {
    return null
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-base">Gallery</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className="group overflow-hidden rounded-md border bg-muted"
            onClick={() => onOpenImage(index)}
            aria-label={`Open image ${index + 1}`}
          >
            <img
              src={image.image_url}
              alt={image.alt_text ?? listing.title}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </button>
        ))}
      </CardContent>
    </Card>
  )
}

export default ListingGalleryPanel
