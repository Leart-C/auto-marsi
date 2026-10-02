import { useState } from 'react'
import type { AdminListing } from '@/features/admin-listings/types'
import ListingImageLightbox from '@/features/admin-listings/components/ListingImageLightbox'
import ListingDescriptionPanel from '@/features/admin-listings/components/details/ListingDescriptionPanel'
import ListingFeaturesPanel from '@/features/admin-listings/components/details/ListingFeaturesPanel'
import ListingGalleryPanel from '@/features/admin-listings/components/details/ListingGalleryPanel'
import ListingHeroImage from '@/features/admin-listings/components/details/ListingHeroImage'
import ListingQualityPanel from '@/features/admin-listings/components/details/ListingQualityPanel'
import ListingSpecsGrid from '@/features/admin-listings/components/details/ListingSpecsGrid'
import ListingSummaryPanel from '@/features/admin-listings/components/details/ListingSummaryPanel'
import SalesSummaryPanel from '@/features/admin-listings/components/details/SalesSummaryPanel'

type ListingDetailsProps = {
  listing: AdminListing
}

function ListingDetails({ listing }: ListingDetailsProps) {
  const heroImage = listing.primary_image ?? listing.images[0] ?? null
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const heroImageIndex = heroImage
    ? listing.images.findIndex((image) => image.id === heroImage.id)
    : -1

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <ListingHeroImage
          listing={listing}
          heroImage={heroImage}
          imageCount={listing.images.length}
          onOpenGallery={() => setLightboxIndex(Math.max(heroImageIndex, 0))}
        />

        <ListingSummaryPanel listing={listing} />
      </div>

      <ListingQualityPanel listing={listing} />

      <ListingSpecsGrid listing={listing} />

      {listing.status === 'sold' ? (
        <SalesSummaryPanel listing={listing} />
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <ListingFeaturesPanel features={listing.features} />
        <ListingDescriptionPanel description={listing.description} />
      </div>

      <ListingGalleryPanel
        listing={listing}
        images={listing.images}
        onOpenImage={setLightboxIndex}
      />

      {lightboxIndex !== null && listing.images.length > 0 ? (
        <ListingImageLightbox
          images={listing.images}
          initialIndex={lightboxIndex}
          listingTitle={listing.title}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </div>
  )
}

export default ListingDetails
