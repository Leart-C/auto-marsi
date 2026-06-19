import { ArrowLeft } from 'lucide-react'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import ListingCreatePanel from '@/features/admin-listings/components/ListingCreatePanel'

type ListingsCreatePageProps = {
  onNavigate: (path: string) => void
}

function ListingsCreatePage({ onNavigate }: ListingsCreatePageProps) {
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

      <ListingCreatePanel
        onCancel={() => onNavigate('/admin/listings')}
        onCreated={() => onNavigate('/admin/listings')}
      />
    </section>
  )
}

export default ListingsCreatePage
