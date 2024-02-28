<?php

$finder = \PhpCsFixer\Finder::create()
    ->exclude('scripts')
    ->exclude('public')
    ->exclude('resources')
    ->exclude('templates')
    ->exclude('node_modules')
    ->exclude('vendor')
    ->in(__DIR__);

return (new PhpCsFixer\Config())
    ->setFinder($finder)
;
