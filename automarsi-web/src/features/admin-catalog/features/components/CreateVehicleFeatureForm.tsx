import { useState } from 'react'
import FormField from '@/components/admin/FormField'
import { Button } from '@/components/ui/button'
import VehicleFeatureIcon, { vehicleFeatureIconOptions } from './VehicleFeatureIcon'

type CreateVehicleFeatureFormProps = {
  isSubmitting: boolean
  errorMessage: string | null
  onSubmit: (payload: { name: string; icon: string | null }) => Promise<void>
}

function CreateVehicleFeatureForm({
  isSubmitting,
  errorMessage,
  onSubmit,
}: CreateVehicleFeatureFormProps) {
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('shield-check')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await onSubmit({
      name,
      icon: icon.trim() ? icon : null,
    })

    setName('')
    setIcon('shield-check')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-lg border bg-card p-4"
    >
      <div>
        <h3 className="text-base font-semibold">Add feature</h3>
        <p className="text-sm text-muted-foreground">
          Create a reusable vehicle feature for listings.
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
            placeholder="Example: Heated seats"
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

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create feature'}
        </Button>
      </div>
    </form>
  )
}

export default CreateVehicleFeatureForm