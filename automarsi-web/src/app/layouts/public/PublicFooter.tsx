import { routes } from '@/shared/config/routes'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useI18n } from '@/i18n/useI18n'

type PublicFooterProps = {
  onNavigate: (path: string) => void
}

function PublicFooter({ onNavigate }: PublicFooterProps) {
  const { messages } = useI18n()
  const inventoryLinks = [
    { label: messages.footer.allVehicles, path: routes.inventory },
    { label: messages.footer.contactTeam, path: routes.contact },
  ]
  const companyLinks = [
    { label: messages.nav.about, path: routes.about },
    { label: messages.nav.services, path: routes.services },
    { label: messages.nav.contact, path: routes.contact },
  ]

  return (
    <footer className="border-t border-white/8 bg-background text-muted-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div className="grid content-start gap-3">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-foreground">
            {messages.common.brand}
          </p>
          <p className="max-w-sm text-sm leading-6 text-slate-400">
            {messages.footer.description}
          </p>
        </div>

        <FooterLinkGroup
          title={messages.footer.inventory}
          links={inventoryLinks}
          onNavigate={onNavigate}
        />

        <FooterLinkGroup
          title={messages.footer.company}
          links={companyLinks}
          onNavigate={onNavigate}
        />

        <div className="grid content-start gap-3">
          <h3 className="text-sm font-semibold text-white">
            {messages.footer.contact}
          </h3>
          <div className="grid gap-2 text-sm text-slate-400">
            <a
              href={`tel:${messages.contact.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 hover:text-primary"
            >
              <Phone className="size-4" />
              {messages.contact.phone}
            </a>
            <a
              href={`mailto:${messages.contact.email}`}
              className="inline-flex items-center gap-2 break-all hover:text-primary"
            >
              <Mail className="size-4" />
              {messages.contact.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" />
              {messages.contact.location}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 px-4 py-4 text-center text-xs text-muted-foreground">
        {messages.footer.copyright}
      </div>
    </footer>
  )
}

type FooterLinkGroupProps = {
  title: string
  links: Array<{
    label: string
    path: string
  }>
  onNavigate: (path: string) => void
}

function FooterLinkGroup({ title, links, onNavigate }: FooterLinkGroupProps) {
  return (
    <div className="grid content-start gap-3">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <div className="grid gap-2">
        {links.map((link) => (
          <button
            key={link.path + link.label}
            type="button"
            onClick={() => onNavigate(link.path)}
            className="w-fit text-left text-sm text-slate-400 transition hover:text-white"
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default PublicFooter
