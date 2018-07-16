const app = require('./config/expressConfig');

const port = 2323;

require('./config/mongoConfig')
    .then(() => {
    app.listen(port, () => console.log('I am listening on port: ' + port));
    })
    .catch(err => {
        console.log('Could not connect to MongoDB\n', err);
    });
