import { useEffect, useState } from 'react'
import { createAdminListing } from '../api/createAdminListing'
import { getListingCarModels } from '../api/getListingCarModels'
import { getListingMakes } from '../api/getListingMakes'
import {
  buildCreateListingPayload,
  initialListingFormState,
  type ListingFormState,
} from '../form/listingFormState'
import type { ListingCarModelOption, ListingMakeOption } from '../types'
import ListingCreateForm from './ListingCreateForm'

type ListingCreatePanelProps = {
  token: string
  onCancel: () => void
  onCreated: () => void
}

function ListingCreatePanel({
  token,
  onCancel,
  onCreated,
}: ListingCreatePanelProps) {
  const [formState, setFormState] = useState<ListingFormState>(
    initialListingFormState
  )
  const [makes, setMakes] = useState<ListingMakeOption[]>([])
  const [carModels, setCarModels] = useState<ListingCarModelOption[]>([])
  const [isLoadingOptions, setIsLoadingOptions] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function loadMakes() {
      try {
        setIsLoadingOptions(true)
        setMakes(await getListingMakes())
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Failed to load makes.'
        )
      } finally {
        setIsLoadingOptions(false)
      }
    }

    void loadMakes()
  }, [])

  useEffect(() => {
    async function loadCarModels() {
      const makeId = Number(formState.makeId)

      setFormState((currentState) => ({
        ...currentState,
        carModelId: '',
      }))

      if (!makeId) {
        setCarModels([])
        return
      }

      try {
        setCarModels(await getListingCarModels(makeId))
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Failed to load car models.'
        )
      }
    }

    void loadCarModels()
  }, [formState.makeId])

  function updateField(field: keyof ListingFormState, value: string) {
    setFormState((currentState) => ({
      ...currentState,
      [field]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      await createAdminListing({
        token,
        payload: buildCreateListingPayload(formState),
      })

      setFormState(initialListingFormState)
      onCreated()
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to create listing.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ListingCreateForm
      formState={formState}
      makes={makes}
      carModels={carModels}
      isLoadingOptions={isLoadingOptions}
      isSubmitting={isSubmitting}
      errorMessage={errorMessage}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      onFieldChange={updateField}
    />
  )
}

export default ListingCreatePanel
