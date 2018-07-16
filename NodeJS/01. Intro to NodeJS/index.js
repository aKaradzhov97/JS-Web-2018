let http = require('http');

let app = http.createServer((request, response) => {
    if (request.method === 'GET') {
        switch (request.url) {
            case '/':
                response.write('Home page');
                response.end();
                break;
            case '/about':
                response.write('About page');
                response.end();
                break;
            default:
                response.write('404 Not Found!');
                response.end();
                break;
        }
    }
    response.end();
});

let port = '5000';

app.listen(port);

console.log(`Server started! Listening on port: ${port}`);