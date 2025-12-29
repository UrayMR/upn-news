#!/bin/sh
set -e

echo "Running env.sh Entrypoint"

cd /var/www/html

# Docker-only env bootstrap
if [ -f .env.docker ]; then
  cp .env.docker .env
fi

echo "Environment setup completed."