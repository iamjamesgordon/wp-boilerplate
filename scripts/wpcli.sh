#!/bin/bash -x
source .env

echo "Starting to access container........."

# Setting a variable with the idea of the WordPress container for this project
wordpressContainer=$(docker container ls --all --quiet --filter "name=${DOCKER_NETWORK_NAME}_${DOCKER_WORDPRESS_CONTAINER_NAME}")

# Check if the WordPress container exists
if [ $wordpressContainer ]; then

    docker exec -it $wordpressContainer bash

fi