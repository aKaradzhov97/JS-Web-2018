const fs = require('fs');
const path = require('path');

const placeholder = '<div id="replaceMe">{{replaceMe}}</div>';

function readFile(res, pathName, dynamicContent, contentType) {
    if (!pathName) {
        throw new ReferenceError('Argument "pathName" cannot be undefined!');
    }
    pathName = path.join(__dirname, `../${pathName}`);

    if (!contentType) {
        contentType = 'text/html';
    }

    fs.readFile(pathName, 'utf8', (err, data) => {
        if (err) {
            console.dir(err);
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            res.end(`Could not read file with path ${pathName}.`);
            return;
        }

        if (dynamicContent) {
            data = data.replace(placeholder, dynamicContent);
        }

        res.writeHead(200, {
            'Content-Type': contentType
        });
        res.write(data);
        res.end();
    });
}

module.exports = res => {
    res.view = (path, dynamicContent) => {
        readFile(res, path, dynamicContent, undefined);
    };

    res.staticFile = (path, contentType) => {
        readFile(res, path, undefined, contentType);
    }
};