const { rmdir } = require('fs');
const path = require('path');

module.exports.remove = (plugin, must_use) => {

    const pluginPath = must_use ? path.resolve('../../mu-plugins/') : path.resolve('../../plugins/');

    rmdir(pluginPath + '/' + plugin, {recursive: true}, (err) => {
        if (err) throw err;
        console.log('successfully deleted ' + plugin);
    });

};