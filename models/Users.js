const Schema = require('mongoose').Schema;
const db = require('../config/db');

let Users = db.model('Users', {
    Name: String,
    Email: String,
    Password: String,
    Fb_twittername: String,
    Tel: String
});

module.exports = Users;