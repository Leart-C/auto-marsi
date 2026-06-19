import { ListChecks } from 'lucide-react'
import type { ListingFormState } from '../../form/listingFormState'
import type { ListingEquipmentFormProps } from '../../hooks/useListingEquipment'
import ListingEquipmentPicker from '../ListingEquipmentPicker'
import ListingFormSection from './ListingFormSection'

type ListingEquipmentFieldsProps = {
  modelName: string | null
  formState: ListingFormState
  equipment: ListingEquipmentFormProps
}

function ListingEquipmentFields({
  modelName,
  formState,
  equipment,
}: ListingEquipmentFieldsProps) {
  return (
    <ListingFormSection
      title="Equipment"
      description="Model defaults are selected automatically. Adjust this car."
      icon={ListChecks}
    >
      <ListingEquipmentPicker
        modelName={modelName}
        features={equipment.features}
        suggestions={equipment.suggestions}
        selectedFeatureIds={formState.featureIds}
        isLoading={equipment.isLoading}
        isCreating={equipment.isCreating}
        catalogErrorMessage={equipment.catalogErrorMessage}
        presetErrorMessage={equipment.presetErrorMessage}
        onToggle={equipment.onToggle}
        onCreate={equipment.onCreate}
        onRetry={equipment.onRetry}
      />
    </ListingFormSection>
  )
}

export default ListingEquipmentFields
