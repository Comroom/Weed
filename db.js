var DataStore = require('nedb');
var db = {};

// user database
db.users = new DataStore({filename: './data/users', autoload: true});

db.chat = new DataStore({filename: './data/chat', autoload: true});

db.chatRoom = new DataStore({filename: './data/chatRoom', autoload: true});

module.exports = db;
