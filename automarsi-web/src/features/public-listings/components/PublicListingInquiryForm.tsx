import { useState } from 'react'
import { toast } from 'sonner'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCreatePublicInquiry } from '@/features/public-inquiries/hooks/useCreatePublicInquiry'

type PublicListingInquiryFormProps = {
  listingId: number
}

type InquiryFormState = {
  name: string
  phone: string
  email: string
  message: string
}

const initialFormState: InquiryFormState = {
  name: '',
  phone: '',
  email: '',
  message: '',
}

function PublicListingInquiryForm({ listingId }: PublicListingInquiryFormProps) {
  const [formState, setFormState] = useState<InquiryFormState>(initialFormState)
  const createInquiryMutation = useCreatePublicInquiry()

  function updateField(field: keyof InquiryFormState, value: string) {
    setFormState((currentState) => ({
      ...currentState,
      [field]: value,
    }))
  }

  async function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await createInquiryMutation.mutateAsync(
      {
        listing_id: listingId,
        name: formState.name,
        phone: formState.phone,
        email: formState.email || null,
        message: formState.message || null,
        source: 'listing_details',
      },
      {
        onSuccess: () => {
          setFormState(initialFormState)
          toast.success('Inquiry sent successfully.')
        },
      },
    )
  }

  const errorMessage =
    createInquiryMutation.error instanceof Error
      ? createInquiryMutation.error.message
      : null

  return (
    <form
      onSubmit={submitInquiry}
      className="grid gap-4 rounded-lg border bg-card p-6"
    >
      <div>
        <h2 className="text-lg font-semibold">Interested in this vehicle?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Send your contact details and AutoMarsi will follow up.
        </p>
      </div>

      {errorMessage ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <label className="grid gap-1.5 text-sm font-medium">
        Name
        <input
          value={formState.name}
          onChange={(event) => updateField('name', event.target.value)}
          required
          placeholder="Your name"
          className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </label>

      <label className="grid gap-1.5 text-sm font-medium">
        Phone
        <input
          value={formState.phone}
          onChange={(event) => updateField('phone', event.target.value)}
          required
          placeholder="+383 ..."
          className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </label>

      <label className="grid gap-1.5 text-sm font-medium">
        Email
        <input
          value={formState.email}
          onChange={(event) => updateField('email', event.target.value)}
          type="email"
          placeholder="you@example.com"
          className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </label>

      <label className="grid gap-1.5 text-sm font-medium">
        Message
        <textarea
          value={formState.message}
          onChange={(event) => updateField('message', event.target.value)}
          placeholder="I am interested in this vehicle..."
          rows={4}
          className="min-h-24 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </label>

      <Button type="submit" disabled={createInquiryMutation.isPending}>
        <Send />
        {createInquiryMutation.isPending ? 'Sending...' : 'Send inquiry'}
      </Button>
    </form>
  )
}

export default PublicListingInquiryForm