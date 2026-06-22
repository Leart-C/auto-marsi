import { useState } from 'react'
import { CalendarPlus, Eye, MoreHorizontal } from 'lucide-react'
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
import type { AdminInquiry, InquiryStatus } from '../types'
import { inquiryStatuses } from '../types'
import InquiryStatusBadge from './InquiryStatusBadge'

type InquiriesTableProps = {
  inquiries: AdminInquiry[]
  onStatusChange: (inquiryId: number, status: InquiryStatus) => void
  isUpdating: boolean
  onScheduleAppointment: (inquiry: AdminInquiry) => void
}

function formatDate(value: string | null): string {
  if (!value) {
    return '-'
  }

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function formatListing(inquiry: AdminInquiry): string {
  return inquiry.listing?.title ?? 'No listing'
}

function InquiriesTable({
  inquiries,
  onStatusChange,
  isUpdating,
  onScheduleAppointment,
}: InquiriesTableProps) {
  const [selectedInquiry, setSelectedInquiry] = useState<AdminInquiry | null>(
    null
  )

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="min-w-48">Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="min-w-64">Message</TableHead>
              <TableHead>Listing</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-12 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow key={inquiry.id} className="h-14">
                <TableCell className="font-medium">{inquiry.name}</TableCell>
                <TableCell>
                  <div className="grid gap-0.5 text-sm">
                    <span>{inquiry.phone}</span>
                    <span className="text-xs text-muted-foreground">
                      {inquiry.email ?? 'No email'}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="max-w-80 truncate text-muted-foreground">
                  {inquiry.message ?? '-'}
                </TableCell>
                <TableCell>{formatListing(inquiry)}</TableCell>
                <TableCell>
                  <InquiryStatusBadge status={inquiry.status} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(inquiry.created_at)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={`Open actions for inquiry from ${inquiry.name}`}
                        >
                          <MoreHorizontal />
                        </Button>
                      }
                    />

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setSelectedInquiry(inquiry)}
                        className="gap-2"
                      >
                        <Eye className="size-4 text-muted-foreground" />
                        View details
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => onScheduleAppointment(inquiry)}
                        disabled={inquiry.has_appointment}
                        className="gap-2"
                      >
                        <CalendarPlus className="size-4 text-muted-foreground" />
                        Schedule appointment
                      </DropdownMenuItem>

                      {inquiryStatuses.map((status) => (
                        <DropdownMenuItem
                          key={status}
                          disabled={isUpdating || inquiry.status === status}
                          onClick={() => onStatusChange(inquiry.id, status)}
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
        open={Boolean(selectedInquiry)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedInquiry(null)
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedInquiry?.name}</DialogTitle>
            <DialogDescription>
              Inquiry details and customer message.
            </DialogDescription>
          </DialogHeader>

          {selectedInquiry ? (
            <div className="grid gap-3 text-sm">
              <p>
                <strong>Phone:</strong> {selectedInquiry.phone}
              </p>
              <p>
                <strong>Email:</strong> {selectedInquiry.email ?? '-'}
              </p>
              <p>
                <strong>Listing:</strong> {formatListing(selectedInquiry)}
              </p>
              <p>
                <strong>Status:</strong> {selectedInquiry.status}
              </p>
              <p>
                <strong>Created:</strong>{' '}
                {formatDate(selectedInquiry.created_at)}
              </p>
              <p className="whitespace-pre-wrap">
                <strong>Message:</strong> {selectedInquiry.message ?? '-'}
              </p>

              {!selectedInquiry.has_appointment ? (
                <Button
                  type="button"
                  onClick={() => {
                    onScheduleAppointment(selectedInquiry)
                    setSelectedInquiry(null)
                  }}
                >
                  <CalendarPlus />
                  Schedule appointment
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground">
                  An appointment has already been scheduled.
                </p>
              )}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default InquiriesTable
