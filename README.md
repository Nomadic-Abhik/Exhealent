# SilknSlope Admin

Angular 20 workspace with a unified shell and four independently buildable Native Federation remotes:

| Application | Workspace project | Local URL | Owns |
| --- | --- | --- | --- |
| Unified shell | `silknslope-unified` | `http://localhost:4200` | Global layout, navigation, theme, dashboard |
| Procurement | `silknslope-procurement` | `http://localhost:4201` | Procurement workspace |
| Inventory | `silknslope-inventory` | `http://localhost:4202` | Inventory and SKU management |
| Orders | `silknslope-order` | `http://localhost:4203` | Manual order entry, current orders, and past orders |
| Distributors | `silknslope-distributor` | `http://localhost:4204` | Distributor management |

## Local development

Use a Node.js version supported by Angular 20 (Node 20.19+ or 22.12+).
From the repository root, start the full microfrontend workspace in one terminal:

```sh
npm start
# or
npm run start:unified
```

This starts the unified app and all four remotes concurrently. Press Ctrl+C to stop
them. To start an individual app instead, use `npx ng serve silknslope-unified`,
`npm run start:procurement`, `npm run start:inventory`, `npm run start:orders`, or
`npm run start:distributor` from the repository root.

The unified app reads `apps/silknslope-unified/public/federation.manifest.json` at
runtime. The checked-in manifest points at the local remote servers above. For another
environment, provide a manifest with the same remote keys (`silknslopeDistributor`,
`silknslopeProcurement`, `silknslopeInventory`, `silknslopeOrder`) and that
environment's `remoteEntry.json` URLs as a deploy-time asset; no deployed URL is
embedded in feature code or the unified app routes.

Top-level URLs are `/dashboard`, `/distributors/**`, `/procurement/**`,
`/inventory/**`, and `/orders/**`.
The inventory remote retains the original feature paths below its domain prefix:
`/inventory/inventory-management` and `/inventory/sku-management`. The procurement
remote is reserved for procurement workflows. The distributor remote serves
distributor management at `/distributors`.

## Build and test

```sh
npm run build:all
npm run test:all
```

Apps can also be verified or deployed independently with `ng build silknslope-unified`,
`ng build silknslope-procurement`, `ng build silknslope-inventory`,
`ng build silknslope-order`, or `ng build silknslope-distributor`. Federation entry
and app files are emitted under `dist/`.

## Workspace libraries

- `libs/design-tokens` defines CSS custom properties. The shell selects the theme;
  remotes consume the inherited variables and include fallback values when served alone.
- `libs/microfrontend-contracts` contains versioned unified-shell/remote integration metadata.

Federation tooling is `@angular-architects/native-federation` 20.3.x, the Angular 20
compatible release line, using the Angular CLI application builder.
