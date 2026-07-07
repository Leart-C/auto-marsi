import {
  ArrowRight,
  Car,
  MessageSquare,
  ReceiptText,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import PublicMediaFrame from '@/components/public/PublicMediaFrame'
import PublicMobileQuickActions from '@/components/public/PublicMobileQuickActions'
import PublicMobileSearch from '@/components/public/PublicMobileSearch'
import PublicSection from '@/components/public/PublicSection'
import PublicSectionHeader from '@/components/public/PublicSectionHeader'
import PublicStatsBand from '@/components/public/PublicStatsBand'
import PublicValueList from '@/components/public/PublicValueList'
import { Button } from '@/components/ui/button'
import supraHeroImage from '@/assets/home-hero-supra.jpg'
import FeaturedListingsSection from '@/features/public-listings/components/FeaturedListingsSection'
import RecentlySoldSection from '@/features/public-listings/components/RecentlySoldSection'
import { usePublicStats } from '@/features/public-stats/hooks/usePublicStats'
import { usePublicSiteMedia } from '@/features/site-media/hooks/usePublicSiteMedia'
import { useI18n } from '@/i18n/useI18n'

type HomePageProps = {
  onNavigate: (path: string) => void
}

function HomePage({ onNavigate }: HomePageProps) {
  const { messages } = useI18n()
  const { stats } = usePublicStats()
  const homeHeroMediaQuery = usePublicSiteMedia('home_hero')
  const homeHeroMedia = homeHeroMediaQuery.data?.[0]

  function formatStat(value: number | undefined) {
    if (value === undefined) {
      return '...'
    }

    return new Intl.NumberFormat().format(value)
  }

  return (
    <div className="grid gap-0">
      <PublicSection className="relative overflow-hidden pt-10 lg:pt-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_20%_0%,rgba(213,162,56,0.22),transparent_36%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_32%)]" />

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.9fr)] lg:items-center">
          <div className="grid gap-6">
            <div className="grid gap-4 md:hidden">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">
                  {messages.home.mobileWelcome}
                </p>
                <h1 className="mt-2 text-5xl font-black uppercase tracking-[-0.06em]">
                  Auto
                  <span className="block text-primary">Marsi</span>
                </h1>
              </div>

              <PublicMobileSearch
                readOnly
                placeholder={messages.home.mobileSearchPlaceholder}
                onClick={() => onNavigate('/inventory')}
              />
            </div>

            <div className="hidden md:block">
              <PublicSectionHeader
                eyebrow={messages.home.heroEyebrow}
                title={messages.home.heroTitle}
                description={messages.home.heroDescription}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="button" size="lg" onClick={() => onNavigate('/inventory')}>
                {messages.home.browseInventory}
                <ArrowRight className="size-4" />
              </Button>

              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={() => onNavigate('/contact')}
              >
                {messages.home.contactTeam}
              </Button>
            </div>

            <PublicMobileQuickActions
              onNavigate={onNavigate}
              items={[
                {
                  title: messages.nav.financing,
                  description: messages.home.mobileFinancingAction,
                  icon: ReceiptText,
                  path: '/financing',
                },
                {
                  title: messages.nav.contact,
                  description: messages.home.mobileContactAction,
                  icon: MessageSquare,
                  path: '/contact',
                },
              ]}
            />

            <div className="hidden flex-wrap gap-3 pt-2 text-sm text-muted-foreground md:flex">
              {[messages.home.selectedActiveVehicles, messages.home.showroomFollowUp, messages.footer.financingGuidance].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 shadow-xs backdrop-blur-xl"
                >
                  <span className="size-1.5 rounded-full bg-primary" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden gap-4 md:grid">
            <PublicMediaFrame
              src={homeHeroMedia?.image_url ?? supraHeroImage}
              alt={homeHeroMedia?.alt_text ?? 'AutoMarsi hero vehicle'}
              label="Hero car"
              className="shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
            />
            <p className="px-5 text-xs font-bold uppercase tracking-[0.24em] text-foreground">
              {messages.home.featuredLocation}
            </p>
          </div>
        </div>
      </PublicSection>

      <FeaturedListingsSection onNavigate={onNavigate} />

      <RecentlySoldSection onNavigate={onNavigate} />

      <PublicSection>
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <PublicSectionHeader
            eyebrow={messages.home.whyEyebrow}
            title={messages.home.whyTitle}
            description={messages.home.whyDescription}
          />

          <PublicValueList items={messages.home.trustItems} />
        </div>

        <PublicStatsBand
          className="mt-8"
          items={[
            {
              value: formatStat(stats?.vehicles_in_stock),
              label: messages.home.stats.vehicles,
              icon: <Car className="size-5" />,
            },
            {
              value: '5+',
              label: messages.home.stats.years,
              icon: <ShieldCheck className="size-5" />,
            },
            {
              value: '100+',
              label: messages.home.stats.conversations,
              icon: <MessageSquare className="size-5" />,
            },
            {
              value: '100%',
              label: messages.home.stats.flow,
              icon: <Wrench className="size-5" />,
            },
          ]}
        />
      </PublicSection>
    </div>
  )
}

export default HomePage
