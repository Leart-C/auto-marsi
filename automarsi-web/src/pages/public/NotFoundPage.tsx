import { RouteOff } from 'lucide-react'
import PublicEmptyState from '@/components/public/PublicEmptyState'
import { useI18n } from '@/i18n/useI18n'

type NotFoundPageProps = {
  onNavigate: (path: string) => void
}

function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  const { messages } = useI18n()

  return (
    <PublicEmptyState
      icon={RouteOff}
      eyebrow={messages.notFoundPage.eyebrow}
      title={messages.notFoundPage.title}
      description={messages.notFoundPage.description}
      primaryActionLabel={messages.notFoundPage.goHome}
      primaryActionPath="/"
      secondaryActionLabel={messages.notFoundPage.viewInventory}
      secondaryActionPath="/inventory"
      onNavigate={onNavigate}
    />
  )
}

export default NotFoundPage
