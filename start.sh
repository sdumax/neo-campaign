#!/bin/sh
set -e

npm run db:deploy
exec node server.cjs
