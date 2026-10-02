export const listingStatuses = ['draft', 'active', 'sold', 'archived'] as const

export type ListingStatus = (typeof listingStatuses)[number]
