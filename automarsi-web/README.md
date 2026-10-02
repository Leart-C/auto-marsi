# AutoMarsi web

React 19, TypeScript, Vite, Tailwind, React Query, and Clerk. The public showroom and admin application share one frontend and keep separate routes and features.

## Local development

Use Node 22.18+ and install the locked dependencies with `npm ci`. Copy `.env.example` to `.env.local`, configure `VITE_API_URL` for your local/staging API and `VITE_CLERK_PUBLISHABLE_KEY` for admin sign-in, then run `npm run dev`.

The public site can render without Clerk configuration; admin access remains unavailable until authentication is configured. Use a development API for testing submissions or mutations.

## Checks

```sh
npm test
npm run lint
npm run build
```

Tests use Node's built-in runner; no additional test framework is required. The build checks types and compiles all lazy-loaded routes. `npm run preview` serves the compiled frontend.

See [code organization](../docs/architecture.md) for folder responsibilities, API conventions, constants, and the backend structure. Generated UI components are configured in `components.json` and live in `src/shared/ui`.
