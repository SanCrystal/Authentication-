const express = require('express');
const bcrypt = require('bcrypt');
const { db } = require('./db/db');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const cookieParser = require('cookie-parser');
require('dotenv').config();



const { PORT, PASSWORD } = process.env;

const app = express();
//call database
db();

//use json body parser middleware
app.use(express.json());
//use cookies middleware
app.use(cookieParser());
//user routes middleware
app.use(userRoutes);

//book routes middleware
app.use(bookRoutes);



app.listen(PORT, () => console.log(`server up on port ${PORT}.`))