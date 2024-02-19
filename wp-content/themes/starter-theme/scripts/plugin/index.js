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

    // If task is REQUIRE
    if(action == "require") {

        // Check the require property if the 'plugin' exists
        // If so do nothing else add plugin to the 'require' property inside json (parsedData)
        if (!check(parsedData, 'require', plugin))
            parsedData = update(parsedData, 'require', 'require', plugin, version);

        // Check if plugin exists in both of the installer-paths
        // If it doesn't then check if musu_use has been passed
        if (!check(parsedData, false, plugin, must_use) && !check(parsedData, false, plugin, false))
            parsedData = must_use ? update(parsedData, action, false, plugin, version, true) : update(parsedData, action, false, plugin, version);

    }

    // If task is REMOVE
    if(action == "remove") {

        // Check if plugin exists in the require
        // If it does then do update the json
        if (check(parsedData, 'require', plugin))
            parsedData = update(parsedData, action, 'require', plugin, version);

        // Check if plugin exists in the installer-path must use
        // If it does then do update the json by removing from installer-path mu-plugin
        if(check(parsedData, false, plugin, true))
            parsedData = update(parsedData, action, '', plugin, '', true);

        // Check if plugin exists in the installer-path
        // If it does then do update the json by removing from installer-path plugin
        if (check(parsedData, false, plugin, false))
            parsedData = update(parsedData, action, '', plugin, '', false);

    }

    writeFile(composer, JSON.stringify(parsedData, null, 2), (err) => {
        if (err) {
            console.log('Failed to write updated data to file');
            return;
        }
        console.log('Updated file successfully');
    });

});