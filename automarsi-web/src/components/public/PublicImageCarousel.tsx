import { ImageIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type PublicImageCarouselImage = {
  id: number | null
  image_url: string | null
  alt_text: string | null
}

type PublicImageCarouselProps = {
  images: PublicImageCarouselImage[]
  label: string
  aspect?: string
  className?: string
}

function PublicImageCarousel({
  images,
  label,
  aspect = 'aspect-[16/6]',
  className,
}: PublicImageCarouselProps) {
  const visibleImages = images.filter((image) => image.image_url)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (visibleImages.length <= 1) {
      return
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % visibleImages.length)
    }, 4500)

    return () => window.clearInterval(intervalId)
  }, [visibleImages.length])

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_30px_90px_rgba(0,0,0,0.35)]',
        aspect,
        className
      )}
    >
      {visibleImages.length > 0 ? (
        <>
          {visibleImages.map((image, index) => (
            <img
              key={image.id ?? image.image_url}
              src={image.image_url ?? ''}
              alt={image.alt_text ?? label}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className={cn(
                'absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out',
                index === activeIndex ? 'opacity-100' : 'opacity-0'
              )}
            />
          ))}

          {visibleImages.length > 1 ? (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full border border-white/10 bg-background/70 px-3 py-2 shadow-sm backdrop-blur-xl">
              {visibleImages.map((image, index) => (
                <button
                  key={image.id ?? image.image_url}
                  type="button"
                  aria-label={`Show image ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'size-2 rounded-full transition',
                    index === activeIndex ? 'bg-primary' : 'bg-white/35'
                  )}
                />
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <div className="grid size-full place-items-center text-muted-foreground">
          <div className="grid justify-items-center gap-2">
            <ImageIcon className="size-8 opacity-55" />
            <span className="text-sm">{label}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default PublicImageCarousel
