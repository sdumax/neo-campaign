/* eslint-disable @typescript-eslint/no-require-imports */

const { existsSync, rmSync, mkdirSync, readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
const { spawnSync } = require("child_process");

const root = process.cwd();
const deployDir = join(root, "deploy");
const archivePath = join(deployDir, "neo-campaign-cpanel.tar.gz");
const partPrefix = `${archivePath}.part-`;
const maxPartSize = 45 * 1024 * 1024;

const requiredPaths = [
  ".next",
  "public",
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
];

const result = spawnSync(
  "tar",
  ["--exclude", ".next/cache", "--exclude", ".next/dev", "-czf", archivePath, ...files],
  {
    cwd: root,
    stdio: "inherit",
  }
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

const archive = readFileSync(archivePath);
const totalParts = Math.ceil(archive.length / maxPartSize);

for (let index = 0; index < totalParts; index += 1) {
  const start = index * maxPartSize;
  const end = Math.min(start + maxPartSize, archive.length);
  const partPath = `${partPrefix}${String(index).padStart(3, "0")}`;
  writeFileSync(partPath, archive.subarray(start, end));
  console.log(`Created ${partPath}`);
}

rmSync(archivePath);
console.log(`Split deploy artifact into ${totalParts} parts`);
