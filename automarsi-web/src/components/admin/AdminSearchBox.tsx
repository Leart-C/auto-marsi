import { useEffect, useState } from 'react'
import { ArrowUpRight, Search, LoaderCircle, CarFront } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { getAdminListings } from '@/features/admin-listings/api/getAdminListings'
import { useAdminToken } from '@/hooks/useAdminToken'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

function AdminSearchBox({
  onNavigate,
}: {
  onNavigate: (path: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const query = useDebouncedValue(search.trim())
  const { getAdminToken, isAuthReady } = useAdminToken()
  const results = useQuery({
    queryKey: ['admin', 'listings', 'quick-search', query],
    enabled: open && isAuthReady && query.length > 1,
    queryFn: async () =>
      getAdminListings({
        token: await getAdminToken(),
        search: query,
        perPage: 6,
      }),
  })
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-10 items-center gap-2 rounded-full border bg-card px-3 text-muted-foreground hover:border-primary"
        aria-label="Search inventory"
      >
        <Search className="size-4" />
        <span className="hidden text-xs lg:block">Search inventory...</span>
        <kbd className="ml-5 hidden text-[10px] lg:block">⌘ / Ctrl K</kbd>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogTitle>Find a vehicle</DialogTitle>
          <DialogDescription>
            Search by vehicle title, location, or VIN.
          </DialogDescription>
          <label className="flex items-center gap-3 rounded-xl border bg-background px-4">
            <Search className="size-5 text-muted-foreground" />
            <span className="sr-only">Search inventory</span>
            <input
              autoFocus
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Start typing a vehicle or VIN..."
              className="h-12 min-w-0 flex-1 bg-transparent outline-none"
            />
          </label>
          <div aria-live="polite" className="max-h-[50vh] overflow-y-auto">
            {query.length < 2 ? (
              <p className="p-4 text-sm text-muted-foreground">
                Enter at least two characters to search your inventory.
              </p>
            ) : search.trim() !== query || results.isFetching ? (
              <p className="flex items-center gap-2 p-4 text-muted-foreground">
                <LoaderCircle className="size-4 animate-spin" />
                Searching...
              </p>
            ) : results.isError ? (
              <div className="p-4">
                <p>Search could not be loaded.</p>
                <button
                  className="mt-2 text-primary underline"
                  onClick={() => void results.refetch()}
                >
                  Try again
                </button>
              </div>
            ) : results.data?.data.length ? (
              results.data.data.map((listing) => (
                <button
                  key={listing.id}
                  onClick={() => {
                    setOpen(false)
                    onNavigate(`/admin/listings/${listing.id}`)
                  }}
                  className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-muted"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted">
                    <CarFront className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">
                      {listing.title}
                    </span>
                    <span className="text-xs capitalize text-muted-foreground">
                      {listing.year} · {listing.status}
                    </span>
                  </span>
                  <ArrowUpRight className="size-4" />
                </button>
              ))
            ) : (
              <p className="p-4 text-muted-foreground">
                No vehicles found. Try another name or VIN.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default AdminSearchBox
