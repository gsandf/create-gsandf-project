FROM php:7.3-apache

# Install server dependencies
RUN apt-get update \
  && apt-get install -y libmagickwand-dev less vim \
  && docker-php-ext-install mysqli opcache

# install GD
RUN apt-get install -y \
  libfreetype6-dev \
  libjpeg62-turbo-dev \
  libpng-dev \
  && docker-php-ext-install -j$(nproc) iconv \
  && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
  && docker-php-ext-install -j$(nproc) gd

#install Imagemagick & PHP Imagick ext
RUN apt-get install -y \
  libmagickwand-dev --no-install-recommends

RUN pecl install imagick && docker-php-ext-enable imagick

# Install WP-CLI (https://wp-cli.org/)
RUN curl -o /bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
  && chmod +x /bin/wp

# Install dockerize (https://github.com/jwilder/dockerize)
ENV DOCKERIZE_VERSION v0.6.1
RUN curl -sL https://github.com/jwilder/dockerize/releases/download/${DOCKERIZE_VERSION}/dockerize-linux-amd64-${DOCKERIZE_VERSION}.tar.gz  \
  | tar -C /usr/local/bin -xzvf -

# Clean up
RUN apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Create a directory for the WordPress installation
RUN mkdir /wp
WORKDIR /wp

# Create a user to run wp-cli commands
RUN useradd -d /wp -s /bin/bash wp \
  && chown -R wp .

USER wp

# WordPress version can be changed at build time using
# `docker build --build-arg WORDPRESS_VERSION=4.4.2 .`
ENV WORDPRESS_VERSION 5.3

# Download WordPress and verify the checksum
RUN wp core download --version=${WORDPRESS_VERSION} && \
  wp core verify-checksums --version=${WORDPRESS_VERSION}

EXPOSE 8080

# Add setup script
COPY --chown=wp setup.sh /wp/setup.sh
COPY --chown=wp wp-plugins.txt /wp/wp-plugins.txt
RUN chmod +x setup.sh

CMD ["./setup.sh"]
