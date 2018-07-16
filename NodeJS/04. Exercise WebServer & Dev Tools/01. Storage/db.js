let db = {};
const fs = require('fs');

let put = (key, value) => {
    if (typeof(key) !== "string") {
        console.log('The key must be a string!');
        return;
    }

    if (db.hasOwnProperty(key)) {
        console.log('Key already exists!');
        return;
    }

    db[key] = value;
};
let get = (key) => {
    if (typeof(key) !== "string") {
        return 'The key must be a string!'
    }
    if (!db.hasOwnProperty(key)) {
        return "I don't have this key!";
    }
    return db[key];
};
let getAll = () => {
    let allKeys = Object.keys(db);
    if (allKeys.length === 0) {
        return ('Error! No records in storage!');
    }
    return db;
};
let update = (key, newValue) => {
    if (typeof(key) !== "string") {
        return `Input key is not a string!`;
    }
    if (!db.hasOwnProperty(key)) {
        return `No such key in storage!`;
    }
    db[key] = newValue;
};
let deleteItem = (targetKey) => {
    if (!db.hasOwnProperty(targetKey)) {
        console.log(`Record you want to delete cannot be found!`);
        return;
    }
    delete db[targetKey];
    
};
let clear = () => {
    db = {};
};

let save = () => {
    fs.writeFileSync('./data.json', JSON.stringify(db), 'utf8');
};
let load = () => {
    try {
        db = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    } catch (err) {

    }
};

let storage = {
    put: put,
    get: get,
    getAll: getAll,
    update: update,
    delete: deleteItem,
    clear: clear,
    save: save,
    load: load
};
module.exports = storage;