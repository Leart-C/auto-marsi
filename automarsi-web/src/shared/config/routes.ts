/** Browser URLs only. API endpoint paths belong to each feature's api folder. */
export const routes = {
  home: '/',
  inventory: '/inventory',
  about: '/about',
  services: '/services',
  contact: '/contact',
  listing: (id: string | number) => `/inventory/${id}`,
  inventorySearch: (filters: { search?: string; body_type?: string }) => {
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(filters)) {
      if (value) params.set(key, value)
    }
    const query = params.toString()
    return `/inventory${query ? `?${query}` : ''}`
  },
  admin: {
    overview: '/admin',
    listings: '/admin/listings',
    newListing: '/admin/listings/new',
    listing: (id: string | number) => `/admin/listings/${id}`,
    editListing: (id: string | number) => `/admin/listings/${id}/edit`,
    listingImages: (id: string | number) => `/admin/listings/${id}/images`,
    inquiries: '/admin/inquiries',
    appointments: '/admin/appointments',
    makes: '/admin/catalog/makes',
    models: '/admin/catalog/models',
    features: '/admin/catalog/features',
    siteMedia: '/admin/site-media',
  },
} as const
