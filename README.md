# Neo Campaign

Next.js campaign site with Prisma and PostgreSQL.

## Local Development

Create a `.env` file with:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
DASHBOARD_USER="admin"
DASHBOARD_PASSWORD="change-me"
```

Install dependencies and start the app:

```bash
pnpm install
pnpm db:deploy
pnpm dev
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
- Package manager: `pnpm`
- Startup command: `pnpm start` if your cPanel UI asks for one

Deploy/update commands:

```bash
pnpm install --frozen-lockfile
pnpm db:deploy
pnpm build
```

Restart the Node.js app from cPanel after deploying new code or changing environment variables.

## Scripts

- `pnpm dev` starts Next.js locally on port 5500.
- `pnpm build` generates Prisma client and builds Next.js.
- `pnpm start` runs the cPanel-compatible Node.js startup file.
- `pnpm db:deploy` applies Prisma migrations to PostgreSQL.
- `pnpm lint` runs ESLint.
