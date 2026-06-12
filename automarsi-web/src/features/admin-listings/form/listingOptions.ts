export type ListingSelectOption = {
  label: string
  value: string
}

export const fuelTypeOptions: ListingSelectOption[] = [
  { label: 'Diesel', value: 'diesel' },
  { label: 'Petrol', value: 'petrol' },
  { label: 'Hybrid', value: 'hybrid' },
  { label: 'Electric', value: 'electric' },
]

export const transmissionOptions: ListingSelectOption[] = [
  { label: 'Automatic', value: 'automatic' },
  { label: 'Manual', value: 'manual' },
]

export const conditionOptions: ListingSelectOption[] = [
  { label: 'Used', value: 'used' },
  { label: 'New', value: 'new' },
]

export const listingStatusOptions: ListingSelectOption[] = [
  { label: 'Draft', value: 'draft' },
  { label: 'Active', value: 'active' },
  { label: 'Sold', value: 'sold' },
  { label: 'Archived', value: 'archived' },
]
