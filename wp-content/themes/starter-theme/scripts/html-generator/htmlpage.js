const manifest = require('./manifest');

module.exports.code = (htmlContent) => {

    const html = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>HTML 5 Boilerplate</title>
        <link rel="stylesheet" href="` + manifest.asset('main.css') +`">
    </head>
    <body> \t` + htmlContent + `</body>
</html>`;

    return html;
};