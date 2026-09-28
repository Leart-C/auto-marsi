# Showroom redesign and admin usability update

## Changes

- Graphite and lime customer theme, responsive photographic hero, clearer vehicle cards, refreshed typography and showroom sections, and English/Albanian copy.
- Homepage keyword search and body-style shortcuts open filtered inventory. Vehicle cards retain real links for opening new tabs. Phone and email links are actionable, including in the mobile footer.
- Admin inventory search queries the existing authenticated API and supports Command/Ctrl K, loading, empty, and retry states.
- Mobile admin navigation uses an accessible dialog. The dashboard highlights real inquiries and appointments; inventory has quick status filters and labelled responsive controls. Removed the nonfunctional notification control.
- Listing creation, updates, publishing, status changes, and deletion invalidate dashboard, inventory, detail, and public query caches.
- Public fuel, transmission, and body-type filters compare without case sensitivity, accommodating existing values such as `Hatchback`. No data migration is needed.
- Public pages can load without Clerk configuration; admin routes still require configured authentication and never bypass sign-in.

## Verification

- Production TypeScript/Vite build and ESLint passed on September 28, 2026.
- Browser checks during implementation covered desktop and phone layouts, English/Albanian switching, homepage keyword search, category URL/selection, actual public vehicle rendering, admin search results, mobile menu dismissal/navigation, and mobile overflow. Admin checks used isolated sample data, not production customer records.
- Query-cache assertions passed for list, detail, dashboard, and public inventory invalidation, while unrelated inquiry queries stayed intact.
- Added `automarsi-api/tests/Feature/PublicListingFiltersTest.php` to cover mixed-case filters, nonmatching results, and draft privacy. This test has **not been executed**: PHP/Composer are unavailable locally and the Docker daemon is stopped.

## Before production release

1. In the normal PHP development or CI environment, install the locked Composer dependencies and run `php artisan test`. Keep tests on the isolated test database configured in `phpunit.xml`.
2. Verify real Clerk sign-in and a full listing create/edit/photo/publish workflow against staging. The sample-data admin preview does not validate authentication or writes.
3. Deploy the API filter fix before or together with the frontend. The current live API can still return no results for lowercase filters against capitalized stored values until this fix is deployed.
4. Preserve the existing production API and Clerk environment variables. No production environment files, databases, authentication policies, or deployments were changed.

The local read-only preview uses a temporary Vite configuration outside the repository. It reads the public API and rejects submissions; it is not a production configuration.
