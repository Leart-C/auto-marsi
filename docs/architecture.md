# Code organization

AutoMarsi has two applications: `automarsi-web` (React/TypeScript) and `automarsi-api` (Laravel). They keep their existing deployment boundaries and HTTP contracts.

## Frontend

```text
automarsi-web/src/
  app/
    App.tsx                 Browser history and current location
    routing/                Public/admin route selection and sign-in boundary
    providers/              Clerk, React Query, translations, and notifications
    layouts/                Page shells and their navigation components
  pages/
    admin/                  Admin route entry components
    public/                 Showroom route entry components
  features/
    admin-listings/          Vehicle management and photos
    admin-catalog/           Makes, models, and equipment
    admin-inquiries/         Customer inquiry workflow
    admin-appointments/      Showroom appointment workflow
    admin-overview/          Dashboard data and presentation
    public-listings/         Vehicle browsing and details
    public-inquiries/        Customer contact forms
    public-stats/            Public showroom statistics
    site-media/             Shared public/admin showroom imagery
  shared/
    api/                    HTTP transport, auth/public adapters, pagination
    config/                 Browser routes and query freshness policy
    components/admin/       Reusable admin presentation components
    components/public/      Reusable showroom presentation components
    ui/                     Low-level UI primitives
    hooks/                  Cross-feature hooks
    lib/                    Small shared utilities and formatting
  i18n/                     Translation provider and English/Albanian messages
  assets/                   Bundled images
  styles/                   Base styles, theme tokens, and surface styling
```

Feature folders keep their existing descriptive names. Inside a feature, `api/` describes endpoints and payloads, `hooks/` manages query/mutation state, `components/` renders UI, `utils/` contains feature logic, and `types.ts` defines the data contracts. Add a subfolder only when there is code to put in it.

Pages compose features and shared components. Layouts own the header/sidebar/footer. Shared modules should not import pages, application shells, or feature modules. Use explicit imports rather than barrel files that hide dependencies.

### Requests

All network calls go through `shared/api/client.ts`. Use `adminApi` for authenticated calls and `publicApi` for public calls. Keep endpoint URLs, domain types, upload loops, and success handling in their feature's API/hook files.

The transport handles query encoding, JSON/FormData headers, bearer tokens, errors, and empty responses. Use `responseType: 'empty'` for operations whose response body is intentionally ignored. `errorMessage` retains a fixed endpoint error; `fallbackError` permits a server message with a fallback; `validationErrorsFirst` preserves field-level upload errors.

Do not add global retries for writes. Listing uploads remain sequential so their existing ordering and filename-specific errors are preserved.

### Constants

- Browser URLs and link builders: `shared/config/routes.ts`. API paths remain feature-owned.
- Shared cache timing: `shared/config/queryPolicy.ts`.
- Admin page size and empty pagination: `shared/api/pagination.ts`.
- Listing statuses: `features/admin-listings/constants.ts`.
- Public listing defaults and page sizes: `features/public-listings/constants.ts`.

Keep one-off values local. Extract a constant when it represents a repeated rule or a setting that should change in one place. Filter defaults use a factory so screens do not share mutable state. Keep translations in the message files, not in shared constants.

## Backend

Laravel's existing structure already separates responsibilities; it does not need a parallel folder hierarchy:

- `routes/`: endpoints and middleware boundaries.
- `Http/Requests/`: validation and input contracts.
- `Http/Controllers/`: coordination and HTTP responses.
- `Actions/`: domain operations and transactions.
- `Queries/`: filtering, relationships, sorting, and pagination.
- `Models/`: persistence and relationships.
- `Http/Resources/`: public/admin response shapes.
- `Services/`: image storage, imports, reports, and other shared infrastructure.
- `Jobs/` and `Mail/`: background work and email delivery.

Keep logic in the existing layer that owns it. Avoid generic repositories, base CRUD services, or enum migrations solely for consistency. No backend behavior or database schema changes were needed for this organizational refactor.

## Verification

From `automarsi-web`, run `npm test`, `npm run lint`, and `npm run build`. Tests use Node's built-in runner and TypeScript stripping; use Node 22.18+ (matching the Node 22 production build family) or a newer supported version. They cover transport behavior, route encoding, independent filter defaults, and inventory cache invalidation without network access.

For backend changes, run `php artisan test` from `automarsi-api` with the development dependencies installed and the isolated test database in `phpunit.xml`. Never run migration or database-reset checks against production.
