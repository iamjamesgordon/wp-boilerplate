#!/bin/bash
source ../../../.env

# Setting a variable with the idea of the WordPress container for this project
wordpressContainer=$(docker container ls --all --quiet --filter "name=${DOCKER_NETWORK_NAME}_${DOCKER_WORDPRESS_CONTAINER_NAME}")
usage="Usage : [-t task(require or remove)] [-p plugin_name] [-v version] [-m must-use] [-a activate]"

while getopts ":t:p:v:ma" option; do
  case $option in
    t)
      if [ $OPTARG == "require" ] || [ $OPTARG == "remove" ]; then
        task="$OPTARG"
      else
        echo "-t can only be 'require' or 'remove'"
        echo $usage
        exit 1
      fi
      ;;
    p)
      plugin_name="$OPTARG"
      ;;
    v)
      version="$OPTARG"
      ;;
    m)
      must_use=true
      ;;
    a)
      activate=true
      ;;
    *)
      echo "Usage: $usage"
      exit 1
      ;;
  esac
done

if [ $task == "require" ] && [ -z "$version" ]; then
        echo 'When using 'Require' please make sure to set a plugin and a version'
        echo 'Missing -t, -p or -v'
        echo $usage
        exit 1
fi

# A small fubction to check plugin passed
package_exist() {
    composer show wpackagist-plugin/$plugin_name $version --available
}

# Add a check to see if package exist in packagist before trying to execute node function
if package_exist; then

  if [ "$task" = "remove" ]; then

    docker exec $wordpressContainer bash -ilc "wp plugin deactivate $plugin_name"
    docker exec $wordpressContainer bash -ilc "wp plugin delete $plugin_name"

  fi

    echo "This package does exist"
    node $(dirname $0)/plugin/index.js $task $plugin_name $version $must_use
    composer update
    composer install

  if [ "$activate" = "true" ] && [ -z "$must_use" ]; then

    docker exec $wordpressContainer bash -ilc "wp plugin activate $plugin_name"

  fi

else

  echo "This package doesn't exist"
  echo "Please check https://wpackagist.org/ to see if the plugin and version is correct"
  exit 1

fi