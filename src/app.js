const express = require('express');
const { db } = require('./db/db');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const errorRoutes = require('./routes/errorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cookieParser = require('cookie-parser');
const { isLoggedIn } = require('./middlewares/auth');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();



const { PORT } = process.env;

const app = express();
//call database
db();
//set view engine
app.set('view engine', ejs);
//set the views directory
app.set('views', path.join(__dirname + '/views'));
//use json body parser middleware
app.use(express.json());
//use cookies middleware
app.use(cookieParser());
//serving static files frontend
// app.use(express.static('frontend'));
app.use(express.static(path.join(__dirname, 'frontend')));
app.all('*', isLoggedIn, function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5550");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});
//user routes middleware
app.use(userRoutes);

//book routes middleware
app.use(bookRoutes);
//auth routes middleware
app.use(authRoutes);
//error routes middleware
app.use(errorRoutes);
//admin routes
app.use(adminRoutes)
    //set home route
app.get('/', (req, res) => { res.render('index.ejs') });
app.get('/about', (req, res) => { res.render('about.ejs') });
app.get('/blog', (req, res) => { res.render('blog.ejs') });



app.listen(PORT, () => console.log(`server up on port ${PORT}.`))


//generate random strings crypto.randomBytes(size=20).toString('base64')
// crypto.randomBytes(size=30).toString('base64')+crypto.randomBytes(size=30).toString('hex') for env secrets