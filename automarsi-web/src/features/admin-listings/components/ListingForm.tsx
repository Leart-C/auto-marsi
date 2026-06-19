import { LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ListingFormState } from '../form/listingFormState'
import type { ListingEquipmentFormProps } from '../hooks/useListingEquipment'
import type {
  ListingCarModelOption,
  ListingMakeOption,
} from '../types'
import ListingEquipmentFields from './form/ListingEquipmentFields'
import ListingNotesFields from './form/ListingNotesFields'
import ListingSaleFields from './form/ListingSaleFields'
import ListingSpecificationFields from './form/ListingSpecificationFields'
import ListingVehicleFields from './form/ListingVehicleFields'

type ListingFormProps = {
  formState: ListingFormState
  makes: ListingMakeOption[]
  carModels: ListingCarModelOption[]
  equipment: ListingEquipmentFormProps
  isTitleAutomatic: boolean
  isLoadingOptions: boolean
  isSubmitting: boolean
  errorMessage: string | null
  heading: string
  description: string
  submitLabel: string
  submittingLabel: string
  showStatus?: boolean
  onCancel: () => void
  onUseGeneratedTitle: () => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onFieldChange: (
    field: keyof ListingFormState,
    value: string
  ) => void | Promise<void>
}

function ListingForm({
  heading,
  description,
  submitLabel,
  submittingLabel,
  showStatus = true,
  formState,
  makes,
  carModels,
  equipment,
  isTitleAutomatic,
  isLoadingOptions,
  isSubmitting,
  errorMessage,
  onCancel,
  onUseGeneratedTitle,
  onSubmit,
  onFieldChange,
}: ListingFormProps) {
  const selectedCarModel =
    carModels.find(
      (carModel) => String(carModel.id) === formState.carModelId
    ) ?? null

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 rounded-lg border bg-card p-4 sm:p-5"
    >
      <div>
        <h3 className="text-lg font-semibold">{heading}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {errorMessage ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errorMessage}
        </div>
      ) : null}

      <ListingVehicleFields
        formState={formState}
        makes={makes}
        carModels={carModels}
        isLoadingOptions={isLoadingOptions}
        isTitleAutomatic={isTitleAutomatic}
        onUseGeneratedTitle={onUseGeneratedTitle}
        onFieldChange={onFieldChange}
      />

      <ListingSaleFields
        formState={formState}
        showStatus={showStatus}
        onFieldChange={onFieldChange}
      />

      <ListingSpecificationFields
        formState={formState}
        onFieldChange={onFieldChange}
      />

      <ListingEquipmentFields
        modelName={selectedCarModel?.name ?? null}
        formState={formState}
        equipment={equipment}
      />

      <ListingNotesFields
        formState={formState}
        onFieldChange={onFieldChange}
      />

      <div className="sticky bottom-0 -mx-4 -mb-4 flex flex-wrap justify-end gap-2 border-t bg-card/95 px-4 py-3 backdrop-blur sm:-mx-5 sm:-mb-5 sm:px-5">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoaderCircle className="animate-spin" />
              {submittingLabel}
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  )
}

export default ListingForm
