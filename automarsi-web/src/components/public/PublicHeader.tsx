import { ArrowUpRight, Phone } from 'lucide-react'
import { useI18n } from '@/i18n/useI18n'
import { cn } from '@/lib/utils'
import LanguageToggle from './LanguageToggle'

type PublicHeaderProps = {
  currentPath: string
  onNavigate: (path: string) => void
}

function PublicHeader({ currentPath, onNavigate }: PublicHeaderProps) {
  const { messages } = useI18n()
  const navigationItems = [
    { label: messages.nav.home, path: '/' },
    { label: messages.nav.inventory, path: '/inventory' },
    { label: messages.nav.about, path: '/about' },
    { label: messages.nav.contact, path: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-background/88 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          aria-label={messages.common.brand}
          className="flex h-12 shrink-0 items-center gap-2 text-left"
        >
          <span className="brand-mark" aria-hidden="true">
            M<span />
          </span>
          <span className="text-base font-semibold uppercase tracking-[-0.04em]">
            {messages.common.brand}
          </span>
        </button>

        <nav
          aria-label={messages.common.browse}
          className="hidden items-center gap-1 md:flex"
        >
          {navigationItems.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate(item.path)}
              aria-current={
                currentPath === item.path ||
                (item.path === '/inventory' &&
                  currentPath.startsWith('/inventory/'))
                  ? 'page'
                  : undefined
              }
              className={cn(
                'rounded-full px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-white/8 hover:text-foreground',
                currentPath === item.path && 'bg-white/8 text-foreground',
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 text-xs text-muted-foreground lg:flex">
          <a
            href={`tel:${messages.contact.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 transition hover:border-primary hover:text-primary"
          >
            <Phone className="size-3.5" />
            {messages.contact.phone}
            <ArrowUpRight className="size-3.5" />
          </a>
          <LanguageToggle />
        </div>

        <div className="hidden md:flex lg:hidden">
          <LanguageToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
        </div>
      </div>
    </header>
  )
}

export default PublicHeader
