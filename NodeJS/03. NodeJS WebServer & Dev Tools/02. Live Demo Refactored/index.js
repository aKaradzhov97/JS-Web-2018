//Server constants
const http = require('http');
const url = require('url');
const port = 1337;

const handlers = require('./handlers/startAllHandlers');

http.createServer((req, res) => {
    req.path = url.parse(req.url).pathname;

    for (let i = 0; i < handlers.length; i++) {
        let handler = handlers[i];
        let result = handler(req, res);
        if (!result) {
            break;
        }
    }
}).listen(port);

console.log(`Server is running and listening on port: ${port}.`);