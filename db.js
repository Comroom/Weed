var DataStore = require('nedb');
var db = {};

//user database
db.users = new DataStore({ filename: './data/users', autoload: true });

module.exports = db;
