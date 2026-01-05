
#!/bin/sh

set -e

echo "Running npm lint..."
npm run lint

echo "Running npm format..."
npm run format

echo "Running composer format..."
composer format

echo "Running composer test..."
composer test

echo "All pre-commit checks passed."
