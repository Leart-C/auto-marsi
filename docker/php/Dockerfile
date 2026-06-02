FROM php:8.3-fpm-alpine

RUN apk add --no-cache git zip unzip curl libpng-dev oniguruma-dev icu-dev postgresql-dev \
    && docker-php-ext-install pdo_pgsql mbstring intl gd

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/api
