import { CarFront, RotateCcw } from 'lucide-react'
import FormField from '@/components/admin/FormField'
import { Button } from '@/components/ui/button'
import type { ListingFormState } from '../../form/listingFormState'
import type {
  ListingCarModelOption,
  ListingMakeOption,
} from '../../types'
import ListingFormSection from './ListingFormSection'

type ListingVehicleFieldsProps = {
  formState: ListingFormState
  makes: ListingMakeOption[]
  carModels: ListingCarModelOption[]
  isLoadingOptions: boolean
  isTitleAutomatic: boolean
  onUseGeneratedTitle: () => void
  onFieldChange: (
    field: keyof ListingFormState,
    value: string
  ) => void | Promise<void>
}

function ListingVehicleFields({
  formState,
  makes,
  carModels,
  isLoadingOptions,
  isTitleAutomatic,
  onUseGeneratedTitle,
  onFieldChange,
}: ListingVehicleFieldsProps) {
  return (
    <ListingFormSection
      title="Vehicle"
      description="Identify the car. The listing title updates automatically."
      icon={CarFront}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <FormField label="Make">
          <select
            className="h-9 rounded-md border bg-background px-3 text-sm"
            value={formState.makeId}
            onChange={(event) => {
              void onFieldChange('makeId', event.target.value)
            }}
            required
            disabled={isLoadingOptions}
          >
            <option value="">Select make</option>
            {makes.map((make) => (
              <option key={make.id} value={make.id}>
                {make.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Model">
          <select
            className="h-9 rounded-md border bg-background px-3 text-sm"
            value={formState.carModelId}
            onChange={(event) => {
              void onFieldChange('carModelId', event.target.value)
            }}
            required
            disabled={!formState.makeId}
          >
            <option value="">Select model</option>
            {carModels.map((carModel) => (
              <option key={carModel.id} value={carModel.id}>
                {carModel.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Year">
          <input
            className="h-9 rounded-md border bg-background px-3 text-sm"
            type="number"
            min="1900"
            max={new Date().getFullYear() + 1}
            value={formState.year}
            onChange={(event) => {
              void onFieldChange('year', event.target.value)
            }}
            required
          />
        </FormField>
      </div>

      <FormField label="Listing title">
        <div className="flex gap-2">
          <input
            className="h-9 min-w-0 flex-1 rounded-md border bg-background px-3 text-sm"
            value={formState.title}
            onChange={(event) => {
              void onFieldChange('title', event.target.value)
            }}
            placeholder="2024 Audi Q5"
            required
          />

          {!isTitleAutomatic ? (
            <Button
              type="button"
              variant="outline"
              size="icon"
              title="Use generated title"
              aria-label="Use generated title"
              onClick={onUseGeneratedTitle}
            >
              <RotateCcw />
            </Button>
          ) : null}
        </div>
      </FormField>
    </ListingFormSection>
  )
}

export default ListingVehicleFields
