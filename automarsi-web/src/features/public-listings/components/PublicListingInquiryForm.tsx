import { useState } from 'react'
import { toast } from 'sonner'
import { Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCreatePublicInquiry } from '@/features/public-inquiries/hooks/useCreatePublicInquiry'

type PublicListingInquiryFormProps = {
  listingId: number
}

type InquiryIntent = 'question' | 'viewing' | 'financing'

type InquiryFormState = {
  name: string
  phone: string
  email: string
  intent: InquiryIntent
  message: string
}

const intentLabels: Record<InquiryIntent, string> = {
  question: 'Ask a question',
  viewing: 'Book a viewing',
  financing: 'Discuss financing',
}

const initialFormState: InquiryFormState = {
  name: '',
  phone: '',
  email: '',
  intent: 'question',
  message: '',
}

const inputClassName =
  'h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50'

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

    const intentLabel = intentLabels[formState.intent]

    const message = [
      `Intent: ${intentLabel}`,
      '',
      formState.message ? `Customer message: ${formState.message}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    try {
      await createInquiryMutation.mutateAsync({
        listing_id: listingId,
        name: formState.name,
        phone: formState.phone,
        email: formState.email || null,
        message,
        source: 'listing_details',
      })

      setFormState(initialFormState)
      toast.success('Inquiry sent successfully.')
    } catch {
      // Inline error state below handles the message.
    }
  }

  const errorMessage =
    createInquiryMutation.error instanceof Error
      ? createInquiryMutation.error.message
      : null

  return (
    <form
      onSubmit={submitInquiry}
      className="grid gap-4 rounded-xl border bg-card p-5 text-card-foreground"
    >
      <div>
        <h2 className="text-lg font-semibold">Ask about this vehicle</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Leave your details and the team will follow up.
        </p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" />
          Usually within business hours.
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
          className={inputClassName}
        />
      </label>

      <label className="grid gap-1.5 text-sm font-medium">
        Phone
        <input
          value={formState.phone}
          onChange={(event) => updateField('phone', event.target.value)}
          required
          placeholder="+383 ..."
          className={inputClassName}
        />
      </label>

      <label className="grid gap-1.5 text-sm font-medium">
        Email
        <input
          value={formState.email}
          onChange={(event) => updateField('email', event.target.value)}
          type="email"
          placeholder="you@example.com"
          className={inputClassName}
        />
      </label>

      <label className="grid gap-1.5 text-sm font-medium">
        I want to
        <select
          value={formState.intent}
          onChange={(event) =>
            updateField('intent', event.target.value as InquiryIntent)
          }
          className={inputClassName}
        >
          <option value="question">Ask a question</option>
          <option value="viewing">Book a viewing</option>
          <option value="financing">Discuss financing</option>
        </select>
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
        <Send className="size-4" />
        {createInquiryMutation.isPending ? 'Sending...' : 'Send inquiry'}
      </Button>
    </form>
  )
}

export default PublicListingInquiryForm
