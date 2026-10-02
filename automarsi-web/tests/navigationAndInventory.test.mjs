import assert from 'node:assert/strict'
import { test } from 'node:test'
import { QueryClient } from '@tanstack/react-query'
import { routes } from '../src/shared/config/routes.ts'
import { createListingFilters } from '../src/features/public-listings/constants.ts'
import { invalidateInventory } from '../src/features/admin-listings/utils/invalidateInventory.ts'

test('vehicle links preserve existing public and admin routes', () => {
  assert.equal(routes.listing(42), '/inventory/42')
  assert.equal(routes.admin.listing('42'), '/admin/listings/42')
  assert.equal(routes.admin.editListing(42), '/admin/listings/42/edit')
  assert.equal(routes.admin.listingImages(42), '/admin/listings/42/images')
})

test('search links safely encode user text and category filters', () => {
  const url = new URL(
    routes.inventorySearch({ search: 'BMW & Audi #1', body_type: 'suv' }),
    'https://example.test',
  )
  assert.equal(url.pathname, '/inventory')
  assert.equal(url.searchParams.get('search'), 'BMW & Audi #1')
  assert.equal(url.searchParams.get('body_type'), 'suv')
  assert.equal(routes.inventorySearch({ search: '' }), '/inventory')
})

test('filter defaults are independent and apply only requested overrides', () => {
  const first = createListingFilters({ search: 'Golf', per_page: 6 })
  first.page = 3
  const next = createListingFilters()
  assert.equal(next.page, 1)
  assert.equal(next.search, '')
  assert.equal(next.per_page, undefined)
  assert.equal(first.search, 'Golf')
  assert.equal(first.per_page, 6)
})

test('inventory changes refresh related queries without invalidating inquiries', async () => {
  const client = new QueryClient()
  const keys = [
    ['admin', 'listings'],
    ['admin', 'listings', '42'],
    ['admin', 'overview'],
    ['public', 'homepage-listings'],
    ['public', 'listings', { search: 'Golf' }],
    ['admin', 'inquiries'],
  ]
  for (const key of keys) client.setQueryData(key, { present: true })
  await invalidateInventory(client)
  for (const key of keys)
    assert.equal(
      client.getQueryState(key).isInvalidated,
      key[1] !== 'inquiries',
    )
  client.clear()
})
