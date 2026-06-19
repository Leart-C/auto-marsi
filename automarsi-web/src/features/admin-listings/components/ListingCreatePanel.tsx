import type { AdminListing } from '../types'
import { useListingCreateForm } from '../hooks/useListingCreateForm'
import ListingForm from './ListingForm'

type ListingCreatePanelProps = {
  onCancel: () => void
  onCreated: (listing: AdminListing) => void
}

function ListingCreatePanel({
  onCancel,
  onCreated,
}: ListingCreatePanelProps) {
  const createForm = useListingCreateForm({ onCreated })

  return (
    <ListingForm
      heading="Add listing"
      description="Add the vehicle details, then continue with its images."
      submitLabel="Save and add images"
      submittingLabel="Saving..."
      showStatus={false}
      formState={createForm.formState}
      isTitleAutomatic={createForm.isTitleAutomatic}
      makes={createForm.makes}
      carModels={createForm.carModels}
      equipment={createForm.equipment.formProps}
      isLoadingOptions={createForm.isLoadingOptions}
      isSubmitting={createForm.isSubmitting}
      errorMessage={createForm.errorMessage}
      onCancel={onCancel}
      onSubmit={createForm.submit}
      onFieldChange={createForm.updateField}
      onUseGeneratedTitle={createForm.useGeneratedTitle}
    />
  )
}

export default ListingCreatePanel
