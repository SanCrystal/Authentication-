'use strict';
//require mongoose

const mongoose = require('mongoose');

const path = require('path');
// require env file
require('dotenv').config({
    path: path.dirname(__dirname).split(path.sep).slice(0, -1).join('/') + '/.env'
});


//require connection string
const { MONGO_URL } = process.env;



//create a database connection
module.exports.db = () => {
    try {
        mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("database connection was successful!");

    } catch (err) {
        console.log(err.message)

    }
}