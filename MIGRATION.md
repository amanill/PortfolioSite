# Frontend Migration Plan (Incremental)

This project is migrating the legacy Angular frontend to a React app incrementally. Use these steps to continue the migration safely without disrupting the running backend.

## Strategy
- Keep the existing `client/` (legacy) in place while developing features in `client-react/`.
- Use Vite dev server for React (`client-react`) and proxy API/socket requests to the backend (already configured in `client-react/vite.config.ts`).
- Add React pages/components one at a time and update routing; when ready, build and deploy the React app and remove/replace the legacy client.

## Developer workflow
- Start only backend: `npm run dev` (runs nodemon server).  
- Start only React (dev): `cd client-react && npm run dev` (runs Vite).  
- Start both (single command): `npm run dev:all` — runs both Vite and backend concurrently (requires dev dependency `concurrently`).

## Production integration (when ready)
1. Build the React app: `cd client-react && npm run build`.
2. Serve the built files from Express (optional): copy or point `express.static` to `client-react/dist` and add a catch-all route to `index.html`.
3. Remove old `client/` once all pages and functionality are migrated and tested.

## Notes
- Socket and API compatibility: keep API routes stable. The Vite proxy is configured to forward `/api` and `/socket.io`.
- If you want, I can add a production-serving snippet to `server.js` (non-destructive) when you decide to flip to React in production.
