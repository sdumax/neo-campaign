/* eslint-disable @typescript-eslint/no-require-imports */

const { existsSync, rmSync, mkdirSync } = require("fs");
const { join } = require("path");
const { spawnSync } = require("child_process");

const root = process.cwd();
const deployDir = join(root, "deploy");
const archivePath = join(deployDir, "neo-campaign-cpanel.tar.gz");

const requiredPaths = [
  ".next",
  "public",
  "db",
  "scripts/migrate.cjs",
  "server.cjs",
  "package.json",
  "package-lock.json",
  "next.config.ts",
];

const missing = requiredPaths.filter((filePath) => !existsSync(join(root, filePath)));

if (missing.length > 0) {
  console.error("Missing required deployment files:");
  for (const filePath of missing) console.error(`- ${filePath}`);
  console.error("Run `npm run build` before packaging.");
  process.exit(1);
}

rmSync(deployDir, { recursive: true, force: true });
mkdirSync(deployDir, { recursive: true });

const files = [
  ".next",
  "public",
  "db",
  "scripts/migrate.cjs",
  "server.cjs",
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "README.md",
  ".env.example",
];

const result = spawnSync("tar", ["-czf", archivePath, ...files], {
  cwd: root,
  stdio: "inherit",
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

console.log(`Created ${archivePath}`);
