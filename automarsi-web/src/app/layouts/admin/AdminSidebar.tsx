import { adminNavigationSections } from './navigation'
import { routes } from '@/shared/config/routes'
import { ArrowUpRight } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils'

type AdminSidebarProps = {
  currentPath: string
  onNavigate: (path: string) => void
}

function AdminSidebar({ currentPath, onNavigate }: AdminSidebarProps) {
  const { user } = useUser()
  const email = user?.primaryEmailAddress?.emailAddress ?? ''
  const emailName = email.split('@')[0] ?? ''
  const displayName =
    user?.fullName?.trim() || user?.username?.trim() || emailName || 'Admin'
  const initialParts =
    user?.firstName || user?.lastName
      ? [user?.firstName, user?.lastName].filter(Boolean)
      : emailName.split(/[._-]+/).filter(Boolean)
  const initials =
    initialParts
      .map((part) => part?.[0] ?? '')
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'A'

  return (
    <aside className="sticky top-0 flex h-screen flex-col bg-sidebar p-3 text-sidebar-foreground max-md:h-full">
      <Button
        type="button"
        variant="ghost"
        className="mb-5 h-auto w-full justify-start gap-3 rounded-xl px-2 py-2 text-[15px] font-bold text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        onClick={() => onNavigate(routes.admin.overview)}
      >
        <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
          <span className="text-sm font-black italic">M</span>
        </span>
        <span className="grid gap-0.5 text-left leading-none">
          <span>AutoMarsi</span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/45">
            Admin console
          </span>
        </span>
      </Button>

      <div className="admin-scrollbar flex-1 overflow-y-auto py-2 max-md:overflow-visible">
        <div className="grid gap-5">
          {adminNavigationSections.map((section) => (
            <div key={section.label}>
              <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.22em] text-sidebar-foreground/40">
                {section.label}
              </p>

              <nav className="grid gap-1">
                {section.items.map((item) => {
                  const isActive =
                    currentPath === item.href ||
                    (item.href !== routes.admin.overview &&
                      currentPath.startsWith(`${item.href}/`)) ||
                    (item.href === routes.admin.makes &&
                      currentPath === routes.admin.models)

                  return (
                    <Button
                      type="button"
                      key={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      variant={isActive ? 'secondary' : 'ghost'}
                      onClick={() => onNavigate(item.href)}
                      className={cn(
                        'group h-10 w-full justify-start gap-2.5 rounded-xl px-2 text-[14px] font-semibold',
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                      )}
                    >
                      <span
                        className={
                          isActive
                            ? 'grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground'
                            : 'grid size-7 place-items-center rounded-lg text-sidebar-foreground/55 transition-colors group-hover:text-sidebar-accent-foreground'
                        }
                      >
                        <item.icon className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1 text-left">
                        {item.label}
                      </span>
                    </Button>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      <a
        href="/"
        target="_blank"
        rel="noreferrer"
        className="mb-4 flex items-center justify-between rounded-xl border border-sidebar-border px-3 py-3 text-xs text-sidebar-foreground/70 hover:text-sidebar-foreground"
      >
        View live showroom
        <ArrowUpRight className="size-4" />
      </a>
      <div className="rounded-xl border border-sidebar-border bg-white/5 p-3 text-xs text-sidebar-foreground/65">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-[#d2f86a]/15 text-[#d2f86a]">
            {initials}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold text-sidebar-foreground">
              {displayName}
            </span>
            <span className="block truncate">Admin</span>
          </span>
        </div>
      </div>
    </aside>
  )
}

export default AdminSidebar
