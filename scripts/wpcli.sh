#!/bin/bash
source .env

echo "Starting........."

# Setting a variable with the idea of the WordPress container for this project
wordpressContainer=$(docker container ls --all --quiet --filter "name=${DOCKER_NETWORK_NAME}_${DOCKER_WORDPRESS_CONTAINER_NAME}")

# Check if the WordPress container exists
if [ $wordpressContainer ]; then

    docker exec $wordpressContainer /bin/bash -c "
    curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar &&
    chmod +x wp-cli.phar &&
    mkdir wp &&
    mv wp-cli.phar wp"

    docker exec -it $wordpressContainer bash

fi