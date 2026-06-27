import { Mail, MapPin, Phone } from 'lucide-react'

type PublicFooterProps = {
  onNavigate: (path: string) => void
}

const inventoryLinks = [
  { label: 'All vehicles', path: '/inventory' },
  { label: 'Financing guidance', path: '/financing' },
  { label: 'Contact team', path: '/contact' },
]

const companyLinks = [
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
]

function PublicFooter({ onNavigate }: PublicFooterProps) {
  return (
    <footer className="border-t bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div className="grid content-start gap-3">
          <p className="text-lg font-semibold text-white">
            Auto<span className="text-red-500">Marsi</span>
          </p>
          <p className="max-w-sm text-sm leading-6 text-slate-400">
            Selected vehicles, clear communication, and showroom follow-up for
            drivers across Kosovo.
          </p>
        </div>

        <FooterLinkGroup
          title="Inventory"
          links={inventoryLinks}
          onNavigate={onNavigate}
        />

        <FooterLinkGroup
          title="Company"
          links={companyLinks}
          onNavigate={onNavigate}
        />

        <div className="grid content-start gap-3">
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <div className="grid gap-2 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2">
              <Phone className="size-4" />
              +383 44 123 456
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail className="size-4" />
              info@automarsi.com
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" />
              Prishtina, Kosovo
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-500">
        (c) 2026 AutoMarsi. All rights reserved.
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
