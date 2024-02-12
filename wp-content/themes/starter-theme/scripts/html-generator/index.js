const fs = require('fs');
const path = require('path');
const sassDir = path.resolve(__dirname, '../../resources/assets/sass/components/');
const htmlPage = require('./htmlpage');

const htmlWrap = "/* HTML-BUILDER";

fs.readdir(sassDir, function (err, files) {

    if (err) {
        console.log("Error 1" + err);
    }

    files.forEach(function (file, index) {

        fs.readFile(sassDir + "/" + file, 'utf8', function (err, data) {

            if (err) {
                console.log(err);
            }

            // This should only run if the .scss file has wrapper for the html section
            if (data.includes(htmlWrap)) {

                const htmlStart = data.indexOf(htmlWrap) + htmlWrap.length;
                const htmlEnd = data.indexOf("*/");

                let htmlContent = data.substring(htmlStart, htmlEnd);

                let htmlFileName = file.replace('scss', 'html');
                let htmlFilePath = path.resolve(__dirname + '/../../resources/assets/html') + '/' + file.replace('scss', 'html');
                let htmlPageData = htmlPage.code(htmlContent);

                fs.writeFile(htmlFilePath, htmlPageData, (err) => {

                    if (err)
                        console.log(err);
                    else {
                        console.log(htmlFileName + " written successfully");
                    }

                });

            }
        });

    });

});