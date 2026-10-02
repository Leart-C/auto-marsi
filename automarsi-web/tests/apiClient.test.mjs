import assert from 'node:assert/strict'
import { afterEach, mock, test } from 'node:test'
import { request } from '../src/shared/api/client.ts'

const baseUrl = 'https://example.test/api/'
afterEach(() => mock.restoreAll())

function respond(body, status = 200) {
  return mock.method(
    globalThis,
    'fetch',
    async () => new Response(body, { status }),
  )
}

test('GET preserves API prefix, encodes search, omits empty filters, and keeps false/zero', async () => {
  const fetch = respond('{"data":[]}')
  assert.deepEqual(
    await request({
      baseUrl,
      path: '/listings',
      query: {
        search: 'Golf & GTI',
        page: 0,
        featured: false,
        blank: '',
        nil: null,
        missing: undefined,
      },
    }),
    { data: [] },
  )
  const [url, options] = fetch.mock.calls[0].arguments
  assert.equal(url.pathname, '/api/listings')
  assert.equal(url.searchParams.get('search'), 'Golf & GTI')
  assert.equal(url.searchParams.get('page'), '0')
  assert.equal(url.searchParams.get('featured'), 'false')
  assert.equal(url.searchParams.size, 3)
  assert.equal(options.method, 'GET')
  assert.deepEqual(options.headers, { Accept: 'application/json' })
  assert.equal(options.body, undefined)
})

test('authenticated JSON mutations preserve the token, method, and payload', async () => {
  const fetch = respond('{"data":{"id":1}}')
  await request({
    baseUrl,
    path: '/admin/listings/1',
    method: 'PATCH',
    token: 'test-token',
    body: { status: 'sold', price: 0 },
  })
  const [, options] = fetch.mock.calls[0].arguments
  assert.equal(options.headers.Authorization, 'Bearer test-token')
  assert.equal(options.headers['Content-Type'], 'application/json')
  assert.equal(options.method, 'PATCH')
  assert.deepEqual(JSON.parse(options.body), { status: 'sold', price: 0 })
})

test('multipart uploads let the browser set the boundary and preserve FormData', async () => {
  const fetch = respond('{"data":{"id":1}}')
  const body = new FormData()
  body.append('image', new Blob(['image']), 'vehicle.jpg')
  await request({
    baseUrl,
    path: '/admin/listings/1/images',
    method: 'POST',
    token: 'test-token',
    body,
  })
  const [, options] = fetch.mock.calls[0].arguments
  assert.equal(options.body, body)
  assert.equal(options.headers['Content-Type'], undefined)
  assert.equal(options.headers.Authorization, 'Bearer test-token')
})

test('204 and explicitly ignored mutation bodies are not parsed as JSON', async () => {
  respond(null, 204)
  assert.equal(
    await request({ baseUrl, path: '/admin/listings/1', method: 'DELETE' }),
    undefined,
  )
  mock.restoreAll()
  respond('')
  assert.equal(
    await request({
      baseUrl,
      path: '/admin/listings/1',
      method: 'PATCH',
      responseType: 'empty',
    }),
    undefined,
  )
})

test('fixed endpoint errors are preserved', async () => {
  respond('{"message":"Internal details"}', 500)
  await assert.rejects(
    request({
      baseUrl,
      path: '/admin/listings',
      errorMessage: 'Failed to load admin listings.',
    }),
    { message: 'Failed to load admin listings.' },
  )
})

test('server messages are returned for ordinary API errors', async () => {
  respond('{"message":"Please sign in again."}', 401)
  await assert.rejects(request({ baseUrl, path: '/admin/listings' }), {
    message: 'Please sign in again.',
  })
})

test('upload validation errors can take precedence over the summary message', async () => {
  respond(
    '{"message":"Validation failed.","errors":{"image":["The image is too large."]}}',
    422,
  )
  await assert.rejects(
    request({
      baseUrl,
      path: '/admin/listings/1/images',
      validationErrorsFirst: true,
    }),
    { message: 'The image is too large.' },
  )
})

test('HTML and malformed error bodies use the supplied fallback', async () => {
  for (const body of [
    '<html>Unavailable</html>',
    'null',
    '[]',
    '{"message":42,"errors":{"image":[42]}}',
  ]) {
    respond(body, 502)
    await assert.rejects(
      request({
        baseUrl,
        path: '/listings',
        fallbackError: 'Try again later.',
        validationErrorsFirst: true,
      }),
      { message: 'Try again later.' },
    )
    mock.restoreAll()
  }
})

test('network errors propagate without being mistaken for empty results', async () => {
  const error = new TypeError('Network unavailable')
  mock.method(globalThis, 'fetch', async () => {
    throw error
  })
  await assert.rejects(request({ baseUrl, path: '/listings' }), error)
})
