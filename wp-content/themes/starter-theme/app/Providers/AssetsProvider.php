<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AssetsProvider extends ServiceProvider
{

    protected $ManifestPath;
    protected $ManifestFile;

    public function __construct()
    {
        $this->ManifestFile = json_decode(file_get_contents(get_stylesheet_directory(). "/public/manifest.json"),true);
        $this->ManifestPath = dirname(get_stylesheet_directory_uri(). "/public/manifest.json");
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        add_action( 'wp_enqueue_scripts', [$this, 'enqueueScripts'] );
    }

    /**
     *
     *
     * @return void
     */
    public function enqueueScripts()
    {
        wp_enqueue_style('main-css', $this->getHashedAssetFile('main.css'));
        wp_enqueue_script('main-js', $this->getHashedAssetFile('main.js'), array(), '1.0.0', true);
    }

    /**
     *
     *
     * @return string
     */
    public function getHashedAssetFile(string $asset)
    {
        $path = $this->ManifestPath;
        $file = substr($this->ManifestFile[$asset], 2);
        return $path ."/". $file;
    }

}
