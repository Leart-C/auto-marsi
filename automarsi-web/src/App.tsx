import { SignInButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import AdminLayout from './layouts/AdminLayout'
import AppointmentsPage from './pages/admin/AppointmentsPage'
import InquiriesPage from './pages/admin/InquiriesPage'
import ListingsPage from './pages/admin/ListingsPage'

function getAdminPage(path: string) {
  if (path === '/admin/inquiries') {
    return <InquiriesPage />
  }

  if (path === '/admin/appointments') {
    return <AppointmentsPage />
  }

  return <ListingsPage />
}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    function handlePopState() {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  function navigateTo(path: string) {
    if (path === currentPath) {
      return
    }

    window.history.pushState(null, '', path)
    setCurrentPath(path)
  }

  return (
    <>
      <SignedOut>
        <main className="grid min-h-screen place-items-center bg-muted/30 p-6">
          <section className="grid w-full max-w-md gap-5 rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
            <div className="grid gap-2">
              <p className="text-xs font-semibold uppercase text-muted-foreground">
                AutoMarsi
              </p>
              <h1 className="text-2xl font-semibold">Admin</h1>
              <p className="text-sm text-muted-foreground">
                Sign in to manage listings, inquiries, and appointments.
              </p>
            </div>

            <SignInButton mode="modal">
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Sign in
              </button>
            </SignInButton>
          </section>
        </main>
      </SignedOut>

      <SignedIn>
        <AdminLayout currentPath={currentPath} onNavigate={navigateTo}>
          {getAdminPage(currentPath)}
        </AdminLayout>
      </SignedIn>
    </>
  )
}

export default App
