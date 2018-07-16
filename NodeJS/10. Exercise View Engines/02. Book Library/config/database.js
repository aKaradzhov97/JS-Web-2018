const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = (config) => {
    mongoose.connect(config.development.db, (err) => {
        if (err) {
            console.log(err);

        } else {
            console.log(`MongoDB is up and running...`);
        }
    });
};