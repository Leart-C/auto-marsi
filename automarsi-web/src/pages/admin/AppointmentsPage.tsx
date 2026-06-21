import { useState } from 'react'
import { RefreshCcw } from 'lucide-react'
import DataTableShell from '@/components/admin/DataTableShell'
import EmptyState from '@/components/admin/EmptyState'
import LoadingState from '@/components/admin/LoadingState'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import AppointmentsTable from '@/features/admin-appointments/components/AppointmentsTable'
import { useAdminAppointments } from '@/features/admin-appointments/hooks/useAdminAppointments'
import type { AppointmentStatus } from '@/features/admin-appointments/types'

function AppointmentsPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<AppointmentStatus | ''>('')
  const [listingId, setListingId] = useState('')

  const {
    appointments,
    total,
    appointmentsQuery,
    updateStatusMutation,
    errorMessage,
  } = useAdminAppointments({ search, status, listingId })

  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Schedule"
        title="Appointments"
        description="Review test drives, visits, and scheduled customer follow-ups."
        action={
          <Button
            type="button"
            variant="outline"
            onClick={() => appointmentsQuery.refetch()}
          >
            <RefreshCcw />
            Refresh
          </Button>
        }
      />

      <DataTableShell
        title="Appointments"
        description={`${total} total appointments`}
      >
        <div className="grid gap-3 border-b p-4 md:grid-cols-3">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, phone, email, notes"
            className="h-9 rounded-lg border bg-background px-3 text-sm"
          />

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as AppointmentStatus | '')
            }
            className="h-9 rounded-lg border bg-background px-3 text-sm"
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <input
            value={listingId}
            onChange={(event) => setListingId(event.target.value)}
            placeholder="Listing ID"
            className="h-9 rounded-lg border bg-background px-3 text-sm"
          />
        </div>

        {appointmentsQuery.isLoading ? (
          <LoadingState label="Loading appointments" />
        ) : null}

        {errorMessage ? (
          <EmptyState
            title="Could not load appointments"
            description={errorMessage}
          />
        ) : null}

        {!appointmentsQuery.isLoading &&
        !errorMessage &&
        appointments.length === 0 ? (
          <EmptyState
            title="No appointments found"
            description="Scheduled customer visits will appear here."
          />
        ) : null}

        {!appointmentsQuery.isLoading &&
        !errorMessage &&
        appointments.length > 0 ? (
          <AppointmentsTable
            appointments={appointments}
            isUpdating={updateStatusMutation.isPending}
            onStatusChange={(appointmentId, nextStatus) =>
              updateStatusMutation.mutate({ appointmentId, nextStatus })
            }
          />
        ) : null}
      </DataTableShell>
    </section>
  )
}

export default AppointmentsPage
