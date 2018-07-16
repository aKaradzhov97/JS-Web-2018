let express = require('express');
let bodyparser = require('body-parser');
let app = express();
const port = 1337;
//STATIC FILES ALWAYS ABOVE ALL ROUTES
//Load static files always first!
//Can add prefix: (app.use('/static', express.static('content')) >>>
//all files will load in /static/index.html
app.use(express.static('content'));

//BodyParser - Parses form data
// - extended prop true for allowed using of nested objects.
app.use(bodyparser.urlencoded({extended: true}));


app.get('/home', (req, res) => {
    res.send('Hello from express!');
});

//Routing with parameters + REGEX
app.get('/courses/:id(\\d+)', (req, res) => {
    //Will work only if ID is number
    let params = req.params;
    res.send(params);
});

//Changing routes
app.route('/contacts')
    .get((req, res) => {
        res.send('ExpressJS GET Contacts page!');
        //handling get request on contacts page
    })
    .post((req, res) => {
        res.send('ExpressJS POST Contacts page!');
        //handling post request on contacts page
    })
    .all((req, res) => {
        res.send('ExpressJS everything else Contacts page!');
        //everything else
    });

//Other responses
//DOWNLOAD
app.get('/downPage', (req, res) => {
    res.download('./index.js');
    //We also have res.end();
});

//Return JSON
//res.json()
let obj = {
    "name": "Pesho",
    "age": 15
};

app.get('/json', (req, res) => {
    res.json(obj);
});

//REDIRECT
//res.redirect()
app.get('/oldPage', (req, res) => {
    //Mostly used after saving data. (POST req).
    res.redirect('/home');
});

//Load FILE in browser
//res.sendFile
app.get('/sendFile', (req, res) => {
    res.sendFile(__dirname + "/index.js");
});



//Add Another router
let router = express.Router();

router.get('/create', (req, res) => {
    //Access throught /cats/create
    res.send('Create cat!');
});

router.get('/getCat/:id', (req, res) => {
    //Access throught /cats/getCat/1500
    res.send(`Loaded cat with id: ${req.params.id}!`);
});

app.use('/cats', router);

//MIDDLEWARE FUNCTION
//- used mostly to validation
let middlewareFunc = (req, res, next) => {
    //validate something and invoke next func to be executed
    console.log('Middleware func used!');
    next();
};

app.get('/middle', middlewareFunc, (req, res) => {
    res.send('Middleware used!');
});

//BODYPARSER (Encoding forms data)
app.post('/saveData', (req, res) => {
    console.log(req.body);
    console.log(req.body.firstName);
    console.log(req.body.age);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`ExpressJS Server running on port: ${port}!`);
});