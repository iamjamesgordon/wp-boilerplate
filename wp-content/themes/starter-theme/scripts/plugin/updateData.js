module.exports.update = (data, action, prop, plugin, version, must_use = false) => {

    const wpackagist = "wpackagist-plugin/" + plugin;

    if(prop == "require") {

        action == 'require' ? Object.assign({}, data.require, { [wpackagist]: version }) : delete data.require[wpackagist];
        return data;

    } else {

        if(must_use)
        {
            let dataArray = data.extra['installer-paths']['../../mu-plugins/{$name}/'];
            dataArray = action == 'require' ? dataArray.push(wpackagist) : dataArray.filter(x => x !== wpackagist);
            data.extra['installer-paths']['../../mu-plugins/{$name}/'] = dataArray;
            return data;
        }
        else
        {
            let dataArray = data.extra['installer-paths']['../../plugins/{$name}/'];
            dataArray = action == 'require' ? dataArray.push(wpackagist) : dataArray.filter(x => x !== wpackagist);
            data.extra['installer-paths']['../../plugins/{$name}/'] = dataArray;
            return data;
        }

    }

};