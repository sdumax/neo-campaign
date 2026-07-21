# Neo Campaign

Next.js campaign site with PostgreSQL.

## Local Development

Create a `.env` file with:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
DASHBOARD_USER="admin"
DASHBOARD_PASSWORD="change-me"
```

Install dependencies and start the app:

```bash
npm install
npm run db:deploy
npm run dev
```

The development server runs on `http://localhost:5500`.

## cPanel Node.js Deployment

Create a PostgreSQL database and user in cPanel, then set these environment variables in the Node.js app settings:

```env
NODE_ENV=production
DATABASE_URL=postgresql://CPANEL_DB_USER:CPANEL_DB_PASSWORD@localhost:5432/CPANEL_DB_NAME?schema=public
DASHBOARD_USER=your_admin_user
DASHBOARD_PASSWORD=your_secure_password
```

Use these cPanel settings:

- Application startup file: `server.cjs`
- Package manager: `npm`
- Startup command: `npm start` if your cPanel UI asks for one

Do not run `npm run build` on cPanel. Shared cPanel/CloudLinux environments can fail while allocating WebAssembly memory during `next build`. Build locally, commit the generated tar artifact, then let cPanel pull the prebuilt app from Git.

Git-based cPanel deployment flow:

```bash
npm ci
npm run deploy:pack
git add .
git commit -m "Prepare cPanel deployment"
git push
```

This creates split deploy artifact files such as:

```txt
deploy/neo-campaign-cpanel.tar.gz.part-000
deploy/neo-campaign-cpanel.tar.gz.part-001
deploy/neo-campaign-cpanel.tar.gz.part-002
```

The split artifact contains `.next/` and `public/`. Raw `.next/` remains ignored. The app reassembles the parts into `deploy/neo-campaign-cpanel.tar.gz` on cPanel startup before extracting.

Then in cPanel:

- Pull the latest Git changes.
- Run cPanel's npm install action if dependencies changed.
- Restart the Node.js app.

On production startup, `server.cjs` reassembles the split tar parts when needed, extracts the build, runs database migrations, then starts Next.js.

## Scripts

- `npm run dev` starts Next.js locally on port 5500.
- `npm run build` builds Next.js.
- `npm start` extracts the deploy tar in production, runs migrations, then starts the cPanel-compatible Node.js server.
- `npm run db:deploy` applies SQL migrations from `db/migrations` to PostgreSQL.
- `npm run deploy:pack` builds locally and creates split deploy artifact files in `deploy/`.
- `npm run deploy:pack:no-build` creates split deploy artifact files from an existing `.next` build.
- `npm run lint` runs ESLint.
