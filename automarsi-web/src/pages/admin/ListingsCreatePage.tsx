import { useAuth } from '@clerk/clerk-react'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import EmptyState from '@/components/admin/EmptyState'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import ListingCreatePanel from '@/features/admin-listings/components/ListingCreatePanel'

type ListingsCreatePageProps = {
  onNavigate: (path: string) => void
}

function ListingsCreatePage({ onNavigate }: ListingsCreatePageProps) {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [token, setToken] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function loadToken() {
      if (!isLoaded) {
        return
      }

      if (!isSignedIn) {
        setErrorMessage('Please sign in before creating a listing.')
        return
      }

      const nextToken = await getToken()

      if (!nextToken) {
        setErrorMessage('Please sign in again before creating a listing.')
        return
      }

      setToken(nextToken)
    }

    void loadToken()
  }, [getToken, isLoaded, isSignedIn])

  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Inventory"
        title="Add listing"
        description="Create a new vehicle listing for the dealership inventory."
        action={
          <Button
            type="button"
            variant="outline"
            onClick={() => onNavigate('/admin/listings')}
          >
            <ArrowLeft />
            Back to listings
          </Button>
        }
      />

      {errorMessage ? (
        <EmptyState
          title="Could not prepare listing form"
          description={errorMessage}
        />
      ) : null}

      {!errorMessage && token ? (
        <ListingCreatePanel
          token={token}
          onCancel={() => onNavigate('/admin/listings')}
          onCreated={() => onNavigate('/admin/listings')}
        />
      ) : null}
    </section>
  )
}

export default ListingsCreatePage
