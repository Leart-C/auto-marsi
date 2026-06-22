import type { AdminListing } from '../types'

type AdminListingSelectProps = {
  listings: AdminListing[]
  value: string
  onChange: (value: string) => void
  includeAll?: boolean
  disabled?: boolean
  className?: string
}

function AdminListingSelect({
  listings,
  value,
  onChange,
  includeAll = false,
  disabled = false,
  className = 'h-9 rounded-md border bg-background px-3 text-sm',
}: AdminListingSelectProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
      className={className}
    >
      <option value="">
        {includeAll ? 'All listings' : 'No specific listing'}
      </option>
      {listings.map((listing) => (
        <option key={listing.id} value={listing.id}>
          {listing.title}
        </option>
      ))}
    </select>
  )
}

export default AdminListingSelect
