# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server (http://localhost:3000)
npm run build      # Production build
npm test           # Run tests (Jest via react-scripts)
npm run deploy     # Build + deploy to GitHub Pages
```

## Architecture

**PayO Admin Portal** — a React SPA for KYC verification management of the PayO digital wallet. No component library; all styling is pure CSS via `src/App.css` with CSS variables for theming.

### Auth & Session
Auth state lives in `App.js`. On login, `payo_token` and `payo_admin` are written to `localStorage`. `AppInner` restores session on mount. A 401 response in the Axios interceptor (`src/apis/Axios.js`) clears storage and reloads. The `AppCtx` context (exported from `App.js`) carries `{ confirm, dark }` to all pages.

### Routing
`BrowserRouter` wraps everything. Unauthenticated state renders `<Login>` directly; authenticated state renders `<Portal>` which contains `<Sidebar>` + `<Topbar>` + `<Routes>`. Routes: `/` Dashboard, `/kyc` KYC Review, `/users`, `/wallets`, `/analytics`, `/audit`, `/notifications`.

### API Layer
`src/apis/Axios.js` — configured axios instance pointing at the ngrok backend (`API_BASE`). Attaches Bearer token from localStorage on every request.

`src/apis/adminApi.js` — all API calls as named exports grouped by domain: **Auth** (login, change-password, admin management), **KYC** (submissions, approve/reject, bulk actions, audit log). Pages import directly from `adminApi.js`, never from `Axios.js`.

### Global Confirm Dialog
`ConfirmDialog` component is mounted once in `App.js`. Pages/components call `confirm(config, onConfirm)` from `useContext(AppCtx)` to show a typed confirmation dialog (danger/warning/info).

### Dark Mode
Toggled via `document.body.classList.toggle('dark', dark)` in `App.js`. Persisted to `localStorage` as `payo-dark`. CSS variables in `App.css` handle the theme switch.

### API Response Shape
The backend wraps data inconsistently — pages defensively handle `res.data?.data`, `res.data?.submissions`, or `res.data` directly. Status strings from the API (`pending`, `approved`, `rejected`, `in-review`, `in_review`) are normalized to display values (`Pending`, `Approved`, `Failed`, `In Review`) in each page via a local `normalizeStatus` helper.

### Deployment
Set `homepage` in `package.json` to `https://<YOUR-USERNAME>.github.io/payo-admin-portal` before running `npm run deploy`. The `predeploy` script runs `build` automatically.
