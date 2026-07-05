import DataTableShell from '@/components/admin/DataTableShell'
import PageHeader from '@/components/admin/PageHeader'
import SiteMediaUploader from '@/features/site-media/components/SiteMediaUploader'
import { useAdminSiteMedia } from '@/features/site-media/hooks/useAdminSiteMedia'

const ABOUT_MEDIA_KEY = 'about_showroom'

function SiteMediaPage() {
  const { media, mediaQuery, updateMediaMutation, errorMessage } =
    useAdminSiteMedia(ABOUT_MEDIA_KEY)

  return (
    <section className="grid gap-4">
      <PageHeader
        eyebrow="Website"
        title="Site media"
        description="Manage public website images without changing code."
      />

      <DataTableShell
        title="About page image"
        description="Shown in the story section on the public About page."
      >
        {mediaQuery.isLoading ? (
          <div className="p-5 text-sm text-muted-foreground">
            Loading image...
          </div>
        ) : (
          <SiteMediaUploader
            media={media}
            isSubmitting={updateMediaMutation.isPending}
            errorMessage={errorMessage}
            onSubmit={async (payload) => {
              await updateMediaMutation.mutateAsync(payload)
            }}
          />
        )}
      </DataTableShell>
    </section>
  )
}

export default SiteMediaPage
