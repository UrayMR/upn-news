FROM serversideup/php:8.4-fpm-nginx

# Switch to root so we can do root things
USER root

# Install Node.js and npm from the official Node.js image
COPY --from=node:20 /usr/local/bin/node /usr/local/bin/node
COPY --from=node:20 /usr/local/lib/node_modules /usr/local/lib/node_modules

# Create symlinks for npm and npx binaries
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
 && ln -s /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

# Install the intl and bcmath extensions for PHP with root permissions 
RUN install-php-extensions intl bcmath

# Drop back to our unprivileged user (skipping for development purposes)
# USER www-data

ARG UID=1000
ARG GID=1000

RUN groupadd -g ${GID} sirbuzz \
 && useradd -u ${UID} -g ${GID} -m sirbuzz

# Set working directory
WORKDIR /var/www/html

# Copy entrypoint scripts
COPY --chmod=755 ./docker/php/entrypoint.d/ /etc/entrypoint.d/
