# SilknSlope Admin Microfrontend Architecture

## Goal

Restructure the existing Angular application into one Angular workspace containing a shell and three runtime-loaded microfrontends:

- **SilknSlope Admin** — the workspace and product shell
- **silknslope-procurement** — procurement and distributor management
- **silknslope-inventory** — inventory and SKU management
- **silknslope-order** — order-management experience

The shell owns the global layout, theme, and navigation. The scope is frontend architecture only; backend APIs and persistent data are not part of this plan.

## Current application

- The repository is currently a single Angular CLI application on Angular 16.
- `AppComponent` owns the top navigation and router outlet.
- The app has lazy-loaded dashboard, distributor-management, inventory-management, and SKU-management feature areas.
- Inventory and SKU features should remain in the inventory domain. Distributor management should move to procurement.
- There is no existing order-management feature.

## Proposed workspace

Keep a single repository/workspace, displayed as **SilknSlope Admin**, with four separately buildable Angular applications:

```text
SilknSlope Admin/
  apps/
    silknslope-unified/            # SilknSlope Admin host/container
    silknslope-procurement/        # Procurement remote
    silknslope-inventory/          # Inventory remote
    silknslope-order/              # Order remote
  libs/
    design-tokens/                 # Shared theme variables and minimal UI primitives
    microfrontend-contracts/       # Versioned route/navigation integration contracts
```

Use Angular 20 across the workspace. Retain the current Angular CLI workspace and introduce the smallest compatible runtime federation setup rather than adding a second monorepo framework. Confirm federation tooling compatibility with Angular 20 before implementation.

## Application ownership

### Shell / SilknSlope Admin

- Owns the global page frame, brand, navigation menu, theme selection, and theme tokens.
- Owns top-level URLs, remote discovery/configuration, loading states, and a clear error state when a remote cannot load.
- Keeps the dashboard as the landing page, without taking ownership of procurement, inventory, or order domain features.
- Loads each remote at runtime from environment-specific remote configuration; no remote URLs are hard-coded in feature components.
- Exposes theme through CSS custom properties and integration contracts, not through remote imports of shell internals.

### silknslope-procurement

- Owns procurement-related routes and screens.
- Receives the existing distributor-management feature as its first migrated domain capability.
- Can be served independently during development and built as its own deployable remote.

### silknslope-inventory

- Owns inventory and product-catalog routes and screens.
- Receives the existing inventory-management and SKU-management features.
- Can be served independently during development and built as its own deployable remote.

### silknslope-order

- Owns future order-management routes and screens.
- Starts as a valid, independently loadable remote with a clear placeholder/empty state; no order workflows or backend behavior are invented in this frontend-only scope.

## Runtime integration and routing

- The shell is the browser entry point and resolves remote entry URLs through a deployment-specific manifest/configuration.
- Top-level routes are `/dashboard`, `/procurement/**`, `/inventory/**`, and `/orders/**`.
- Each remote owns its internal route tree below its assigned prefix.
- The shell displays loading and remote-load failure states while preserving shell navigation.
- Angular framework packages are shared as singletons across the host and remotes to prevent duplicate Angular runtimes. Keep their Angular major versions aligned.
- Each remote supports standalone local development, with a local shell configuration for integrated development.

The federation implementation should use a runtime-capable Angular-compatible solution. Prefer Native Federation if its supported release is compatible with Angular 20 at implementation time; otherwise use a compatible Module Federation integration. Tool choice must not change the app boundaries or runtime-deployment model.

## Theme, navigation, and shared code

- The shell is the sole owner of theme selection and navigation definitions.
- Remotes receive the selected theme through inherited CSS variables and register navigation through a small, typed contract or shell-owned route metadata.
- Shared workspace libraries are limited to stable contracts, design tokens, and genuinely reusable UI primitives. Domain state and business logic remain in their owning remotes.
- Avoid direct cross-remote imports and shared mutable application state.

## Angular 20 migration and implementation sequence

1. Upgrade the current application from Angular 16 to Angular 20 in supported major-version steps, keeping the existing single-app build and tests green after each step.
2. Establish the multi-application workspace and create the shell plus three remote applications. Verify each can build and run independently before moving features.
3. Move the current top-level layout, theme, navigation, and dashboard into the shell.
4. Move distributor management into procurement; move inventory and SKU management into inventory. Preserve existing routes/behavior where practical and update shell links to the new domain URLs.
5. Add the order remote's initial placeholder route and validate its runtime loading.
6. Configure runtime remote manifests for local development and deployment environments; document how each application is built and deployed independently.
7. Run workspace builds and tests, then verify navigation, theme inheritance, deep links, direct remote loading failures, and existing feature flows.

## Acceptance criteria

- The repository contains one Angular 20 workspace with a shell and the three named remotes.
- The shell provides shared navigation and theme and continues to load when a remote is unavailable.
- Procurement owns distributor management; inventory owns inventory and SKU management; orders is a valid independently loadable remote.
- Each remote can be built and served independently, and the shell can load each remote at runtime using configuration rather than hard-coded deployment URLs.
- Existing dashboard and migrated feature flows remain reachable at the new routes.
- The frontend-only scope introduces no backend service, database, authentication change, or fabricated order business process.
- Targeted tests and production builds pass for all workspace applications.
