import { Plus, Save, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import EmptyState from '@/components/admin/EmptyState'
import LoadingState from '@/components/admin/LoadingState'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import VehicleFeatureIcon from '@/features/admin-catalog/features/components/VehicleFeatureIcon'
import { suggestVehicleFeatureIcon } from '@/features/admin-catalog/features/components/VehicleFeatureIcon'
import VehicleFeatureIconPicker from '@/features/admin-catalog/features/components/VehicleFeatureIconPicker'
import type { AdminVehicleFeature } from '@/features/admin-catalog/features/types'
import { useCarModelFeaturePreset } from '../hooks/useCarModelFeaturePreset'
import type { AdminModel } from '../types'

type ModelFeaturePresetPanelProps = {
  model: AdminModel
  onClose: () => void
}

type ModelFeaturePresetEditorProps = {
  features: AdminVehicleFeature[]
  suggestions: AdminVehicleFeature[]
  isCreating: boolean
  isSaving: boolean
  onCreate: (payload: {
    name: string
    icon: string | null
  }) => Promise<AdminVehicleFeature>
  onSave: (featureIds: number[]) => Promise<void>
}

type CreateMissingFeatureProps = {
  name: string
  isCreating: boolean
  onCreate: (payload: {
    name: string
    icon: string | null
  }) => Promise<AdminVehicleFeature>
  onCreated: (feature: AdminVehicleFeature) => void
}

function CreateMissingFeature({
  name,
  isCreating,
  onCreate,
  onCreated,
}: CreateMissingFeatureProps) {
  const [icon, setIcon] = useState(() => suggestVehicleFeatureIcon(name))

  return (
    <div className="col-span-full grid gap-3 rounded-md border border-dashed bg-muted/20 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Create “{name}”</p>
          <p className="text-xs text-muted-foreground">
            Choose an icon. The new feature will be selected for this preset.
          </p>
        </div>

        <Button
          type="button"
          size="sm"
          disabled={isCreating}
          onClick={async () => {
            try {
              const feature = await onCreate({ name, icon })
              onCreated(feature)
            } catch {
              // The mutation owns the error toast.
            }
          }}
        >
          <Plus />
          {isCreating ? 'Creating...' : 'Create feature'}
        </Button>
      </div>

      <VehicleFeatureIconPicker value={icon} onChange={setIcon} />
    </div>
  )
}

function ModelFeaturePresetEditor({
  features,
  suggestions,
  isCreating,
  isSaving,
  onCreate,
  onSave,
}: ModelFeaturePresetEditorProps) {
  const initialIds = useMemo(
    () => suggestions.map((feature) => feature.id),
    [suggestions]
  )
  const [selectedIds, setSelectedIds] = useState<number[]>(initialIds)
  const [search, setSearch] = useState('')

  const visibleFeatures = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    if (!normalizedSearch) {
      return features
    }

    return features.filter((feature) =>
      feature.name.toLowerCase().includes(normalizedSearch)
    )
  }, [features, search])
  const trimmedSearch = search.trim()
  const hasExactMatch = features.some(
    (feature) =>
      feature.name.trim().toLowerCase() === trimmedSearch.toLowerCase()
  )
  const canCreateFeature = trimmedSearch.length >= 2 && !hasExactMatch

  const selectedIdsSet = new Set(selectedIds)
  const hasChanges =
    selectedIds.length !== initialIds.length ||
    selectedIds.some((id) => !initialIds.includes(id))

  function toggleFeature(featureId: number) {
    setSelectedIds((currentIds) =>
      currentIds.includes(featureId)
        ? currentIds.filter((id) => id !== featureId)
        : [...currentIds, featureId]
    )
  }

  function selectVisibleFeatures() {
    setSelectedIds((currentIds) => [
      ...new Set([
        ...currentIds,
        ...visibleFeatures.map((feature) => feature.id),
      ]),
    ])
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <label className="relative min-w-56 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="h-9 w-full rounded-md border bg-background pl-9 pr-3 text-sm"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search features"
          />
        </label>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={selectVisibleFeatures}
          disabled={visibleFeatures.length === 0}
        >
          Select visible
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setSelectedIds([])}
          disabled={selectedIds.length === 0}
        >
          Clear
        </Button>
      </div>

      <div className="grid max-h-80 gap-2 overflow-y-auto rounded-md border p-3 sm:grid-cols-2 lg:grid-cols-3">
        {visibleFeatures.map((feature) => {
          const isSelected = selectedIdsSet.has(feature.id)

          return (
            <label
              key={feature.id}
              className={
                isSelected
                  ? 'flex cursor-pointer items-center gap-3 rounded-md border border-primary bg-primary/5 p-3'
                  : 'flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-muted/50'
              }
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => toggleFeature(feature.id)}
              />
              <span className="grid size-7 shrink-0 place-items-center rounded-md border bg-background">
                <VehicleFeatureIcon
                  icon={feature.icon}
                  className="size-4"
                />
              </span>
              <span className="min-w-0 truncate text-sm font-medium">
                {feature.name}
              </span>
            </label>
          )
        })}

        {canCreateFeature ? (
          <CreateMissingFeature
            key={trimmedSearch.toLowerCase()}
            name={trimmedSearch}
            isCreating={isCreating}
            onCreate={onCreate}
            onCreated={(feature) => {
              setSelectedIds((currentIds) => [
                ...new Set([...currentIds, feature.id]),
              ])
              setSearch('')
            }}
          />
        ) : null}

        {visibleFeatures.length === 0 && !canCreateFeature ? (
          <p className="col-span-full py-8 text-center text-sm text-muted-foreground">
            No features match this search.
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          {selectedIds.length} suggested feature
          {selectedIds.length === 1 ? '' : 's'} selected.
        </p>

        <Button
          type="button"
          disabled={!hasChanges || isSaving}
          onClick={async () => {
            try {
              await onSave(selectedIds)
            } catch {
              // The mutation owns the error toast.
            }
          }}
        >
          <Save />
          {isSaving ? 'Saving...' : 'Save preset'}
        </Button>
      </div>
    </div>
  )
}

function ModelFeaturePresetPanel({
  model,
  onClose,
}: ModelFeaturePresetPanelProps) {
  const preset = useCarModelFeaturePreset({
    modelId: model.id,
  })

  return (
    <section className="grid gap-4 rounded-lg border bg-card p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold">
            {model.name} feature preset
          </h3>
          <p className="text-sm text-muted-foreground">
            Choose the features that should be suggested when this model is
            selected. Admins can still change them on each listing.
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close feature preset"
        >
          <X />
        </Button>
      </div>

      {preset.isLoading ? (
        <LoadingState label="Loading model feature preset" />
      ) : null}

      {!preset.isLoading && preset.errorMessage ? (
        <EmptyState
          title="Could not load feature preset"
          description={preset.errorMessage}
        />
      ) : null}

      {!preset.isLoading &&
      !preset.errorMessage &&
      preset.features.length === 0 ? (
        <EmptyState
          title="No vehicle features available"
          description="Create vehicle features in the Features catalog before configuring model presets."
        />
      ) : null}

      {!preset.isLoading &&
      !preset.errorMessage &&
      preset.features.length > 0 ? (
        <ModelFeaturePresetEditor
          key={`${model.id}:${preset.suggestions
            .map((feature) => feature.id)
            .join(',')}`}
          features={preset.features}
          suggestions={preset.suggestions}
          isCreating={preset.createFeatureMutation.isPending}
          isSaving={preset.updatePresetMutation.isPending}
          onCreate={async (payload) => {
            return preset.createFeatureMutation.mutateAsync(payload)
          }}
          onSave={async (featureIds) => {
            await preset.updatePresetMutation.mutateAsync(featureIds)
          }}
        />
      ) : null}
    </section>
  )
}

export default ModelFeaturePresetPanel
