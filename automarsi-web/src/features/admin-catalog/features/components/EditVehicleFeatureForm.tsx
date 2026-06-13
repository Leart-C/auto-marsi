import { useState } from 'react'
import FormField from '@/components/admin/FormField'
import { Button } from '@/components/ui/button'
import type { AdminVehicleFeature } from '../types'
import VehicleFeatureIcon, { vehicleFeatureIconOptions } from './VehicleFeatureIcon'

type EditVehicleFeatureFormProps = {
  feature: AdminVehicleFeature
  isSubmitting: boolean
  errorMessage: string | null
  onCancel: () => void
  onSubmit: (payload: { name: string; icon: string | null }) => Promise<void>
}

function EditVehicleFeatureForm({
  feature,
  isSubmitting,
  errorMessage,
  onCancel,
  onSubmit,
}: EditVehicleFeatureFormProps) {
  const [name, setName] = useState(feature.name)
  const [icon, setIcon] = useState(feature.icon ?? 'shield-check')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await onSubmit({
      name,
      icon: icon.trim() ? icon : null,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-lg border bg-card p-4"
    >
      <div>
        <h3 className="text-base font-semibold">Edit feature</h3>
        <p className="text-sm text-muted-foreground">
          Rename the feature or choose a clearer icon.
        </p>
      </div>

      {errorMessage ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errorMessage}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        <FormField label="Name">
          <input
            className="h-9 rounded-md border bg-background px-3 text-sm"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </FormField>

        <FormField label="Icon">
          <div className="flex gap-2">
            <span className="grid size-9 shrink-0 place-items-center rounded-md border bg-muted">
              <VehicleFeatureIcon icon={icon} className="size-4" />
            </span>

            <select
              className="h-9 min-w-0 flex-1 rounded-md border bg-background px-3 text-sm"
              value={icon}
              onChange={(event) => setIcon(event.target.value)}
            >
              {vehicleFeatureIconOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </FormField>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save changes'}
        </Button>
      </div>
    </form>
  )
}

export default EditVehicleFeatureForm