import type { AdminListing } from '@/features/admin-listings/types'
import { useListingEditForm } from '@/features/admin-listings/hooks/useListingEditForm'
import ListingForm from '@/features/admin-listings/components/ListingForm'

type ListingEditPanelProps = {
  listing: AdminListing
  onCancel: () => void
  onUpdated: () => void
}

function ListingEditPanel({
  listing,
  onCancel,
  onUpdated,
}: ListingEditPanelProps) {
  const editForm = useListingEditForm({
    listing,
    onUpdated,
  })

  return (
    <ListingForm
      heading="Edit listing"
      description="Update vehicle details, pricing, status, and features."
      submitLabel="Save changes"
      submittingLabel="Saving..."
      formState={editForm.formState}
      isTitleAutomatic={editForm.isTitleAutomatic}
      makes={editForm.makes}
      carModels={editForm.carModels}
      equipment={editForm.equipment.formProps}
      isLoadingOptions={editForm.isLoadingOptions}
      isSubmitting={editForm.isSubmitting}
      errorMessage={editForm.errorMessage}
      onCancel={onCancel}
      onSubmit={editForm.submit}
      onFieldChange={editForm.updateField}
      onUseGeneratedTitle={editForm.useGeneratedTitle}
    />
  )
}

export default ListingEditPanel
