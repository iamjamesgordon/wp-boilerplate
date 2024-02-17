const { writeFile, readFile } = require('fs');
const process = require('process');
const path = require('path');
const composer = path.resolve(__dirname, '../../composer.json');

const { check } = require('./checker');
const { update } = require('./updateData');

const action = process.argv[2];
const plugin = process.argv[3];
const version = process.argv[4];
const must_use = process.argv[5] ?? false;

readFile(composer, (error, data) => {
    if (error) {
        console.log(error);
        return;
    }

    let parsedData = JSON.parse(data);
    const requiredProp = parsedData.required;
    const installerPathProp = parsedData.extra['installer-paths'];

    console.log("Plugin check below:");
    console.log(check(parsedData, 'require', plugin));

    if(action == "require") {

        // Check the require property if the 'plugin' exists
        // If so do nothing else add plugin to the 'require' property inside json (parsedData)
        if (!check(parsedData, 'require', plugin))
            parsedData = update(parsedData, action, 'require', plugin, version);

        parsedData = must_use ? update(parsedData, action, '', plugin, version, true) : update(parsedData, action, '', plugin, version);

    }

    if(action == "remove") {

        if (check(parsedData, false, plugin))
            parsedData = update(parsedData, action, 'require', plugin, version);

        parsedData = check(parsedData, false, plugin, true) ? update(parsedData, action, '', plugin, version, true) : update(parsedData, action, '', plugin, version);

    }

    console.log("MU Plugins");
    console.log(parsedData.extra['installer-paths']['../../mu-plugins/{$name}/']);
    console.log("Plugins");
    console.log(parsedData.extra['installer-paths']['../../plugins/{$name}/']);
    // If task is REQUIRE
    // Check if the package is in the 'require' in composer.json
    //  - If it is not then update parsedData
    //  - If it is then do nothing
    // Check if the package is in the 'installer-path' in composer.json
    //  - If its in the installer path do nothing
    //  - If its NOT in the installer path then add it

    // If task is REMOVE
    // Check if the package is in the 'require' in composer.json
    //  - If it is not then do nothing
    //  - If it is then removing from installer path
    // Check if the package is in the 'installer-path' in composer.json
    //  - If it is not then do nothing
    //  - If it is then removing from installer path

    writeFile(composer, JSON.stringify(parsedData, null, 2), (err) => {
        if (err) {
            console.log('Failed to write updated data to file');
            return;
        }
        console.log('Updated file successfully');
    });
});