# The Starter Theme

The starter theme uses Roots/Sage 10 as it's core with a few adjustments. The default bud has been removed and Webpack installed in its place.

## Assets
This theme utilises the 7-1 sass pattern, using the boilerplate from https://github.com/AsyrafHussin/sass-boilerplate. The idea is to appaorch the CSS development in a more modular way utilising BEM. Every component and the layouts standalone with no dependency on each other therefore can be used together interchangeably. See more on this here - https://openclassrooms.com/en/courses/5625786-produce-maintainable-css-with-sass/5723581-use-the-7-1-pattern-for-a-manageable-codebase as a loose guide.

### Compiling
On compilation Webpack will add a hash to the end of each file created, this is a fringerprinting method to solve caching issues. Each file is placed into the **public/** folder.

**Commands**
- npm run build - compiles the css and js
- npm run watch - watch for changes in the scss and js files

## TDD
PHPUNIT has been installed to allowed for test driven development. To be able to use WordPress native functions WP_MOCK has been installed with the PHPUNIT.
All tests live in the **wp-content/themes/starter-theme/test** folder with two examples, one with WordPress function and one without.

**Commands**
- ./vendor/bin/phpunit tests

## Linting
To enable php code to stay consistent and within standards the php-cs-fixer library has been added. There is currently a default set of rules, to change these update the **php-cs-fixer-config.php** file

<code>
return (new PhpCsFixer\Config())
    ->setRules([
        '@PER-CS' => true,
        '@PHP82Migration' => true,
    ])
    ->setFinder($finder);
</code>

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