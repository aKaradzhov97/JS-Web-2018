const mongodb = require('mongodb');

let connectionString = 'mongodb://localhost:27017/pets';

mongodb
    .MongoClient
    .connect(connectionString)
    .then(client => {
    let db = client.db('pets');

    let dogs = db.collection('dogs');
    dogs.insert({
        name: 'Faik',
        color: 'white',
        age: '4'
    });
    dogs.find({}).toArray((err, dogs) => console.log(dogs));
});