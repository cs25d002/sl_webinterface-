# Swasthyalekha — Company Website (Phase 1)

The first working version of the official Swasthyalekha company website: a public marketing site (about, founders,
projects, collaborations, services) plus a hospital-selection and hospital-specific login flow. Real authentication,
hospital dashboards, and a database are intentionally **not** implemented in this phase — see
[Current Limitations](#current-limitations).

## Architecture

Two containerized applications communicating over HTTP:

```
┌─────────────────────────┐        HTTP (Axios)        ┌─────────────────────────┐
│  swasthyalekha-frontend │ ─────────────────────────▶ │  swasthyalekha-backend  │
│  React + Vite + TS      │   VITE_API_BASE_URL         │  Express + TS           │
│  Port 5173              │                             │  Port 4000, prefix /api │
└─────────────────────────┘                             └─────────────────────────┘
```

- The frontend is a static single-page app served by the Vite dev server (development) — it never talks to a
  database directly, only to the backend's `/api` routes via a shared Axios client.
- The backend exposes a small, versionless REST API. Hospital and service data is a **configuration-driven registry**
  (`backend/src/config/hospitals.json`), validated with Zod at startup and served through
  `backend/src/services/hospitalRegistryService.ts`. Adding a hospital or a service requires editing that JSON file
  only — no route, controller, or React component changes. See
  [Adding Hospitals and Services](#adding-hospitals-and-services).
- Both containers join a shared Docker network (`swasthyalekha-network`) and each has its own health check.

## Technology Stack

**Frontend:** React, Vite, TypeScript, React Router, Axios, Lucide React icons, plain CSS with a CSS-variable design
system, ESLint, Vitest + React Testing Library.

**Backend:** Node.js, Express, TypeScript, Helmet, CORS, Morgan, Zod, ESLint, Vitest + Supertest.

**Infrastructure:** Docker, Docker Compose, named `node_modules` volumes, bind mounts for live editing, health checks.

## Folder Structure

```
swasthyalekha/
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
├── frontend/
│   ├── Dockerfile
│   ├── package.json / tsconfig*.json / vite.config.ts / index.html
│   └── src/
│       ├── api/            Axios client + typed API calls (hospitals, auth)
│       ├── components/     Reusable UI: Header, Footer, buttons, cards, forms, states
│       ├── data/            Editable site copy (about, founders, projects, services, values, contact, nav)
│       ├── layouts/         PageLayout (header + footer + scroll-to-top wrapper)
│       ├── pages/            Home (section components), Services, HospitalServices, HospitalLogin, NotFound
│       ├── routes/           AppRoutes (route table)
│       ├── styles/           variables.css (design tokens), global.css
│       ├── types/            Hospital, HospitalService, Auth, API response shapes
│       ├── utils/             serviceNavigation.ts (safe external navigation, placeholder detection)
│       ├── tests/            Vitest + RTL specs, fixtures/
│       ├── App.tsx / main.tsx
└── backend/
    ├── Dockerfile
    ├── package.json / tsconfig.json / vitest.config.ts
    └── src/
        ├── config/          env.ts, hospitals.json (hospital + service registry — single source of truth)
        ├── controllers/     health, hospital (list/detail/services/service), auth
        ├── middleware/      notFound, errorHandler
        ├── routes/          health, hospital, auth, index
        ├── services/        hospitalRegistryService.ts (registry reads, env overrides, public filtering)
        ├── types/           Hospital/Service Zod schemas + validateHospitalRegistry, Auth schema, API shapes
        ├── tests/           Vitest + Supertest specs (endpoints + registry validation)
        └── app.ts / server.ts
```

## Prerequisites

- Docker Desktop (or compatible Docker Engine) with Docker Compose v2
- No local Node.js/npm installation is required — every command below runs inside the containers

## Getting Started

```bash
cp .env.example .env
docker compose up --build
```

- Frontend: **http://localhost:5173**
- Backend health check: **http://localhost:4000/api/health**

> If port 4000 or 5173 is already in use on your machine, change `BACKEND_PORT` / `FRONTEND_PORT` (and
> `VITE_API_BASE_URL` to match) in your local `.env` — `docker-compose.yml` reads all ports from environment
> variables, so no code changes are required.

Stop the stack:

```bash
docker compose down
```

Tail logs:

```bash
docker compose logs -f
```

Both services are edited via bind mounts, so changes to files under `frontend/src` or `backend/src` are picked up
immediately by Vite's dev server / `tsx watch` without rebuilding the image.

## Development Commands

```bash
docker compose exec frontend npm run dev      # already the container's default command
docker compose exec backend npm run dev       # already the container's default command
```

## Test Commands

```bash
docker compose exec backend npm test
docker compose exec frontend npm test
```

## Lint Commands

```bash
docker compose exec backend npm run lint
docker compose exec frontend npm run lint
```

## Type Check Commands

```bash
docker compose exec backend npm run typecheck
docker compose exec frontend npm run typecheck
```

## Build Commands

```bash
docker compose exec backend npm run build     # emits backend/dist
docker compose exec frontend npm run build     # emits frontend/dist
```

## Environment Configuration

Root `.env` (copy from `.env.example`):

```env
FRONTEND_PORT=5173
BACKEND_PORT=4000
VITE_API_BASE_URL=http://localhost:4000/api
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

`docker-compose.yml` passes these through to each container; the backend also reads `CORS_ORIGIN` at runtime to
configure its CORS allow-list, and Vite embeds `VITE_API_BASE_URL` into the frontend bundle at build/dev time.

## API Reference

All routes are prefixed with `/api`.

| Method | Path                                          | Description                                              |
|--------|-----------------------------------------------|------------------------------------------------------------|
| GET    | `/api/health`                                 | Service health check                                       |
| GET    | `/api/hospitals`                              | List active/coming-soon hospitals from the registry         |
| GET    | `/api/hospitals/:hospitalSlug`                | One hospital + its enabled services, or `404 HOSPITAL_NOT_FOUND` |
| GET    | `/api/hospitals/:hospitalSlug/services`       | `{ hospital, services }` for one hospital                   |
| GET    | `/api/hospitals/:hospitalSlug/services/:serviceSlug` | One service, or `404 SERVICE_NOT_FOUND`               |
| POST   | `/api/auth/login`                             | Zod-validated login placeholder (see below)                 |

Inactive hospitals and inactive services are never returned by these endpoints.

`POST /api/auth/login` body:

```json
{ "hospitalSlug": "string", "role": "admin" | "user", "identifier": "string", "password": "string (min 6 chars)" }
```

Always returns a safe, non-authenticating response:

```json
{
  "success": false,
  "code": "AUTHENTICATION_NOT_CONFIGURED",
  "message": "Authentication will be enabled in the next development phase."
}
```

Validation failures return `400` with `code: "VALIDATION_ERROR"` and a list of field-level `errors`.

## Frontend Routes

| Path                              | Page                                        |
|------------------------------------|----------------------------------------------|
| `/`                                 | Home (hero, about, founders, projects, collaborations, services preview, values, contact) |
| `/services`                         | Hospital selection (search + cards, backend-driven) |
| `/services/:hospitalSlug`           | Service catalogue for one hospital — the primary post-selection page |
| `/services/:hospitalSlug/login`      | Hospital-specific login (preserved, but no longer linked from the main flow) |
| `*`                                  | 404 Not Found                                  |

The flow is `/services` → select a hospital → `/services/:hospitalSlug` → click a service → navigate to that
service's configured deployment URL (external, not a Swasthyalekha route). The login page still exists and works if
visited directly, but hospital selection no longer routes to it automatically.

## Adding Hospitals and Services

The hospital/service catalogue is entirely configuration-driven. **No React component, route, or backend controller
needs to change** to add a hospital or a service — only `backend/src/config/hospitals.json`.

### 1. Add a new hospital

Append a new object to the `hospitals` array:

```json
{
  "id": "hospital-example",
  "name": "Example Hospital",
  "shortName": "Example",
  "slug": "example-hospital",
  "location": { "city": "City", "state": "State", "country": "India" },
  "description": "Short description of the hospital.",
  "officialWebsite": "https://example-hospital.org",
  "status": "active",
  "services": []
}
```

`id` and `slug` must be unique across the whole file. `slug` must be lowercase letters/digits/hyphens only.
`officialWebsite` may be `null` if there isn't one yet.

### 2. Add a service under a hospital

Append to that hospital's `services` array:

```json
{
  "id": "example-new-service",
  "name": "New Clinical Service",
  "slug": "new-clinical-service",
  "description": "Description of the new service.",
  "url": "https://deployed-service.example.org",
  "icon": "activity",
  "openMode": "new-tab",
  "status": "active"
}
```

`icon` must be one of the identifiers registered in
`frontend/src/components/icons/serviceIconRegistry.tsx` (currently `file-pen-line`, `stethoscope`,
`shield-check`, `scan-text`, `file-text`, `activity`) — an unrecognized identifier safely falls back to a default
icon rather than erroring.

### 3. Set its deployment URL

Use the real, already-deployed URL for that service. **Never** use a placeholder containing `replace-with-`,
`example.com`, or `localhost-placeholder` — the frontend detects those patterns and disables the "Open Service"
button with "Deployment URL not configured" instead of silently navigating.

### 4. Choose `same-tab` or `new-tab`

`openMode: "new-tab"` opens the service with `window.open(url, "_blank", "noopener,noreferrer")` (the opened page
cannot access `window.opener`). `openMode: "same-tab"` navigates the current tab via `window.location.assign(url)`.

### 5. Restart the backend container

```bash
docker compose restart backend
docker compose logs -f backend
```

The registry is validated with Zod at startup. If the JSON is malformed — a duplicate `id`/`slug`, a missing
required field, an invalid or unsafe URL (only `http:`/`https:` are accepted), or `services` not being an array —
the backend logs a clear configuration error and exits instead of starting with bad data.

### 6. Confirm it appears automatically

Reload `http://localhost:5173/services` (new hospital) or `http://localhost:5173/services/<hospitalSlug>` (new
service). No frontend rebuild is required in dev mode; for a production build run
`docker compose exec frontend npm run build`.

### Optional: environment-variable URL overrides

A service's URL can optionally be overridden per-deployment via an environment variable, without editing the JSON,
using the convention `SERVICE_URL_<HOSPITAL_SLUG>_<SERVICE_SLUG>` (slug hyphens become underscores, uppercased) —
see the commented examples in `.env.example`. These variables are entirely optional; local startup never requires
them, and an unset variable simply leaves the JSON-configured URL in place.

## Current Limitations

This is phase 1 only. Deliberately **not** implemented yet:

- Real authentication, sessions, or credential storage (the login form always receives
  `AUTHENTICATION_NOT_CONFIGURED` from the backend)
- Hospital admin/user dashboards or any post-login functionality
- User/hospital registration or password reset
- A real database — the hospital/service catalogue is a validated, version-controlled JSON registry
- Single sign-on or authentication between Swasthyalekha and the deployed hospital services
- Contact-form submission (the contact section is informational only)
- Real founder biographies, collaboration partners, or project detail pages (all marked as placeholders in source)
- Several service deployment URLs are still placeholders — see the note below

**Placeholder deployment URLs still requiring replacement:** `svims-pii-masking`, `manipal-annotation-tool`,
`manipal-patient-record-extraction`, and `chittoor-discharge-summary-extraction` (`svims-annotation-tool` and
`svims-clinician-interface` have already been set to their real deployed URLs). Until each remaining placeholder is
replaced with the real deployed URL, its "Open Service" button stays disabled with "Deployment URL not configured".

## Future Development Plan

- Introduce a real database behind `hospitalRegistryService.ts` without changing its public API
  (`getActiveHospitals`, `getHospitalBySlug`, `getActiveServicesForHospital`, `getHospitalService`)
- Implement real authentication (sessions or JWT) and replace the `/api/auth/login` placeholder
- Build hospital admin and user dashboards
- Add hospital/user registration and password reset flows
- Wire up the contact form to a real notification/email service
- Replace placeholder founder, collaboration, and project content with verified information
- Replace remaining placeholder service deployment URLs as each service goes live
- Consider single sign-on between Swasthyalekha and the deployed hospital services
