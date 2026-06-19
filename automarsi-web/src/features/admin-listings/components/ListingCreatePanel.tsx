import { useListingCreateForm } from '../hooks/useListingCreateForm'
import ListingForm from './ListingForm'

type ListingCreatePanelProps = {
  onCancel: () => void
  onCreated: () => void
}

function ListingCreatePanel({
  onCancel,
  onCreated,
}: ListingCreatePanelProps) {
  const createForm = useListingCreateForm({ onCreated })

  return (
    <ListingForm
      heading="Add listing"
      description="Create a vehicle listing for the dealership inventory."
      submitLabel="Create listing"
      submittingLabel="Creating..."
      formState={createForm.formState}
      makes={createForm.makes}
      carModels={createForm.carModels}
      isLoadingOptions={createForm.isLoadingOptions}
      isSubmitting={createForm.isSubmitting}
      errorMessage={createForm.errorMessage}
      onCancel={onCancel}
      onSubmit={createForm.submit}
      onFieldChange={createForm.updateField}
      vehicleFeatures={createForm.vehicleFeatures}
      onFeatureToggle={createForm.toggleFeature}
    />
  )
}

export default ListingCreatePanel
