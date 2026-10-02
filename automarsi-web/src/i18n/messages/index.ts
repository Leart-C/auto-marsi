import { en } from '@/i18n/messages/en'
import { sq } from '@/i18n/messages/sq'

export const messages = {
  en,
  sq,
} as const

export type Language = keyof typeof messages
export type Messages = typeof en

export const defaultLanguage: Language = 'sq'

export function isLanguage(value: string): value is Language {
  return value in messages
}
