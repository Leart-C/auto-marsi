import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type PublicMediaFrameProps = {
  src?: string | null
  alt?: string
  label?: string
  aspect?: string
  className?: string
}

function PublicMediaFrame({
  src,
  alt = '',
  label,
  aspect = 'aspect-[4/3]',
  className,
}: PublicMediaFrameProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-200/45',
        aspect,
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      ) : (
        <div className="grid size-full place-items-center text-muted-foreground">
          <div className="grid justify-items-center gap-2">
            <ImageIcon className="size-8 opacity-55" />
            {label ? <span className="text-sm">{label}</span> : null}
          </div>
        </div>
      )}
    </div>
  )
}

export default PublicMediaFrame
