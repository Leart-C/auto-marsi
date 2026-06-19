import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteAdminListingImage } from '../api/deleteAdminListingImage'
import { getAdminListingImages } from '../api/getAdminListingImages'
import { setPrimaryListingImage } from '../api/setPrimaryListingImage'
import {
  updateAdminListingImage,
  type UpdateAdminListingImagePayload,
} from '../api/updateAdminListingImage'
import { uploadAdminListingImages } from '../api/uploadAdminListingImages'
import { useAdminToken } from '@/hooks/useAdminToken'

type UseAdminListingImagesParams = {
  listingId: string
}

export function useAdminListingImages({
  listingId,
}: UseAdminListingImagesParams) {
  const queryClient = useQueryClient()
  const { isAuthReady, getAdminToken } = useAdminToken()
  const queryKey = ['admin', 'listings', listingId, 'images']

  async function refreshListingImages() {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey }),
      queryClient.invalidateQueries({
        queryKey: ['admin', 'listings', listingId],
      }),
      queryClient.invalidateQueries({
        queryKey: ['admin', 'listings'],
      }),
    ])
  }

  const imagesQuery = useQuery({
    queryKey,
    enabled: isAuthReady && Boolean(listingId),
    queryFn: async () => {
      const token = await getAdminToken()

      return getAdminListingImages({ token, listingId })
    },
  })

  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const token = await getAdminToken()

      return uploadAdminListingImages({
        token,
        listingId,
        files,
      })
    },
    onSuccess: async () => {
      await refreshListingImages()
      toast.success('Images uploaded successfully.')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to upload images.'
      )
    },
  })

  const updateImageMutation = useMutation({
    mutationFn: async ({
      imageId,
      payload,
    }: {
      imageId: number
      payload: UpdateAdminListingImagePayload
    }) => {
      const token = await getAdminToken()

      return updateAdminListingImage({
        token,
        imageId,
        payload,
      })
    },
    onSuccess: async () => {
      await refreshListingImages()
      toast.success('Image details updated.')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update image.'
      )
    },
  })

  const setPrimaryMutation = useMutation({
    mutationFn: async (imageId: number) => {
      const token = await getAdminToken()

      return setPrimaryListingImage({
        token,
        imageId,
      })
    },
    onSuccess: async () => {
      await refreshListingImages()
      toast.success('Primary image updated.')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to set primary image.'
      )
    },
  })

  const deleteImageMutation = useMutation({
    mutationFn: async (imageId: number) => {
      const token = await getAdminToken()

      return deleteAdminListingImage({
        token,
        imageId,
      })
    },
    onSuccess: async () => {
      await refreshListingImages()
      toast.success('Image deleted.')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete image.'
      )
    },
  })

  return {
    images: imagesQuery.data ?? [],
    imagesQuery,
    uploadMutation,
    updateImageMutation,
    setPrimaryMutation,
    deleteImageMutation,
    errorMessage:
      imagesQuery.error instanceof Error
        ? imagesQuery.error.message
        : uploadMutation.error instanceof Error
          ? uploadMutation.error.message
          : null,
  }
}
