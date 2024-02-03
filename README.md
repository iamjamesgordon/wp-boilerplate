# Local development

This repo uses Docker to spin up a local version that enables developers to work in a WordPress enviroment. This setup includes a mysql (database), phpmyadmin (database interface) and WordPress (CMS) image. There is a script (scripts/start.sh - see below) in place to ensure that the default themes and plugins are removed and only leave one theme as a fallback. This allows for a less clutered working environmentfor developers.

## Setting .env variables

Docker uses variables that are set in .env file at the root of this project
Each variable under the **Docker Variables** header should be set

## Starting docker container

**Run following commands for the first time or if the containers have been removed:**
- docker-compose up
- scripts/start.sh

**Run following commands if containers already exist**
- docker-compose up