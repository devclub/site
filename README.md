# Devclub site

Source of the [devclub.eu](https://devclub.eu) and [devclub.ee](https://devclub.ee) community sites.

A single Angular application serves both sites; the active site (EU/EE) is selected at
build time and all content is loaded at runtime from the data server
(`https://devclub.github.io/data`).

## Tech stack

- **Angular 22** (standalone components, signals-ready, hash routing)
- **TypeScript** in strict mode
- **esbuild** application builder (`@angular/build`)
- **Bootstrap 5** compiled from SCSS (`src/scss/styles.scss`)
- **FontAwesome 5** icons via `@fortawesome/angular-fontawesome`
- **Angular CDK** overlay (tooltips + typeahead)
- **date-fns** for date formatting
- Unit tests with **Vitest**, end-to-end tests with **Playwright**

## Requirements

The only requirement is **Node.js 24.x** (see `.nvmrc`). Everything else is installed with npm.

```bash
nvm use            # or install Node 24.x manually
npm install
```

## Run locally

```bash
npm start          # devclub.eu (Russian)   -> http://localhost:3000
npm run start:ee   # devclub.ee (English)   -> http://localhost:3000
```

### Run both sites in parallel

Both scripts default to port 3000, so to serve EU and EE at the same time give one of
them a different port (`ng serve` accepts `--port` after `--`). Use two terminals:

```bash
# Terminal 1 — devclub.eu (Russian)  -> http://localhost:3000
npm start

# Terminal 2 — devclub.ee (English)  -> http://localhost:3001
npm run start:ee -- --port 3001
```

Each dev server reloads independently, so you can compare both sites side by side.

## Build

```bash
npm run build      # production build for devclub.eu  -> dist/
npm run build:eu   # production build for devclub.eu
npm run build:ee   # production build for devclub.ee
```

## Test & lint

```bash
npm test           # unit tests (Vitest)
npm run lint       # lint (when configured)
```

## How the dual site works

`src/environments/environment.ts` points at the EU dev config. The `ee` / production
configurations swap it via Angular CLI `fileReplacements` (see `angular.json`). Each
environment only sets which `*_conf.json` to load from the data server; everything else
(menus, meetings, archive, team, finances) comes from that config at runtime.

## Updating site content

Content is **not** stored here. Update the JSON files in the
[`data`](https://github.com/devclub/data) repository instead.
