import { routes } from '@/shared/config/routes'
import { Car, Home, MessageSquare } from 'lucide-react'
import { useI18n } from '@/i18n/useI18n'
import { cn } from '@/shared/lib/utils'

type PublicMobileBottomNavProps = {
  currentPath: string
  onNavigate: (path: string) => void
}

function PublicMobileBottomNav({
  currentPath,
  onNavigate,
}: PublicMobileBottomNavProps) {
  const { messages } = useI18n()
  const items = [
    { label: messages.nav.home, path: routes.home, icon: Home },
    { label: messages.nav.inventory, path: routes.inventory, icon: Car },
    { label: messages.nav.contact, path: routes.contact, icon: MessageSquare },
  ]

  return (
    <nav aria-label={messages.common.browse} className="mobile-nav md:hidden">
      <div className="mobile-nav-inner">
        {items.map((item) => {
          const Icon = item.icon
          const isActive =
            item.path === routes.home
              ? currentPath === routes.home
              : currentPath.startsWith(item.path)

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate(item.path)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'mobile-nav-item',
                isActive && 'text-primary'
              )}
            >
              <Icon
                className={cn(
                  'size-5',
                  isActive && 'fill-primary/10 stroke-[2.4]'
                )}
              />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default PublicMobileBottomNav
