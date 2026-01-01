#!/bin/sh
set -e

echo "Running dependencies.sh Entrypoint"

echo "This script is currently disabled. Uncomment the code below to enable it."

# cd /var/www/html

# Check if Composer dependencies are installed
# if [ -f vendor/autoload.php ]; then
#     echo "Composer dependencies already installed."
# else
#     echo "Installing Composer dependencies..."
#     composer install --no-interaction --prefer-dist --optimize-autoloader
# fi

# # Check if Node modules dependencies are installed
# if [ -d node_modules/.bin ]; then
#     echo "Node modules already installed."
# else
#     echo "Installing Node modules..."
#     npm install
# fi

# echo "Dependencies script setup completed."