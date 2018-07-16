let express = require('express');
let handlebars = require('express-handlebars');
let app = express();

//Set the view engine
app.engine('.hbs', handlebars({
    extname: '.hbs',
    partialsDir: 'views/partials'

}));
app.set('view engine', '.hbs');

//Render view
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Ivan'
    });
});

app.listen(1337);