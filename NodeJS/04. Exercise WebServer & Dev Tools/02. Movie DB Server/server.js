const httpContent = require('http');
const url = require('url');

const attachFileReader = require('./config/fileReader');
const postParserMiddleware = require('./config/postParser');
const handlers = require('./handlers');
const port = 9999;

function framework(req, res) {
    req.urlData = url.parse(req.url);
    attachFileReader(res);

    postParserMiddleware(req, res)
        .then(postData => {
            for (let handler of handlers) {
                if (handler(req, res) !== true) {
                    break;
                }
            }
        });
}

let server = httpContent.createServer(framework);

server.listen(port);
console.log(`Server listening on port ${port}`);