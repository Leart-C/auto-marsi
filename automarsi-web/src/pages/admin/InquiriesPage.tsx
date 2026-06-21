import { useState } from 'react'
import { RefreshCcw } from 'lucide-react'
import DataTableShell from '@/components/admin/DataTableShell'
import EmptyState from '@/components/admin/EmptyState'
import LoadingState from '@/components/admin/LoadingState'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import InquiriesTable from '@/features/admin-inquiries/components/InquiriesTable'
import { useAdminInquiries } from '@/features/admin-inquiries/hooks/useAdminInquiries'
import type { InquiryStatus } from '@/features/admin-inquiries/types'

function InquiriesPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<InquiryStatus | ''>('')
  const [listingId, setListingId] = useState('')

  const {
    inquiries,
    total,
    inquiriesQuery,
    updateStatusMutation,
    errorMessage,
  } = useAdminInquiries({ search, status, listingId })

  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Customers"
        title="Inquiries"
        description="Track buyer messages and follow-up status from one place."
        action={
          <Button
            type="button"
            variant="outline"
            onClick={() => inquiriesQuery.refetch()}
          >
            <RefreshCcw />
            Refresh
          </Button>
        }
      />

      <DataTableShell
        title="Customer inquiries"
        description={`${total} total inquiries`}
      >
        <div className="grid gap-3 border-b p-4 md:grid-cols-3">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, phone, email, message"
            className="h-9 rounded-lg border bg-background px-3 text-sm"
          />

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as InquiryStatus | '')}
            className="h-9 rounded-lg border bg-background px-3 text-sm"
          >
            <option value="">All statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="closed">Closed</option>
          </select>

          <input
            value={listingId}
            onChange={(event) => setListingId(event.target.value)}
            placeholder="Listing ID"
            className="h-9 rounded-lg border bg-background px-3 text-sm"
          />
        </div>

        {inquiriesQuery.isLoading ? <LoadingState label="Loading inquiries" /> : null}

        {errorMessage ? (
          <EmptyState title="Could not load inquiries" description={errorMessage} />
        ) : null}

        {!inquiriesQuery.isLoading && !errorMessage && inquiries.length === 0 ? (
          <EmptyState
            title="No inquiries found"
            description="Customer inquiries will appear here."
          />
        ) : null}

        {!inquiriesQuery.isLoading && !errorMessage && inquiries.length > 0 ? (
          <InquiriesTable
            inquiries={inquiries}
            isUpdating={updateStatusMutation.isPending}
            onStatusChange={(inquiryId, nextStatus) =>
              updateStatusMutation.mutate({ inquiryId, nextStatus })
            }
          />
        ) : null}
      </DataTableShell>
    </section>
  )
}

export default InquiriesPage
