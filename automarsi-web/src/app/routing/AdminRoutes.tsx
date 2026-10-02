import { routes } from '@/shared/config/routes'
import { lazy, Suspense } from 'react'
import AdminLayout from '@/app/layouts/AdminLayout'

const AppointmentsPage = lazy(() => import('@/pages/admin/AppointmentsPage'))
const CatalogFeaturesPage = lazy(
  () => import('@/pages/admin/CatalogFeaturesPage')
)
const CatalogMakesPage = lazy(() => import('@/pages/admin/CatalogMakesPage'))
const InquiriesPage = lazy(() => import('@/pages/admin/InquiriesPage'))
const ListingEditPage = lazy(() => import('@/pages/admin/ListingEditPage'))
const ListingImagesPage = lazy(() => import('@/pages/admin/ListingImagesPage'))
const ListingsCreatePage = lazy(
  () => import('@/pages/admin/ListingsCreatePage')
)
const ListingsPage = lazy(() => import('@/pages/admin/ListingsPage'))
const ListingViewPage = lazy(() => import('@/pages/admin/ListingViewPage'))
const OverviewPage = lazy(() => import('@/pages/admin/OverviewPage'))
const SiteMediaPage = lazy(() => import('@/pages/admin/SiteMediaPage'))

type AdminRoutesProps = {
  currentPath: string
  onNavigate: (path: string) => void
}

function getAdminPage(path: string, onNavigate: (path: string) => void) {
  if (path === routes.admin.overview) {
    return <OverviewPage onNavigate={onNavigate} />
  }

  if (path === routes.admin.inquiries) {
    return <InquiriesPage />
  }

  if (path === routes.admin.appointments) {
    return <AppointmentsPage />
  }

  if (path === routes.admin.listings) {
    return <ListingsPage onNavigate={onNavigate} />
  }

  if (path === routes.admin.newListing) {
    return <ListingsCreatePage onNavigate={onNavigate} />
  }

  const listingRouteMatch = path.match(
    /^\/admin\/listings\/(\d+)(?:\/(edit|images))?$/
  )

  if (listingRouteMatch) {
    const [, listingId, action] = listingRouteMatch

    if (action === 'edit') {
      return <ListingEditPage listingId={listingId} onNavigate={onNavigate} />
    }

    if (action === 'images') {
      return <ListingImagesPage listingId={listingId} onNavigate={onNavigate} />
    }

    return <ListingViewPage listingId={listingId} onNavigate={onNavigate} />
  }

  if (path === routes.admin.makes) {
    return <CatalogMakesPage />
  }

  if (path === routes.admin.features) {
    return <CatalogFeaturesPage />
  }

  if (path === routes.admin.siteMedia) {
    return <SiteMediaPage />
  }

  return <OverviewPage onNavigate={onNavigate} />
}

function AdminRoutes({ currentPath, onNavigate }: AdminRoutesProps) {
  return (
    <AdminLayout currentPath={currentPath} onNavigate={onNavigate}>
      <Suspense
        fallback={
          <div className="text-sm text-muted-foreground">Loading page...</div>
        }
      >
        {getAdminPage(currentPath, onNavigate)}
      </Suspense>
    </AdminLayout>
  )
}

export default AdminRoutes
