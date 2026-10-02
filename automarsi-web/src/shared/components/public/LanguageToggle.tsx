import { Languages } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import type { Language } from '@/i18n/messages/index'
import { useI18n } from '@/i18n/useI18n'

const languages: Array<{ value: Language; label: string }> = [
  { value: 'en', label: 'EN' },
  { value: 'sq', label: 'SH' },
]

function LanguageToggle() {
  const { language, messages, setLanguage } = useI18n()

  return (
    <div
      className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] p-1 shadow-xs backdrop-blur-xl"
      aria-label={messages.common.language}
    >
      <Languages className="ml-2 size-3.5 text-muted-foreground" />
      {languages.map((option) => (
        <Button
          key={option.value}
          type="button"
          size="sm"
          variant={language === option.value ? 'default' : 'ghost'}
          className="h-9 min-w-10 rounded-full px-2.5 text-xs md:h-7 md:min-w-0"
          aria-pressed={language === option.value}
          onClick={() => setLanguage(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}

export default LanguageToggle
