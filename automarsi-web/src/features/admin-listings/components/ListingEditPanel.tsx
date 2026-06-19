import type { AdminListing } from '../types'
import { useListingEditForm } from '../hooks/useListingEditForm'
import ListingForm from './ListingForm'

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
      makes={editForm.makes}
      carModels={editForm.carModels}
      vehicleFeatures={editForm.vehicleFeatures}
      isLoadingOptions={editForm.isLoadingOptions}
      isSubmitting={editForm.isSubmitting}
      errorMessage={editForm.errorMessage}
      onCancel={onCancel}
      onSubmit={editForm.submit}
      onFieldChange={editForm.updateField}
      onFeatureToggle={editForm.toggleFeature}
    />
  )
}

export default ListingEditPanel