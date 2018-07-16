let express = require('express');
let pug = require('pug-cli');
let app = express();

//Set the view engine
app.set('view engine', 'pug');
//Set the directory of files
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Hello From Express!',
        subtitle: 'And from PUG!',
        myArray: [1, 2, 3, 4, 5]
    });
});

app.listen(1337);