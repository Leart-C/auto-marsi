import { AlignLeft } from 'lucide-react'
import FormField from '@/components/admin/FormField'
import type { ListingFormState } from '../../form/listingFormState'
import ListingFormSection from './ListingFormSection'

type ListingNotesFieldsProps = {
  formState: ListingFormState
  onFieldChange: (
    field: keyof ListingFormState,
    value: string
  ) => void | Promise<void>
}

function ListingNotesFields({
  formState,
  onFieldChange,
}: ListingNotesFieldsProps) {
  return (
    <ListingFormSection
      title="Description"
      description="Add useful condition, service, or ownership details."
      icon={AlignLeft}
    >
      <FormField label="Customer-facing description">
        <textarea
          className="min-h-24 rounded-md border bg-background px-3 py-2 text-sm"
          value={formState.description}
          onChange={(event) => {
            void onFieldChange('description', event.target.value)
          }}
          placeholder="Clean vehicle, regularly serviced, two keys..."
        />
      </FormField>
    </ListingFormSection>
  )
}

export default ListingNotesFields
