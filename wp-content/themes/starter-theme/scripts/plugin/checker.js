module.exports.check = (data, prop, plugin, must_use = false) => {

    const wpackagist = "wpackagist-plugin/"

    // If the prop passed is to check the require section of the composer.json file
    //  - The json object is checked in the 'required' property
    // Otherwise a check is made in the plugins or mu-plugins depending on if a must_use is passed
    if(prop == "require") {
        pluginExist = Object.keys(data.require).includes(wpackagist + plugin);
        return pluginExist;
    } else {
        pluginExist = must_use ? data.extra['installer-paths']['../../mu-plugins/{$name}/'].includes(wpackagist + plugin) : data.extra['installer-paths']['../../plugins/{$name}/'].includes(wpackagist + plugin);
        return pluginExist;
    }

};