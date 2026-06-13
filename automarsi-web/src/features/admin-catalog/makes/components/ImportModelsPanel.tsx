import { useMemo, useState } from 'react'
import { Download, Search } from 'lucide-react'
import EmptyState from '@/components/admin/EmptyState'
import LoadingState from '@/components/admin/LoadingState'
import { Button } from '@/components/ui/button'
import type { AdminModel, CatalogModelSuggestion } from '../types'

type ImportModelsPanelProps = {
  makeName: string
  existingModels: AdminModel[]
  suggestions: CatalogModelSuggestion[]
  isLoading: boolean
  isImporting: boolean
  errorMessage: string | null
  onImport: (modelNames: string[]) => Promise<void>
}

function ImportModelsPanel({
  makeName,
  existingModels,
  suggestions,
  isLoading,
  isImporting,
  errorMessage,
  onImport,
}: ImportModelsPanelProps) {
  const [selectedModels, setSelectedModels] = useState<string[]>([])

  const existingNames = useMemo(() => {
    return new Set(existingModels.map((model) => model.name.toLowerCase()))
  }, [existingModels])

  const availableSuggestions = useMemo(() => {
    return suggestions.filter(
      (suggestion) => !existingNames.has(suggestion.name.toLowerCase())
    )
  }, [existingNames, suggestions])

  function toggleModel(modelName: string) {
    setSelectedModels((currentModels) =>
      currentModels.includes(modelName)
        ? currentModels.filter((name) => name !== modelName)
        : [...currentModels, modelName]
    )
  }

  async function handleImport() {
    await onImport(selectedModels)
    setSelectedModels([])
  }

  return (
    <section className="grid gap-4 rounded-lg border bg-card p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold">Import models</h3>
          <p className="text-sm text-muted-foreground">
            Fetch model suggestions for {makeName} and import only the ones you sell.
          </p>
        </div>

        <Search className="size-4 text-muted-foreground" />
      </div>

      {errorMessage ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errorMessage}
        </div>
      ) : null}

      {isLoading ? <LoadingState label="Loading model suggestions" /> : null}

      {!isLoading && !errorMessage && availableSuggestions.length === 0 ? (
        <EmptyState
          title="No new suggestions found"
          description="All suggested models may already exist for this make, or the external catalog returned no useful results."
        />
      ) : null}

      {!isLoading && availableSuggestions.length > 0 ? (
        <div className="grid max-h-80 gap-2 overflow-y-auto rounded-md border p-2 md:grid-cols-2">
          {availableSuggestions.map((suggestion) => {
            const isSelected = selectedModels.includes(suggestion.name)

            return (
              <label
                key={suggestion.name}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleModel(suggestion.name)}
                />
                <span>{suggestion.name}</span>
              </label>
            )
          })}
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          {selectedModels.length} selected
        </p>

        <Button
          type="button"
          disabled={selectedModels.length === 0 || isImporting}
          onClick={handleImport}
        >
          <Download />
          {isImporting ? 'Importing...' : 'Import selected'}
        </Button>
      </div>
    </section>
  )
}

export default ImportModelsPanel