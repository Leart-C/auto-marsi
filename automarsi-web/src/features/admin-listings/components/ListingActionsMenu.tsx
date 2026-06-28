import { useState } from 'react'
import {
  Archive,
  BadgeDollarSign,
  CheckCircle2,
  Eye,
  Images,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { AdminListingStatusAction } from '../api/updateAdminListingStatus'
import type { AdminListing } from '../types'

type ListingActionsMenuProps = {
  listing: AdminListing
  isDeleting: boolean
  isUpdatingStatus: boolean
  onNavigate: (path: string) => void
  onDelete: (listingId: number) => Promise<void>
  onUpdateStatus: (
    listingId: number,
    status: AdminListingStatusAction,
  ) => Promise<void>
}

function ListingActionsMenu({
  listing,
  isDeleting,
  isUpdatingStatus,
  onNavigate,
  onDelete,
  onUpdateStatus,
}: ListingActionsMenuProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const isActionDisabled = isDeleting || isUpdatingStatus

  async function handleDeleteListing() {
    await onDelete(listing.id)
    setIsDeleteDialogOpen(false)
  }

  async function handleStatusChange(status: AdminListingStatusAction) {
    await onUpdateStatus(listing.id, status)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          type="button"
          disabled={isActionDisabled}
          className={buttonVariants({
            variant: 'ghost',
            size: 'icon',
          })}
        >
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Open listing actions</span>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            className="gap-2"
            onClick={() => onNavigate(`/admin/listings/${listing.id}`)}
          >
            <Eye className="size-4 text-muted-foreground" />
            View
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2"
            onClick={() => onNavigate(`/admin/listings/${listing.id}/edit`)}
          >
            <Pencil className="size-4 text-muted-foreground" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2"
            onClick={() => onNavigate(`/admin/listings/${listing.id}/images`)}
          >
            <Images className="size-4 text-muted-foreground" />
            Manage images
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {listing.status !== 'active' ? (
            <DropdownMenuItem
              disabled={isActionDisabled}
              className="gap-2"
              onClick={() => void handleStatusChange('active')}
            >
              <CheckCircle2 className="size-4 text-muted-foreground" />
              Mark active
            </DropdownMenuItem>
          ) : null}

          {listing.status !== 'sold' ? (
            <DropdownMenuItem
              disabled={isActionDisabled}
              className="gap-2"
              onClick={() => void handleStatusChange('sold')}
            >
              <BadgeDollarSign className="size-4 text-muted-foreground" />
              Mark sold
            </DropdownMenuItem>
          ) : null}

          {listing.status !== 'archived' ? (
            <DropdownMenuItem
              disabled={isActionDisabled}
              className="gap-2"
              onClick={() => void handleStatusChange('archived')}
            >
              <Archive className="size-4 text-muted-foreground" />
              Archive
            </DropdownMenuItem>
          ) : null}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled={isActionDisabled}
            className="gap-2 text-destructive focus:text-destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete listing?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes the listing. Archive or mark it as sold
              if you only want to remove it from the public inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={isDeleting}
              onClick={(event) => {
                event.preventDefault()
                void handleDeleteListing()
              }}
            >
              {isDeleting ? 'Deleting...' : 'Delete listing'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ListingActionsMenu
