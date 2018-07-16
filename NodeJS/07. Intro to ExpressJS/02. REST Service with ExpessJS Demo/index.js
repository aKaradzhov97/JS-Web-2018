//NOT TESTED CODE - MAY NOT WORK PROPERLY
const port = 1337;
const express = require('express');

let app = express();
let cats = express.Router();

cats.get('/:id', (req, res) => {
    res.send(`Cat with id: TEST ONLY`);
});

cats.get('/', (req, res) => {
    res.json();
});

cats.post('/', (req, res) => {
    res.send(`Cat saved...`);
});

cats.delete('/:id', (req, res) => {
    res.send(`Deleted cat with id: EXAMPLE`);
});

app.use('/cats', cats);

app.listen(port, () => {
    console.log(`ExpressJS Server running on port: ${port}!`);
});