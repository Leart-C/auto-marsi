import type { AdminListing } from '../types'

export type ListingQualityCheck = {
  key: string
  label: string
  passed: boolean
}

export type ListingQualityResult = {
  score: number
  requiredChecks: ListingQualityCheck[]
  recommendedChecks: ListingQualityCheck[]
  missingRequiredCount: number
  missingRecommendedCount: number
  canPublish: boolean
}

function hasText(value: string | null | undefined): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function hasNumber(value: number | null | undefined) {
  return typeof value === 'number' && Number.isFinite(value)
}

function hasMoneyValue(value: string | null | undefined) {
  if (!hasText(value)) {
    return false
  }

  return Number(value) > 0
}

function hasUsefulDescription(description: string | null) {
  if (!hasText(description)) {
    return false
  }

  return description.trim().length >= 80
}

export function getListingQuality(
  listing: AdminListing
): ListingQualityResult {
  const requiredChecks: ListingQualityCheck[] = [
    {
      key: 'title',
      label: 'Title is added',
      passed: hasText(listing.title),
    },
    {
      key: 'make',
      label: 'Make is selected',
      passed: listing.make !== null,
    },
    {
      key: 'car_model',
      label: 'Model is selected',
      passed: listing.car_model !== null,
    },
    {
      key: 'year',
      label: 'Year is added',
      passed: hasNumber(listing.year),
    },
    {
      key: 'price',
      label: 'Price is added',
      passed: hasMoneyValue(listing.price),
    },
    {
      key: 'fuel_type',
      label: 'Fuel type is selected',
      passed: hasText(listing.fuel_type),
    },
    {
      key: 'transmission',
      label: 'Transmission is selected',
      passed: hasText(listing.transmission),
    },
    {
      key: 'images',
      label: 'At least one image is uploaded',
      passed: listing.images.length > 0,
    },
    {
      key: 'primary_image',
      label: 'Primary image is selected',
      passed: listing.primary_image !== null,
    },
  ]

  const recommendedChecks: ListingQualityCheck[] = [
    {
      key: 'description',
      label: 'Description is detailed enough',
      passed: hasUsefulDescription(listing.description),
    },
    {
      key: 'image_count',
      label: 'Three or more images are uploaded',
      passed: listing.images.length >= 3,
    },
    {
      key: 'features',
      label: 'At least three features are selected',
      passed: listing.features.length >= 3,
    },
    {
      key: 'body_type',
      label: 'Body type is added',
      passed: hasText(listing.body_type),
    },
    {
      key: 'color',
      label: 'Color is added',
      passed: hasText(listing.color),
    },
    {
      key: 'location',
      label: 'Location is added',
      passed: hasText(listing.location),
    },
    {
      key: 'engine_size',
      label: 'Engine size is added',
      passed: hasText(listing.engine_size),
    },
    {
      key: 'horsepower',
      label: 'Horsepower is added',
      passed: hasNumber(listing.horsepower),
    },
    {
      key: 'vin',
      label: 'VIN is added',
      passed: hasText(listing.vin),
    },
    {
      key: 'registration_until',
      label: 'Registration date is added',
      passed: hasText(listing.registration_until),
    },
  ]

  if (listing.status === 'sold') {
    recommendedChecks.push(
      {
        key: 'purchase_price',
        label: 'Purchase price is added for sold listing',
        passed: hasMoneyValue(listing.purchase_price),
      },
      {
        key: 'sale_price',
        label: 'Sale price is added for sold listing',
        passed: hasMoneyValue(listing.sale_price),
      },
      {
        key: 'sales_expenses',
        label: 'Sales expenses are reviewed',
        passed: listing.sales_expenses !== null,
      }
    )
  }

  const missingRequiredCount = requiredChecks.filter(
    (check) => !check.passed
  ).length
  const missingRecommendedCount = recommendedChecks.filter(
    (check) => !check.passed
  ).length

  const requiredScore =
    requiredChecks.length === 0
      ? 0
      : requiredChecks.filter((check) => check.passed).length /
        requiredChecks.length

  const recommendedScore =
    recommendedChecks.length === 0
      ? 0
      : recommendedChecks.filter((check) => check.passed).length /
        recommendedChecks.length

  const score = Math.round(requiredScore * 70 + recommendedScore * 30)

  return {
    score,
    requiredChecks,
    recommendedChecks,
    missingRequiredCount,
    missingRecommendedCount,
    canPublish: missingRequiredCount === 0,
  }
}
