import { ImagePlus, Upload } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import type { SiteMedia } from '../types'

type SiteMediaUploaderProps = {
  media: SiteMedia | null
  isSubmitting: boolean
  errorMessage: string | null
  onSubmit: (payload: { image: File; altText: string }) => Promise<void>
}

function SiteMediaUploader({
  media,
  isSubmitting,
  errorMessage,
  onSubmit,
}: SiteMediaUploaderProps) {
  const [image, setImage] = useState<File | null>(null)
  const [altText, setAltText] = useState(media?.alt_text ?? '')
  const previewUrl = useMemo(
    () => (image ? URL.createObjectURL(image) : media?.image_url),
    [image, media?.image_url]
  )

  useEffect(() => {
    return () => {
      if (image && previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [image, previewUrl])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!image) {
      return
    }

    await onSubmit({ image, altText })
    setImage(null)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 p-5">
      {errorMessage ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border bg-muted">
        <div className="aspect-[16/6]">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={altText || 'About showroom preview'}
              className="size-full object-cover"
            />
          ) : (
            <div className="grid size-full place-items-center text-muted-foreground">
              <div className="grid justify-items-center gap-2">
                <ImagePlus className="size-8" />
                <span className="text-sm">No About image uploaded yet.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <label className="grid gap-1.5 text-sm font-medium">
          Image
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => setImage(event.target.files?.[0] ?? null)}
            className="h-10 rounded-md border bg-background px-3 py-2 text-sm"
          />
        </label>

        <label className="grid gap-1.5 text-sm font-medium">
          Alt text
          <input
            value={altText}
            onChange={(event) => setAltText(event.target.value)}
            placeholder="AutoMarsi showroom in Prishtina"
            className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </label>

        <Button type="submit" disabled={!image || isSubmitting}>
          <Upload className="size-4" />
          {isSubmitting ? 'Uploading...' : 'Upload image'}
        </Button>
      </div>
    </form>
  )
}

export default SiteMediaUploader
