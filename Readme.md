# AutoMarsi

- `automarsi-web/`: React/TypeScript showroom and admin application.
- `automarsi-api/`: Laravel API, persistence, image handling, and email workflows.
- `docker/`, `docker-compose.yml`, and `Dockerfile.vercel`: existing runtime/deployment configuration.
- `docs/`: architecture and release notes.

Start with the [frontend setup](automarsi-web/README.md) and [code organization](docs/architecture.md). The Laravel API uses its existing `.env.example`, Composer dependencies, and `php artisan` commands.

Before release, run the frontend tests, lint, and build, plus the Laravel suite in an isolated test environment. Keep production credentials and database operations separate from local verification.
