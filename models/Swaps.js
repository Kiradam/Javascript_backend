const Schema = require('mongoose').Schema;
const db = require('../config/db');

let Swaps = db.model('Swaps', {
    Type_own: String,
    Gender_own: String,
    Size_own: String,
    Value_own: Number,
    Type_swapto: String,
    Gender_swapto: String,
    Size_swapto: String,
    Value_swapto: Number,
    _trader: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});

module.exports = Swaps;