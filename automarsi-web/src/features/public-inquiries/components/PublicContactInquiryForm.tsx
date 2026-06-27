import { useState } from 'react'
import { toast } from 'sonner'
import { CheckCircle2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCreatePublicInquiry } from '../hooks/useCreatePublicInquiry'

type ContactIntent =
  | 'General question'
  | 'Book a showroom visit'
  | 'Financing question'
  | 'Vehicle availability'

type ContactInquiryFormState = {
  name: string
  phone: string
  email: string
  intent: ContactIntent
  message: string
}

const initialFormState: ContactInquiryFormState = {
  name: '',
  phone: '',
  email: '',
  intent: 'General question',
  message: '',
}

const intentOptions: ContactIntent[] = [
  'General question',
  'Vehicle availability',
  'Book a showroom visit',
  'Financing question',
]

const inputClassName =
  'h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50'

function buildMessage(formState: ContactInquiryFormState): string {
  const message = formState.message.trim()

  if (!message) {
    return `Contact page intent: ${formState.intent}`
  }

  return `Contact page intent: ${formState.intent}\n\n${message}`
}

function PublicContactInquiryForm() {
  const [formState, setFormState] =
    useState<ContactInquiryFormState>(initialFormState)
  const [wasSubmitted, setWasSubmitted] = useState(false)

  const createInquiryMutation = useCreatePublicInquiry()

  function updateField<K extends keyof ContactInquiryFormState>(
    field: K,
    value: ContactInquiryFormState[K],
  ) {
    setWasSubmitted(false)

    setFormState((currentState) => ({
      ...currentState,
      [field]: value,
    }))
  }

  async function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await createInquiryMutation.mutateAsync(
      {
        listing_id: null,
        name: formState.name.trim(),
        phone: formState.phone.trim(),
        email: formState.email.trim() || null,
        message: buildMessage(formState),
        source: 'contact_page',
      },
      {
        onSuccess: () => {
          setFormState(initialFormState)
          setWasSubmitted(true)
          toast.success('Message sent successfully.')
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
      className="grid gap-4 rounded-xl border bg-card p-5 shadow-sm sm:p-6"
    >
      <div className="grid gap-1">
        <h2 className="text-xl font-semibold tracking-tight">
          Send us a message
        </h2>
        <p className="text-sm text-muted-foreground">
          Share your details and what you need help with.
        </p>
      </div>

      {errorMessage ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      {wasSubmitted ? (
        <div className="flex items-start gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          <span>
            Inquiry sent successfully. The AutoMarsi team will follow up soon.
          </span>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
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
      </div>

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
        What can we help with?
        <select
          value={formState.intent}
          onChange={(event) =>
            updateField('intent', event.target.value as ContactIntent)
          }
          className={inputClassName}
        >
          {intentOptions.map((intent) => (
            <option key={intent} value={intent}>
              {intent}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-1.5 text-sm font-medium">
        Message
        <textarea
          value={formState.message}
          onChange={(event) => updateField('message', event.target.value)}
          placeholder="Tell us what you are looking for..."
          rows={5}
          className="min-h-28 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </label>

      <Button type="submit" disabled={createInquiryMutation.isPending}>
        {createInquiryMutation.isPending ? (
          <>
            <Send className="size-4 animate-pulse" />
            Sending...
          </>
        ) : wasSubmitted ? (
          <>
            <CheckCircle2 className="size-4" />
            Inquiry sent
          </>
        ) : (
          <>
            <Send className="size-4" />
            Send message
          </>
        )}
      </Button>
    </form>
  )
}

export default PublicContactInquiryForm
