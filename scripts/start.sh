#!/bin/bash
source .env

echo "Starting........."

# Setting a variable with the idea of the WordPress container for this project
wordpressContainer=$(docker container ls --all --quiet --filter "name=${DOCKER_NETWORK_NAME}_${DOCKER_WORDPRESS_CONTAINER_NAME}")

# Setting an array of default folders and files to be removed
remove=(
    "wp-content/themes/twentytwentythree"
    "wp-content/themes/twentytwentytwo"
    "wp-content/themes/index.php"
    "wp-content/plugins/akismet"
    "wp-content/plugins/hello.php"
    "wp-content/plugins/index.php"
    "wp-content/index.php"
)

# Check if the WordPress exists
if [ $wordpressContainer ]; then

    echo "WordPress container exists checking for folders and files...."

    # If container exists remove loop through array and remove folders and files
    for i in ${remove[@]}
    do
        docker exec $wordpressContainer /bin/bash -c "rm -rf $i"
    done

    echo "wp-content folder has been updated, default themes and plugins have been removed"

else

    # If container deosn't exist a message is pritning informing user to run 'docker-compose up'
    echo "WordPress container doesn't exist! Make sure to docker-compose up and then try again..."

fi