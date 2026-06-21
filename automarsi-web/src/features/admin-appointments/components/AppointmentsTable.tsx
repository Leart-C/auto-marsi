import { useState } from 'react'
import { Eye, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { AdminAppointment, AppointmentStatus } from '../types'
import { appointmentStatuses } from '../types'
import AppointmentStatusBadge from './AppointmentStatusBadge'

type AppointmentsTableProps = {
  appointments: AdminAppointment[]
  onStatusChange: (appointmentId: number, status: AppointmentStatus) => void
  isUpdating: boolean
}

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Tirane',
  }).format(new Date(value))
}

function formatListing(appointment: AdminAppointment): string {
  return appointment.listing?.title ?? 'No listing'
}

function AppointmentsTable({
  appointments,
  onStatusChange,
  isUpdating,
}: AppointmentsTableProps) {
  const [selectedAppointment, setSelectedAppointment] =
    useState<AdminAppointment | null>(null)

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="min-w-48">Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Scheduled</TableHead>
              <TableHead>Listing</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="min-w-64">Notes</TableHead>
              <TableHead className="w-12 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id} className="h-14">
                <TableCell className="font-medium">{appointment.name}</TableCell>
                <TableCell>
                  <div className="grid gap-0.5 text-sm">
                    <span>{appointment.phone}</span>
                    <span className="text-xs text-muted-foreground">
                      {appointment.email ?? 'No email'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{formatDateTime(appointment.preferred_at)}</TableCell>
                <TableCell>{formatListing(appointment)}</TableCell>
                <TableCell>
                  <AppointmentStatusBadge status={appointment.status} />
                </TableCell>
                <TableCell className="max-w-80 truncate text-muted-foreground">
                  {appointment.message ?? '-'}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={`Open actions for appointment from ${appointment.name}`}
                        >
                          <MoreHorizontal />
                        </Button>
                      }
                    />

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setSelectedAppointment(appointment)}
                        className="gap-2"
                      >
                        <Eye className="size-4 text-muted-foreground" />
                        View details
                      </DropdownMenuItem>

                      {appointmentStatuses.map((status) => (
                        <DropdownMenuItem
                          key={status}
                          disabled={
                            isUpdating || appointment.status === status
                          }
                          onClick={() =>
                            onStatusChange(appointment.id, status)
                          }
                        >
                          Mark as {status}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={Boolean(selectedAppointment)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedAppointment(null)
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedAppointment?.name}</DialogTitle>
            <DialogDescription>
              Appointment details and scheduled visit notes.
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment ? (
            <div className="grid gap-3 text-sm">
              <p><strong>Phone:</strong> {selectedAppointment.phone}</p>
              <p><strong>Email:</strong> {selectedAppointment.email ?? '-'}</p>
              <p><strong>Listing:</strong> {formatListing(selectedAppointment)}</p>
              <p><strong>Scheduled:</strong> {formatDateTime(selectedAppointment.preferred_at)}</p>
              <p><strong>Status:</strong> {selectedAppointment.status}</p>
              <p className="whitespace-pre-wrap">
                <strong>Notes:</strong> {selectedAppointment.message ?? '-'}
              </p>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AppointmentsTable
