import { useState } from 'react'
import FormField from '@/components/admin/FormField'
import { Button } from '@/components/ui/button'

type CreateModelFormProps = {
  makeName: string
  isSubmitting: boolean
  errorMessage: string | null
  onSubmit: (payload: { name: string }) => Promise<void>
}

function CreateModelForm({
  makeName,
  isSubmitting,
  errorMessage,
  onSubmit,
}: CreateModelFormProps) {
  const [name, setName] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await onSubmit({ name })
    setName('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-lg border bg-card p-4"
    >
      <div>
        <h3 className="text-base font-semibold">Add model</h3>
        <p className="text-sm text-muted-foreground">
          Add a model under {makeName}.
        </p>
      </div>

      {errorMessage ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errorMessage}
        </div>
      ) : null}

      <FormField label="Model name">
        <input
          className="h-9 rounded-md border bg-background px-3 text-sm"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="X5"
          required
        />
      </FormField>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create model'}
        </Button>
      </div>
    </form>
  )
}

export default CreateModelForm