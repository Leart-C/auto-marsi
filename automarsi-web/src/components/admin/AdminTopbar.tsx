import { Menu, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AdminSearchBox from './AdminSearchBox'
import AdminUserButton from './AdminUserButton'

const pageTitles: Record<string, { eyebrow: string; title: string }> = {
  '/admin/site-media': { eyebrow: 'Showroom', title: 'Site media' },
  '/admin': {
    eyebrow: 'AutoMarsi',
    title: 'Overview',
  },
  '/admin/listings': {
    eyebrow: 'Inventory',
    title: 'Listings',
  },
  '/admin/inquiries': {
    eyebrow: 'Customers',
    title: 'Inquiries',
  },
  '/admin/appointments': {
    eyebrow: 'Schedule',
    title: 'Appointments',
  },
  '/admin/catalog/makes': {
    eyebrow: 'Catalog',
    title: 'Makes',
  },
  '/admin/catalog/models': {
    eyebrow: 'Catalog',
    title: 'Models',
  },
  '/admin/catalog/features': {
    eyebrow: 'Catalog',
    title: 'Features',
  },
}

type AdminTopbarProps = {
  currentPath: string
  onNavigate: (path: string) => void
  onOpenMenu: () => void
}

function AdminTopbar({
  currentPath,
  onNavigate,
  onOpenMenu,
}: AdminTopbarProps) {
  const page = currentPath.startsWith('/admin/listings/')
    ? pageTitles['/admin/listings']
    : (pageTitles[currentPath] ?? pageTitles['/admin'])
  const today = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date())

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b bg-background/90 px-5 backdrop-blur-xl lg:px-8 max-md:px-4">
      <div className="flex items-center gap-3">
        <Button
          size="icon"
          variant="outline"
          className="md:hidden"
          aria-label="Open navigation"
          onClick={onOpenMenu}
        >
          <Menu className="size-4" />
        </Button>
        <div className="grid gap-0.5">
          <h1 className="text-lg font-bold tracking-[-0.035em]">
            {page.title}
          </h1>
          <p className="text-[11px] text-muted-foreground">{page.eyebrow}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <AdminSearchBox onNavigate={onNavigate} />
        <span className="hidden rounded-xl border bg-card px-2.5 py-1.5 text-[11px] tabular-nums text-muted-foreground sm:block">
          {today}
        </span>
        <Button
          type="button"
          size="sm"
          className="rounded-full"
          aria-label="Add listing"
          onClick={() => onNavigate('/admin/listings/new')}
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">Add listing</span>
        </Button>
        <AdminUserButton />
      </div>
    </header>
  )
}

export default AdminTopbar
