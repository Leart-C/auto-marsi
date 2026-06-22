import { CalendarClock, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import FormField from '@/components/admin/FormField'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import AdminListingSelect from '@/features/admin-listings/components/AdminListingSelect'
import type { AdminListing } from '@/features/admin-listings/types'
import type {
  AppointmentFormPayload,
  AppointmentStatus,
} from '../types'

export type AppointmentFormInitialValues = {
  listingId?: number | null
  name?: string
  phone?: string
  email?: string | null
  preferredAt?: string
  message?: string | null
  status?: AppointmentStatus
}

type AppointmentFormDialogProps = {
  open: boolean
  title: string
  description: string
  submitLabel: string
  listings: AdminListing[]
  initialValues?: AppointmentFormInitialValues
  allowedStatuses?: AppointmentStatus[]
  lockCustomer?: boolean
  lockListing?: boolean
  isSubmitting: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (payload: AppointmentFormPayload) => Promise<void>
}

function toLocalDateTime(value?: string): string {
  if (!value) {
    return ''
  }

  const date = new Date(value)
  const offset = date.getTimezoneOffset() * 60_000

  return new Date(date.getTime() - offset).toISOString().slice(0, 16)
}

function nullable(value: string): string | null {
  const trimmed = value.trim()

  return trimmed || null
}

function AppointmentFormDialog({
  open,
  title,
  description,
  submitLabel,
  listings,
  initialValues = {},
  allowedStatuses = ['pending', 'confirmed', 'completed', 'cancelled'],
  lockCustomer = false,
  lockListing = false,
  isSubmitting,
  onOpenChange,
  onSubmit,
}: AppointmentFormDialogProps) {
  const [listingId, setListingId] = useState(
    initialValues.listingId ? String(initialValues.listingId) : ''
  )
  const [name, setName] = useState(initialValues.name ?? '')
  const [phone, setPhone] = useState(initialValues.phone ?? '')
  const [email, setEmail] = useState(initialValues.email ?? '')
  const [preferredAt, setPreferredAt] = useState(
    toLocalDateTime(initialValues.preferredAt)
  )
  const [message, setMessage] = useState(initialValues.message ?? '')
  const [status, setStatus] = useState<AppointmentStatus>(
    initialValues.status ?? allowedStatuses[0]
  )

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await onSubmit({
      listing_id: listingId ? Number(listingId) : null,
      name: name.trim(),
      phone: phone.trim(),
      email: nullable(email),
      preferred_at: new Date(preferredAt).toISOString(),
      message: nullable(message),
      status,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarClock className="size-4" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <FormField label="Listing">
            <AdminListingSelect
              listings={listings}
              value={listingId}
              onChange={setListingId}
              disabled={lockListing}
            />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Customer name">
              <input
                className="h-9 rounded-md border bg-background px-3 text-sm"
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={lockCustomer}
                required
              />
            </FormField>

            <FormField label="Phone">
              <input
                className="h-9 rounded-md border bg-background px-3 text-sm"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                disabled={lockCustomer}
                required
              />
            </FormField>

            <FormField label="Email">
              <input
                className="h-9 rounded-md border bg-background px-3 text-sm"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={lockCustomer}
              />
            </FormField>

            <FormField label="Scheduled date and time">
              <input
                className="h-9 rounded-md border bg-background px-3 text-sm"
                type="datetime-local"
                value={preferredAt}
                min={toLocalDateTime(new Date().toISOString())}
                onChange={(event) => setPreferredAt(event.target.value)}
                required
              />
            </FormField>

            <FormField label="Status">
              <select
                className="h-9 rounded-md border bg-background px-3 text-sm"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as AppointmentStatus)
                }
              >
                {allowedStatuses.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          <FormField label="Notes">
            <textarea
              className="min-h-24 rounded-md border bg-background px-3 py-2 text-sm"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Visit details or customer requests"
            />
          </FormField>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  Saving...
                </>
              ) : (
                submitLabel
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AppointmentFormDialog
