import { queryPolicy } from '@/shared/config/queryPolicy'
import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/clerk-react'
import { Toaster } from '@/shared/ui/sonner'
import { I18nProvider } from '@/i18n/I18nProvider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: queryPolicy.defaultStaleTime,
      gcTime: queryPolicy.garbageCollectionTime,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

export default function AppProviders({ children }: { children: ReactNode }) {
  const application = (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>{children}</I18nProvider>
      <Toaster position="top-right" richColors closeButton />
    </QueryClientProvider>
  )
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  return publishableKey ? (
    <ClerkProvider publishableKey={publishableKey}>{application}</ClerkProvider>
  ) : (
    application
  )
}
