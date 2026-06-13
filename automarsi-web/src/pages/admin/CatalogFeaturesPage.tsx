import { Download, Plus } from 'lucide-react'
import DataTableShell from '@/components/admin/DataTableShell'
import EmptyState from '@/components/admin/EmptyState'
import LoadingState from '@/components/admin/LoadingState'
import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import CreateVehicleFeatureForm from '@/features/admin-catalog/features/components/CreateVehicleFeatureForm'
import EditVehicleFeatureForm from '@/features/admin-catalog/features/components/EditVehicleFeatureForm'
import VehicleFeaturesTable from '@/features/admin-catalog/features/components/VehicleFeaturesTable'
import { useVehicleFeaturesCatalog } from '@/features/admin-catalog/features/hooks/useVehicleFeaturesCatalog'

function CatalogFeaturesPage() {
  const {
    features,
    featuresQuery,
    featuresErrorMessage,

    isCreateFeatureOpen,
    setIsCreateFeatureOpen,

    editingFeature,
    setEditingFeature,

    createFeatureMutation,
    createErrorMessage,

    updateFeatureMutation,
    updateErrorMessage,

    deleteFeatureMutation,
    deleteErrorMessage,

    installDefaultsMutation,
    installDefaultsErrorMessage,
  } = useVehicleFeaturesCatalog()

  const isLoading = featuresQuery.isLoading
  const hasFeatures = features.length > 0

  const pageErrorMessage =
    featuresErrorMessage ||
    deleteErrorMessage ||
    installDefaultsErrorMessage

  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Catalog"
        title="Features"
        description="Manage reusable vehicle features for listings."
        action={
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={installDefaultsMutation.isPending}
              onClick={async () => {
                await installDefaultsMutation.mutateAsync()
              }}
            >
              <Download />
              {installDefaultsMutation.isPending
                ? 'Installing...'
                : 'Install defaults'}
            </Button>

            <Button
              type="button"
              onClick={() => {
                setIsCreateFeatureOpen((isOpen) => !isOpen)
                setEditingFeature(null)
              }}
            >
              <Plus />
              {isCreateFeatureOpen ? 'Close' : 'Add feature'}
            </Button>
          </div>
        }
      />

      {pageErrorMessage ? (
        <EmptyState
          title="Something went wrong"
          description={pageErrorMessage}
        />
      ) : null}

      {isCreateFeatureOpen ? (
        <CreateVehicleFeatureForm
          isSubmitting={createFeatureMutation.isPending}
          errorMessage={createErrorMessage}
          onSubmit={async (payload) => {
            await createFeatureMutation.mutateAsync(payload)
          }}
        />
      ) : null}

      {editingFeature ? (
        <EditVehicleFeatureForm
          feature={editingFeature}
          isSubmitting={updateFeatureMutation.isPending}
          errorMessage={updateErrorMessage}
          onCancel={() => setEditingFeature(null)}
          onSubmit={async (payload) => {
            await updateFeatureMutation.mutateAsync({
              featureId: editingFeature.id,
              payload,
            })
          }}
        />
      ) : null}

      <DataTableShell
        title="Vehicle features"
        description="Features like leather seats, navigation, camera, parking sensors, and more."
      >
        {isLoading ? <LoadingState label="Loading vehicle features" /> : null}

        {!isLoading && !pageErrorMessage && !hasFeatures ? (
          <EmptyState
            title="No features found"
            description="Install the default feature set or add your first custom feature."
          />
        ) : null}

        {!isLoading && !pageErrorMessage && hasFeatures ? (
          <VehicleFeaturesTable
            features={features}
            isDeleting={deleteFeatureMutation.isPending}
            onEdit={(feature) => {
              setEditingFeature(feature)
              setIsCreateFeatureOpen(false)
            }}
            onDelete={async (featureId) => {
              await deleteFeatureMutation.mutateAsync(featureId)
            }}
          />
        ) : null}
      </DataTableShell>
    </section>
  )
}

export default CatalogFeaturesPage