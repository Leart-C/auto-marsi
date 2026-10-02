import { routes } from '@/shared/config/routes'
import { SignInButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import { LogIn, ShieldCheck } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { Button } from '@/shared/ui/button'

const AdminRoutes = lazy(() => import('@/app/routing/AdminRoutes'))
const PublicRoutes = lazy(() => import('@/app/routing/PublicRoutes'))

type AppRouterProps = {
  currentPath: string
  onNavigate: (path: string) => void
}

function AppRouter({ currentPath, onNavigate }: AppRouterProps) {
  if (!currentPath.startsWith(routes.admin.overview)) {
    return (
      <Suspense
        fallback={
          <main className="grid min-h-screen place-items-center text-sm text-muted-foreground">
            Loading...
          </main>
        }
      >
        <PublicRoutes currentPath={currentPath} onNavigate={onNavigate} />
      </Suspense>
    )
  }

  if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    return (
      <main className="grid min-h-screen place-content-center gap-4 p-8 text-center">
        <ShieldCheck className="mx-auto size-10 text-primary" />
        <h1 className="text-2xl font-semibold">Admin sign-in is unavailable</h1>
        <p className="text-muted-foreground">
          The authentication configuration needs to be completed.
        </p>
        <Button onClick={() => onNavigate(routes.home)}>Back to showroom</Button>
      </main>
    )
  }

  return (
    <>
      <SignedOut>
        <main className="grid min-h-screen place-items-center bg-muted/30 p-6">
          <section className="grid w-full max-w-md gap-5 rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
            <div className="grid gap-2">
              <div className="mb-2 grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                <ShieldCheck className="size-5" />
              </div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">
                AutoMarsi
              </p>
              <h1 className="text-2xl font-semibold">Admin</h1>
              <p className="text-sm text-muted-foreground">
                Sign in to manage listings, inquiries, and appointments.
              </p>
            </div>

            <SignInButton mode="modal">
              <Button type="button" size="lg">
                <LogIn />
                Sign in
              </Button>
            </SignInButton>
          </section>
        </main>
      </SignedOut>

      <SignedIn>
        <Suspense
          fallback={
            <main className="grid min-h-screen place-items-center bg-background text-sm text-muted-foreground">
              Loading admin...
            </main>
          }
        >
          <AdminRoutes currentPath={currentPath} onNavigate={onNavigate} />
        </Suspense>
      </SignedIn>
    </>
  )
}

export default AppRouter
