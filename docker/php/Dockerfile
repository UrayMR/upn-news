FROM serversideup/php:8.4-fpm-nginx

# Switch to root so we can do root things
USER root

# Install the intl and bcmath extensions for PHP with root permissions 
RUN install-php-extensions intl bcmath

# Drop back to our unprivileged user (skipping for development purposes)
USER www-data

# Set working directory
WORKDIR /var/www/html

# Copy entrypoint scripts
COPY --chmod=755 ./docker/php/entrypoint.d/ /etc/entrypoint.d/
