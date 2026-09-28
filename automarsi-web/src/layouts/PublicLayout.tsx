import type { ReactNode } from 'react'
import { useI18n } from '@/i18n/useI18n'
import PublicMobileBottomNav from '@/components/public/PublicMobileBottomNav'
import PublicFooter from '@/components/public/PublicFooter'
import PublicHeader from '@/components/public/PublicHeader'

type PublicLayoutProps = {
  currentPath: string
  onNavigate: (path: string) => void
  children: ReactNode
}

function PublicLayout({
  currentPath,
  onNavigate,
  children,
}: PublicLayoutProps) {
  const { language } = useI18n()
  return (
    <div className="public-shell min-h-screen bg-background text-foreground">
      <PublicHeader currentPath={currentPath} onNavigate={onNavigate} />
      <a href="#main-content" className="skip-link">
        {language === 'sq' ? 'Kalo te përmbajtja' : 'Skip to content'}
      </a>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <div className="pb-24 md:pb-0">
        <PublicFooter onNavigate={onNavigate} />
      </div>
      <PublicMobileBottomNav
        currentPath={currentPath}
        onNavigate={onNavigate}
      />
    </div>
  )
}

export default PublicLayout
