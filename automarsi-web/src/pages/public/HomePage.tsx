import { routes } from '@/shared/config/routes'
import {
  ArrowDown,
  ArrowUpRight,
  MapPin,
  Search,
  ShieldCheck,
  MessagesSquare,
  CarFront,
} from 'lucide-react'
import { useState } from 'react'
import PublicSection from '@/shared/components/public/PublicSection'
import { Button } from '@/shared/ui/button'
import supraHeroImage from '@/assets/home-hero-supra.jpg'
import FeaturedListingsSection from '@/features/public-listings/components/FeaturedListingsSection'
import RecentlySoldSection from '@/features/public-listings/components/RecentlySoldSection'
import { usePublicSiteMedia } from '@/features/site-media/hooks/usePublicSiteMedia'
import { useI18n } from '@/i18n/useI18n'

type HomePageProps = { onNavigate: (path: string) => void }
const trustIcons = [ShieldCheck, MessagesSquare, CarFront]

function HomePage({ onNavigate }: HomePageProps) {
  const { messages } = useI18n()
  const [search, setSearch] = useState('')
  const { data } = usePublicSiteMedia('home_hero')
  const heroMedia = data?.[0]

  return (
    <div>
      <section className="showroom-hero">
        <div className="showroom-hero-image">
          <img
            src={heroMedia?.image_url ?? supraHeroImage}
            alt={heroMedia?.alt_text ?? 'AutoMarsi'}
            fetchPriority="high"
            onError={(event) => {
              if (
                event.currentTarget.src !==
                new URL(supraHeroImage, window.location.href).href
              ) {
                event.currentTarget.src = supraHeroImage
              }
            }}
          />
        </div>
        <div className="showroom-hero-grid" aria-hidden="true" />
        <div className="showroom-hero-content mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
            <span className="h-px w-8 bg-primary" />
            {messages.home.heroEyebrow}
          </div>
          <h1 className="mt-7 max-w-[720px] text-[clamp(3.3rem,6vw,5.5rem)] font-semibold leading-[0.97] tracking-[-0.065em]">
            {messages.home.heroTitle}
            <br />
            <span className="text-primary">{messages.home.heroAccent}</span>
          </h1>
          <p className="showroom-hero-description mt-6 max-w-sm text-sm leading-7 text-white/65 sm:text-base">
            <span className="md:hidden">
              {messages.home.mobileHeroDescription}
            </span>
            <span className="hidden md:inline">
              {messages.home.heroDescription}
            </span>
          </p>
          <div className="showroom-hero-actions mt-8 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              onClick={() => onNavigate(routes.inventory)}
              className="h-12 rounded-full px-6 font-semibold"
            >
              {messages.home.browseInventory}
              <ArrowUpRight className="ml-3 size-4" />
            </Button>
            <button
              className="hidden items-center gap-2 p-2 text-sm text-white/80 hover:text-primary md:flex"
              onClick={() => onNavigate(routes.contact)}
            >
              {messages.home.contactTeam}
              <ArrowUpRight className="size-4" />
            </button>
          </div>
          <div className="showroom-hero-location mt-12 flex items-center gap-2 text-xs text-white/50">
            <MapPin className="size-3.5" />
            {messages.contact.location}
          </div>
        </div>
        <a
          href="#collection"
          className="showroom-scroll"
          aria-label={messages.home.browseInventory}
        >
          <ArrowDown className="size-4" />
        </a>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <form
          className="showroom-search"
          role="search"
          onSubmit={(event) => {
            event.preventDefault()
            onNavigate(routes.inventorySearch({ search: search.trim() }))
          }}
        >
          <div className="hidden border-r border-white/10 pr-8 md:block">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {messages.home.searchEyebrow}
            </p>
            <p className="mt-1 font-medium">{messages.inventory.title}</p>
          </div>
          <label className="flex min-w-0 flex-1 items-center gap-3">
            <Search className="size-5 shrink-0 text-primary" />
            <span className="sr-only">
              {messages.home.mobileSearchPlaceholder}
            </span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={messages.home.mobileSearchPlaceholder}
              type="search"
              enterKeyHint="search"
              className="h-12 w-full min-w-0 bg-transparent text-base outline-none placeholder:text-muted-foreground md:text-sm"
            />
          </label>
          <Button type="submit" className="h-12 rounded-full px-5">
            <span className="hidden sm:inline">{messages.common.browse}</span>
            <ArrowUpRight className="size-5" />
            <span className="sr-only sm:hidden">{messages.common.browse}</span>
          </Button>
        </form>
      </div>

      <div id="collection" className="scroll-mt-24">
        <FeaturedListingsSection onNavigate={onNavigate} />
      </div>
      <PublicSection className="py-10 sm:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="showroom-eyebrow">{messages.home.whyEyebrow}</p>
            <h2 className="mt-4 max-w-xl text-3xl font-medium tracking-tight sm:text-4xl">
              {messages.home.whyTitle}
            </h2>
          </div>
          <span className="hidden text-xs text-muted-foreground sm:block">
            01 — 03
          </span>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {messages.home.trustItems.map((item, index) => {
            const Icon = trustIcons[index]
            return (
              <div key={item.title} className="showroom-trust-item bg-card p-7">
                <div className="mb-7 flex items-center justify-between">
                  <Icon className="size-6 text-primary" />
                  <span className="font-mono text-xs text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </PublicSection>
      <RecentlySoldSection onNavigate={onNavigate} />
      <PublicSection className="pb-16 pt-8">
        <div className="showroom-visit flex flex-col justify-between gap-8 p-8 sm:p-12 md:flex-row md:items-end">
          <div>
            <p className="showroom-eyebrow">{messages.contact.location}</p>
            <h2 className="mt-5 max-w-xl text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">
              {messages.home.showroomCtaTitle}
            </h2>
          </div>
          <Button
            size="lg"
            className="h-12 w-fit shrink-0 rounded-full px-6"
            onClick={() => onNavigate(routes.contact)}
          >
            {messages.home.contactTeam}
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
      </PublicSection>
    </div>
  )
}
export default HomePage
