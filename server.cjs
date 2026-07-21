/* eslint-disable @typescript-eslint/no-require-imports */

const { createServer } = require("http");
const {
  appendFileSync,
  existsSync,
  rmSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} = require("fs");
const { join } = require("path");
const { spawnSync } = require("child_process");
const next = require("next");
const { runMigrations } = require("./scripts/migrate.cjs");

const port = Number(process.env.PORT) || 3000;
const hostname = "0.0.0.0";
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

function unpackDeployArtifact() {
  const archivePath = join(process.cwd(), "deploy", "neo-campaign-cpanel.tar.gz");
  const deployDir = join(process.cwd(), "deploy");
  const buildPath = join(process.cwd(), ".next");

  const partFiles = existsSync(deployDir)
    ? readdirSync(deployDir)
        .filter((file) => file.startsWith("neo-campaign-cpanel.tar.gz.part-"))
        .sort()
    : [];

  if (!existsSync(archivePath) && partFiles.length === 0) return;

  const partPaths = partFiles.map((file) => join(deployDir, file));
  const newestPartMtime = partPaths.reduce(
    (newest, partPath) => Math.max(newest, statSync(partPath).mtimeMs),
    0
  );

  if (
    partPaths.length > 0 &&
    (!existsSync(archivePath) || newestPartMtime > statSync(archivePath).mtimeMs)
  ) {
    reassembleDeployArtifact(archivePath, partPaths);
  }

  const shouldExtract =
    !existsSync(buildPath) || statSync(archivePath).mtimeMs > statSync(buildPath).mtimeMs;

  if (!shouldExtract) return;

  console.log("Extracting deploy/neo-campaign-cpanel.tar.gz");
  const result = spawnSync("tar", ["-xzf", archivePath], {
    cwd: process.cwd(),
    stdio: "inherit",
  });

  if (result.status !== 0) {
    throw new Error(`Failed to extract deploy artifact with exit code ${result.status}`);
  }
}

function reassembleDeployArtifact(archivePath, partPaths) {
  console.log("Reassembling deploy artifact");
  rmSync(archivePath, { force: true });
  writeFileSync(archivePath, "");

  for (const partPath of partPaths) {
    appendFileSync(archivePath, readFileSync(partPath));
  }
}

async function start() {
  if (!dev) {
    unpackDeployArtifact();
    await runMigrations();
  }

  await app.prepare();

  createServer((req, res) => {
    handle(req, res);
  }).listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start application:", error);
  process.exit(1);
});
