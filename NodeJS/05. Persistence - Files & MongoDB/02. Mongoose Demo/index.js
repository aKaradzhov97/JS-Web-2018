const mongoose = require('mongoose');
let Dog = require('./models/Dog');

let connectionString = 'mongodb://localhost:27017/cats';

//Variant 1
let catSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    color: {type: String, required: true}
});
let Cat = mongoose.model('Cat', catSchema);

//Variant 2
let Owner = mongoose.model('Owner', {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    cats: [Cat.schema]
});

//Example validation
//Will throw err in case of invalid age.
catSchema.path('age').validate(function () {
    return this.age >= 2 && this.age <= 20;
}, 'Age must be between 2 & 20!');

mongoose
    .connect(connectionString)
    .then(() => {
        //CREATE DB RECORD
        //All records must have same properties

        let newCat = new Cat({
            name: 'Tosho',
            age: 5,
            color: 'white'
        });
        newCat.save();


        let newDog = new Dog({
            name: 'Rexxy',
            age: 5,
            color: 'gray'
        });
        newDog.save();

        //FIND DB RECORD
        Cat.find({}).then(cats => {
            console.log(cats);
        });

        //Link Owner to cats
        //Create owner first.
        Cat.find({}).then(cats => {
            let owner = new Owner({
                firstName: 'Pesho',
                lastName: 'Petrov',
                cats: cats
            });
            owner.save(); //Can add .then() here.
        });
    });