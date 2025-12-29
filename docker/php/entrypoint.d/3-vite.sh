#!/bin/sh
set -e

echo "Running vite.sh Entrypoint"

cd /var/www/html

# Check environment variables to determine if we are in development mode to run npm dev server
if [ "$APP_ENV" = "local" ] || [ "$NODE_ENV" = "development" ]; then
    
    # Prevent duplicate Vite process
    if ! pgrep -f "vite" >/dev/null 2>&1; then
        echo "Development mode detected → running npm run dev"

        # Start the npm development server in the background
        npm run dev -- --host &
    else
        echo "Vite dev server already running"
    fi

else
    echo "Production mode detected → skipping npm run dev"
    echo "⚠️ Frontend build should be done at build/CI stage"
fi


echo "Vite script completed"
