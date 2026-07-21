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

Deploy/update commands:

```bash
npm ci
npm run db:deploy
npm run build
```

Restart the Node.js app from cPanel after deploying new code or changing environment variables.

## Scripts

- `npm run dev` starts Next.js locally on port 5500.
- `npm run build` builds Next.js.
- `npm start` runs the cPanel-compatible Node.js startup file.
- `npm run db:deploy` applies SQL migrations from `db/migrations` to PostgreSQL.
- `npm run lint` runs ESLint.
