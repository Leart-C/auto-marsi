import { useState } from 'react'
import { Eye, Images, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import type { AdminListing } from '../types'

type ListingActionsMenuProps = {
  listing: AdminListing
  isDeleting: boolean
  onNavigate: (path: string) => void
  onDelete: (listingId: number) => Promise<void>
}

function ListingActionsMenu({
  listing,
  isDeleting,
  onNavigate,
  onDelete,
}: ListingActionsMenuProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  function handleView() {
    onNavigate(`/admin/listings/${listing.id}`)
  }

  function handleEdit() {
    onNavigate(`/admin/listings/${listing.id}/edit`)
  }

  function handleImages() {
    onNavigate(`/admin/listings/${listing.id}/images`)
  }

  async function confirmDelete() {
    await onDelete(listing.id)
    setIsDeleteDialogOpen(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Open actions for ${listing.title}`}
            >
              <MoreHorizontal />
            </Button>
          }
        />

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleView} className="gap-2">
            <Eye className="size-4 text-muted-foreground" />
            View
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleEdit} className="gap-2">
            <Pencil className="size-4 text-muted-foreground" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleImages} className="gap-2">
            <Images className="size-4 text-muted-foreground" />
            Manage images
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            className="gap-2 text-red-600 focus:text-red-600"
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
            <AlertDialogTitle>Delete this listing?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove "{listing.title}" from the admin inventory and
              public website. This action should only be used for test or
              incorrect listings.
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
                void confirmDelete()
              }}
              className="bg-red-600 text-white hover:bg-red-700"
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
