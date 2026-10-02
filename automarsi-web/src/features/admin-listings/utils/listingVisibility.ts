import { Eye, EyeOff, type LucideIcon } from 'lucide-react'

type ListingVisibilityDetails = {
  label: string
  description: string
  icon: LucideIcon
}

export function getListingVisibilityDetails(
  status: string,
): ListingVisibilityDetails {
  if (status === 'active') {
    return {
      label: 'Public listing',
      description: 'Customers can see this vehicle in the public inventory.',
      icon: Eye,
    }
  }

  if (status === 'sold') {
    return {
      label: 'Sold vehicle',
      description: 'Hidden from public inventory and kept for records.',
      icon: EyeOff,
    }
  }

  if (status === 'archived') {
    return {
      label: 'Internal record',
      description: 'Archived listings stay hidden from customers.',
      icon: EyeOff,
    }
  }

  return {
    label: 'Draft listing',
    description: 'Not visible publicly until it is published.',
    icon: EyeOff,
  }
}
