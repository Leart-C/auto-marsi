import { Images } from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { AdminListing, AdminListingImage } from '../../types'

type ListingHeroImageProps = {
  listing: AdminListing
  heroImage: AdminListingImage | null
  imageCount: number
  onOpenGallery: () => void
}

function ListingHeroImage({
  listing,
  heroImage,
  imageCount,
  onOpenGallery,
}: ListingHeroImageProps) {
  return (
    <Card className="overflow-hidden p-0">
      {heroImage ? (
        <button
          type="button"
          className="group relative block w-full overflow-hidden text-left"
          onClick={onOpenGallery}
          aria-label="Open image gallery"
        >
          <img
            src={heroImage.image_url}
            alt={heroImage.alt_text ?? listing.title}
            decoding="async"
            className="aspect-[16/9] w-full object-cover transition-transform duration-200 group-hover:scale-[1.01]"
          />

          <span className="absolute bottom-3 right-3 flex items-center gap-2 rounded-md bg-black/65 px-3 py-2 text-xs font-medium text-white">
            <Images className="size-4" />
            {imageCount}
          </span>
        </button>
      ) : (
        <div className="grid aspect-[16/9] place-items-center bg-muted/40 text-muted-foreground">
          <div className="grid justify-items-center gap-2">
            <Images className="size-7" />
            <span className="text-sm">No listing image</span>
          </div>
        </div>
      )}
    </Card>
  )
}

export default ListingHeroImage
